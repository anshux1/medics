import React from "react";

import { auth } from "@/lib/auth";
import { Button } from "@workspace/ui/components/button";
import { JoinExam } from "./DashboardJoinExamDialog";

export const DashboardHeader = async () => {
  const user = (await auth())?.user;
  return (
    <div className="flex h-20 items-center justify-between border-b px-7">
      <div className="">
        <h2 className="font-semibold">{user?.name}</h2>
        <p className="text-muted-foreground">
          Welcome back to{" "}
          <span className="text-primary font-medium">test.medicss.in</span>
        </p>
      </div>
      {user?.role !== "STUDENT" ? <JoinExam /> : <Button>Create Exam</Button>}
    </div>
  );
};
