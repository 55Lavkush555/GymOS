"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";
import {
  Users,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const attendanceSeed = [
  {
    id: "1",
    name: "Aarav Sharma",
    membershipStatus: "Active",
    attendanceStatus: "present",
    totalVisits: 28,
    attendancePercentage: 93,
    attendanceRecords: [
      "2026-06-08T09:15:00",
      "2026-06-07T08:58:00",
      "2026-06-05T09:10:00",
      "2026-06-03T09:05:00",
    ],
  },
  {
    id: "2",
    name: "Mira Patel",
    membershipStatus: "Active",
    attendanceStatus: "not_marked",
    totalVisits: 24,
    attendancePercentage: 80,
    attendanceRecords: [
      "2026-06-07T10:12:00",
      "2026-06-06T09:40:00",
      "2026-06-04T09:55:00",
      "2026-06-02T08:50:00",
    ],
  },
  {
    id: "3",
    name: "Neil Desai",
    membershipStatus: "Expiring Soon",
    attendanceStatus: "present",
    totalVisits: 19,
    attendancePercentage: 76,
    attendanceRecords: [
      "2026-06-08T06:55:00",
      "2026-06-05T07:45:00",
      "2026-06-03T07:50:00",
      "2026-06-01T08:20:00",
    ],
  },
  {
    id: "4",
    name: "Sonia Kapoor",
    membershipStatus: "Active",
    attendanceStatus: "not_marked",
    totalVisits: 22,
    attendancePercentage: 88,
    attendanceRecords: [
      "2026-06-07T08:35:00",
      "2026-06-06T09:05:00",
      "2026-06-04T08:50:00",
      "2026-06-02T08:30:00",
    ],
  },
  {
    id: "5",
    name: "Rohan Mehta",
    membershipStatus: "Active",
    attendanceStatus: "present",
    totalVisits: 31,
    attendancePercentage: 97,
    attendanceRecords: [
      "2026-06-08T09:20:00",
      "2026-06-06T09:15:00",
      "2026-06-05T09:00:00",
      "2026-06-03T09:25:00",
    ],
  },
  {
    id: "6",
    name: "Isha Joshi",
    membershipStatus: "Expired",
    attendanceStatus: "not_marked",
    totalVisits: 15,
    attendancePercentage: 65,
    attendanceRecords: [
      "2026-06-06T07:50:00",
      "2026-06-04T07:25:00",
      "2026-06-02T07:35:00",
    ],
  },
  {
    id: "7",
    name: "Rahul Singh",
    membershipStatus: "Active",
    attendanceStatus: "present",
    totalVisits: 26,
    attendancePercentage: 87,
    attendanceRecords: [
      "2026-06-08T09:05:00",
      "2026-06-07T08:55:00",
      "2026-06-05T09:00:00",
      "2026-06-03T09:10:00",
    ],
  },
  {
    id: "8",
    name: "Priya Nair",
    membershipStatus: "Expiring Soon",
    attendanceStatus: "not_marked",
    totalVisits: 18,
    attendancePercentage: 72,
    attendanceRecords: [
      "2026-06-07T10:00:00",
      "2026-06-05T09:20:00",
      "2026-06-02T09:10:00",
    ],
  },
  {
    id: "9",
    name: "Karan Patel",
    membershipStatus: "Active",
    attendanceStatus: "present",
    totalVisits: 21,
    attendancePercentage: 84,
    attendanceRecords: [
      "2026-06-08T08:45:00",
      "2026-06-06T08:55:00",
      "2026-06-04T09:05:00",
      "2026-06-01T08:30:00",
    ],
  },
  {
    id: "10",
    name: "Tara Rao",
    membershipStatus: "Expired",
    attendanceStatus: "not_marked",
    totalVisits: 13,
    attendancePercentage: 60,
    attendanceRecords: [
      "2026-06-06T09:00:00",
      "2026-06-04T09:10:00",
      "2026-06-02T08:25:00",
    ],
  },
  {
    id: "11",
    name: "Vikram Shah",
    membershipStatus: "Active",
    attendanceStatus: "present",
    totalVisits: 29,
    attendancePercentage: 90,
    attendanceRecords: [
      "2026-06-08T09:10:00",
      "2026-06-07T09:05:00",
      "2026-06-05T09:00:00",
      "2026-06-03T09:15:00",
    ],
  },
  {
    id: "12",
    name: "Anjali Deshmukh",
    membershipStatus: "Active",
    attendanceStatus: "not_marked",
    totalVisits: 20,
    attendancePercentage: 82,
    attendanceRecords: [
      "2026-06-07T08:25:00",
      "2026-06-06T08:50:00",
      "2026-06-04T09:05:00",
    ],
  },
  {
    id: "13",
    name: "Samir Khan",
    membershipStatus: "Expiring Soon",
    attendanceStatus: "present",
    totalVisits: 23,
    attendancePercentage: 85,
    attendanceRecords: [
      "2026-06-08T08:55:00",
      "2026-06-07T09:00:00",
      "2026-06-05T09:15:00",
    ],
  },
  {
    id: "14",
    name: "Neha Verma",
    membershipStatus: "Active",
    attendanceStatus: "not_marked",
    totalVisits: 17,
    attendancePercentage: 78,
    attendanceRecords: [
      "2026-06-07T09:35:00",
      "2026-06-05T09:12:00",
      "2026-06-01T09:00:00",
    ],
  },
];

const FILTER_OPTIONS = [
  { key: "all", label: "All Members" },
  { key: "present", label: "Present Today" },
  { key: "not_marked", label: "Not Marked Today" },
];

export default function AttendancePage() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch("/api/attendance/get");
      const result = await res.json();
      setMembers(result.attendance);
      setLoading(false);
    }
    fetchMembers()
  }, [])
  

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = member.memberId.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        statusFilter === "all" || member.attendanceStatus === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [members, search, statusFilter]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const paginatedMembers = filteredMembers.slice((page - 1) * pageSize, page * pageSize);

  const totals = useMemo(() => {
    const totalMembers = members.length;
    const presentToday = members.filter((member) => member.attendanceStatus === "present").length;
    const notMarkedToday = members.filter((member) => member.attendanceStatus === "not_marked").length;
    return { totalMembers, presentToday, notMarkedToday };
  }, [members]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleFilter = (filterKey) => {
    setStatusFilter(filterKey);
    setPage(1);
  };

  const handleMarkPresent = async (_id, memberId) => {
    try {
      let res = await fetch(`/api/attendance/mark-present/${memberId}`)
      if (!res.ok) {
        console.error("Failed to mark present:", res.statusText);
        return;
      }
    }
    catch (err) {
      console.error(err);
      return;
    }

    setMembers((current) =>
      current.map((member) => {
        if (member._id !== _id || member.attendanceStatus === "present") {
          return member;
        }

        const newRecord = new Date().toISOString();
        const newTotalVisits = member.totalVisits + 1;

        return {
          ...member,
          attendanceStatus: "present",
          totalVisits: newTotalVisits,
          attendanceRecords: [newRecord, ...member.attendanceRecords],
        };
      })
    );
  };

  const handleOpenHistory = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleCloseHistory = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  const currentPageLabel = `Page ${page} of ${totalPages}`;

  return (
    <DashboardLayout>
      <div className="space-y-5 lg:space-y-6">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Attendance</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)] max-w-2xl">
                Track daily member attendance and view attendance history.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Members" value={totals.totalMembers} icon={Users} color="primary" />
          <StatCard title="Present Today" value={totals.presentToday} icon={CheckCircle2} color="success" />
          <StatCard title="Not Marked Today" value={totals.notMarkedToday} icon={Clock} color="warning" />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SearchInput
              value={search}
              onChange={(value) => setSearch(value)}
              placeholder="Search Member..."
              className="w-full lg:max-w-md"
              handleSearch={handleSearch}
            />
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((option) => {
                const isActive = statusFilter === option.key;
                return (
                  <Button
                    key={option.key}
                    onClick={() => handleFilter(option.key)}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={isActive ? "bg-[var(--primary)] text-white" : ""}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Member Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Attendance Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              {loading ? (
                <tbody><tr><td colSpan={4} className="px-4 py-16 text-center text-sm text-[var(--muted-foreground)]">Loading...</td></tr></tbody>
              ) : (
                <tbody>
                  {paginatedMembers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-16 text-center text-sm text-[var(--muted-foreground)]">
                        No members match your search and filter.
                      </td>
                    </tr>
                  ) : (
                    paginatedMembers.map((member) => (
                      <tr key={member._id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--accent)] transition-colors duration-150">
                        <td className="px-4 py-4 whitespace-nowrap text-[var(--foreground)] font-medium">{member.memberId.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge status={member.attendanceStatus === "present" ? "primary" : "warning"}>
                            {member.attendanceStatus === "present" ? "Present" : "Not Marked"}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex flex-wrap justify-end gap-2">
                            {member.attendanceStatus === "not_marked" ? (
                              <Button
                                size="sm"
                                onClick={() => handleMarkPresent(member._id, member.memberId._id)}
                              >
                                Mark Present
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                Already Marked
                              </Button>
                            )}
                            <Button size="sm" variant="outline" onClick={() => handleOpenHistory(member)}>
                              View Attendance
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              )}
            </table>
          </div>

          <div className="flex flex-col gap-3 xs:flex-row xs:items-center xs:justify-between px-2 py-3 border-t border-[var(--border)] bg-[var(--secondary)] rounded-b-xl">
            <p className="text-xs text-[var(--muted-foreground)]">
              Showing <span className="font-medium">{paginatedMembers.length}</span> of <span className="font-medium">{filteredMembers.length}</span> filtered members.
            </p>
            <div className="flex items-center gap-2 justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="text-xs font-medium text-[var(--foreground)]">{currentPageLabel}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseHistory} title="Attendance History" size="lg">
        {selectedMember ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-4">
              <p className="text-sm text-[var(--muted-foreground)]">Member Name</p>
              <p className="text-lg font-semibold text-[var(--foreground)]">{selectedMember.memberId.name}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">Total Visits</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{selectedMember.totalVisits}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <p className="text-sm font-medium text-[var(--foreground)] mb-3">Attendance Records</p>
              <div className="space-y-3">
                {selectedMember.attendanceRecords.map((record, index) => {
                  const date = new Date(record);
                  return (
                    <div key={`${selectedMember._id}-${index}`} className="flex items-center justify-between rounded-2xl bg-[var(--secondary)] px-4 py-3">
                      <span className="text-sm text-[var(--foreground)]">{formatDate(record)}</span>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">No member selected.</p>
        )}
      </Modal>
    </DashboardLayout>
  );
}
