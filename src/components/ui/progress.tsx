import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number
    max?: number
    fill?: string
    indicatorClassName?: string
  }
>(({ className, value = 0, max = 100, fill, indicatorClassName, ...props }, ref) => {
  // Calculate the percentage
  const percentage = (value / max) * 100
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-indigo-600 transition-all",
          indicatorClassName
        )}
        style={{ 
          width: `${percentage}%`,
          backgroundColor: fill || undefined
        }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }