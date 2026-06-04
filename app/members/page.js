import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MembersTable } from "@/components/members/MembersTable";

export default function MembersPage() {
  return (
    <DashboardLayout>
      <MembersTable />
    </DashboardLayout>
  );
}
