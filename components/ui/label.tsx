import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProperties
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProperties>(
  ({ className, ...remainingProperties }, forwardedReference) => {
    return (
      <label
        ref={forwardedReference}
        className={cn(
          "text-xs font-semibold text-neutral-700 select-none leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...remainingProperties}
      />
    );
  }
);
Label.displayName = "Label";
