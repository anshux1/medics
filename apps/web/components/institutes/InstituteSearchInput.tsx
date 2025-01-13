"use client";

import React from "react";
import { instituteSearchInputAtom } from "@workspace/store";
import { useAtom } from "jotai";
import { Search } from "lucide-react";

import { Input } from "@workspace/ui/components/input";

export const InstituteSearchInput = () => {
  const [instituteSearchInput, setInstituteSearchInput] = useAtom(
    instituteSearchInputAtom,
  );
  return (
    <div className="relative max-w-sm flex-1">
      <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
      <Input
        value={instituteSearchInput}
        onChange={(e) => setInstituteSearchInput(e.target.value)}
        placeholder="Search institutes..."
        className="pl-8"
      />
    </div>
  );
};
