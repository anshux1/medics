import { BlurFade } from "@workspace/ui/components/blur-fade";
import { SiteHeader } from "@/components/home/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";

export default function Page() {
  return (
    <div className="w-screen max-w-screen-2xl min-h-svh mx-auto">
      <SiteHeader />
      <BlurFade inView delay={0.1}>
        <HeroSection />
      </BlurFade>
    </div>
  );
}
