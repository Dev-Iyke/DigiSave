import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "../ui/input";

interface PasswordInputProps {
  field: any;
  placeholder?: string;
  className?: string;
}

export default function PasswordInput({
  field,
  placeholder,
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        placeholder={placeholder ? placeholder : "Enter Password"}
        type={showPassword ? "text" : "password"}
        {...field}
        value={field.value || ""}
        className={`w-full ${className}`}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-600 cursor-pointer"
      >
        {showPassword ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
