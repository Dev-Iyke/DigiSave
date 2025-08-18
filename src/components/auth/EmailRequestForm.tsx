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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRequestEmail } from "@/lib/apiLibrary/queryHooks/auth";
import CustomLoader from "../CustomLoader";

const EmailRequestForm = ({
  nextStep,
  setUserEmail,
}: {
  nextStep?: (s: boolean) => void;
  setUserEmail: (s: string) => void;
}) => {
  const { mutateAsync: requestEmail, isPending: requestEmailPending } =
    useRequestEmail();
  const emailRequestFormSchema = z.object({
    email: z.email(),
  });

  type requestEmailData = z.infer<typeof emailRequestFormSchema>;

  const form = useForm<requestEmailData>({
    resolver: zodResolver(emailRequestFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: requestEmailData) {
    const response = await requestEmail(values.email);
    // console.log(response);
    // nextStep && nextStep(true);
    // setUserEmail && setUserEmail(values.email);
    if (response.data.success) {
      setUserEmail(values.email);
      if(nextStep !== undefined){
        nextStep(true);
      }
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="">
          <h1 className="header4">Password Recovery</h1>
          <p className="body-lg-reg">
            Enter your registered email below to receive password instructions
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

          <Button disabled={requestEmailPending}>
            {requestEmailPending ? "Loading" : "Send me email"}{" "}
            {requestEmailPending && <CustomLoader />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailRequestForm;
