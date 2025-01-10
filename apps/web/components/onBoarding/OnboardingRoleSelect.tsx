"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateRole } from "@/action/account";
import { updateRoleSchema } from "@/action/account/schema";
import { InputTypeUpdateRole } from "@/action/account/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { OnBoardingComfig } from "@/config/OnBoarding";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { useAction } from "@workspace/ui/hooks/useAction";

export function OnboardingRoleSelectCard() {
  const items = OnBoardingComfig.step1.items;
  const router = useRouter();

  const form = useForm<InputTypeUpdateRole>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      role: undefined,
    },
  });
  const { isLoading, execute } = useAction(updateRole, {
    onSuccess: (data) => {
      if (data.role === "INSTITUTE") {
        router.replace("/onboarding/create-institute");
      } else {
        router.replace("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (values: InputTypeUpdateRole) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="my-10 flex flex-col gap-2 md:flex-row lg:w-4/5"
                >
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="border-input has-[[data-state=checked]]:border-ring relative flex w-full items-start gap-2 rounded-lg border p-4 shadow-sm shadow-black/5"
                    >
                      <div className="flex items-start gap-3">
                        <Image
                          src={item.Icon}
                          width={100}
                          height={100}
                          className={`${index === 1 && "dark:invert"}`}
                          alt={item.label}
                        />
                        <div className="grid grow gap-2">
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                          <p className="text-muted-foreground text-xs tracking-wide">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            className="order-1 after:absolute after:inset-0"
                            value={item.value}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
