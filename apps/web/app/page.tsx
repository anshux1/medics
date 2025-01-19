import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { HeroSection } from "@/components/home/HomeHeroSection";
import { HomeSiteHeader } from "@/components/home/HomeSiteHeader";
import { BlurFade } from "@workspace/ui/components/blur-fade";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    if (user?.onBoarded) {
      redirect("/dashboard");
    } else {
      redirect("/onboarding");
    }
  }
  return (
    <div className="mx-auto min-h-svh w-screen max-w-screen-2xl">
      <HomeSiteHeader />
      <BlurFade inView delay={0.1}>
        <HeroSection />
      </BlurFade>
    </div>
  );
}
