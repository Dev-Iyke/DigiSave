import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from '../ui/input';
import PasswordInput from './PasswordInput';
import { Button } from '../ui/button';
import { useSignIn } from '@/lib/apiLibrary/queryHooks/auth';
import CustomLoader from '../CustomLoader';

const SignInForm = () => {
  const {mutateAsync: signIn, isPending: signInPending} = useSignIn()
  const signInFormSchema = z.object({
    email: z.email(),
    password: z.string().min(6, {message: "Min: 6 Characters"})
  })

  type signInData = z.infer<typeof signInFormSchema>;

  const form = useForm<signInData>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(values: signInData) {
    console.log(values)
    const response = await signIn({payload: values})
    console.log(response)
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
              {/* <FormLabel>Title</FormLabel> */}
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
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="font-bold text-sm text-gray-600 text-end cursor-pointer hover:underline">
          Forgot Password?
        </p>

        <Button disabled={signInPending}>
          {signInPending ? "Loading" : "Sign in"}{" "}
          {signInPending && <CustomLoader />}
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm