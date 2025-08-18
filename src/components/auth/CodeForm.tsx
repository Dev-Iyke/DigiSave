import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "../ui/button";
import {
  useCodeVerification,
  useRequestEmail,
} from "@/lib/apiLibrary/queryHooks/auth";
import CustomLoader from "../CustomLoader";

const CodeForm = ({
  nextStep,
  userEmail,
}: {
  nextStep?: (s: boolean) => void;
  userEmail: string;
}) => {
  const { mutateAsync: codeVerification, isPending: codeVerificationPending } =
    useCodeVerification();
  const { mutateAsync: requestEmail, isPending: requestEmailPending } =
    useRequestEmail();
  const codeFormSchema = z.object({
    code: z.string().min(4, {
      message: "Your one-time password must be 4 characters.",
    }),
  });

  type codeVerificationData = z.infer<typeof codeFormSchema>;

  const form = useForm<codeVerificationData>({
    resolver: zodResolver(codeFormSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const handleResendEmail = async () => {
    const response = await requestEmail(userEmail);
    console.log(response);
    //TODO: Set timer for resend button
  };

  async function onSubmit(values: codeVerificationData) {
    const response = await codeVerification({ ...values });
    // console.log(response);
    // nextStep && nextStep(true);
    if (response.data.success) {
      if (nextStep !== undefined) {
        nextStep(true);
      }
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="">
          <h1 className="header4">Verify it&apos;s you</h1>
          <p className="body-lg-reg">
            We send a code to <strong>{userEmail}</strong>. Enter it here to
            verify your identity
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
            name="code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS}
                    className="w-full"
                  >
                    <div className="w-full flex justify-around">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </div>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center items-center gap-1 mb-4">
            <Button
              disabled={requestEmailPending}
              variant={"link"}
              onClick={handleResendEmail}
              className="flex justify-center items-center gap-2 body-lg-bold hover:underline cursor-pointer"
            >
              {" "}
              Resend {requestEmailPending && <CustomLoader color="gray" />}
            </Button>
          </div>

          <Button disabled={codeVerificationPending}>
            {codeVerificationPending ? "Loading" : "Send me code"}{" "}
            {codeVerificationPending && <CustomLoader />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CodeForm;
