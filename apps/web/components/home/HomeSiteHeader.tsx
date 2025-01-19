import Link from "next/link";

import { auth, signIn, signOut } from "@/lib/auth";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@workspace/ui/components/button";

export async function HomeSiteHeader() {
  const session = await auth();
  return (
    <header className="container sticky top-0 z-40 flex h-16 items-center justify-between px-6 py-8 backdrop-blur-xl">
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded font-bold">
            M
          </div>
          <span className="font-semibold">exxam.io</span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <ThemeToggle />
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button variant="outline">Sign in</Button>
          </form>
        )}
      </div>
    </header>
  );
}
