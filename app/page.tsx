import { Hero } from "@/components/hero"

import { ImageCarousel } from "@/components/image-carousel"
import { t } from "@/lib/typography"
import { LogosCarousel } from "@/components/logo-ticker"
import ServiceSection from "@/components/service-section"

export default function Page() {
  return (
    <div className="bg-background">
      <Hero />
      <ImageCarousel />
      <LogosCarousel />
      <ServiceSection />
    </div>
  )
}
