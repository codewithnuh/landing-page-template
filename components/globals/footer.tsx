"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── MOTION VARIANTS ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const navColumns = [
  {
    label: "Studio",
    links: [
      { name: "About", href: "#" },
      { name: "Process", href: "#" },
      { name: "Services", href: "#" },
      { name: "Careers", href: "#", badge: "Hiring" },
    ],
  },
  {
    label: "Work",
    links: [
      { name: "Portfolio", href: "#" },
      { name: "Case studies", href: "#" },
      { name: "Clients", href: "#" },
    ],
  },
  {
    label: "Connect",
    links: [
      { name: "Twitter / X", href: "#", external: true },
      { name: "Instagram", href: "#", external: true },
      { name: "Behance", href: "#", external: true },
      { name: "LinkedIn", href: "#", external: true },
    ],
  },
]

const legalLinks = ["Privacy policy", "Terms of service", "Cookie settings"]

// ─── EMAIL INPUT ──────────────────────────────────────────────────────────────

function NewsletterInput() {
  const [value, setValue] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!value.trim()) return
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setValue("")
    }, 3000)
  }

  return (
    <div className="relative flex h-11 w-full max-w-xs overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors duration-300 focus-within:border-white/25 focus-within:bg-white/8">
      <input
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="your@email.com"
        className="flex-1 bg-transparent pl-4 text-sm text-white/80 placeholder-white/30 outline-none"
      />
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="my-1.5 mr-1.5 flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 text-xs font-semibold text-white shadow-[0_2px_8px_rgba(234,88,12,0.4)] transition-shadow duration-300 hover:shadow-[0_4px_14px_rgba(234,88,12,0.55)]"
      >
        {sent ? (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1"
          >
            ✓ Sent
          </motion.span>
        ) : (
          <span className="flex items-center gap-1">
            Subscribe <ArrowRight className="h-3 w-3" />
          </span>
        )}
      </motion.button>
    </div>
  )
}

// ─── NAV LINK ─────────────────────────────────────────────────────────────────

function FooterLink({
  name,
  href,
  external,
  badge,
}: {
  name: string
  href: string
  external?: boolean
  badge?: string
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-1.5 text-sm text-white/45 transition-colors duration-200 hover:text-white"
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span>{name}</span>
      {external && (
        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      )}
      {badge && (
        <span className="rounded-md bg-orange-500/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-orange-400">
          {badge}
        </span>
      )}
    </motion.a>
  )
}

// ─── LARGE WORDMARK ───────────────────────────────────────────────────────────

function Wordmark() {
  const letters = "codewithnuh".split("")
  return (
    <div className="flex items-end overflow-hidden select-none">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.05 + i * 0.035,
          }}
          className={cn(
            "font-serif text-[clamp(3rem,10vw,7.5rem)] leading-none font-bold tracking-tighter",
            "cursor-default text-white/[0.06] transition-colors duration-300 hover:text-white/15"
          )}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" })

  return (
    <footer ref={ref} className="relative w-full overflow-hidden bg-[#0e0e0e]">
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Radial glow — top center */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(234,88,12,0.06),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ── Top section ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 gap-12 border-b border-white/[0.06] py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
        >
          {/* Brand + newsletter column */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 shadow-[0_0_16px_rgba(234,88,12,0.5)]">
                <span className="text-xs font-black text-white">C</span>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                codewithnuh
              </span>
            </div>

            <p className="max-w-[22ch] text-sm leading-relaxed text-white/40">
              Design‑obsessed studio building interfaces that move and convert.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-medium tracking-widest text-white/25 uppercase">
                Stay in the loop
              </p>
              <NewsletterInput />
            </div>
          </motion.div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <motion.div
              key={col.label}
              variants={fadeUp}
              className="flex flex-col gap-4"
            >
              <p className="text-xs font-semibold tracking-widest text-white/25 uppercase">
                {col.label}
              </p>
              <nav className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <FooterLink key={link.name} {...link} />
                ))}
              </nav>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Wordmark ── */}
        <div className="-mx-1 pt-8 pb-0">
          <Wordmark />
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] py-6 sm:flex-row sm:items-center"
        >
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} codewithnuh. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-xs text-white/25 transition-colors duration-200 hover:text-white/60"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
