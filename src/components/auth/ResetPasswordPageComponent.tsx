'use client'
import React, { useState, useTransition } from "react";
import EmailRequestForm from "./EmailRequestForm";
import CodeForm from "./CodeForm";
import BackButton from "../BackButton";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordPageComponent = () => {
  const [showCodeForm, setShowCodeForm] = useState<boolean>(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] =
    useState<boolean>(false);
  const [userEmail, setUserEmail] = useState('')
  const [isTransitioning, startTransition] = useTransition()
  return (
    <div className="flex flex-col gap-8">
      <BackButton
        isTransitioning={isTransitioning}
        route={"/signup"}
        startTransition={startTransition}
      />
      {!showCodeForm && !showPasswordChangeForm ? (
        <EmailRequestForm
          setUserEmail={setUserEmail}
          nextStep={setShowCodeForm}
        />
      ) : showCodeForm && !showPasswordChangeForm ? (
        <CodeForm userEmail={userEmail} nextStep={setShowPasswordChangeForm} />
      ) : (
        <ResetPasswordForm />
      )}
    </div>
  );
};

export default ResetPasswordPageComponent;
