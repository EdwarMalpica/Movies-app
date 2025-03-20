import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MovieCardProps {
  movie: {
    id: number
    title: string
    poster: string
    year: number
    rating: number
    thumbnails?: string[]
  }
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-muted-foreground">{movie.year}</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {movie.rating}
            </Badge>
          </div>

          <div className="flex items-center justify-center mt-3">
            <Button variant="ghost" width="100%">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

