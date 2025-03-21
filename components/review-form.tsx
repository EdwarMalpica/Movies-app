"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the form schema with zod
const reviewFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  review: z.string().min(10, { message: "Review must be at least 10 characters" }),
  rating: z.number().min(1, { message: "Please select a rating" }),
})

type ReviewFormValues = z.infer<typeof reviewFormSchema>

interface ReviewFormProps {
  movieId: string
  updateReviews: (name: string, rating: number, review: string) => void
}

export function ReviewForm({ movieId, updateReviews }: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
      rating: 0,
    },
  })

  const onSubmit = async (values: ReviewFormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      updateReviews(values.name, values.rating, values.review)

      // Reset form
      form.reset()
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (hoveredRating || field.value)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

