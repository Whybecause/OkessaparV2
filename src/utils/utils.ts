import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateShort = (date: Date | string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const formatDate = (date: Date | string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};




