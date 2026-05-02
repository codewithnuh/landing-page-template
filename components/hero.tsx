import { cn } from "@/lib/utils"
import { Section } from "./primitives/section"
import { AnimatedTooltip } from "./ui/animated-tooltip"
import { Star } from "lucide-react"
import { t } from "@/lib/typography" // Importing our typography object

import { InteractiveButton } from "./ui/interactive-button"
import { Container } from "./primitives/container"

export const Hero = () => {
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Founder @ TechFlow",
      image: "/person1.avif",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Marketing Director",
      image: "/person2.avif",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Creative Lead",
      image: "/person3.avif",
    },
  ]

  return (
    <Section
      as="section"
      spacing="md"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
    >
      <Container size="lg">
        {/* --- Background Layers --- */}
        {/* Matches the dotted texture in Screenshot 2026-05-02 115101.jpg */}
        <div
          className={cn(
            "absolute inset-0 z-0",
            "[background-size:24px_24px]",
            "[background-image:radial-gradient(oklch(0.88_0.003_80)_1.5px,transparent_1.5px)]",
            "dark:bg-[oklch(0.12_0_0)]",
            "dark:[background-image:radial-gradient(oklch(0.25_0_0)_1.5px,transparent_1.5px)]"
          )}
        />
        {/* Soft vignette fade */}
        <div className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(circle_at_center,transparent_0%,#fcf8f1_90%)] dark:[background:radial-gradient(circle_at_center,transparent_0%,oklch(0.12_0_0)_90%)]" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">
          {/* --- Social Proof --- */}
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center">
              <AnimatedTooltip items={people} />
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#e64a00] text-[#e64a00]"
                  />
                ))}
                <span className="ml-2 rounded-md bg-black px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-black">
                  4.9
                </span>
              </div>
              <p className={cn(t.caption, "mt-1")}>300+ Scaled Brands</p>
            </div>
          </div>

          {/* --- Hero Text Content --- */}
          <div className="max-w-5xl space-y-6">
            <h1
              className={cn(
                t.display,
                "leading-[1.05] text-black dark:text-white"
              )}
            >
              On-Demand Design <br />
              <span className="text-black dark:text-white">for </span>
              <span className={t.displayItalic}>Scaling Brands.</span>
            </h1>

            <p className={cn(t.body, "mx-auto max-w-[650px]")}>
              Design subscription, made for those who move fast and scale
              faster. Stop overpaying for agencies and start building your
              vision today.
            </p>
          </div>

          {/* --- Action Buttons --- */}
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <InteractiveButton
              text="Book a call"
              size="lg"
              className="font-semibold ring-primary transition-all"
            />
            <InteractiveButton
              size="lg"
              variant="outline"
              className="font-semibold transition-all"
              text=" See Pricing"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
