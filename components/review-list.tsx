"use client"

import { useState, useEffect } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ReviewForm } from "@/components/review-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getReviewsByMovieId } from "@/lib/mock-data"

interface ReviewListProps {
  movieId: string
}

type FilterType = "all" | "positive" | "critical"

export function ReviewList({ movieId }: ReviewListProps) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>("all")

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setTimeout(() => {
        const movieReviews = getReviewsByMovieId(movieId)

        const sortedReviews = [...movieReviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setReviews(sortedReviews)
        setLoading(false)
      }, 1000)
    }

    fetchReviews()
  }, [movieId])

  const handleUpdateReviews = (name: string, rating: number, review: string) => {
    const newReview = {
      id: Date.now(), 
      name: name,
      rating: rating,
      content: review,
      date: new Date().toISOString(),
    }
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
              <div className="flex justify-center md:justify-start">
                <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-none md:flex">
                  <TabsTrigger
                    value="all"
                    className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2 justify-center md:justify-start"
                  >
                    All
                    <Badge variant="secondary" className="ml-1">
                      {reviewCounts.all}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="positive"
                    className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2 justify-center md:justify-start"
                  >
                    <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Positive</span>
                    <Badge variant="secondary" className="ml-1">
                      {reviewCounts.positive}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="critical"
                    className="flex items-center gap-2 px-2 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2 justify-center md:justify-start"
                  >
                    <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Critical</span>
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

