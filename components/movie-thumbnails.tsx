"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MovieThumbnailsProps {
  title: string
  thumbnails: string[]
}

export function MovieThumbnails({ title, thumbnails }: MovieThumbnailsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Thumbnails</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
        {thumbnails.map((thumbnail, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button className="relative min-w-[120px] h-[80px] rounded-md overflow-hidden border hover:opacity-90 transition-opacity">
                <Image
                  src={thumbnail || "/placeholder.svg"}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={thumbnails[currentIndex] || "/placeholder.svg"}
                    alt={`${title} scene ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-black/50"
                    onClick={() => document.querySelector('[data-state="open"] button[aria-label="Close"]')?.click()}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 left-2 flex items-center">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-black/50" onClick={handlePrevious}>
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-black/50" onClick={handleNext}>
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                  {thumbnails.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

