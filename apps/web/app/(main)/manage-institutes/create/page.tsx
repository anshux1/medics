import { OnBoardingComfig } from "@/config/OnBoarding";
import { auth } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OnboardingCreateInstitute } from "@/components/onBoarding/OnboardingCreateInstitute";
import { BlurOut } from "@workspace/ui/components/blur-out";
import { WordFadeIn } from "@workspace/ui/components/word-fade-in";

export default async function Component() {
  const config = OnBoardingComfig.step2;
  const session = await auth();
  console.log(session);
  return (
    <div>
      <DashboardHeader />
      <div className="p-4 md:p-7">
        <WordFadeIn
          words={config.heading}
          className="scroll-m-20 text-start text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
        />
        <h3 className="w-11/12 leading-7 opacity-80 md:w-3/5 [&:not(:first-child)]:mt-3 md:[&:not(:first-child)]:mt-6">
          {config.description}
        </h3>
        <BlurOut animate="visible">
          <OnboardingCreateInstitute navigateLink="/manage-institutes" />
        </BlurOut>
      </div>
    </div>
  );
}
