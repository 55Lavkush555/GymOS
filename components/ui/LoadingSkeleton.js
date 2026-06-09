import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-md", className)} />;
}

export function StatCardSkeleton() {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 max-[407px]:px-0.5 overflow-hidden sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-7 w-14" />
          <Skeleton className="h-3 w-24 mt-1" />
        </div>
        <Skeleton className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl shrink-0" />
      </div>
    </div>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
    </div>
  );
}

export function ChartSkeleton({ height = 220 }) {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <div className="mb-4 space-y-1.5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div style={{ height }} className="flex items-end gap-2 pt-4">
        {[60, 75, 50, 85, 65, 90, 70, 80, 55, 95, 72, 88].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <Skeleton className="w-full rounded-t-sm" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 8 }) {
  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--secondary)] flex gap-4">
        {[40, 15, 18, 15, 12].map((w, i) => (
          <Skeleton key={i} className="h-3.5" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="divide-y divide-[var(--border)]">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="px-4 py-3.5 flex items-center gap-4">
            <div className="flex items-center gap-3 w-[40%]">
              <Skeleton className="w-8 h-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>
            <Skeleton className="h-3.5 flex-1" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3.5 flex-1 hidden sm:block" />
            <Skeleton className="h-3.5 flex-1 hidden sm:block" />
            <Skeleton className="h-5 w-16 rounded-full hidden md:block" />
            <div className="flex gap-1 ml-auto">
              <Skeleton className="w-7 h-7 rounded-lg" />
              <Skeleton className="w-7 h-7 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
