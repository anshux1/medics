import { HeroSection } from "@/components/home/HomeHeroSection";
import { HomeSiteHeader } from "@/components/home/HomeSiteHeader";
import { BlurFade } from "@workspace/ui/components/blur-fade";

export default function Page() {
  return (
    <div className="mx-auto min-h-svh w-screen max-w-screen-2xl">
      <HomeSiteHeader />
      <BlurFade inView delay={0.1}>
        <HeroSection />
      </BlurFade>
    </div>
  );
}
