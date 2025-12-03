'use client'

interface ScoreCircleProps {
  score?: number
  size?: number
}

export function ScoreCircle({ score = 0, size = 56 }: ScoreCircleProps) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const clampedScore = Math.min(Math.max(score, 0), 100)
  const progress = (clampedScore / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          stroke="var(--color-border)"
          strokeWidth="6"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="url(#scoreGradient)"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${progress} ${circumference}`}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-chart-3)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-xs font-semibold text-foreground">{clampedScore}</span>
    </div>
  )
}

