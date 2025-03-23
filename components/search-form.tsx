"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  value?: string
  onQueryChange?: (query: string) => void
}

export function SearchForm({ value = "", onQueryChange }: SearchFormProps) {
  const [localQuery, setLocalQuery] = useState(value)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Update local state when value prop changes (for suggestion clicks)
  useEffect(() => {
    setLocalQuery(value)
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onQueryChange) {
      onQueryChange(localQuery)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // Always update local state immediately for responsive typing
    setLocalQuery(newValue)

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set a new timer to update parent state after user stops typing
    debounceTimerRef.current = setTimeout(() => {
      if (onQueryChange) {
        onQueryChange(newValue)
      }
    }, 500) // Increased debounce time to 500ms for better performance
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for movies..."
          className="pl-10 w-full"
          value={localQuery}
          onChange={handleChange}
          onKeyDown={(e) => {
            // Submit search on Enter key
            if (e.key === "Enter") {
              if (onQueryChange) {
                onQueryChange(localQuery)
              }
              // Clear any pending debounce
              if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
                debounceTimerRef.current = null
              }
            }
          }}
        />
      </div>
    </form>
  )
}

