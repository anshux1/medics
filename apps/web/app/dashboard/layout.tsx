import { ReactNode } from "react";

import { DashboardSidebarConfig } from "@/config/DashboardSidebarConfig";
import { DashboardSideBar } from "@/components/dashboard/DashboardSidebar";
import { DashboardSidebarUser } from "@/components/dashboard/DashboardSidebarUser";
import InstituteSwitcher from "@/components/dashboard/InstituteSwitcher";

export default function layout({ children }: { children: ReactNode }) {
  const teams = DashboardSidebarConfig.teams;
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-border/50 fixed z-30 hidden h-screen w-full shrink-0 border-r md:sticky md:block">
          <InstituteSwitcher teams={teams} />
          <div className="no-scrollbar h-5/6 overflow-auto px-2 pb-8 pr-4 pt-2 lg:pb-8 lg:pt-2">
            <DashboardSideBar config={DashboardSidebarConfig} />
          </div>
          <DashboardSidebarUser />
        </aside>
        {children}
      </div>
    </div>
  );
}
