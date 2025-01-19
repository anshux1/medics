"use client";

import { TestData } from "@/data/test";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: "name",
    header: () => <div className="pl-3">Title</div>,
    cell: ({ row }) => {
      const value = row.original.name;

      return <div className="my-2 pl-3 font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "noOfQuestions",
    header: "No Of questions",
  },
  {
    accessorKey: "timeLimit",
    header: "Time  Limit",
  },
  {
    accessorKey: "students",
    header: "Students",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "chapters",
    header: "Chapters",
  },
  {
    accessorKey: "questions",
    header: "Questions",
  },
];
