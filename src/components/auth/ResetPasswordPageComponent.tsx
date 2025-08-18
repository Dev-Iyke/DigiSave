'use client'
import React, { useState } from "react";

const ResetPasswordPageComponent = () => {
  const [showCodeForm, setShowCodeForm] = useState<boolean>(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] =
    useState<boolean>(false);
  return (
    <div>
      {!showCodeForm && !showPasswordChangeForm ? (
        <>email form</>
      ) : showCodeForm && !showPasswordChangeForm ? (
        <>code form</>
      ) : (
        <>password form</>
      )}
    </div>
  );
};

export default ResetPasswordPageComponent;
