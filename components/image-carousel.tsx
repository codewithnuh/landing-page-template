"use client"

import Image from "next/image"
import AutoScroll from "embla-carousel-auto-scroll"
import { useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const images = [
  { src: "/images/1.avif" },
  { src: "/images/2.webp" },
  { src: "/images/3.avif" },
  { src: "/images/4.jpg" },
]

const loopImages = [...images, ...images, ...images]

export function ImageCarousel() {
  const emblaApiRef = useRef<CarouselApi>(null)

  const autoScroll = useMemo(
    () =>
      AutoScroll({
        playOnInit: false,
        speed: 0.8,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  )

  useEffect(() => {
    if (!emblaApiRef.current) return
    const autoScrollApi = emblaApiRef.current.plugins()?.autoScroll
    if (!autoScrollApi) return
    autoScrollApi.play()
  }, [])

  return (
    <div className="group relative w-full overflow-visible py-10">
      {/* 
        PREMIUM MASK: 
        Ensuring the mask is always top-level and doesn't clip shadows
      */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-full"
        style={{
          maskImage: `linear-gradient(to right, transparent, black 15%, black 85%, transparent)`,
          WebkitMaskImage: `linear-gradient(to right, transparent, black 15%, black 85%, transparent)`,
        }}
      />

      <Carousel
        setApi={(api) => (emblaApiRef.current = api)}
        plugins={[autoScroll]}
        opts={{
          loop: true,
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6">
          {loopImages.map((img, i) => (
            <CarouselItem
              key={i}
              /* 
                FIX: Use fixed pixel widths for large screens (2xl:basis-[350px]) 
                instead of percentages. This keeps them proportional to your text.
              */
              className="basis-[70%] pl-4 sm:basis-1/2 sm:pl-6 md:basis-1/3 lg:basis-1/4 2xl:basis-[350px]"
            >
              <div className="group/card relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/5 bg-muted transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
                <Image
                  src={img.src}
                  alt="Portfolio Work"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 350px"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
