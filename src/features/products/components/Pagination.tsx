import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/**
 * Pagination - Minimalist numerical page navigation.
 * Renders back/forth indicators alongside numbered underlines fitting our editorial look.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 mt-16 pb-8">
      {/* Prev Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-9 px-4 text-[10px]"
      >
        <ChevronLeft className="h-3.5 w-3.5 mr-1" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1
          const isActive = pageNum === currentPage
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`h-9 w-9 text-xs font-sans tracking-widest transition-colors duration-300 border-b ${
                isActive
                  ? "border-primary text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-9 px-4 text-[10px]"
      >
        Next
        <ChevronRight className="h-3.5 w-3.5 ml-1" />
      </Button>
    </div>
  )
}