import Image from "next/image"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const carouselImages = [
  { src: "/placeholder.svg", alt: "Special offer 1", text: "First can on us." },
  { src: "/placeholder.svg", alt: "Special offer 2", text: "New flavors available!" },
  { src: "/placeholder.svg", alt: "Special offer 3", text: "Subscribe and save 10%" },
]

export function MainCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative">
      <Carousel className="w-full" selectedIndex={activeIndex} setSelectedIndex={setActiveIndex}>
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full" style={{ height: "50vh" }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-start justify-start bg-black/20 p-6 text-white">
                  <div className="max-w-xl space-y-4">
                    <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                      {image.text}
                    </h1>
                    {index === 0 && (
                      <Button className="bg-white text-black hover:bg-white/90">
                        Shop Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  )
}