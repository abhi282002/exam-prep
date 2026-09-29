import * as React from "react";

export interface IconProperties extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}
