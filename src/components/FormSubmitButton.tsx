"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({
  children,
  className,
  ...props
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <span className="loading loading-spinner text-secondary" />
      ) : (
        children
      )}
    </button>
  );
};

export default FormSubmitButton;
