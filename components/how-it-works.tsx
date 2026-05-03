import { Calendar } from "lucide-react"
import { Container } from "./primitives/container"
import { Section } from "./primitives/section"
import { SectionLabel } from "./primitives/section-label"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { cn } from "@/lib/utils"
import { ImagesBadge } from "./ui/image-badge"
import { t } from "@/lib/typography"

const steps = [
  {
    number: "01",
    title: "Subscribe",
    description:
      "Choose a plan that suits your needs and request as many designs as you'd like.",
    content: (
      <div className="w-full max-w-[240px] space-y-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {[
          { text: "Flat Monthly Fee" },
          { text: "Unlimited Designs" },
          { text: "Unlimited Revisions" },
        ].map(({ text }, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center gap-3 px-4 py-3",
              idx !== 2 && "border-b border-dashed border-gray-200"
            )}
          >
            <Checkbox checked className="shrink-0 accent-primary" />
            <span className="text-sm font-medium text-gray-700">{text}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    title: "Request",
    description:
      "Submit your design requests through your personal board. We'll get started right away.",
    content: (
      <div className="flex w-full max-w-[240px] flex-col gap-3">
        {[
          { text: "Landing Page", date: "Jan 15", status: "Todo" as const },
          {
            text: "Mobile App UI",
            date: "Jan 10",
            status: "In Progress" as const,
          },
          { text: "Brand Guideline", date: "Jan 8", status: "Review" as const },
        ].map(({ text, date, status }, idx) => {
          const statusStyles = {
            Todo: "bg-blue-50 text-blue-600 border-blue-100",
            "In Progress": "bg-amber-50 text-amber-600 border-amber-100",
            Review: "bg-purple-50 text-purple-600 border-purple-100",
          }
          return (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium tracking-tight text-slate-800">
                  {text}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={10} strokeWidth={2.5} />
                  <span>{date}</span>
                </div>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-lg border px-2 py-0.5 text-[10px] font-semibold tracking-wide",
                  statusStyles[status]
                )}
              >
                {status}
              </span>
            </div>
          )
        })}
      </div>
    ),
  },
  {
    number: "03",
    title: "Receive",
    description:
      "Get production-ready design files delivered directly to your board, on time, every time.",
    content: (
      <ImagesBadge
        folderSize={{ width: 80, height: 70 }}
        teaserImageSize={{ width: 40, height: 34 }}
        hoverImageSize={{ width: 58, height: 42 }}
        images={[
          "/images/service1.avif",
          "/images/service2.avif",
          "/images/service3.avif",
        ]}
      />
    ),
  },
]

export const HowItWorks = () => {
  return (
    <Container>
      <Section as="section">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <div className="mb-10 md:mb-20">
            <SectionLabel className="mb-3 block text-center text-muted-foreground">
              How It Works
            </SectionLabel>
            <h2 className={cn(t.headline, "text-center font-medium!")}>
              <span className={cn(t.displayItalic)}>Good Design</span>, done
              simply delivered fast.
            </h2>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {steps.map(({ number, title, description, content }) => (
            <Card
              key={number}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 p-0 shadow-none transition-shadow duration-300 hover:shadow-md"
            >
              {/* Visual area */}
              <CardContent className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-t-2xl border-b border-gray-100 bg-secondary/30 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:10px_10px] p-6">
                {/* Step number watermark */}
                <span className="pointer-events-none absolute top-3 right-4 font-mono text-5xl font-bold tracking-tighter text-gray-200/80 select-none">
                  {number}
                </span>
                {content}
              </CardContent>

              {/* Footer */}
              <CardFooter className="flex flex-col items-start gap-y-1.5 bg-transparent px-5 py-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-medium text-muted-foreground/60">
                    {number}
                  </span>
                  <span className="text-base font-semibold tracking-tight text-foreground">
                    {title}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </Container>
  )
}
