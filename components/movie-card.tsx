import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    <div className="w-full">
      <Link href={`/movies/${movie.id}`}>
        <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-3">
            <h3 className="font-semibold line-clamp-1 text-sm">{movie.title}</h3>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-muted-foreground text-xs">{movie.year}</span>
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <Star className="h-2.5 w-2.5 fill-current" />
                {movie.rating}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

