"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  initialQuery?: string
  onQueryChange?: (query: string) => void
}

export function SearchForm({ initialQuery = "", onQueryChange }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)

  // Update the parent component with the query as user types
  useEffect(() => {
    if (onQueryChange) {
      onQueryChange(query)
    }
  }, [query, onQueryChange])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for movies..."
          className="pl-10 w-full"
          value={query}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

