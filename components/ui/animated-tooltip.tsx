"use client"

import React, { useState, useRef } from "react"
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react"
import Image from "next/image"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
  }[]
}) => {
  // 1. STATE: Tracks which avatar is being hovered to show its specific tooltip
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // 2. MOTION VALUES: 'x' is a special observable value that tracks mouse position
  // It doesn't trigger a React re-render, making it extremely high-performance.
  const x = useMotionValue(0)

  // 3. SPRING CONFIG: Controls the "physics" of the movement.
  // Stiffness = how fast it snaps back. Damping = how much it wobbles before stopping.
  const springConfig = { stiffness: 100, damping: 15 }

  // 4. TRANSFORMS: This maps the mouse position to visual effects.
  // When x is -100px, the tooltip rotates -45 degrees and moves -50px horizontally.
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  )

  // 5. PERFORMANCE: Using a Ref and RequestAnimationFrame ensures the calculation
  // runs at the screen's refresh rate (usually 60fps or 120fps) without lag.
  const animationFrameRef = useRef<number | null>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      // Calculate the mouse position relative to the center of the image
      const halfWidth = (event.target as HTMLElement).offsetWidth / 2
      x.set(event.nativeEvent.offsetX - halfWidth)
    })
  }

  return (
    <>
      {items.map((item) => (
        <div
          className="group relative -mr-4" // -mr-4 creates the "stacked" avatar look
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* 6. ANIMATE PRESENCE: Required to animate the exit/removal of the tooltip */}
          <AnimatePresence mode="wait">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }} // Start small and below
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }} // Shrink and fade away
                style={{
                  translateX: translateX, // Follow mouse horizontally
                  rotate: rotate, // Tilt based on mouse position
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-14 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-zinc-900 px-2 py-1 text-sm shadow-xl"
              >
                {/* Decorative Bottom Gradients (The "Glow" under the text) */}
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

                {/* Tooltip Content */}
                <div className="relative z-30 text-base font-bold text-white">
                  {item.name}
                </div>
                <div className="text-xs text-white">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 7. TRIGGER IMAGE: The actual avatar */}
          <Image
            onMouseMove={handleMouseMove} // Update 'x' as the mouse moves
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative m-0! h-14 w-14 rounded-full border-2 border-white object-cover object-top p-0! transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      ))}
    </>
  )
}
