import * as React from "react"
import { Star } from "lucide-react"

interface RatingStarsProps {
  rating?: number
  ratingCount?: number
}

/**
 * RatingStars - Small component to display numeric star reviews.
 * Renders five stars (filled vs empty outline) with our deep jewel teal accent color.
 */
export const RatingStars: React.FC<RatingStarsProps> = ({ rating = 5.0, ratingCount = 0 }) => {
  const roundedRating = Math.round(rating)

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < roundedRating
          return (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                isFilled ? "fill-accent stroke-accent" : "text-muted/40 stroke-border"
              }`}
            />
          )
        })}
      </div>
      {ratingCount > 0 && (
        <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest">
          ({ratingCount} Reviews)
        </span>
      )}
    </div>
  )
}