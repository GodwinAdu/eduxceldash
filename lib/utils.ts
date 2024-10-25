import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getCurrentMonthRange = () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0); // Last day of the month
  endOfMonth.setHours(23, 59, 59, 999);

  return { startOfMonth, endOfMonth };
};

// utils/getFormattedDate.ts
export const getFormattedMonthYear = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString(undefined, options); // e.g., "October, 2024"
};
