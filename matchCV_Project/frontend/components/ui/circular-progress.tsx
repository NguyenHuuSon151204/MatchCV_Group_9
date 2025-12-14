'use client'

interface CircularProgressProps {
  value?: number
  size?: number
  strokeWidth?: number
  showLabel?: boolean
}

export function CircularProgress({
  value,
  size = 60,
  strokeWidth = 6,
  showLabel = true,
}: CircularProgressProps) {
  const normalizedValue = value != null ? Math.min(100, Math.max(0, value)) : null

  if (normalizedValue === null) {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">N/A</span>
        </div>
      </div>
    )
  }

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (normalizedValue / 100) * circumference

  const getColor = (val: number) => {
    if (val >= 80) return '#10b981' // green
    if (val >= 60) return '#3b82f6' // blue
    if (val >= 40) return '#f59e0b' // orange
    return '#ef4444' // red
  }

  const color = getColor(normalizedValue)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold" style={{ color }}>
            {Math.round(normalizedValue)}%
          </span>
        </div>
      )}
    </div>
  )
}
