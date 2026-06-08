"use client"
import { StatCard } from "@/components/ui/StatCard";
import { UserCheck, UserX, Clock, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { StatsGridSkeleton } from "../ui/LoadingSkeleton";
import { useDashboard } from "@/context/DashboardContext";

export function AnalyticsStatsGrid() {
  const {data, loading } = useDashboard();

  const active  = data.activeMembers;
  const expired  = data.expiredMembers;
  const expiringSoon  = data.expiringSoonMembers;
  const monthlyRevenue = data.revenue;

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
