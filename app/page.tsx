"use client"

import { useState, useCallback } from "react"
import { SearchForm } from "@/components/search-form"
import { MovieGrid } from "@/components/movie-grid"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleQueryChange = useCallback((query: string) => {
    setIsSearching(true)
    setSearchQuery(query)

    setTimeout(() => {
      setIsSearching(false)
    }, 100)
  }, [])

  const handleSuggestionClick = useCallback((title: string) => {
    setSearchQuery(title)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold text-center mb-6">Movie Explorer</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-8">
          Search for your favorite movies, discover new films, and share your thoughts with our community.
        </p>
        <SearchForm value={searchQuery} onQueryChange={handleQueryChange} />
      </div>

      {searchQuery ? (
        <div className="mb-10">
          <p className="mb-6 text-muted-foreground">
            Showing results for: <span className="font-medium text-foreground">{searchQuery}</span>
          </p>
          <MovieGrid
            searchQuery={searchQuery}
            onSuggestionClick={handleSuggestionClick}
            isSearching={isSearching}
            type="search"
          />
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Popular Movies</h2>
            <MovieGrid onSuggestionClick={handleSuggestionClick} type="popular" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Top Rated</h2>
            <MovieGrid onSuggestionClick={handleSuggestionClick} type="top-rated" />
          </div>
        </>
      )}
    </div>
  )
}

