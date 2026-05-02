import { Hero } from "@/components/hero"
import { Container } from "@/components/primitives/container"
import { ImageCarousel } from "@/components/ui/image-carousel"
export default function Page() {
  return (
    <div className="bg-background">
      <Hero />

      <ImageCarousel />
    </div>
  )
}
