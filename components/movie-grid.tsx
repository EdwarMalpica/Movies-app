"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from an API
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    poster: "/placeholder.svg?height=450&width=300",
    year: 2010,
    rating: 8.8,
    thumbnails: [
      "/placeholder.svg?height=100&width=150&text=Scene+1",
      "/placeholder.svg?height=100&width=150&text=Scene+2",
    ],
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    poster: "/placeholder.svg?height=450&width=300",
    year: 1994,
    rating: 9.3,
    thumbnails: [
      "/placeholder.svg?height=100&width=150&text=Scene+1",
      "/placeholder.svg?height=100&width=150&text=Scene+2",
    ],
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "/placeholder.svg?height=450&width=300",
    year: 2008,
    rating: 9.0,
    thumbnails: [
      "/placeholder.svg?height=100&width=150&text=Scene+1",
      "/placeholder.svg?height=100&width=150&text=Scene+2",
    ],
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "/placeholder.svg?height=450&width=300",
    year: 1994,
    rating: 8.9,
    thumbnails: [
      "/placeholder.svg?height=100&width=150&text=Scene+1",
      "/placeholder.svg?height=100&width=150&text=Scene+2",
    ],
  },
  {
    id: 5,
    title: "Interstellar",
    poster: "/placeholder.svg?height=450&width=300",
    year: 2014,
    rating: 8.6,
    thumbnails: [
      "/placeholder.svg?height=100&width=150&text=Scene+1",
      "/placeholder.svg?height=100&width=150&text=Scene+2",
    ],
  },
  {
    id: 6,
    title: "The Matrix",
    poster: "/placeholder.svg?height=450&width=300",
    year: 1999,
    rating: 8.7,
    thumbnails: [
      "/placeholder.svg?height=100&width=150&text=Scene+1",
      "/placeholder.svg?height=100&width=150&text=Scene+2",
    ],
  },
]

interface MovieGridProps {
  searchQuery?: string
}

export function MovieGrid({ searchQuery }: MovieGridProps) {
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchMovies = async () => {
      setLoading(true)

      // In a real app, fetch from an API with the search query
      setTimeout(() => {
        let filteredMovies = mockMovies

        // Filter movies if search query is provided
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filteredMovies = mockMovies.filter(
            (movie) => movie.title.toLowerCase().includes(query) || movie.year.toString().includes(query),
          )
        }

        setMovies(filteredMovies)
        setLoading(false)
      }, 1000)
    }

    fetchMovies()
  }, [searchQuery])

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
                {mockMovies.map((movie) => (
                  <Link key={movie.id} href={`/search?q=${encodeURIComponent(movie.title)}`}>
                    <Button variant="outline" size="sm">
                      {movie.title}
                    </Button>
                  </Link>
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
            {mockMovies.slice(0, 3).map((movie) => (
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

