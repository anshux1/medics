import React from "react";

import {
  DialogDrawer,
  DialogDrawerBody,
  DialogDrawerContent,
  DialogDrawerDescription,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "@workspace/ui/components/dialog-drawer";
import { JoinExamForm } from "./DashboardJoinExamForm";

export const JoinExam = () => {
  return (
    <DialogDrawer>
      <DialogDrawerTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 ring-offset-background inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors">
        Join test
      </DialogDrawerTrigger>
      <DialogDrawerContent className="md:max-w-sm">
        <DialogDrawerHeader>
          <DialogDrawerTitle className="text-center md:text-start">
            Enter test Details
          </DialogDrawerTitle>
          <DialogDrawerDescription className="text-center md:text-start">
            Please provide the Test Id and Password to join the exam.
          </DialogDrawerDescription>
        </DialogDrawerHeader>
        <DialogDrawerBody className="mx-auto w-full max-w-sm">
          <JoinExamForm />
        </DialogDrawerBody>
      </DialogDrawerContent>
    </DialogDrawer>
  );
};
