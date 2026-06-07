"use client";
import { StatCard } from "@/components/ui/StatCard";
import { StatsGridSkeleton } from "@/components/ui/LoadingSkeleton";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export function StatsGrid() {
  const {data, loading} = useDashboard();
  
  const total = data.totalMembers;
  const active = data.activeMembers;
  const expired = data.expiredMembers;
  const expiringSoon = data.expiringSoonMembers;

  const today = new Date("2026-06-02");
  const in3Days = new Date(today);
  in3Days.setDate(in3Days.getDate() + 3);


  if (loading) return <StatsGridSkeleton />;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Total Members"
        value={total}
        icon={Users}
        color="primary"
      />
      <StatCard
        title="Active Memberships"
        value={active}
        icon={UserCheck}
        color="success"
      />
      <StatCard
        title="Expired"
        value={expired}
        icon={UserX}
        color="danger"
      />
      <StatCard
        title="Expiring in 4 Days"
        value={expiringSoon}
        icon={Clock}
        color="warning"
      />
    </div>
  );
}
