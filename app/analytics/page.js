import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalyticsStatsGrid } from "@/components/analytics/AnalyticsStatsGrid";
import { RevenueGrowthChart } from "@/components/analytics/RevenueGrowthChart";
import { MembershipGrowthChart } from "@/components/analytics/MembershipGrowthChart";
import { ActiveVsExpiredChart, ExpiringBarChart } from "@/components/analytics/StatusBreakdownCharts";
import DashboardProvider from "@/components/dashboard/DashboardProvider";

export default function AnalyticsPage() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="space-y-5 lg:space-y-6">
          <AnalyticsStatsGrid />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            <RevenueGrowthChart />
            <MembershipGrowthChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            <ActiveVsExpiredChart />
            <ExpiringBarChart />
          </div>
        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
}
