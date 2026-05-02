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

// --- Mock Data ---
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

// --- Individual Card Component ---
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

  // Maps the scroll of the entire section to this specific card's scale
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      className="sticky top-10 flex h-screen items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(5vh + ${i * 28}px)`, // Creates the "stacked tabs" look
          zIndex: i,
        }}
        className="relative w-full max-w-5xl origin-top"
      >
        <Card className="overflow-hidden rounded-[2.5rem] border border-none border-slate-100 bg-white shadow-2xl">
          <CardContent className="p-4 md:p-10">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-slate-50 md:aspect-square">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col space-y-6 text-left">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                    {title}
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex h-auto w-fit items-center gap-3 rounded-full border-none px-5 py-3 text-slate-700" // Added h-auto and increased gap/padding
                    >
                      <CheckCircle2
                        fill="#e64a00"
                        className="size-5 shrink-0 text-white" // size-7 is 28px. shrink-0 prevents the flexbox from squishing it.
                      />
                      <span className="text-lg font-medium">{tag}</span>{" "}
                      {/* Increased text size to match the big icon */}
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

// --- Main Section Component ---
export default function StackedServiceSection() {
  const mainContainer = useRef(null)

  const { scrollYProgress } = useScroll({
    target: mainContainer,
    offset: ["start start", "end end"],
  })

  return (
    <Container>
      <h2 className={cn(t.headline, "text-center")}>
        We help brands show up with{" "}
        <span className={cn(t.displayItalic)}>clarity</span>,<br />
        <span className={cn(t.displayItalic)}>confidence</span>, and
        <span className={cn(t.displayItalic)}> design </span> that actually
        works.
      </h2>
      <main ref={mainContainer} className="relative px-4">
        {services.map((service, i) => {
          // targetScale: ensures cards underneath get smaller as new ones stack
          const targetScale = 1 - (services.length - i) * 0.04

          return (
            <StickyCard
              key={`card_${i}`}
              i={i}
              {...service}
              progress={scrollYProgress}
              range={[i * 0.25, 1]} // Trigger timing based on index
              targetScale={targetScale}
            />
          )
        })}
      </main>
    </Container>
  )
}
