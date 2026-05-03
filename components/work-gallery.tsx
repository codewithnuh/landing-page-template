"use client"

import { motion, useInView, Variants } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/primitives/section-label"
import { cn } from "@/lib/utils"
import { t } from "@/lib/typography"

// ─── MOTION VARIANTS ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 4, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

// ─── IMAGE DATA ─────────────────────────────────────────────────────────────
// Distribute your images across three columns.
// Each image gets an explicit aspect ratio so the column
// height is stable before the image loads (no layout shift).

type ColImage = { src: string; aspect: "portrait" | "square" | "wide" }

const column1: ColImage[] = [
  { src: "/images/1.avif", aspect: "portrait" },
  { src: "/images/2.webp", aspect: "square" },
  { src: "/images/3.avif", aspect: "portrait" },
  { src: "/images/4.jpg", aspect: "wide" },
  { src: "/images/service1.avif", aspect: "portrait" },
]

const column2: ColImage[] = [
  { src: "/images/2.webp", aspect: "wide" },
  { src: "/images/3.avif", aspect: "portrait" },
  { src: "/images/4.jpg", aspect: "square" },
  { src: "/images/1.avif", aspect: "portrait" },
  { src: "/images/service1.avif", aspect: "wide" },
]

const column3: ColImage[] = [
  { src: "/images/3.avif", aspect: "portrait" },
  { src: "/images/service1.avif", aspect: "square" },
  { src: "/images/1.avif", aspect: "portrait" },
  { src: "/images/2.webp", aspect: "portrait" },
  { src: "/images/4.jpg", aspect: "wide" },
]

const aspectMap: Record<ColImage["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
}

// ─── TYPOGRAPHY TOKENS ──────────────────────────────────────────────────────
// Swap these with your actual `t` import.

// ─── INFINITE COLUMN ────────────────────────────────────────────────────────

interface InfiniteColumnProps {
  images: ColImage[]
  /** "up" → scrolls toward top, "down" → scrolls toward bottom */
  direction: "up" | "down"
  /** seconds for one full loop */
  duration: number
  className?: string
}

function InfiniteColumn({
  images,
  direction,
  duration,
  className,
}: InfiniteColumnProps) {
  // Three copies: the middle copy is always in view at any scroll position,
  // giving us a seamless -33.33% → 0 (down) or 0 → -33.33% (up) loop.
  const tripled = [...images, ...images, ...images]

  const animate =
    direction === "up" ? { y: ["0%", "-33.33%"] } : { y: ["-33.33%", "0%"] }

  return (
    <div className={cn("relative flex-1 overflow-hidden", className)}>
      <motion.div
        animate={animate}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        className="flex flex-col gap-3"
      >
        {tripled.map((img, i) => (
          <div
            key={i}
            className={cn(
              "relative w-full overflow-hidden rounded-xl",
              aspectMap[img.aspect]
            )}
          >
            <Image
              src={img.src}
              alt="Portfolio work"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── WORKS GALLERY SECTION ──────────────────────────────────────────────────

// ─── WORKS GALLERY SECTION ──────────────────────────────────────────────────

export function WorksGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" })

  return (
    <Container>
      <Section as="section" className="flex flex-col gap-10 overflow-hidden">
        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="flex items-start justify-between gap-4"
        >
          <div className="flex flex-col gap-3">
            <motion.div variants={fadeUp}>
              <SectionLabel className="text-secondary">Works</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className={cn(t.headline, "text-left")}
            >
              Collaboration that
              <br />
              <span className={t.displayItalic}> moved the needle.</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* ── Three-column infinite scroll with Mask ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          /* 
             The Magic Happens Here: 
             We use a linear gradient mask from top to bottom.
             transparent -> black (visible) -> black (visible) -> transparent 
          */
          className="relative h-[680px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] sm:h-[760px]"
        >
          <div className="flex h-full gap-3">
            {/* Column 1 — scrolls UP, fastest */}
            <InfiniteColumn images={column1} direction="up" duration={22} />

            {/* Column 2 — scrolls DOWN, medium speed */}
            <InfiniteColumn images={column2} direction="down" duration={28} />

            {/* Column 3 — scrolls UP, slowest */}
            <InfiniteColumn images={column3} direction="up" duration={18} />
          </div>
        </motion.div>
      </Section>
    </Container>
  )
}
