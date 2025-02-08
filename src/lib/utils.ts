import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  console.log("type", typeof date);
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
};
