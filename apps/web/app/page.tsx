import { BlurFade } from "@workspace/ui/components/blur-fade";
import { SiteHeader } from "@/components/home/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";

export default function Page() {
  return (
    <div className="w-screen max-w-screen-2xl min-h-svh mx-auto border">
      <SiteHeader />
      <BlurFade inView delay={0.10}>
        <HeroSection />
      </BlurFade>
    </div>
  );
}
