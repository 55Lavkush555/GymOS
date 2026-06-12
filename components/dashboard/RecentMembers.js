"use client"
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/date";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

const avatarColors = [
  "bg-indigo-500", "bg-purple-500", "bg-emerald-500", "bg-blue-500",
  "bg-pink-500", "bg-amber-500", "bg-teal-500", "bg-rose-500",
];

export function RecentMembers() {
  const { data } = useDashboard();

  const recent = data.fiveActiveMembers;

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--foreground)]">Recently Added</h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Latest member registrations</p>
        </div>
        <Link
          href="/members"
          className="flex items-center gap-1 text-xs font-medium text-[var(--primary)] hover:underline"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <div className="space-y-3">
        {recent.map((member, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}
            >
              {getInitials(member.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--foreground)] truncate">{member.name}</p>
              <p className="text-xs text-[var(--muted-foreground)]">Started {formatDate(member.startDate)}</p>
            </div>
            <Badge status={"active"} />
          </div>
        ))}
      </div>
    </div>
  );
}
