import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classInputs: ClassValue[]): string {
  return twMerge(clsx(classInputs));
}
