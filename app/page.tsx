import { SearchForm } from "@/components/search-form"
import { MovieGrid } from "@/components/movie-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold text-center mb-6">Movie Explorer</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-8">
          Search for your favorite movies, discover new films, and share your thoughts with our community.
        </p>
        <SearchForm />
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Popular Movies</h2>
          <Link href="/search">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <MovieGrid />
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Top Rated</h2>
          <Link href="/search">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <MovieGrid />
      </div>
    </div>
  )
}

