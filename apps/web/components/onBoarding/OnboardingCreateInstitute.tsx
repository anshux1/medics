"use client";

import { useRouter } from "next/navigation";
import { createInstitute } from "@/action/institute";
import { createInstituteSchema } from "@/action/institute/schema";
import { InputTypeCreateInstitute } from "@/action/institute/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import {
  InputField,
  TextAreaField,
} from "@workspace/ui/components/form-fields";
import { useAction } from "@workspace/ui/hooks/useAction";

export function OnboardingCreateInstitute() {
  const router = useRouter();
  const form = useForm<InputTypeCreateInstitute>({
    resolver: zodResolver(createInstituteSchema),
    defaultValues: {
      name: "",
      description: "",
      email: "",
      city: "",
    },
  });

  const { isLoading, execute } = useAction(createInstitute, {
    onSuccess: () => {
      toast.success("Institute created successfully");
      router.replace("/dashboard");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit = (values: InputTypeCreateInstitute) => {
    execute(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`my-10 max-w-xl space-y-4`}
      >
        <InputField
          control={form.control}
          name="name"
          type="text"
          label="Name"
          placeholder="XYZ Coaching Center"
          required
        />
        <TextAreaField
          control={form.control}
          name="description"
          label="Description"
          placeholder="A description of the institute and its purpose."
        />
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="xyz@example.com"
        />
        <InputField
          control={form.control}
          name="city"
          label="City"
          placeholder="Patna"
        />
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
