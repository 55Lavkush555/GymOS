import { cn } from "@/lib/utils";

const variants = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  expiring_soon: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  expired: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  default: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
  primary: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};

const labels = {
  active: "Active",
  expiring_soon: "Expiring Soon",
  expired: "Expired",
};

export function Badge({ status, children, className }) {
  const variant = variants[status] || variants.default;
  const label = labels[status] || children;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
        variant,
        className
      )}
    >
      {label}
    </span>
  );
}
