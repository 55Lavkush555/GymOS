"use client"
import { StatCard } from "@/components/ui/StatCard";
import { members, revenueData } from "@/lib/mockData";
import { Users, UserCheck, UserX, Clock, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { StatsGridSkeleton } from "../ui/LoadingSkeleton";

export function AnalyticsStatsGrid() {
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

  const monthlyRevenue = revenueData[revenueData.length - 1].revenue;

  if (loading) return <StatsGridSkeleton />;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        title="Active Members"
        value={active}
        icon={UserCheck}
        color="success"
        trend={5}
        trendLabel="vs last month"
      />
      <StatCard
        title="Expired Members"
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
        subtitle="Needs renewal"
      />
      <StatCard
        title="Monthly Revenue"
        value={formatCurrency(monthlyRevenue)}
        icon={TrendingUp}
        color="primary"
        trend={9}
        trendLabel="vs last month"
      />
    </div>
  );
}
