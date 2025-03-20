import Link from "next/link"
import { Film } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Film className="h-6 w-6" />
          <span>Movie Explorer</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="ghost" size="sm">
              Search
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

