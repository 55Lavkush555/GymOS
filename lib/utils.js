import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate as formatIstDate } from "@/lib/date";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function formatDate(dateString) {
  return formatIstDate(dateString);
}

export function getInitials(name) {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
