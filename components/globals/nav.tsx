import { Hamburger, Menu } from "lucide-react"
import { Container } from "../primitives/container"
import { Section } from "../primitives/section"
import Link from "next/link"
import { Button } from "../ui/button"
import { InteractiveButton } from "../ui/interactive-button"

export const NavBar = () => {
  const NavItems = [
    {
      href: "/",
      label: "home",
    },
    {
      href: "/#about",
      label: "about",
    },
    {
      href: "/#services",
      label: "services",
    },
    {
      href: "/#pricing",
      label: "pricing",
    },
    {
      href: "/#faq",
      label: "FAQ",
    },
  ]
  return (
    <header className="sticky top-0 right-0 left-0 z-50 mx-auto bg-transparent py-4 backdrop-blur-2xl">
      <Container>
        <nav className="flex items-center justify-between">
          <span className="text-2xl font-bold">LOGO</span>
          <Section
            as="div"
            spacing="none"
            className="hidden items-center space-x-4 rounded-md px-3 py-1 shadow-sm md:flex"
          >
            {NavItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="rounded-md px-2 py-1 capitalize transition-colors duration-200 hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </Section>
          <InteractiveButton
            size={"lg"}
            className="hidden shadow-md focus:ring md:block"
            text="Get Started"
          />

          <Menu className="md:hidden" width={40} height={40} />
        </nav>
      </Container>
    </header>
  )
}
