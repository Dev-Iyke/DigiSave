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
import PasswordInput from "./PasswordInput";
import { Button } from "../ui/button";
import { useCreateNewPassword } from "@/lib/apiLibrary/queryHooks/auth";
import CustomLoader from "../CustomLoader";
import { useRouter } from "next/navigation";
import { CreateNewPasswordProps } from "@/interfaces/onboarding";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [isTransitioning, startTransition] = useTransition();
  const {
    mutateAsync: createNewPassword,
    isPending: createNewPasswordPending,
  } = useCreateNewPassword();

  const resetPasswordFormSchema = z
    .object({
      newPassword: z.string(),
      confirmPassword: z.string().min(6, { message: "Min: 6 Characters" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  type createNewPasswordData = z.infer<typeof resetPasswordFormSchema>;

  const form = useForm<createNewPasswordData>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: createNewPasswordData) {
    const payload: CreateNewPasswordProps = {
      newPassword: values.newPassword,
    };
    const response = await createNewPassword({ payload });
    if (response.data.success) {
      startTransition(() => router.push("/"));
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="">
          <h1 className="header4">Create New Password</h1>
          <p className="body-lg-reg">
            Please, enter a new password below different from the previous
            password
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="Enter new password"
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput placeholder="Confirm password" field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={createNewPasswordPending || isTransitioning}>
            {createNewPasswordPending || isTransitioning
              ? "Loading"
              : "Create new password"}{" "}
            {createNewPasswordPending || (isTransitioning && <CustomLoader />)}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
