import React from "react";
import { FileCheck, Flag, LucideIcon, StickyNote, Users } from "lucide-react";

const Data = [
  {
    Icon: Users,
    label: "Students at exam",
    value: "384",
  },
  {
    Icon: Flag,
    label: "Exam Finished",
    value: "24",
  },
  {
    Icon: StickyNote,
    label: "Running exam",
    value: "12",
  },
  {
    Icon: FileCheck,
    label: "Completed rate",
    value: "90%",
  },
];

export const DashboardAnalytics = () => {
  return (
    <div className="px-7 py-5">
      <h2 className="font-semibold">Dashboard</h2>
      <p className="text-muted-foreground">
        Overview of your exam, student and other resources.
      </p>
      <div className="my-4 grid grid-cols-4 gap-5">
        {Data.map((item, index) => (
          <DashboardAnalyticsCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

const DashboardAnalyticsCard = ({
  data: { Icon, value, label },
}: {
  data: { label: string; value: string; Icon: LucideIcon };
}) => {
  return (
    <div className="flex gap-5 rounded-2xl border px-4 py-3">
      <div className="flex size-16 items-center justify-center rounded-full border bg-gradient-to-b from-gray-100 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-md dark:bg-zinc-950">
          <Icon size={22} className="bg-clip-text text-blue-500" />
        </div>
      </div>
      <div>
        <h3 className="text-muted-foreground text-sm">{label}</h3>
        <p className="mt-1.5 text-xl">{value}</p>
      </div>
    </div>
  );
};
