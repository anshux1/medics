import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import ThemeToggle from "../ThemeToggle";
import { auth, signIn, signOut } from "@/lib/auth";

export async function SiteHeader() {
  const session = await auth()
  console.log(session)
  return (
    <header className="container sticky top-0 backdrop-blur-xl z-40 flex h-16 items-center justify-between py-8 px-6">
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground size-8 rounded flex items-center justify-center font-bold">
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
              "use server"
              await signOut()
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        ) : (
          <form action={async () => {
            "use server"
            try {
              await signIn("google")
            } catch (error) {
              throw error // Rethrow all other errors
            }
          }}>
            <Button variant="outline">Sign in</Button>
          </form>
        )}
      </div>
    </header>
  );
}
