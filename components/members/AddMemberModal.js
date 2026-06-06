"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

const defaultForm = {
  name: "",
  phone: "",
  email: "",
  age: "",
  gender: "",
  address: "",
  plan: "",
  startDate: new Date().toISOString().split("T")[0],
  expiryDate: "",
  notes: "",
};

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

const formatDateForInput = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : "";
};

const inputCls =
  "w-full h-9 px-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-colors";

export function AddMemberModal({ isOpen, onClose, editMember, handlePageChange }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editMember) {
      setForm({
        ...editMember,
        startDate: formatDateForInput(editMember.startDate),
        expiryDate: formatDateForInput(editMember.expiryDate),
      });
    } else {
      setForm(defaultForm);
    }
  }, [editMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMember) {
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }

      let bodyContent = JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        age: form.age,
        gender: form.gender,
        address: form.address,
        plan: form.plan,
        startDate: form.startDate,
        expiryDate: form.expiryDate,
        notes: form.notes,
      });

      let response = await fetch(`/api/members/edit/${editMember._id}`, {
        method: "PUT",
        body: bodyContent,
        headers: headersList
      });

    }
    else {
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }

      let bodyContent = JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        age: form.age,
        gender: form.gender,
        address: form.address,
        plan: form.plan,
        startDate: form.startDate,
        expiryDate: form.expiryDate,
        notes: form.notes
      });

      let response = await fetch("/api/members/add", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
    }

    handlePageChange();

    setForm(defaultForm);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { setForm(defaultForm); onClose(); }}
      title={editMember ? "Edit Member" : "Add New Member"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="John Smith"
              className={inputCls}
            />
          </FormField>

          <FormField label="Phone Number" required>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="555-0100"
              className={inputCls}
            />
          </FormField>

          <FormField label="Email Address" required>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputCls}
              required
            />
          </FormField>

          <FormField label="Age">
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              placeholder="25"
              min="1"
              max="120"
              className={inputCls}
            />
          </FormField>

          <FormField label="Gender">
            <select name="gender" value={form.gender} onChange={handleChange} className={inputCls}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </FormField>

          <FormField label="Start Date" required>
            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </FormField>

          <FormField label="Expiry Date" required>
            <input
              name="expiryDate"
              type="date"
              value={form.expiryDate}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </FormField>
        </div>

        <FormField label="Address">
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main St, City"
            className={inputCls}
          />
        </FormField>

        <FormField label="Notes">
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional notes..."
            className={`${inputCls} h-auto py-2 resize-none`}
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => { setForm(defaultForm); onClose(); }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
          >
            {editMember ? "Save Changes" : "Add Member"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
