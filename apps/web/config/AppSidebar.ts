import { SidebarNavItem, TeamsItem, User } from "types/sidebar";

export interface SidebarConfig {
  teams: TeamsItem[];
  sidebarNav: SidebarNavItem[];
}

export const SidebarConfig: SidebarConfig = {
  teams: [
    {
      name: "Acme Inc",
      logo: "https://prepmedics.blob.core.windows.net/prepmedics/nta.svg",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: "https://prepmedics.blob.core.windows.net/prepmedics/nta.svg",
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: "https://prepmedics.blob.core.windows.net/prepmedics/nta.svg",
      plan: "Free",
    },
  ],
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
          title: "Schedule",
          href: "/schedule",
        },
      ],
    },
    {
      title: "Tools",
      items: [
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
      title: "Other",
      items: [
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
