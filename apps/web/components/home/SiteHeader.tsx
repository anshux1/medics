
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu"
import { cn } from "@workspace/ui/lib/utils"
import ThemeToggle from "../ThemeToggle"

export function SiteHeader() {
  return (
    <header className="container sticky top-0 backdrop-blur-xl z-40 flex h-16 items-center justify-between py-8 px-6">
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground size-8 rounded flex items-center justify-center font-bold">M</div>
          <span className="font-semibold">exxam.io</span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <ThemeToggle />
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign up for free</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

