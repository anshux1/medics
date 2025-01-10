import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTable } from "@/components/dashboard/DashboardTable";

export default function page() {
  return (
    <div>
      <DashboardHeader />
      <div className="no-scrollbar h-[calc(100vh-5rem)] overflow-auto px-2 pb-8 pr-4 pt-2 lg:pb-8 lg:pt-2">
        <DashboardAnalytics />
        <DashboardTable />
      </div>
    </div>
  );
}
