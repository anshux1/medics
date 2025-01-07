import Link from "next/link"
import { Button } from "@workspace/ui/components/button"

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/80 to-purple-50/90" />
      <div className="relative container flex flex-col items-center justify-center space-y-10 py-32 text-center">
        <div className="space-y-6">
          <div className="mx-auto">
            <span className="inline-block text-sm font-medium text-primary">
              PRODUCT & MANAGEMENT EXAM TOOL
            </span>
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            An AI-powered solution for online exam challenges.
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            This platform is optimized for educators and students, offering efficiency, accuracy,
            and user-friendliness, making it ideal for the digital era.
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">
              Sign up for free
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">
              See Exxam.io in action
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

