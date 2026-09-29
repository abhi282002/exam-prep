import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...remainingProperties }, forwardedReference) => (
  <div
    ref={forwardedReference}
    className={cn(
      "rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-sm",
      className
    )}
    {...remainingProperties}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...remainingProperties }, forwardedReference) => (
  <div
    ref={forwardedReference}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...remainingProperties}
  />
));
CardHeader.displayName = "CardHeader";
