"use client";

import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export function DeleteConfirmModal({ open, gym, onClose, onConfirm }) {
    if (!open || !gym) {
        return null;
    }

    const handleDelete = async (_id) => {
        let res = await fetch(`/api/admin/delete/${_id}`);

        if (res.ok) {
            toast.success("Gym deleted successfully");
            onClose();
        }
        else {
            toast.error("Error deleting gym");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl">
                <div className="border-b border-border px-6 py-4">
                    <h2 className="text-lg font-semibold text-foreground">Delete gym owner</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        This will remove {gym.name} from the admin list.
                    </p>
                </div>

                <div className="space-y-6 px-6 py-6">
                    <div className="rounded-2xl border border-dashed border-border bg-secondary/60 p-4 text-sm text-secondary-foreground">
                        Confirm that you want to delete this owner record. This action only affects the local mock data.
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="danger"
                            onClick={() => {
                                handleDelete(gym._id);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}