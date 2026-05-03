"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, MotionValue } from "motion/react"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Container } from "./primitives/container"
import { t } from "@/lib/typography"

// --- Types ---
interface ServiceData {
  title: string
  description: string
  imageUrl: string
  tags: string[]
}

interface CardProps extends ServiceData {
  i: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

const services: ServiceData[] = [
  {
    title: "Brand Identity",
    description:
      "We help founders shape how their brand looks, sounds, and feels. From logo to typography to colors, we craft a system that’s distinct and built to grow.",
    imageUrl: "/images/service1.avif",
    tags: ["Colour Palette", "Logo", "Business Collateral", "Mockup"],
  },
  {
    title: "Web Development",
    description:
      "Building high-performance, accessible, and scalable web applications using modern frameworks that provide a seamless user experience across all devices.",
    imageUrl: "/images/service2.avif",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "UI/UX Engineering",
    description:
      "Creating intuitive interfaces and engaging micro-interactions that turn complex workflows into simple, delightful experiences for your users.",
    imageUrl: "/images/service3.avif",
    tags: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
]

const StickyCard = ({
  i,
  title,
  description,
  imageUrl,
  tags,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      /* Changed h-screen to min-h-[70vh] for mobile safety */
      className="sticky top-0 flex min-h-[80vh] items-center justify-center py-10 md:h-screen md:py-0"
    >
      <motion.div
        style={{
          scale,
          /* Dynamic top offset: smaller gaps on mobile, larger on desktop */
          top: `calc(2vh + ${i * 12}px)`,
          zIndex: i,
        }}
        /* origin-top is critical for the stacking effect */
        className="relative w-full max-w-5xl origin-top px-2 md:px-0"
      >
        <Card className="overflow-hidden rounded-[1.5rem] border-none bg-white shadow-xl md:rounded-[2.5rem] md:shadow-2xl">
          <CardContent className="p-5 md:p-10">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
              {/* Image Section: Responsive Aspect Ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-50 md:aspect-square md:rounded-3xl">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col space-y-4 md:space-y-6">
                <div className="space-y-2 md:space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-5xl">
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                    {description}
                  </p>
                </div>

                {/* Tags: Smaller on mobile */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex h-auto items-center gap-1.5 rounded-full border-none px-3 py-1.5 text-[10px] text-slate-700 sm:text-xs md:gap-3 md:px-5 md:py-3 md:text-lg"
                    >
                      <CheckCircle2
                        fill="#e64a00"
                        className="size-3 shrink-0 text-white md:size-5"
                      />
                      <span className="font-medium">{tag}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function StackedServiceSection() {
  const mainContainer = useRef(null)

  const { scrollYProgress } = useScroll({
    target: mainContainer,
    offset: ["start start", "end end"],
  })

  return (
    <Container className="py-10 md:py-20">
      <div className="mb-10 md:mb-20">
        <h2 className={cn(t.headline, "text-center")}>
          We help brands show up with{" "}
          <span className={cn(t.displayItalic)}>clarity</span>,
          <br className="hidden md:block" />
          <span className={cn(t.displayItalic)}> confidence</span>, and
          <span className={cn(t.displayItalic)}> design </span> that actually
          works.
        </h2>
      </div>

      <main
        ref={mainContainer}
        /* Total scrollable height depends on card count. 
           Mobile gets a bit more "breathing room" height. */
        className="relative min-h-[300vh] px-2 md:px-4"
      >
        {services.map((service, i) => {
          const targetScale = 1 - (services.length - i) * 0.04
          return (
            <StickyCard
              key={`card_${i}`}
              i={i}
              {...service}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </main>
    </Container>
  )
}
