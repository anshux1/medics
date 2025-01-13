import { auth } from "@/lib/auth";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { JoinExam } from "@/components/dashboard/DashboardJoinExamDialog";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { Button } from "@workspace/ui/components/button";

export default async function page() {
  const user = (await auth())?.user;
  return (
    <div>
      <DashboardHeader>
        {user?.role === "STUDENT" ? <JoinExam /> : <Button>Create Exam</Button>}
      </DashboardHeader>
      <div className="no-scrollbar h-[calc(100vh-5rem)] overflow-auto px-2 pb-8 pr-4 pt-2 lg:pb-8 lg:pt-2">
        <DashboardAnalytics />
        <DashboardTable />
      </div>
    </div>
  );
}
