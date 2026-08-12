import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** The main editorial headline (serif) */
  title: string
  /** The optional category/collection eyebrow label */
  eyebrow?: string
  /** Optional link href for CTA */
  ctaHref?: string
  /** Optional link label for CTA */
  ctaLabel?: string
  /** Layout alignment: center or left */
  align?: "center" | "left"
  /** Additional custom class names */
  className?: string
}

/**
 * SectionHeading - Reusable editorial section title component.
 * Uses a Playfair Display serif headline + optional uppercase eyebrow + optional animated CTA link.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  eyebrow,
  ctaHref,
  ctaLabel = "Explore Collection",
  align = "center",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-[10px] sm:text-xs font-sans tracking-widest uppercase text-accent mb-3 sm:mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-4xl font-display font-light text-foreground max-w-2xl leading-tight">
        {title}
      </h2>
      {ctaHref && (
        <Link
          to={ctaHref}
          className="group relative inline-flex items-center gap-1 mt-4 text-[10px] font-sans tracking-widest uppercase text-foreground hover:text-accent duration-300"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute bottom-[-4px] left-0 h-[1px] w-full bg-foreground scale-x-100 group-hover:scale-x-0 group-hover:bg-accent origin-left transition-transform duration-300" />
        </Link>
      )}
    </div>
  )
}