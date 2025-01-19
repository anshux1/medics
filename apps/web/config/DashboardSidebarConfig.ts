import { SidebarNavItem, TeamsItem } from "types/sidebar";

export interface DashboardSidebarConfigProps {
  sidebarNav: SidebarNavItem[];
}

export const DashboardSidebarConfig: DashboardSidebarConfigProps = {
  sidebarNav: [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
        },
        {
          title: "Live Exams",
          href: "/live-exams",
        },
        {
          title: "Results",
          href: "/results",
        },
        {
          title: "Tests",
          href: "/tests",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          title: "Create Test",
          href: "/create-test",
        },
        {
          title: "Find Template",
          href: "/find-template",
        },
        {
          title: "New Template",
          href: "/new-template",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Manage Institutes",
          href: "/manage-institutes",
        },
        {
          title: "Integration",
          href: "/integration",
        },
        {
          title: "Settings",
          href: "/settings",
        },
        {
          title: "Get Help",
          href: "/get-help",
        },
      ],
    },
  ],
};
