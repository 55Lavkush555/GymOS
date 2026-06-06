import { cn } from "@/lib/utils";

export function StatCard({ title, value, subtitle, icon: Icon, trend, trendLabel, color = "primary", className }) {
  const colorMap = {
    primary: { bg: "bg-indigo-50 dark:bg-indigo-900/20", icon: "text-indigo-600 dark:text-indigo-400" },
    success: { bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: "text-emerald-600 dark:text-emerald-400" },
    warning: { bg: "bg-amber-50 dark:bg-amber-900/20", icon: "text-amber-600 dark:text-amber-400" },
    danger: { bg: "bg-red-50 dark:bg-red-900/20", icon: "text-red-600 dark:text-red-400" },
  };
  const colors = colorMap[color] || colorMap.primary;

  return (
    <div
      className={cn(
        "bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-[var(--muted-foreground)] leading-tight">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mt-1 tabular-nums leading-none">{value}</p>
          
        </div>
        {Icon && (
          <div className={cn("w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0", colors.bg)}>
            <Icon size={18} className={cn("sm:hidden", colors.icon)} />
            <Icon size={20} className={cn("hidden sm:block", colors.icon)} />
          </div>
        )}
      </div>
    </div>
  );
}
