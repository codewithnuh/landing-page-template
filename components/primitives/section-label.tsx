import { cn } from "@/lib/utils"
import { t } from "@/lib/typography" // Your typography object

interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function SectionLabel({
  children,
  className,
  ...props
}: SectionLabelProps) {
  return (
    <span
      className={cn(t.label, "inline-block text-primary", className)}
      {...props}
    >
      {children}
    </span>
  )
}
