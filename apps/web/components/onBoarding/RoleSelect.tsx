'use client';

import { OnBoardingComfig } from "@/config/OnBoarding";
import { Label } from "@workspace/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import Image from "next/image";
import { useState } from "react";

export default function RoleSelectCard({ step }: { step: number }) {
  const [selected, setSelected] = useState("1");
  return (
    <RadioGroup
      className={`gap-2 ${step === 1 ? "flex" : "hidden"} my-10 w-4/5`}
      defaultValue={selected}
      onValueChange={setSelected}
    >
      {OnBoardingComfig.step1.items.map((item, index) => (
        <div
          key={index}
          className="border-input has-[[data-state=checked]]:border-ring relative flex w-full items-start gap-2 rounded-lg border p-4 shadow-sm shadow-black/5"
        >
          <RadioGroupItem
            value={item.value}
            id={item.value}
            aria-describedby={`${item.label}-description`}
            className="order-1 after:absolute after:inset-0"
          />
          <div className="flex grow items-start gap-3">
            <Image
              src={item.Icon}
              width={100}
              height={100}
              className={`${index === 1 && "dark:invert"}`}
              alt={item.label}
            />
            <div className="grid grow gap-2">
              <Label htmlFor={`${item.value}-1`}>{item.label}</Label>
              <p
                id={`${item.value}-description`}
                className="text-muted-foreground text-xs tracking-wide"
              >
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  )
};
