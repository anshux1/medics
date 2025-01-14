"use client";

import React, { useMemo, useState } from "react";
import { createTestSchema } from "@/action/test/schema";
import { InputTypeCreateTest } from "@/action/test/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/ui/components/form";
import { InputField } from "@workspace/ui/components/form-fields";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { ScrollArea } from "@workspace/ui/components/scroll-area";

const noOfQuestions = [
  { label: "20 Ques", value: 20 },
  { label: "50 Ques", value: 50 },
  { label: "60 Ques", value: 60 },
  { label: "80 Ques", value: 80 },
  { label: "100 Ques", value: 100 },
  { label: "120 Ques", value: 120 },
  { label: "150 Ques", value: 150 },
  { label: "180 Ques", value: 180 },
];

const time = [
  { label: "20 min", value: 20 },
  { label: "50 min", value: 50 },
  { label: "60 min", value: 60 },
  { label: "80 min", value: 80 },
  { label: "100 min", value: 100 },
  { label: "120 min", value: 120 },
  { label: "150 min", value: 150 },
  { label: "180 min", value: 180 },
];

interface Subjects {
  id: string;
  subjectName: string;
}

interface Syllabus {
  id: string;
  unitName: string;
  totalChapters: number;
  subjectId: string;
  chapters: {
    id: string;
    chapterName: string;
  }[];
}

interface TestCreateFormProps {
  subjects: Subjects[];
  units: Syllabus[];
}

export const TestCreateForm = ({ subjects, units }: TestCreateFormProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<
    {
      id: string;
      subjectName: string;
      units: Syllabus[];
    }[]
  >([]);
  const form = useForm<InputTypeCreateTest>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      name: "",
      noOfQuestions: 5,
      chatpers: [],
      subjects: [],
      timeLimit: 0,
    },
  });

  const selectedSubjects = form.watch("subjects");
  useMemo(() => {
    const newFilteredData = selectedSubjects
      .map((item) => {
        const sub = subjects.find((sub) => sub.id === item);
        const unit = units.filter((unit) => unit.subjectId === sub?.id);
        if (sub) {
          return {
            ...sub,
            units: unit,
          };
        }
        return null;
      })
      .filter((data) => data !== null) as {
        id: string;
        subjectName: string;
        units: Syllabus[];
      }[];

    setFilteredData(newFilteredData);
  }, [selectedSubjects, subjects, units]);

  const onSubmit = (values: InputTypeCreateTest) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 grid gap-3 lg:grid-cols-2"
      >
        <div className="space-y-4">
          <InputField
            control={form.control}
            name="name"
            label="Name"
            className="w-full md:h-12 md:text-lg"
            placeholder="Like Phy June Test.."
          />
          <FormField
            control={form.control}
            name="subjects"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel className="text-base">Subjects</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {subjects.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="subjects"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormLabel className="border-input has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border px-4 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2">
                            <FormControl>
                              <Checkbox
                                className="sr-only after:absolute after:inset-0"
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                                }}
                              />
                            </FormControl>
                            {item.subjectName}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noOfQuestions"
            render={({ field }) => (
              <FormItem className="max-w-lg space-y-1.5">
                <FormLabel>No. of questions</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                    className="grid grid-cols-3 gap-2"
                  >
                    {noOfQuestions.map((item, index) => (
                      <FormItem key={index}>
                        <FormLabel className="border-input has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2">
                          <FormControl>
                            <RadioGroupItem
                              className="sr-only after:absolute after:inset-0"
                              value={item.value.toString()}
                            />
                          </FormControl>
                          <p className="text-foreground text-sm font-medium leading-none">
                            {item.label}
                          </p>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeLimit"
            render={({ field }) => (
              <FormItem className="max-w-lg space-y-1.5">
                <FormLabel>Time Limit</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                    className="grid grid-cols-3 gap-2"
                  >
                    {time.map((item, index) => (
                      <FormItem key={index}>
                        <FormLabel className="border-input has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2">
                          <FormControl>
                            <RadioGroupItem
                              className="sr-only after:absolute after:inset-0"
                              value={item.value.toString()}
                            />
                          </FormControl>
                          <p className="text-foreground text-sm font-medium leading-none">
                            {item.label}
                          </p>
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="max-w-lg space-y-1">
          {filteredData.length !== 0 && (
            <p className="-mt-1 text-sm">Select chapters</p>
          )}
          {filteredData.map((data, index) => (
            <Collapsible
              key={index}
              onOpenChange={(value) => setMenuOpen(value)}
              className="bg-secondary/30 rounded-md border px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="chatpers"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex items-start">
                        <FormControl>
                          <Checkbox
                            checked={data.units.every((unit) =>
                              unit.chapters.every((item) =>
                                field.value?.includes(item.id),
                              ),
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(
                                  data.units.flatMap((unit) =>
                                    unit.chapters.map((item) => item.id),
                                  ),
                                )
                                : field.onChange([]);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <CollapsibleTrigger className="flex h-full w-full justify-between gap-2 text-[15px] font-semibold leading-6 [&[data-state=open]>svg]:rotate-180">
                  {data.subjectName}
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>
              </div>
              <ScrollArea className={`${menuOpen ? "mt-3 h-72" : ""}`}>
                <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down mr-3 overflow-hidden rounded-md text-sm opacity-95 transition-all duration-200">
                  {data.units.map((unit) => (
                    <Collapsible
                      key={unit.id}
                      className="bg-secondary/30 mt-0.5 space-y-1 rounded-md px-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <FormField
                          control={form.control}
                          name="chatpers"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={unit.chapters.every((item) =>
                                      field.value?.includes(item.id),
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                          ...field.value,
                                          ...unit.chapters.map(
                                            (item) => item.id,
                                          ),
                                        ])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) =>
                                              !unit.chapters
                                                .map((item) => item.id)
                                                .includes(value),
                                          ),
                                        );
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                        <CollapsibleTrigger className="flex w-full justify-between gap-2 text-[15px] font-semibold leading-6 [&[data-state=open]>svg]:rotate-180">
                          {unit.unitName}
                          <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
                            aria-hidden="true"
                          />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden p-2 text-sm transition-all duration-500">
                        <div className="my-2 flex flex-row flex-wrap items-center gap-3">
                          {unit.chapters.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3">
                              <FormField
                                control={form.control}
                                name="chatpers"
                                render={({ field }) => {
                                  return (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.id,
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                              : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== item.id,
                                                ),
                                              );
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  );
                                }}
                              />
                              {item.chapterName}
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </CollapsibleContent>
              </ScrollArea>
            </Collapsible>
          ))}
        </div>
        <Button className="mt-10 w-fit">Create Test</Button>
      </form>
    </Form>
  );
};
