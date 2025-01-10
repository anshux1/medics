"use client";

import React from "react";
import { joinExamSchema } from "@/action/exam/schema";
import { InputTypeJoinTest } from "@/action/exam/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import { InputField } from "@workspace/ui/components/form-fields";

export const JoinExamForm = () => {
  const form = useForm<InputTypeJoinTest>({
    resolver: zodResolver(joinExamSchema),
    defaultValues: {
      testCode: "",
      testPassword: "",
    },
  });
  const onSubmit = (data: InputTypeJoinTest) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-3 mt-3 space-y-4 md:mb-0"
      >
        <InputField
          control={form.control}
          name="testCode"
          label="Test Id"
          placeholder="Enter test code"
        />
        <InputField
          control={form.control}
          name="testPassword"
          label="Test Password"
          placeholder="Enter test password"
        />
        <Button className="w-full" type="submit">
          Join Test
        </Button>
      </form>
    </Form>
  );
};
