"use client"

import {
  motion,
  useInView,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react"
import { useRef, useEffect, useState } from "react"
import { Check, ArrowRight, Mail } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/primitives/section-label"
import { cn } from "@/lib/utils"
import { t } from "@/lib/typography"

// ─── MOTION VARIANTS ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const featureVariant = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── PLAN DATA ───────────────────────────────────────────────────────────────

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 1775,
    period: "/month",
    description: "One request at a time. Great for founders and solo teams.",
    spotsAvailable: null,
    dark: false,
    features: [
      "1 active task at a time",
      "48-hour turnaround",
      "Unlimited stock photos",
      "Source files included",
      "Pause or cancel anytime",
    ],
    toggle: { label: "Additional active task", price: "+$500" },
    cta: "Start scaling",
  },
  {
    id: "pro",
    name: "Pro",
    price: 2995,
    period: "/month",
    description:
      "Two requests running in parallel. Built for teams moving fast.",
    spotsAvailable: 2,
    dark: true,
    features: [
      "2 active tasks at a time",
      "24-hour turnaround",
      "Unlimited stock photos",
      "Source files included",
      "Pause or cancel anytime",
    ],
    toggle: { label: "No-code web development", price: "Included" },
    cta: "Start scaling",
  },
]

// ─── ANIMATED PRICE NUMBER ───────────────────────────────────────────────────

function AnimatedPrice({ value, dark }: { value: number; dark: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 55, damping: 20 })
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString("en-US")
  )

  useEffect(() => {
    if (isInView) spring.set(value)
  }, [isInView, value, spring])

  return (
    <span
      ref={ref}
      className={cn(
        "text-5xl font-bold tracking-tight tabular-nums",
        dark ? "text-white" : "text-foreground"
      )}
    >
      $<motion.span>{display}</motion.span>
    </span>
  )
}

// ─── TOGGLE ──────────────────────────────────────────────────────────────────

function PricingToggle({ dark }: { dark: boolean }) {
  const [on, setOn] = useState(false)
  return (
    <button
      onClick={() => setOn((p) => !p)}
      aria-pressed={on}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        on
          ? "border-orange-500 bg-orange-500"
          : dark
            ? "border-white/20 bg-white/10"
            : "border-gray-200 bg-gray-100"
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full shadow",
          on ? "ml-[1.15rem] bg-white" : "ml-[0.15rem] bg-white"
        )}
      />
    </button>
  )
}

// ─── FEATURE ROW ─────────────────────────────────────────────────────────────

