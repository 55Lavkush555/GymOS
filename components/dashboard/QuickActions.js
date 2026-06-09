"use client";

import Link from "next/link";
import { useState } from "react";
import { UserPlus, CreditCard, Users, BarChart3 } from "lucide-react";
import { AddMemberModal } from "@/components/members/AddMemberModal";

export function QuickActions() {
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 shadow-sm">
      <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => setMemberModalOpen(true)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors shadow-sm"
        >
          <UserPlus size={15} />
          <span className="hidden xs:inline sm:inline">Add Member</span>
          <span className="xs:hidden sm:hidden">Add</span>
        </button>
        <Link
          href="/members"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] text-sm font-medium hover:bg-[var(--accent)] transition-colors"
        >
          <Users size={15} />
          <span>Members</span>
        </Link>
        <Link
          href="/analytics"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] text-sm font-medium hover:bg-[var(--accent)] transition-colors"
        >
          <BarChart3 size={15} />
          <span>Analytics</span>
        </Link>
      </div>

      <AddMemberModal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        onAdd={() => {}}
      />
    </div>
  );
}
