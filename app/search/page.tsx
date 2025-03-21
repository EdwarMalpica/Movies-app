import { SearchForm } from "@/components/search-form"
import { MovieGrid } from "@/components/movie-grid"
import { TrendingUp } from "lucide-react"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Movies</h1>
        <SearchForm initialQuery={query} />
      </div>

      {query ? (
        <>
          <p className="mb-6 text-muted-foreground">
            Showing results for: <span className="font-medium text-foreground">{query}</span>
          </p>
          <MovieGrid searchQuery={query} />
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Trending Movies</h2>
          </div>
          <MovieGrid />
        </div>
      )}
    </div>
  )
}

