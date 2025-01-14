import Link from "next/link";
import { getInstitutes } from "@/data/institute";
import { PlusCircle } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { InstituteCard } from "@/components/institutes/InstituteCard";
import { InstituteSearchInput } from "@/components/institutes/InstituteSearchInput";
import { Button } from "@workspace/ui/components/button";

export default async function page() {
  const institutes = await getInstitutes();
  return (
    <div>
      <DashboardHeader>
        <Link href="/manage-institutes/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Institute
          </Button>
        </Link>
      </DashboardHeader>
      <div className="p-4 md:p-7">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold">Manage Institutes</h2>
            <p className="text-muted-foreground">
              Overview of your exam, student and other resources.
            </p>
          </div>
          <div className="mb-6 flex items-center gap-4">
            <InstituteSearchInput />
          </div>
        </div>
        <InstituteCard institutes={institutes} />
      </div>
    </div>
  );
}
