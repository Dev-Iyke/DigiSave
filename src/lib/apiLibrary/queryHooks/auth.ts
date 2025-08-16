import { useMutation } from "@tanstack/react-query";
import { axiosInstance, CustomAxiosRequestConfig } from "..";
import { SignInProps } from "@/interfaces/onboarding";

export function useSignIn() {
  return useMutation({
    mutationFn: ({payload}: {payload: SignInProps}) => {
      return axiosInstance.post(`/users/login`, payload, {noAuth: true, noToast: false} as CustomAxiosRequestConfig);
    },
  })
}