export const t = {
  // --- Headers ---
  // Large Hero text: Uses a cleaner sans-serif, tight tracking, and medium weight
  display:
    "text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.1] text-foreground",

  // For the "Scaling Brands" or "clarity" look
  displayItalic:
    "font-serif italic font-normal tracking-normal text-foreground",

  // Section Titles (Image 2 style)
  headline:
    "text-4xl sm:text-6xl font-medium tracking-tight leading-tight text-foreground",

  // --- Body & Utility ---
  // Subcopy under hero (Image 1)
  body: "text-lg sm:text-xl text-muted-foreground/90 leading-relaxed font-normal",

  // Small descriptors (e.g., "300+ Scaled Brands")
  caption: "text-sm sm:text-base font-medium text-foreground tracking-tight",

  // Labels / Trust Signals
  label: "text-xs font-bold uppercase tracking-widest text-primary",

  // Buttons: Rounded and clean
  buttonPrimary:
    "px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform active:scale-95",

  buttonSecondary:
    "px-6 py-3 rounded-xl border border-input bg-background font-semibold text-foreground hover:bg-accent",
}
