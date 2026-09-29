import * as React from "react";
import { cn } from "@/lib/utils";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...remainingProperties }, forwardedReference) => (
  <h3
    ref={forwardedReference}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...remainingProperties}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...remainingProperties }, forwardedReference) => (
  <p
    ref={forwardedReference}
    className={cn("text-sm text-neutral-500", className)}
    {...remainingProperties}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...remainingProperties }, forwardedReference) => (
  <div
    ref={forwardedReference}
    className={cn("p-6 pt-0", className)}
    {...remainingProperties}
  />
));
CardContent.displayName = "CardContent";
