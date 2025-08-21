/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout, setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useFetchUser } from "@/lib/apiLibrary/queryHooks/auth";

interface JwtPayload {
  exp: number;
  iat: number;
  id: string;
  [key: string]: any;
}

interface TokenCheck {
  valid: boolean;
  expired: boolean;
  id?: string;
}

const isTokenValid = (token: string): TokenCheck => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log(decoded);
    const now = Date.now() / 1000;
    return {
      valid: decoded.exp > now,
      expired: decoded.exp <= now,
      id: decoded.id,
    };
  } catch (e) {
    return { valid: false, expired: false };
  }
};

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const [token] = useState(Cookies.get("authToken"));
  const authUser = useSelector((state: RootState) => state.auth.user);
  const { mutateAsync: fetchUser } = useFetchUser();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      // 1) No token at all → sign-in
      if (!token) {
        return router.replace(`/`);
      }

      // 2) Decode & check expiry
      const { valid, expired, id } = isTokenValid(token);
      if (!valid || expired || !id) {
        Cookies.remove("authToken");
        dispatch(logout());
        return router.replace(`/`);
      }

      // 4) Fetch & hydrate Redux if needed
      if (!authUser) {
        try {
          const { data } = await fetchUser();
          dispatch(setCredentials({ token, user: data.data }));
        } catch {
          Cookies.remove("authToken");
          dispatch(logout());
          router.replace(`/`);
        }
      }
    };

    init();
  }, [token, authUser, router, dispatch, fetchUser]);
};
