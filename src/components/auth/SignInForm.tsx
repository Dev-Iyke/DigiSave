import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import PasswordInput from "./PasswordInput";
import { Button } from "../ui/button";
import { useFetchUser, useSignIn } from "@/lib/apiLibrary/queryHooks/auth";
import CustomLoader from "../CustomLoader";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { setCredentials } from "@/store/slices/authSlice";

// interface CustomJwtPayload {
//   email: string;
//   role: string;
//   id: string;
// }

const SignInForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isTransitioning, startTransition] = useTransition();
  const { mutateAsync: signIn, isPending: signInPending } = useSignIn();
  const { mutateAsync: getUser, isPending: getUserPending } = useFetchUser();
  const signInFormSchema = z.object({
    email: z.email(),
    password: z.string().min(6, { message: "Min: 6 Characters" }),
  });

  type signInData = z.infer<typeof signInFormSchema>;

  const form = useForm<signInData>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: signInData) {
    const response = await signIn({ payload: values });
    if (response.data.success && response.data.data.token) {
      const token = response.data.data.token;
      // Store token in cookies
      Cookies.set("authToken", token);

      startTransition(() => router.push("/dashboard"));

      form.reset();
      const userResponse = await getUser();
      console.log(userResponse);
      const user = userResponse.data.data;
      // Store in Redux
      dispatch(setCredentials({ token, user }));
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="e.g you@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          onClick={() => startTransition(() => router.push("/reset-password"))}
          className="flex justify-end items-center gap-2 font-bold text-sm text-gray-600 cursor-pointer hover:underline"
        >
          Forgot Password? {isTransitioning && <CustomLoader color="gray" />}
        </div>

        <Button disabled={(signInPending || getUserPending)}>
          {(signInPending || getUserPending) ? "Loading" : "Sign in"}{" "}
          {(signInPending || getUserPending) && <CustomLoader />}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
