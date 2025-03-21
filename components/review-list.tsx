"use client"

import { useState, useEffect } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ReviewForm } from "@/components/review-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

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
  {
    id: 4,
    name: "Sarah Williams",
    rating: 2,
    date: "2023-11-10",
    content: "I was disappointed with this movie. The plot had too many holes and the pacing was off.",
  },
]

interface ReviewListProps {
  movieId: string
}

type FilterType = "all" | "positive" | "critical"

export function ReviewList({ movieId }: ReviewListProps) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>("all")

  useEffect(() => {
    // Simulate API fetch
    const fetchReviews = async () => {
      setLoading(true)
      // In a real app, fetch from an API based on movieId
      setTimeout(() => {
        // Sort reviews by date (newest first)
        const sortedReviews = [...mockReviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setReviews(sortedReviews)
        setLoading(false)
      }, 1000)
    }

    fetchReviews()
  }, [movieId])

  const handleUpdateReviews = (name: string, rating: number, review: string) => {
    const newReview = {
      id: Date.now(), // Unique ID
      name: name,
      rating: rating,
      content: review,
      date: new Date().toISOString(),
    }
    // Add new review at the beginning (newest first)
    setReviews((prevReviews) => [newReview, ...prevReviews])
  }

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true
    if (filter === "positive") return review.rating >= 4
    if (filter === "critical") return review.rating <= 3
    return true
  })

  const reviewCounts = {
    all: reviews.length,
    positive: reviews.filter((review) => review.rating >= 4).length,
    critical: reviews.filter((review) => review.rating <= 3).length,
  }

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

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="border-b pb-2">
          <h2 className="text-xl font-semibold">User Reviews</h2>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as FilterType)}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    All
                    <Badge variant="secondary" className="ml-1">
                      {reviewCounts.all}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="positive" className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Positive
                    <Badge variant="secondary" className="ml-1">
                      {reviewCounts.positive}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="critical" className="flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    Critical
                    <Badge variant="secondary" className="ml-1">
                      {reviewCounts.critical}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-6">
                {renderReviews(filteredReviews)}
              </TabsContent>
              <TabsContent value="positive" className="mt-6">
                {filteredReviews.length > 0 ? (
                  renderReviews(filteredReviews)
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No positive reviews yet.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="critical" className="mt-6">
                {filteredReviews.length > 0 ? (
                  renderReviews(filteredReviews)
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No critical reviews yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <div className="pt-4">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <ReviewForm movieId={movieId} updateReviews={handleUpdateReviews} />
      </div>
    </div>
  )

  function renderReviews(reviewsToRender: any[]) {
    return (
      <div className="space-y-8">
        {reviewsToRender.map((review) => (
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
    )
  }
}

