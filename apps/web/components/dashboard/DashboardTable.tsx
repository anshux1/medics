"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TestData } from "@/data/test";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { selectedInstituteAtom } from "@workspace/store";
import { useAtomValue } from "jotai";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { columns } from "./DashboardTableColumns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const DashboardTable = ({ testData }: { testData: TestData[] }) => {
  const selecctedInstitute = useAtomValue(selectedInstituteAtom);
  const [filteredData, setFilteredData] = useState<TestData[]>([]);
  useMemo(() => {
    const data = testData.filter(
      (test) => test.instituteId === selecctedInstitute,
    );
    setFilteredData(data);
  }, [selecctedInstitute]);
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Exam History </h2>
          <p className="text-muted-foreground text-sm">
            Start Create Exam 71 Explore our tools that you can use to generate
            blog posts, analyze SERP and more
          </p>
        </div>
        <Link href="/tests">
          <Button variant="outline">
            See all
            <ArrowUpRight className="text-muted-foreground size-5" />
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </>
  );
};

interface Identifiable {
  id: string;
}

export function DataTable<TData extends Identifiable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-4 rounded-xl border">
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              console.log(row.original.id);
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  onClick={() => router.push(`/tests/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
