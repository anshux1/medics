import React, { ReactNode } from "react";

import { auth } from "@/lib/auth";

export const DashboardHeader = async ({
  children,
}: {
  children?: ReactNode;
}) => {
  const user = (await auth())?.user;
  console.log("user: ", user);
  return (
    <div className="flex h-20 items-center justify-between border-b px-7">
      <div className="">
        <h2 className="font-semibold">{user?.name}</h2>
        <p className="text-muted-foreground">
          Welcome back to{" "}
          <span className="text-primary font-medium">test.medicss.in</span>
        </p>
      </div>
      {children}
    </div>
  );
};
