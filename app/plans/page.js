"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PlanCard } from "@/components/plans/PlanCard";
import { PlanModal } from "@/components/plans/PlanModal";
import { plans as initialPlans } from "@/lib/mockData";
import { Plus } from "lucide-react";

export default function PlansPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const handleSave = (plan) => {
    if (editPlan) {
      setPlans((prev) => prev.map((p) => (p.id === plan.id ? plan : p)));
    } else {
      setPlans((prev) => [...prev, plan]);
    }
    setEditPlan(null);
  };

  const handleEdit = (plan) => {
    setEditPlan(plan);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--muted-foreground)]">
            {plans.length} plan{plans.length !== 1 ? "s" : ""} available
          </p>
          <button
            onClick={() => { setEditPlan(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors shadow-sm"
          >
            <Plus size={15} />
            Create Plan
          </button>
        </div>

        {plans.length === 0 ? (
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-12 sm:p-16 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
              <Plus size={24} className="text-[var(--muted-foreground)]" />
            </div>
            <p className="font-medium text-[var(--foreground)] mb-1">No membership plans yet</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">Create your first plan to get started</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              <Plus size={15} />
              Create Plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <PlanModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditPlan(null); }}
        onSave={handleSave}
        editPlan={editPlan}
      />
    </DashboardLayout>
  );
}
