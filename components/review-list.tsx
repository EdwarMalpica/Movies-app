"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ReviewForm } from "@/components/review-form"

// Mock data - in a real app, this would come from an API
const mockReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2023-10-15",
    content: "One of the best movies I've ever seen. The concept is mind-blowing and the execution is flawless.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "2023-09-22",
    content: "Great movie with an interesting concept. The visuals are stunning and the acting is superb.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 3,
    date: "2023-08-05",
    content: "It's a good movie, but I found the plot a bit confusing at times. Still worth watching though.",
  },
]

interface ReviewListProps {
  movieId: string
}

export function ReviewList({ movieId }: ReviewListProps) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchReviews = async () => {
      setLoading(true)
      // In a real app, fetch from an API based on movieId
      setTimeout(() => {
        setReviews(mockReviews)
        setLoading(false)
      }, 1000)
    }

    fetchReviews()
  }, [movieId])

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  const handleUpdateReviews = (name: string, rating: number, review: string) => {
    const newReview = {
      id: Date.now(), // Unique ID
      name: name,
      rating: rating,
      content: review,
      date: new Date().toISOString(),
    }
    setReviews((prevReviews) => [...prevReviews, newReview])
  }

  return (
    <div>
      <ReviewForm movieId={movieId} updateReviews={handleUpdateReviews} />
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">User Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    {review.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="mt-2">{review.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

