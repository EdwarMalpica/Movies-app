import { SearchForm } from "@/components/search-form"
import { MovieGrid } from "@/components/movie-grid"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">Enter a search term to find movies</p>
        </div>
      )}
    </div>
  )
}

