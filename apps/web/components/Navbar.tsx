import { Button } from "@workspace/ui/components/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="h-16 px-4 flex sticky top-0 justify-between">
      <div className="flex items-center gap-4">
        <Image src="https://prepmedics.blob.core.windows.net/prepmedics/botany.png" alt="Logo" width={40} height={40} />
        <h1 className="font-semibold text-3xl">testMedics.in</h1>
      </div>
      <div className="p-4 flex gap-2">
        <Button size="lg" variant="outline" className="py-3 backdrop-blur-xl px-4">Login</Button>
        <Button size="lg" className="text-white py-3 px-4 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 focus:outline-none font-medium rounded-lg text-center">Sign up for free</Button>
      </div>
    </div>
  )
}

