"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp } from "lucide-react"
import { searchMovies, getPopularMovies, getTopRatedMovies } from "@/lib/mock-data"

interface MovieGridProps {
  searchQuery?: string
  onSuggestionClick?: (title: string) => void
  isSearching?: boolean
  type?: "popular" | "top-rated" | "search"
}

export function MovieGrid({ searchQuery, onSuggestionClick, isSearching = false, type = "search" }: MovieGridProps) {
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchCache, setSearchCache] = useState<Record<string, any[]>>({})

  useEffect(() => {
    // Skip fetching if we're still typing
    if (isSearching) return

    // Simulate API fetch
    const fetchMovies = async () => {
      setLoading(true)

      // Check if we have cached results for this query
      if (type === "search" && searchQuery && searchCache[searchQuery]) {
        setMovies(searchCache[searchQuery])
        setLoading(false)
        return
      }

      // In a real app, fetch from an API with the search query
      setTimeout(() => {
        let result = []

        if (type === "popular") {
          result = getPopularMovies()
        } else if (type === "top-rated") {
          result = getTopRatedMovies()
        } else if (searchQuery) {
          result = searchMovies(searchQuery)

          // Cache the results
          setSearchCache((prev) => ({
            ...prev,
            [searchQuery]: result,
          }))
        } else {
          result = getPopularMovies()
        }

        setMovies(result)
        setLoading(false)
      }, 500) // Reduced loading time for better UX
    }

    fetchMovies()
  }, [searchQuery, isSearching, searchCache, type])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0 && searchQuery) {
    return (
      <div className="text-center py-8 max-w-2xl mx-auto">
        <div className="bg-muted rounded-lg p-6 mb-8">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No results found for "{searchQuery}"</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any movies matching your search. Try different keywords or browse our suggestions below.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Search tips:</h4>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Check the spelling of your search terms</li>
                <li>Try using more general keywords</li>
                <li>Search by movie title, year, or genre</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Popular movies you might like:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {getPopularMovies(6).map((movie) => (
                  <Button
                    key={movie.id}
                    variant="outline"
                    size="sm"
                    onClick={() => onSuggestionClick && onSuggestionClick(movie.title)}
                  >
                    {movie.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <h3 className="text-lg font-medium">Trending now</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-1">
            {getTopRatedMovies(3).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-1">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

