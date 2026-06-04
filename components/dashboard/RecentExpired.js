import { members } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getInitials } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const avatarColors = [
  "bg-red-400", "bg-orange-400", "bg-amber-400", "bg-rose-400", "bg-pink-400",
];

export function RecentExpired() {
  const expired = members
    .filter((m) => m.status === "expired" || m.status === "expiring_soon")
    .sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate))
    .slice(0, 5);

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--foreground)]">Expired & Expiring</h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Members needing attention</p>
        </div>
        <AlertCircle size={16} className="text-amber-500" />
      </div>
      {expired.length === 0 ? (
        <div className="py-8 text-center text-sm text-[var(--muted-foreground)]">
          No expired or expiring memberships
        </div>
      ) : (
        <div className="space-y-3">
          {expired.map((member, i) => (
            <div key={member.id} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {getInitials(member.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">{member.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Expired {formatDate(member.expiryDate)}
                </p>
              </div>
              <Badge status={member.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
