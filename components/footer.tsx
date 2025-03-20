import Link from "next/link"
import { Film, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 font-semibold">
            <Film className="h-5 w-5" />
            <span>Movie Explorer</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Movie Explorer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

