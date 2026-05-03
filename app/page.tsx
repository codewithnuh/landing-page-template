import { Hero } from "@/components/hero"

import { ImageCarousel } from "@/components/image-carousel"

import { LogosCarousel } from "@/components/logo-ticker"
import ServiceSection from "@/components/service-section"
import { HowItWorks } from "@/components/how-it-works"
import { WorksGallery } from "@/components/work-gallery"
import { PricingSection } from "@/components/pricing-section"

export default function Page() {
  return (
    <div className="bg-background">
      <Hero />
      <ImageCarousel />
      <LogosCarousel />
      <ServiceSection />
      <HowItWorks />
      <WorksGallery />
      <PricingSection />
    </div>
  )
}
