"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type SidebarConfig } from "@/config/AppSidebar";
import { cn } from "@workspace/ui/lib/utils";
import { SidebarNavItem } from "@/types/sidebar";

export function SideBar({ config }: { config: SidebarConfig }) {
  const pathname = usePathname();
  const items = config.sidebarNav;
  console.log(items);

  return items.length ? (
    <div className="flex flex-col gap-3 top-0">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <SideBarItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

const SideBarItems = ({
  items,
  pathname,
}: {
  items: SidebarNavItem[];
  pathname: string;
}) => {
  return items.length ? (
    <div className="grid ml-2 grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group transition-all tracking-wide duration-100 flex h-8 w-full items-center rounded-r-lg px-3 font-normal text-foreground/80 underline-offset-2 hover:bg-accent hover:text-accent-foreground",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href &&
                "bg-accent border-l-2 border-black dark:border-white/80 font-medium text-accent-foreground",
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
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
