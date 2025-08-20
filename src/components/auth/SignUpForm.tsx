"use client";
import SwitchButton from "../SwitchButton";
import React, { useTransition } from "react";
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
import PasswordInput from "./PasswordInput";
import { Button } from "../ui/button";
import { useSignUp } from "@/lib/apiLibrary/queryHooks/auth";
import CustomLoader from "../CustomLoader";
import { useRouter } from "next/navigation";
import { SignUpProps } from "@/interfaces/onboarding";

const SignUpForm = ({ setShowForm }: { setShowForm: (c: boolean) => void }) => {
    const router = useRouter()
    const [isTransitioning, startTransition] = useTransition()
    const {mutateAsync: signUp, isPending: signUpPending} = useSignUp()
    const signUpFormSchema = z.object({
      email: z.email(),
      firstName: z.string().min(3, {message: "First name is required"}),
      lastName: z.string().min(3, {message: "Last name is required"}),
      phoneNumber: z.string().min(10, {message: "Phone number is required"}),
      password: z.string().min(6, {message: "Min: 6 Characters"}),
    })
  
    type signUpData = z.infer<typeof signUpFormSchema>;
  
    const form = useForm<signUpData>({
      resolver: zodResolver(signUpFormSchema),
      mode: "onChange",
      defaultValues: {
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
      }
    })
  
    async function onSubmit(values: signUpData) {
      console.log(values)
      const payload: SignUpProps = {
        fullName: values.firstName + values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password
     }
      const response = await signUp({payload})
      console.log(response)
      if(response.data.success) {
        startTransition(() => router.push('/'))
      }
    }
  return (
    <div className="flex flex-col gap-6">
      <SwitchButton switchAction={() => setShowForm(false)} />

      <div className="flex flex-col gap-8">
        <h4 className="header4">
          Save money in groups with family and friends.
        </h4>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="tel" placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                    <PasswordInput placeholder="Password" field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={(signUpPending || isTransitioning)}>
              {(signUpPending || isTransitioning) ? "Loading" : "Sign Up"}{" "}
              {(signUpPending || isTransitioning) && <CustomLoader />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
