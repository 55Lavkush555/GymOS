import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { MembersBarChart } from "@/components/dashboard/MembersBarChart";
import { MembershipPieChart } from "@/components/dashboard/MembershipPieChart";
import { RecentMembers } from "@/components/dashboard/RecentMembers";
import { RecentExpired } from "@/components/dashboard/RecentExpired";
import { QuickActions } from "@/components/dashboard/QuickActions";
import DashboardProvider from "@/components/dashboard/DashboardProvider";

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="space-y-5 lg:space-y-6">
          <StatsGrid />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <MembershipPieChart />
          </div>
          <MembersBarChart />
          <QuickActions />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            <RecentMembers />
            <RecentExpired />
          </div>
        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
}
