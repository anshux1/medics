"use client";
import { TeamsItem } from "@/types/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function OrgSwitcher({ teams }: { teams: TeamsItem[] }) {
  const [activeTeam, setActiveTeam] = useState(teams[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-2 w-11/12 rounded-md hover:bg-accent items-center flex px-3 py-3 gap-3">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Image
            src={teams[0]?.logo as string}
            width={60}
            height={90}
            alt="logo"
          />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{activeTeam?.name}</span>
          <span className="truncate text-xs">{activeTeam?.plan}</span>
        </div>
        <ChevronDown className="opacity-50 size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side={"bottom"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Institute
        </DropdownMenuLabel>
        {teams.map((team, index) => (
          <DropdownMenuItem
            key={team.name}
            onClick={() => setActiveTeam(team)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-full">
              <Image
                src="https://prepmedics.blob.core.windows.net/prepmedics/nta.svg"
                width={50}
                height={90}
                alt="logo"
              />
            </div>
            {team.name}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">Add team</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
