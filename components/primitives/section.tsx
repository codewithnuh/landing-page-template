import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "header" | "footer"
  spacing?: "sm" | "md" | "lg" | "none"
}

export function Section({
  as: Tag = "section",
  spacing = "md",
  className,
  ...props
}: SectionProps) {
  const spacings = {
    none: "py-0",
    // Best for small sections or cards
    sm: "py-8 md:py-12",
    // Standard section spacing for general content
    md: "py-16 md:py-20 lg:py-24",
    // Hero spacing: enough to feel big, but keeps the CTA above the fold
    lg: "py-20 md:py-28 lg:py-32",
  }

  return <Tag className={cn(spacings[spacing], className)} {...props} />
}
