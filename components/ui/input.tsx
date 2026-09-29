import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProperties
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProperties>(
  ({ className, type = "text", ...remainingProperties }, forwardedReference) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={forwardedReference}
        {...remainingProperties}
      />
    );
  }
);
Input.displayName = "Input";
