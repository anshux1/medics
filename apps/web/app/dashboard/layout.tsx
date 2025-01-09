import { SideBar } from "@/components/AppSidebar";
import { NavUser } from "@/components/nav-user";
import OrgSwitcher from "@/components/org-switcher";
import { SidebarConfig } from "@/config/AppSidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  const teams = SidebarConfig.teams;
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)]  lg:grid-cols-[240px_minmax(0,1fr)] ">
        <aside className="fixed top-14 z-30 hidden h-screen border-r border-border/50 w-full shrink-0 md:sticky md:block">
          <OrgSwitcher teams={teams} />
          <div className="no-scrollbar h-5/6 overflow-auto pt-2 pb-8 pr-4 px-2 lg:pt-2 lg:pb-8">
            <SideBar config={SidebarConfig} />
          </div>
          <NavUser user={SidebarConfig.user} />
        </aside>
        {children}
      </div>
    </div>
  );
}
