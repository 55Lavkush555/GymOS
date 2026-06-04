import { Edit2, Trash2, Users, Clock, DollarSign } from "lucide-react";
import { members } from "@/lib/mockData";

const colorMap = {
  "bg-blue-500": { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
  "bg-emerald-500": { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  "bg-indigo-500": { bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-400", dot: "bg-indigo-500" },
  "bg-purple-500": { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", dot: "bg-purple-500" },
  "bg-amber-500": { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
};

export function PlanCard({ plan, onEdit, onDelete }) {
  const colors = colorMap[plan.color] || colorMap["bg-indigo-500"];
  const memberCount = members.filter((m) => m.plan === plan.name).length;

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
            <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--foreground)]">{plan.name}</h3>
            <p className="text-xs text-[var(--muted-foreground)]">{plan.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(plan)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-bold ${colors.text}`}>${plan.price}</span>
          <span className="text-xs text-[var(--muted-foreground)]">/ {plan.duration.toLowerCase()}</span>
        </div>
      </div>

      {plan.description && (
        <p className="text-sm text-[var(--secondary-foreground)] mb-4 leading-relaxed">{plan.description}</p>
      )}

      <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <Users size={12} />
          <span>{memberCount} members</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <Clock size={12} />
          <span>{plan.duration}</span>
        </div>
      </div>
    </div>
  );
}
