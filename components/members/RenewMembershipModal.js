"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatDate, formatDateForInput } from "@/lib/date";
import { toast } from "sonner";

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

export function RenewMembershipModal({
  isOpen,
  onClose,
  member,
  onSaved = () => {},
}) {
  const [form, setForm] = useState({ startDate: "", expiryDate: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!member) {
      setForm({ startDate: "", expiryDate: "" });
      setError("");
      setSaving(false);
      return;
    }

    setForm({
      startDate: formatDateForInput(member.startDate),
      expiryDate: formatDateForInput(member.expiryDate),
    });
    setError("");
    setSaving(false);
  }, [member, isOpen]);

  const invalidRange = useMemo(() => {
    if (!form.startDate || !form.expiryDate) {
      return false;
    }

    return form.startDate > form.expiryDate;
  }, [form.startDate, form.expiryDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!member) {
      return;
    }

    if (!form.startDate || !form.expiryDate) {
      setError("Both membership dates are required.");
      return;
    }

    if (invalidRange) {
      setError("Membership end date must be on or after the start date.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`/api/members/edit/${member._id}`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: form.startDate,
          expiryDate: form.expiryDate,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error renewing membership");
      }

      toast.success("Membership renewed successfully");
      await onSaved();
      onClose();
    } catch (err) {
      const message = err?.message || "Error renewing membership";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (saving) return;
        setError("");
        onClose();
      }}
      title="Renew Membership"
      size="lg"
    >
      {member ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Selected Member</p>
            <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">{member.name}</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Current dates: {formatDate(member.startDate)} to {formatDate(member.expiryDate)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Membership Start Date" required>
              <input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </FormField>

            <FormField label="Membership End Date" required>
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

          {error ? (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          ) : invalidRange ? (
            <p className="text-sm text-red-500" role="alert">
              Membership end date must be on or after the start date.
            </p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (saving) return;
                setError("");
                onClose();
              }}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
              disabled={saving || invalidRange}
            >
              {saving ? "Saving..." : "Renew Membership"}
            </Button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-[var(--muted-foreground)]">No member selected.</p>
      )}
    </Modal>
  );
}