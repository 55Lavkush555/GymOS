import { StatCard } from "@/components/ui/StatCard";
import { members, revenueData } from "@/lib/mockData";
import { Users, UserCheck, UserX, Clock, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function AnalyticsStatsGrid() {
  const today = new Date("2026-06-02");
  const in3Days = new Date(today);
  in3Days.setDate(in3Days.getDate() + 3);

  const active = members.filter((m) => m.status === "active").length;
  const expired = members.filter((m) => m.status === "expired").length;
  const expiringSoon = members.filter((m) => {
    const exp = new Date(m.expiryDate);
    return exp >= today && exp <= in3Days;
  }).length;
  const monthlyRevenue = revenueData[revenueData.length - 1].revenue;

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
