import { ReactNode } from "react";

import { SidebarConfig } from "@/config/AppSidebar";
import { SideBar } from "@/components/AppSidebar";
import { NavUser } from "@/components/nav-user";
import OrgSwitcher from "@/components/org-switcher";

export default function layout({ children }: { children: ReactNode }) {
  const teams = SidebarConfig.teams;
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-border/50 fixed top-14 z-30 hidden h-screen w-full shrink-0 border-r md:sticky md:block">
          <OrgSwitcher teams={teams} />
          <div className="no-scrollbar h-5/6 overflow-auto px-2 pb-8 pr-4 pt-2 lg:pb-8 lg:pt-2">
            <SideBar config={SidebarConfig} />
          </div>
          <NavUser />
        </aside>
        {children}
      </div>
    </div>
  );
}
