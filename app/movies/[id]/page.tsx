import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewList } from "@/components/review-list"
import { Badge } from "@/components/ui/badge"
import { getMovieById } from "@/lib/mock-data"

interface MoviePageProps {
  params: { id: string }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = params.id
  const movie = await getMovieById(movieId)

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <p className="mb-6">Sorry, we couldn't find the movie you're looking for.</p>
        <Link href="/">
          <Button>Return to home page</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-4">
      {/* Backdrop */}
      <div className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 z-10" />
        <Image src={movie.backdrop || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
        <div className="container relative z-20 h-full flex flex-col justify-end pb-6 px-4 md:px-6 mx-auto">
          <Link href="/" className="mb-auto mt-4">
            <Button variant="ghost" size="sm" className="gap-1 px-0">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block relative h-[200px] w-[140px] shrink-0 rounded-lg overflow-hidden shadow-lg">
              <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{movie.rating}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.runtime} min</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm">{movie.plot}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">Director:</span> {movie.director}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-4 px-4 md:px-6">
        {/* Cast */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {movie.cast.map((actor) => (
              <Badge key={actor} variant="outline">
                {actor}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <div className="flex justify-center md:justify-start mb-6">
            <TabsList className="md:w-auto w-full grid grid-cols-2 md:grid-cols-none md:flex">
              <TabsTrigger value="photos" className="text-center md:text-left">
                Photos
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-center md:text-left">
                Reviews
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="photos" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.thumbnails.map((thumbnail, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={thumbnail || "/placeholder.svg"}
                    alt={`${movie.title} scene ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8">
            <ReviewList movieId={movieId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