function FeatureRow({ text, dark }: { text: string; dark: boolean }) {
  return (
    <motion.li
      variants={featureVariant}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group flex cursor-default items-center gap-3"
    >
      <motion.span
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange-500"
      >
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </motion.span>
      <span
        className={cn(
          "text-sm leading-snug transition-colors duration-200",
          dark
            ? "text-white/70 group-hover:text-white"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {text}
      </span>
    </motion.li>
  )
}

// ─── PRICING CARD ─────────────────────────────────────────────────────────────

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.12,
          },
        },
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border p-7",
        plan.dark
          ? "border-white/[0.06] bg-[#111111] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"
          : "border-gray-200/80 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)]"
      )}
    >
      {/* Subtle inner glow for dark card */}
      {plan.dark && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(255,255,255,0.04),transparent)]" />
      )}

      {/* Card header */}
      <div className="mb-6 flex items-center justify-between">
        <span
          className={cn(
            "rounded-lg px-3 py-1 text-xs font-semibold tracking-wide",
            plan.dark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-600"
          )}
        >
          {plan.name}
        </span>
        {plan.spotsAvailable !== null && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-400">
              {plan.spotsAvailable} Spots Available
            </span>
          </motion.div>
        )}
      </div>

      {/* Price */}
      <div className="mb-1 flex items-baseline gap-1">
        <AnimatedPrice value={plan.price} dark={plan.dark} />
        <span
          className={cn(
            "text-sm",
            plan.dark ? "text-white/40" : "text-muted-foreground"
          )}
        >
          {plan.period}
        </span>
      </div>
      <p
        className={cn(
          "mb-6 text-sm leading-relaxed",
          plan.dark ? "text-white/50" : "text-muted-foreground"
        )}
      >
        {plan.description}
      </p>

      {/* Divider */}
      <div
        className={cn(
          "mb-5 border-t border-dashed",
          plan.dark ? "border-white/10" : "border-gray-200"
        )}
      />

      {/* Features */}
      <motion.ul
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.07,
              delayChildren: 0.3 + index * 0.12,
            },
          },
        }}
        className="mb-6 flex flex-col gap-3"
      >
        {plan.features.map((f) => (
          <FeatureRow key={f} text={f} dark={plan.dark} />
        ))}
      </motion.ul>

      {/* Divider */}
      <div
        className={cn(
          "mb-5 border-t border-dashed",
          plan.dark ? "border-white/10" : "border-gray-200"
        )}
      />

      {/* Toggle row */}
      <div className="mb-7 flex items-center justify-between gap-4">
        <span
          className={cn(
            "text-sm",
            plan.dark ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {plan.toggle.label}
        </span>
        <PricingToggle dark={plan.dark} />
      </div>

      {/* CTA button */}
      <motion.button
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={cn(
          "group relative mt-auto flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold tracking-tight transition-shadow duration-300",
          plan.dark
            ? "bg-orange-500 text-white shadow-[0_4px_16px_rgba(234,88,12,0.35)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.5)]"
            : "border border-orange-500/60 bg-transparent text-orange-500 hover:border-orange-500 hover:shadow-[0_4px_16px_rgba(234,88,12,0.15)]"
        )}
      >
        {/* Shimmer on dark button */}
        {plan.dark && (
          <motion.span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
            whileHover={{ translateX: "200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {plan.cta}
        <motion.span
          className="inline-flex"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </motion.div>
  )
}

// ─── PRICING FOOTER ───────────────────────────────────────────────────────────

function PricingFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-gray-200/80 bg-white px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
          <Mail className="h-4 w-4 text-gray-500" />
        </div>
        <p className="text-sm font-medium text-foreground">
          Prefer to email?{" "}
          <span className="font-normal text-muted-foreground">
            We usually respond within a few hours.
          </span>
        </p>
      </div>
      <motion.a
        href="mailto:hello@studio.com"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="shrink-0 rounded-lg border border-orange-500/50 px-4 py-2 text-sm font-semibold text-orange-500 transition-all duration-200 hover:border-orange-500 hover:bg-orange-50 hover:shadow-[0_2px_10px_rgba(234,88,12,0.12)]"
      >
        Email Us
      </motion.a>
    </motion.div>
  )
}

// ─── PRICING SECTION ─────────────────────────────────────────────────────────

export const PricingSection = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-40px 0px" })

  return (
    <Container>
      <Section
        as="section"
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(234,88,12,0.04) 0%, transparent 60%)",
        }}
      >
        {/* Dot background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#d4d4d4 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative">
          {/* ── Header ── */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={stagger}
            className="mb-14 flex flex-col items-center gap-4 text-center"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Pricing</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className={cn(t.headline, "font-medium")}
            >
              Transparent pricing,{" "}
              <span className={t.displayItalic}>no hidden fees.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className={cn(t.body, "mx-auto max-w-sm text-muted-foreground")}
            >
              Pause or cancel anytime. No contracts, no surprises — just great
              design, fast.
            </motion.p>
          </motion.div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mx-auto lg:max-w-3xl">
            {plans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          {/* ── Footer ── */}
          <div className="lg:mx-auto lg:max-w-3xl">
            <PricingFooter />
          </div>
        </div>
      </Section>
    </Container>
  )
}
