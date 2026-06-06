"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { StatsGridSkeleton } from "@/components/ui/LoadingSkeleton";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

export function StatsGrid() {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState("")
  const [active, setActive] = useState("")
  const [expired, setExpired] = useState("")
  const [expiringSoon, setExpiringSoon] = useState("")

  useEffect(() => {
    const loadStats = async () => {
      let data = await fetch("/api/dashboard/stats").then((res) => res.json());

      setTotal(data.totalMembers);
      setActive(data.activeMembers);
      setExpired(data.expiredMembers);
      setExpiringSoon(data.expiringSoonMembers);
      setLoading(false);
    }
    loadStats();
  }, []);

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
