import React, { useTransition } from "react";
import SignInForm from "./SignInForm";
import { useRouter } from "next/navigation";
import CustomLoader from "../CustomLoader";
import BackButton from "../BackButton";

const SignInPageComponent = () => {
  const router = useRouter()
    const [isTransitioning, startTransition] = useTransition()
  return (
    <div className="flex flex-col justify-between gap-8 min-h-[85vh] relative">
      <div className="flex flex-col gap-8">
        <BackButton
          isTransitioning={isTransitioning}
          route={"/signup"}
          startTransition={startTransition}
        />
        <div className="">
          <h1 className="header4">Hi There 👋</h1>
          <p className="body-lg-reg">Welcome back, Sign in to your account</p>
        </div>
        <SignInForm />
      </div>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="body-lg-reg">Don&apos;t have an account? </span>
        <span
          onClick={() => startTransition(() => router.push("/signup"))}
          className="flex justify-end items-center gap-2 body-lg-bold hover:underline cursor-pointer"
        >
          {" "}
          Sign Up {isTransitioning && <CustomLoader color="gray" />}
        </span>
      </div>
    </div>
  );
};

export default SignInPageComponent;
