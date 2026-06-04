"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

const defaultForm = {
  name: "",
  duration: "",
  price: "",
  description: "",
};

const inputCls =
  "w-full h-9 px-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-colors";

function FormField({ label, children, required }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--foreground)] mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export function PlanModal({ isOpen, onClose, onSave, editPlan }) {
  const [form, setForm] = useState(editPlan || defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const colors = ["bg-indigo-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-blue-500"];
    onSave({
      ...form,
      price: parseFloat(form.price),
      id: editPlan?.id || `p${Date.now()}`,
      color: editPlan?.color || colors[Math.floor(Math.random() * colors.length)],
    });
    setForm(defaultForm);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { setForm(defaultForm); onClose(); }}
      title={editPlan ? "Edit Plan" : "Create Membership Plan"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Plan Name" required>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Monthly Basic"
            className={inputCls}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Duration" required>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              required
              placeholder="e.g. 1 Month"
              className={inputCls}
            />
          </FormField>

          <FormField label="Price ($)" required>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="60"
              min="0"
              step="0.01"
              className={inputCls}
            />
          </FormField>
        </div>

        <FormField label="Description">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="What's included in this plan..."
            className={`${inputCls} h-auto py-2 resize-none`}
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => { setForm(defaultForm); onClose(); }}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]">
            {editPlan ? "Save Changes" : "Create Plan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
