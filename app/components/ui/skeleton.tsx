"use client"

import { cn } from "@/app/lib/utils"    

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional width of the skeleton
   * Can be a string (e.g., "100%", "200px") or a number (interpreted as pixels)
   */
  width?: string | number
  /**
   * Optional height of the skeleton
   * Can be a string (e.g., "100%", "200px") or a number (interpreted as pixels)
   */
  height?: string | number
  /**
   * Optional border radius of the skeleton
   * Can be a string (e.g., "8px", "50%") or a number (interpreted as pixels)
   */
  radius?: string | number
  /**
   * Whether the skeleton should be circular
   */
  circle?: boolean
  /**
   * Whether the skeleton should have a pulsing animation
   * @default true
   */
  animate?: boolean
}

/**
 * A skeleton loader component for displaying loading states
 */
export function Skeleton({
  className,
  width,
  height,
  radius,
  circle = false,
  animate = true,
  ...props
}: SkeletonProps) {
  // Convert number values to pixel strings
  const widthStyle = typeof width === 'number' ? `${width}px` : width
  const heightStyle = typeof height === 'number' ? `${height}px` : height
  const radiusStyle = typeof radius === 'number' ? `${radius}px` : radius || (circle ? '50%' : undefined)

  return (
    <div
      className={cn(
        "bg-muted/60 relative overflow-hidden",
        animate && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-muted-foreground/10 before:to-transparent",
        className
      )}
      style={{
        width: widthStyle,
        height: heightStyle,
        borderRadius: radiusStyle,
        ...(circle && { aspectRatio: '1/1' })
      }}
      {...props}
    />
  )
}

/**
 * A text skeleton component for displaying loading states for text
 */
export function TextSkeleton({
  className,
  lines = 1,
  lastLineWidth = "100%",
  ...props
}: SkeletonProps & { 
  lines?: number
  lastLineWidth?: string | number
}) {
  const lastWidth = typeof lastLineWidth === 'number' ? `${lastLineWidth}px` : lastLineWidth
  
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", className)}
          style={{
            width: i === lines - 1 && lines > 1 ? lastWidth : "100%"
          }}
          {...props}
        />
      ))}
    </div>
  )
}

/**
 * A card skeleton component for displaying loading states for cards
 */
export function CardSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("space-y-5 rounded-xl border p-4", className)} {...props}>
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <TextSkeleton lines={3} lastLineWidth="60%" />
      </div>
      <div className="pt-4 flex justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

/**
 * A profile skeleton component for displaying loading states for user profiles
 */
export function ProfileSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("flex items-center space-x-4", className)} {...props}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  )
}

/**
 * A table skeleton component for displaying loading states for tables
 */
export function TableSkeleton({ 
  className, 
  rows = 5, 
  columns = 4,
  ...props 
}: SkeletonProps & { 
  rows?: number
  columns?: number
}) {
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex gap-4 pb-2">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-8" style={{ width: `${100 / columns}%` }} />
        ))}
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 py-2">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton 
                key={colIndex} 
                className="h-6" 
                style={{ width: `${100 / columns}%` }} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
} 