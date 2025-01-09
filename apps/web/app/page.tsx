import { HeroSection } from "@/components/home/HeroSection";
import { SiteHeader } from "@/components/home/SiteHeader";
import { BlurFade } from "@workspace/ui/components/blur-fade";

export default function Page() {
  return (
    <div className="mx-auto min-h-svh w-screen max-w-screen-2xl">
      <SiteHeader />
      <BlurFade inView delay={0.1}>
        <HeroSection />
      </BlurFade>
    </div>
  );
}
