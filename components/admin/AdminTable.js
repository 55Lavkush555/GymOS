"use client";

import { Button } from "@/components/ui/Button";
import { getInitials, formatLocalDate, getSubscriptionStatus } from "@/components/admin/adminUtils";
import { Pencil, Trash2 } from "lucide-react";

const statusMeta = {
  active: {
    label: "Active",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  expiring_soon: {
    label: "Expiring Soon",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
  expired: {
    label: "Expired",
    className: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
};

export function AdminTable({ rows, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary/80">
            <tr>
              {[
                "Owner Name",
                "Email",
                "Status",
                "Expiry Date",
                "Actions",
              ].map((heading) => (
                <th key={heading} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {rows.map((row) => {
              const status = getSubscriptionStatus(row.planEndDate);
              const meta = statusMeta[status];

              return (
                <tr key={row._id} className="transition-colors hover:bg-secondary/50">
                  <td className="px-5 py-4 text-sm text-secondary-foreground"><b>{row.name}</b></td>
                  <td className="px-5 py-4 text-sm text-secondary-foreground">{row.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${meta.className}`}>
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-secondary-foreground">{formatLocalDate(row.planEndDate)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => onEdit(row)}>
                        <Pencil size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button type="button" variant="danger" size="sm" onClick={() => onDelete(row)}>
                        <Trash2 size={14} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}