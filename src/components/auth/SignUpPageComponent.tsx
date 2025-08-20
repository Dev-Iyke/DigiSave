"use client";
import React, { useState, useTransition } from "react";
import SignUpForm from "./SignUpForm";
import { Button } from "../ui/button";
import BackButton from "../BackButton";

const SignUpPageComponent = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isTransitioning, startTransition] = useTransition()
  return (
    <div className="flex flex-col gap-6">
      {!showForm && <BackButton
        isTransitioning={isTransitioning}
        route={"/"}
        startTransition={startTransition}
      />}
      {!showForm ? (
        <div className="flex flex-col h-full min-h-screen justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-6 text-center max-w-[287px]">
            <h4 className="header4">
              Save money in groups with family and friends.
            </h4>
            <p className="body-med-reg">
              Save money in groups and collect in turns. This helps achieve your
              fInancial goals quicker.
            </p>
            <Button className="mt-20" onClick={() => setShowForm(true)}>
              Get Started
            </Button>
          </div>
        </div>
      ) : (
        <SignUpForm setShowForm={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default SignUpPageComponent;
