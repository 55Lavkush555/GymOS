"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";
import { AddMemberModal } from "./AddMemberModal";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { formatDate, getInitials } from "@/lib/utils";
import { Edit2, Trash2, Users, ChevronLeft, ChevronRight, UserPlus, Search, Download } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "../ui/ConfirmDialog";

const avatarColors = [
  "bg-indigo-500", "bg-purple-500", "bg-emerald-500", "bg-blue-500",
  "bg-pink-500", "bg-amber-500", "bg-teal-500", "bg-rose-500", "bg-cyan-500", "bg-orange-500",
];

const PAGE_SIZE = 10;

function EmptyState({ hasFilters, onReset, onAdd }) {
  return (
    <tr>
      <td colSpan={7}>
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)] flex items-center justify-center mb-4">
            {hasFilters ? (
              <Search size={22} className="text-[var(--muted-foreground)]" />
            ) : (
              <Users size={22} className="text-[var(--muted-foreground)]" />
            )}
          </div>
          <p className="text-sm font-semibold text-[var(--foreground)] mb-1">
            {hasFilters ? "No members match your search" : "No members yet"}
          </p>
          <p className="text-xs text-[var(--muted-foreground)] max-w-xs mb-4">
            {hasFilters
              ? "Try a different name, phone number, or status filter."
              : "Add your first member to get started tracking memberships."}
          </p>
          {hasFilters ? (
            <button
              onClick={onReset}
              className="text-xs font-medium text-[var(--primary)] hover:underline"
            >
              Clear filters
            </button>
          ) : (
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              <UserPlus size={13} />
              Add First Member
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export function MembersTable() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1)
  const [totalMembers, setTotalMembers] = useState(0)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members/get");
        const data = await response.json();

        if (!data.success) {
          toast.error(data.message);
          setLoading(false);
          return;
        }

        setMembers(data.members);
        setTotalPages(data.totalPages);
        setTotalMembers(data.totalMembers);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching members");
        setLoading(false);
      }
    };
    fetchMembers();

  }, []);

  const handlePageChange = async (newPage, filter = statusFilter, searchValue = search) => {
    setLoading(true);
    const response = await fetch(`/api/members/get?page=${newPage}&filter=${filter}&search=${searchValue}`);
    const data = await response.json();

    if (!data.success) {
      toast.error(data.message);
      setLoading(false);
      return;
    }

    setMembers(data.members);
    setTotalPages(data.totalPages);
    setTotalMembers(data.totalMembers);
    setPage(newPage);
    setLoading(false);
  };

  const hasFilters = search !== "" || statusFilter !== "all";

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      let res = await fetch(`/api/members/delete/${id}`, { method: "DELETE" });

      await handlePageChange(page, statusFilter);

      if (res.ok) {
        toast.success("Member deleted");
      }

      setLoading(false);
    }
    catch (error) {
      toast.error("Error deleting member");
    }
  };

  const handleEdit = (member) => {
    setEditMember(member);
    setModalOpen(true);
  };

  const handleFilter = (val) => {
    if (val === statusFilter) { return; }
    setLoading(true);
    setStatusFilter(val);
    setPage(1);
    handlePageChange(1, val);
  };

  const handleSearch = () => {
    setLoading(true);
    setPage(1);
    handlePageChange(1);
    setLoading(false);
  };

  const handleReset = () => { setSearch(""); setStatusFilter("all"); setPage(1); };

  const escapeCsvValue = (value) => {
    const stringValue = value == null ? "" : String(value);
    return `"${stringValue.replace(/"/g, '""')}"`;
  };

  const handleExport = async () => {
    try {
      setExporting(true);

      const params = new URLSearchParams({
        page: "1",
        limit: "100000",
      });

      if (statusFilter && statusFilter !== "all") {
        params.set("filter", statusFilter);
      }

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const response = await fetch(`/api/members/get?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Unable to export members");
        return;
      }

      const csvRows = [
        ["Name", "Email", "Phone", "Start Date", "Expiry Date", "Status"].map(escapeCsvValue).join(","),
        ...data.members.map((member) => [
          member.name,
          member.email,
          member.phone,
          formatDate(member.startDate),
          formatDate(member.expiryDate),
          member.status,
        ].map(escapeCsvValue).join(",")),
      ];

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gymos-members-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Members exported successfully");
    } catch (error) {
      toast.error("Error exporting members");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2 min-w-0">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search name or phone..."
            className="flex-1 sm:max-w-60"
            handleSearch={handleSearch}
          />
          <select
            value={statusFilter}
            onChange={(e) => handleFilter(e.target.value)}
            className="h-9 px-2.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-colors shrink-0"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring_soon">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
          <Button
            onClick={handleExport}
            disabled={exporting || loading || totalMembers === 0}
            variant="outline"
            className="flex items-center justify-center gap-2 h-9 w-full sm:w-auto"
          >
            <Download size={15} />
            {exporting ? "Exporting..." : "Export"}
          </Button>
          <Button
            onClick={() => { setEditMember(null); setModalOpen(true); }}
            className="bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] flex items-center justify-center gap-2 h-9 w-full sm:w-auto"
          >
            <UserPlus size={15} />
            Add Member
          </Button>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <TableSkeleton rows={8} />
      ) : (
        /* Table card */
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
          {/* Horizontal scroll wrapper — critical for mobile */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: "680px" }}>
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">Member</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">Start Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">Expiry Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <EmptyState
                    hasFilters={hasFilters}
                    onReset={handleReset}
                    onAdd={() => { setEditMember(null); setModalOpen(true); }}
                  />
                ) : (
                  members.map((member, idx) => {
                    const colorIdx = members.indexOf(member) % avatarColors.length;
                    return (
                      <tr
                        key={member._id}
                        className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--accent)] transition-colors duration-100"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full ${avatarColors[colorIdx]} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                            >
                              {getInitials(member.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-[var(--foreground)] truncate max-w-[140px]">{member.name}</p>
                              <p className="text-xs text-[var(--muted-foreground)] truncate max-w-[140px]">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--secondary-foreground)] whitespace-nowrap">{member.phone}</td>
                        <td className="px-4 py-3 text-sm text-[var(--secondary-foreground)] whitespace-nowrap">{formatDate(member.startDate)}</td>
                        <td className="px-4 py-3 text-sm text-[var(--secondary-foreground)] whitespace-nowrap">{formatDate(member.expiryDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge status={member.status} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-0.5">
                            <button
                              onClick={() => handleEdit(member)}
                              className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                              title="Edit member"
                            >
                              <Edit2 size={14} />
                            </button>
                            <ConfirmDialog
                              title="Delete member"
                              onConfirm={() => handleDelete(member._id)}
                              description="This will remove member and attendance data permanently."
                            >
                              <button
                                className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </ConfirmDialog>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalMembers > 0 && (
            <div className="flex flex-col xs:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-[var(--border)] bg-[var(--secondary)]">
              <p className="text-xs text-[var(--muted-foreground)] order-2 xs:order-1">
                Showing{" "}
                <span className="font-medium">
                  {(page - 1) * 10 + 1} - {Math.min(page * 10, totalMembers)}
                </span>{" "}
                of <span className="font-medium">{totalMembers}</span>
              </p>
              <div className="flex items-center gap-1 order-1 xs:order-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="flex items-center justify-center w-7 h-7 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span key={`ellipsis-${i}`} className="flex items-center justify-center w-7 h-7 text-xs text-[var(--muted-foreground)]">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`flex items-center justify-center w-7 h-7 rounded-md text-xs font-medium transition-colors ${p === page
                          ? "bg-[var(--primary)] text-white"
                          : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                          }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="flex items-center justify-center w-7 h-7 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <AddMemberModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditMember(null); }}
        editMember={editMember}
        handlePageChange={() => handlePageChange(page, statusFilter)}
      />
    </div>
  );
}
