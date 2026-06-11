"use client";

import { useEffect, useMemo, useState } from "react";
import { Shield, Users, Activity, Crown } from "lucide-react";
import { AdminTable } from "@/components/admin/AdminTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { FilterButtons } from "@/components/admin/FilterButtons";
import { Pagination } from "@/components/admin/Pagination";
import { EditModal } from "@/components/admin/EditModal";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { getSubscriptionStatus } from "@/components/admin/adminUtils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const rowsPerPage = 6;

export function AdminPanel() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRow, setEditingRow] = useState(null);
    const [deleteRow, setDeleteRow] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user, isLoaded } = useUser();
    const router = useRouter();

    const filteredRows = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return rows.filter((row) => {
            const status = getSubscriptionStatus(row.planEndDate);
            const searchableText = [row.name, row.email].join(" ").toLowerCase();
            const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
            const matchesFilter = activeFilter === "all" || status === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [rows, searchTerm, activeFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));

    useEffect(() => {
        if (!isLoaded) return;

        const checkAdmin = async () => {

            if (!user) {
                router.push("/");
            }

            if (user?.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
                router.push("/dashboard");
            }
        }
        checkAdmin()
    }, [isLoaded, user]);

    useEffect(() => {
      const loadData = async () => {
          let data = await fetch("/api/admin/get-gyms").then((res) => res.json());

          if (data.success) {
              setRows(data.gyms);
              setLoading(false);
          }

          if (!data.success) {
              toast.error(data.message);
              setLoading(false);
          }
      }
      loadData();
    }, [])
    


    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeFilter]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedRows = filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const stats = useMemo(() => {
        const counters = {
            all: rows.length,
            active: 0,
            expiring_soon: 0,
            expired: 0,
        };

        rows.forEach((row) => {
            const status = getSubscriptionStatus(row.planEndDate);
            counters[status] += 1;
        });

        return counters;
    }, [rows]);

    const handleSave = (updatedRow) => {
        setRows((currentRows) =>
            currentRows.map((row) => (row._id === updatedRow._id ? updatedRow : row))
        );
        setEditingRow(null);
    };

    const handleDelete = (rowToDelete) => {
        setRows((currentRows) => currentRows.filter((row) => row._id !== rowToDelete._id));
        setDeleteRow(null);
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.10),transparent_35%),linear-gradient(180deg,var(--background)_0%,var(--background)_100%)]">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <section className="overflow-hidden rounded-4xl border border-border bg-card shadow-sm">
                        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                    <Shield size={12} />
                                    Admin Panel
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                        Gym owners and subscriptions
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                                        Manage gym owners with local mock data, filter by status, search quickly, and update records in a clean SaaS dashboard layout.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 lg:w-130">
                                <StatCard label="Total gyms" value={stats.all} icon={Users} />
                                <StatCard label="Active" value={stats.active} icon={Activity} />
                                <StatCard label="Expiring soon" value={stats.expiring_soon} icon={Crown} />
                                <StatCard label="Expired" value={stats.expired} icon={Shield} />
                            </div>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-4xl border border-border bg-card shadow-sm">
                        <div className="space-y-5 p-6 sm:p-8">
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground">Gym Owners Table</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {filteredRows.length} matching gyms · Page {currentPage} of {totalPages}
                                    </p>
                                </div>

                                <div className="w-full xl:max-w-3xl">
                                    <SearchBar
                                        value={searchTerm}
                                        onChange={setSearchTerm}
                                        onSearch={() => setCurrentPage(1)}
                                        onClear={() => setSearchTerm("")}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <FilterButtons value={activeFilter} onChange={setActiveFilter} />
                                <div className="rounded-2xl border border-border bg-secondary/60 px-4 py-3 text-sm text-secondary-foreground">
                                    Current view shows {paginatedRows.length} gym owners on this page.
                                </div>
                            </div>

                            {paginatedRows.length === 0 ? (
                                <div className="rounded-3xl border border-dashed border-border bg-secondary/40 px-6 py-14 text-center">
                                    <p className="text-base font-semibold text-foreground">No gyms found</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Try another search term or change the subscription filter.
                                    </p>
                                </div>
                            ) : (
                                <AdminTable rows={paginatedRows} onEdit={setEditingRow} onDelete={setDeleteRow} />
                            )}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={filteredRows.length === 0 ? 0 : totalPages}
                            totalItems={filteredRows.length}
                            pageSize={rowsPerPage}
                            onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                        />
                    </section>
                </div>
            </div>

            <EditModal
                open={!!editingRow}
                gym={editingRow}
                onClose={() => setEditingRow(null)}
                onSave={handleSave}
            />

            <DeleteConfirmModal
                open={!!deleteRow}
                gym={deleteRow}
                onClose={() => setDeleteRow(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}

function StatCard({ label, value, icon: Icon }) {
    return (
        <div className="rounded-2xl border border-border bg-secondary/60 p-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={18} />
                </div>
            </div>
        </div>
    );
}