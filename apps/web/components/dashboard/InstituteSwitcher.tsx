"use client";

import { useState } from "react";
import Link from "next/link";
import { Building, ChevronDown, Plus } from "lucide-react";

import { Institute } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

// TODO: CHANGE THE NAMES AND VALUES OF THE PROPS ACCORDING TO YOUR NEEDS
export default function OrgSwitcher({ institute }: { institute: Institute[] }) {
  const instituteId = localStorage.getItem("selectedInstitute");
  const [activeInstitute, setActiveInstitute] = useState(
    institute.find((item) => item.id === instituteId) || institute.at(0),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-accent m-2 flex w-11/12 items-center gap-3 rounded-md px-3 py-3">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <Building />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {activeInstitute?.name}
          </span>
          <span className="truncate text-xs">{activeInstitute?.city}</span>
        </div>
        <ChevronDown className="size-5 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side={"bottom"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Institute
        </DropdownMenuLabel>
        {institute.map((institute, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              localStorage.setItem("selectedInstitute", institute.id);
              setActiveInstitute(institute);
            }}
            className="gap-2 p-2"
          >
            {institute.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <Link href="/dashboard/manage-institutes/create">
          <DropdownMenuItem className="gap-2 p-2">
            <div className="bg-background flex size-6 items-center justify-center rounded-md border">
              <Plus className="size-4" />
            </div>
            <div className="text-muted-foreground font-medium">Add team</div>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
