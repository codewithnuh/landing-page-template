"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"


interface InteractiveButtonProps extends React.ComponentProps<typeof Button> {
  text: string
}

export const InteractiveButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveButtonProps
>(({ text, className, variant, size, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("group relative overflow-hidden transition-all", className)}
      {...props}
    >
      {/* The Rolling Text Effect */}
      <div className="relative h-6 overflow-hidden">
        <motion.div
          animate={{ y: isHovered ? "-50%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-col items-center"
        >
          {/* The h-6 matches the container height to ensure perfect alignment */}
          <span className="flex h-6 items-center">{text}</span>
          <span className="flex h-6 items-center">{text}</span>
        </motion.div>
      </div>

      {/* Subtle shine effect - hidden on outline for cleaner look, or kept for flair */}
      <div className="absolute inset-0 z-0 flex h-full w-full [transform:skew(-12deg)_translateX(-100%)] justify-center group-hover:[transform:skew(-12deg)_translateX(100%)] group-hover:duration-1000">
        <div
          className={cn(
            "relative h-full w-8",
            variant === "outline" ? "bg-orange-500/10" : "bg-white/20"
          )}
        />
      </div>
    </Button>
  )
})

InteractiveButton.displayName = "InteractiveButton"
