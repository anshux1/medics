"use client";

import { useId, useState } from "react";
import Image from "next/image";

import { OnBoardingComfig } from "@/config/OnBoarding";
import { BlurOut } from "@workspace/ui/components/blur-out";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import { Textarea } from "@workspace/ui/components/textarea";
import { WordFadeIn } from "@workspace/ui/components/word-fade-in";

export default function Component() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("1");
  const [animateSelectCard, setAnimateSelectCard] = useState<
    "hidden" | "visible"
  >("visible");
  const [animateForm, setAnimateForm] = useState<"hidden" | "visible">(
    "visible",
  );
  const id = useId();

  const hendleContinue = () => {
    setStep(2);
    setAnimateSelectCard("hidden");
    setAnimateForm("visible");
  };
  const handleBack = () => {
    setStep(1);
    setAnimateSelectCard("visible");
    setAnimateForm("hidden");
  };
  return (
    <div className="p-10">
      <WordFadeIn
        words={
          step === 1
            ? OnBoardingComfig.step1.heading
            : OnBoardingComfig.step2.heading
        }
        className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight lg:text-5xl"
      />
      <h3 className="w-3/5 leading-7 opacity-80 [&:not(:first-child)]:mt-6">
        {step === 1
          ? OnBoardingComfig.step1.description
          : OnBoardingComfig.step2.description}
      </h3>
      <BlurOut animate={animateSelectCard}>
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
                  alt="asdf"
                />
                <div className="grid grow gap-2">
                  <Label htmlFor={`${item.value}-1`}>{item.label}</Label>
                  <p
                    id={`${id}-1-description`}
                    className="text-muted-foreground text-xs tracking-wide"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </BlurOut>
      <BlurOut animate={animateForm}>
        <div
          className={`${step === 1 ? "hidden" : "block"} my-10 max-w-xl space-y-4`}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="email"
              placeholder="XYZ Coaching Center"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A description of the institute and its purpose."
              className="min-h-20"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="xyz@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" type="email" placeholder="Patna" required />
          </div>
        </div>
      </BlurOut>
      <div className="flex gap-2">
        <Button
          onClick={handleBack}
          variant="outline"
          className={`${step === 2 && "visible"}`}
        >
          Back
        </Button>
        <Button onClick={hendleContinue}>
          {step === 2 ? "Create" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
