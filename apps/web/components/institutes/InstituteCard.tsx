"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { instituteSearchInputAtom } from "@workspace/store";
import { useAtomValue } from "jotai";
import { Building2, Mail, MapPin } from "lucide-react";

import { Institute } from "@prisma/client";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { InstituteDeleteDialog } from "./InstituteDeleteDialog";

export const InstituteCard = ({ institutes }: { institutes: Institute[] }) => {
  const [filteredInstitutes, setFilteredInstitutes] = useState<Institute[]>([]);
  const searchInputValue = useAtomValue(instituteSearchInputAtom);
  useMemo(() => {
    if (searchInputValue === "") {
      setFilteredInstitutes(institutes);
    } else {
      const results = institutes.filter(
        (institute) =>
          institute.name
            .toLowerCase()
            .includes(searchInputValue.toLowerCase()) ||
          institute.city.toLowerCase().includes(searchInputValue.toLowerCase()),
      );
      setFilteredInstitutes(results);
    }
  }, [searchInputValue]);
  return (
    <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filteredInstitutes.map((institute, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {institute.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {institute.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {institute.city}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <div>{institute.description}</div>
          </CardContent>
          <CardFooter className="mt-auto flex gap-2">
            <Link href={`/dashboard/manage-institutes/${institute.id}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            <InstituteDeleteDialog
              instituteName={institute.name}
              instituteId={institute.id}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
