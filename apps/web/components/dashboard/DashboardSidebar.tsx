"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/types/sidebar";
import { type DashboardSidebarConfigProps } from "@/config/DashboardSidebarConfig";
import { cn } from "@workspace/ui/lib/utils";

export function DashboardSideBar({
  config,
}: {
  config: DashboardSidebarConfigProps;
}) {
  const pathname = usePathname();
  const items = config.sidebarNav;
  console.log(items);

  return items.length ? (
    <div className="top-0 flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DashboardSideBarItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

const DashboardSideBarItems = ({
  items,
  pathname,
}: {
  items: SidebarNavItem[];
  pathname: string;
}) => {
  return items.length ? (
    <div className="ml-2 grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "text-foreground/80 hover:bg-accent hover:text-accent-foreground group flex h-8 w-full items-center rounded-r-lg px-3 font-normal tracking-wide underline-offset-2 transition-all duration-100",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href &&
                "bg-accent text-accent-foreground border-l-2 border-black font-medium dark:border-white/80",
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
          </span>
        ),
      )}
    </div>
  ) : null;
};
