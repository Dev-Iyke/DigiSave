import React from "react";
import SignInForm from "./SignInForm";

const SignInPageComponent = () => {
  return (
    <div className="flex flex-col justify-between gap-8 min-h-[95vh] relative">
      <div className="flex flex-col gap-8">
        <div className="header4">
          <h1 className="header4">Hi There 👋</h1>
          <p className="body-lg-reg">Welcome back, Sign in to your account</p>
        </div>
        <SignInForm />
      </div>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="body-lg-reg">Don&apos;t have an account? </span>
        <span className="body-lg-bold hover:underline cursor-pointer">
          {" "}
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default SignInPageComponent;
