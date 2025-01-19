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
    accessorKey: "students",
    header: "Students",
    cell: ({ row }) => {
      const totalStudents = row.original.students.length;
      return totalStudents;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "chapters",
    header: "Chapters",
    cell: ({ row }) => {
      const totalChapters = row.original.chapters.length;
      return totalChapters;
    },
  },
  {
    accessorKey: "questions",
    header: "Questions",
    cell: ({ row }) => {
      const totalQuestions = row.original.questions.length;
      return totalQuestions;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const totalQuestions = row.original.createdAt;
      const formattedDate = new Date(totalQuestions).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      return formattedDate;
    },
  },
];
