import { getTests } from "@/data/test";

import { auth } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { JoinExam } from "@/components/dashboard/DashboardJoinExamDialog";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { Button } from "@workspace/ui/components/button";

export default async function page() {
  const user = (await auth())?.user;
  const tests = await getTests();
  return (
    <div>
      <DashboardHeader>
        {user?.role === "STUDENT" ? <JoinExam /> : <Button>Create Exam</Button>}
      </DashboardHeader>
      <div className="no-scrollbar h-[calc(100vh-5rem)] overflow-auto p-4 md:p-7">
        <DashboardTable testData={tests} />
      </div>
    </div>
  );
}
