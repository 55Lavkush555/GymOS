"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

const planOptions = ["Monthly", "6 Months", "Annual"];

export function EditModal({ open, gym, onClose, onSave }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        planEndDate: "",
    });

    useEffect(() => {
        if (!gym) {
            return;
        }

        setForm({
            name: gym.name || "",
            email: gym.email || "",
            planEndDate: gym.planEndDate || "",
        });
    }, [gym]);

    if (!open) {
        return null;
    }

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const submitForm = async (event) => {
        event.preventDefault();
        await onSave(gym._id, form)

        let bodyContent = JSON.stringify({
            "_id": gym._id,
            "planEndDate": form.planEndDate
        });

        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let res = await fetch(`/api/admin/edit`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        if (res.ok) {
            toast.success("Gym updated successfully");
            onClose();
        }
        else {
            toast.error("Error updating gym");
            console.log(res.json(), bodyContent);
        }

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-border bg-card shadow-2xl">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Edit gym owner</h2>
                        <p className="text-sm text-muted-foreground">Update subscription details and owner information.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        type="button"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>

                <form className="space-y-5 px-6 py-6" onSubmit={submitForm}>
                    <div className="grid gap-4 sm:grid-cols-2">


                        <label className="space-y-2">
                            <span className="text-sm font-medium text-foreground">Owner name</span>
                            <input
                                value={form.name}
                                onChange={(event) => updateField("name", event.target.value)}
                                className="h-11 w-full rounded-xl border border-border bg-secondary px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="text-sm font-medium text-foreground">Email</span>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(event) => updateField("email", event.target.value)}
                                className="h-11 w-full rounded-xl border border-border bg-secondary px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </label>
                    </div>

                    <label className="block space-y-2">
                        <span className="text-sm font-medium text-foreground">Expiry date</span>
                        <input
                            type="date"
                            value={form.planEndDate}
                            onChange={(event) => updateField("planEndDate", event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-secondary px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </label>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}