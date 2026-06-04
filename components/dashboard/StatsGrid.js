"use client";

import { useState, useEffect } from "react";
import { members } from "@/lib/mockData";
import { StatCard } from "@/components/ui/StatCard";
import { StatsGridSkeleton } from "@/components/ui/LoadingSkeleton";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

export function StatsGrid() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const today = new Date("2026-06-02");
  const in3Days = new Date(today);
  in3Days.setDate(in3Days.getDate() + 3);

  const total = members.length;
  const active = members.filter((m) => m.status === "active").length;
  const expired = members.filter((m) => m.status === "expired").length;
  const expiringSoon = members.filter((m) => {
    const exp = new Date(m.expiryDate);
    return exp >= today && exp <= in3Days;
  }).length;

  if (loading) return <StatsGridSkeleton />;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Total Members"
        value={total}
        icon={Users}
        color="primary"
        trend={8}
        trendLabel="vs last month"
      />
      <StatCard
        title="Active Memberships"
        value={active}
        icon={UserCheck}
        color="success"
        trend={5}
        trendLabel="vs last month"
      />
      <StatCard
        title="Expired"
        value={expired}
        icon={UserX}
        color="danger"
        trend={-2}
        trendLabel="vs last month"
      />
      <StatCard
        title="Expiring in 3 Days"
        value={expiringSoon}
        icon={Clock}
        color="warning"
        subtitle="Needs attention"
      />
    </div>
  );
}
