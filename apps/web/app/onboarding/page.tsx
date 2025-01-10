import { OnBoardingComfig } from "@/config/OnBoarding";
import { OnboardingRoleSelectCard } from "@/components/onBoarding/OnboardingRoleSelect";
import { BlurOut } from "@workspace/ui/components/blur-out";
import { WordFadeIn } from "@workspace/ui/components/word-fade-in";

export default function Component() {
  const config = OnBoardingComfig.step1;
  return (
    <div className="p-10">
      <WordFadeIn
        words={config.heading}
        className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight lg:text-5xl"
      />
      <h3 className="w-11/12 leading-7 opacity-80 md:w-3/5 [&:not(:first-child)]:mt-6">
        {config.description}
      </h3>
      <BlurOut animate={"visible"}>
        <OnboardingRoleSelectCard />
      </BlurOut>
    </div>
  );
}
