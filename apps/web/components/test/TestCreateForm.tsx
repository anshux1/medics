"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createTest } from "@/action/test";
import { createTestSchema } from "@/action/test/schema";
import { InputTypeCreateTest } from "@/action/test/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  testDifficulty,
  testNoOfQuestions,
  TestSubjectsProps,
  TestSyllabusProps,
  testTimeLimit,
} from "@/config/constants";
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
import { useAction } from "@workspace/ui/hooks/useAction";

interface TestCreateFormProps {
  subjects: TestSubjectsProps[];
  units: TestSyllabusProps[];
}

export const TestCreateForm = ({ subjects, units }: TestCreateFormProps) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<{ [key: number]: boolean }>({});
  const [filteredData, setFilteredData] = useState<
    {
      id: string;
      subjectName: string;
      units: TestSyllabusProps[];
    }[]
  >([]);

  const form = useForm<InputTypeCreateTest>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      name: "",
      noOfQuestions: 1,
      chatpers: [],
      subjects: [],
      timeLimit: 1,
      difficulty: 1,
      instituteId: localStorage.getItem("selectedInstitute") || "",
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
      units: TestSyllabusProps[];
    }[];

    setFilteredData(newFilteredData);
  }, [selectedSubjects, subjects, units]);

  const { execute, isLoading } = useAction(createTest, {
    onSuccess: (data) => {
      toast.success("Test created successfully");
      router.push(`tests/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onSubmit = (values: InputTypeCreateTest) => {
    execute(values);
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
        className="mt-5 grid gap-3 lg:grid-cols-2"
      >
        <div className="space-y-4">
          <InputField
            control={form.control}
            name="name"
            label="Name"
            className="w-full"
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
                <div className="flex gap-2">
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
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
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="max-w-lg space-y-1.5">
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value.toString()}
                    className="grid grid-cols-3 gap-2"
                  >
                    {testDifficulty.map((item, index) => (
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
                    {testNoOfQuestions.map((item, index) => (
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
                    {testTimeLimit.map((item, index) => (
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
        <div className="max-w-lg space-y-1 overflow-auto lg:h-[62vh]">
          {filteredData.length !== 0 && (
            <p className="-mt-1 text-sm">Select chapters</p>
          )}
          {filteredData.map((data, index) => (
            <Collapsible
              key={index}
              onOpenChange={(value) =>
                setMenuOpen((prev) => ({ ...prev, [index]: value }))
              }
              className="bg-secondary/30 rounded-md border px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="chatpers"
                  render={({ field }) => {
                    const allChapters = data.units.flatMap(
                      (unit) => unit.chapters,
                    );
                    const isChecked = allChapters.every((item) =>
                      field.value?.includes(item.id),
                    );
                    return (
                      <FormItem className="flex items-start">
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [
                                    ...new Set([
                                      ...field.value,
                                      ...allChapters.map((item) => item.id),
                                    ]),
                                  ]
                                : field.value.filter(
                                    (value) =>
                                      !allChapters
                                        .map((item) => item.id)
                                        .includes(value),
                                  );
                              field.onChange(newValue);
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
              <ScrollArea className={`${menuOpen[index] ? "mt-3 h-auto" : ""}`}>
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
                                      const newValue = checked
                                        ? [
                                            ...new Set([
                                              ...field.value,
                                              ...unit.chapters.map(
                                                (item) => item.id,
                                              ),
                                            ]),
                                          ]
                                        : field.value.filter(
                                            (value) =>
                                              !unit.chapters
                                                .map((item) => item.id)
                                                .includes(value),
                                          );
                                      field.onChange(newValue);
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
                              className="flex items-center gap-3"
                            >
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
                                            const newValue = checked
                                              ? [
                                                  ...new Set([
                                                    ...field.value,
                                                    item.id,
                                                  ]),
                                                ]
                                              : field.value.filter(
                                                  (value) => value !== item.id,
                                                );
                                            field.onChange(newValue);
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
        <Button disabled={isLoading} className="mt-10 w-fit">
          Create Test
        </Button>
      </form>
    </Form>
  );
};
