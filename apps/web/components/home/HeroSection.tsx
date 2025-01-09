import Link from "next/link";

import { Button } from "@workspace/ui/components/button";
import { InteractiveGridPattern } from "@workspace/ui/components/interactive-grid-pattern";
import { cn } from "@workspace/ui/lib/utils";

export function HeroSection() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="absolute inset-0" />
      <div className="container relative flex flex-col items-center justify-center space-y-10 py-32 text-center">
        <div className="z-10 space-y-6">
          <div className="mx-auto">
            <span className="text-primary inline-block text-sm font-medium">
              PRODUCT & MANAGEMENT EXAM TOOL
            </span>
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            An AI-powered solution for online exam challenges.
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-lg sm:text-xl">
            This platform is optimized for educators and students, offering
            efficiency, accuracy, and user-friendliness, making it ideal for the
            digital era.
          </p>
        </div>
        <div className="z-10 flex flex-col justify-center gap-4 min-[400px]:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">Sign up for free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard">See Exxam.io in action</Link>
          </Button>
        </div>
      </div>
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
        )}
        width={50}
        height={50}
        squares={[80, 80]}
        squaresClassName="hover:fill-neutral-300 dark:hover:fill-neutral-700"
      />
    </div>
  );
}
