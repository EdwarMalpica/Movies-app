"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[450px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No movies found matching your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

