import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProperties
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  className,
  orientation = "horizontal",
  ...remainingProperties
}: SeparatorProperties) {
  return (
    <div
      role="separator"
      className={cn(
        "shrink-0 bg-neutral-200",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...remainingProperties}
    />
  );
}
