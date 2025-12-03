import './CircularProgress.css'

function CircularProgress({ value, size = 60, strokeWidth = 6, showLabel = true }) {
  // Ensure value is between 0 and 100
  const normalizedValue = value != null ? Math.min(100, Math.max(0, value)) : null
  
  if (normalizedValue === null) {
    return (
      <div className="circular-progress" style={{ width: size, height: size }}>
        <div className="circular-progress-content">
          <span className="circular-progress-text">N/A</span>
        </div>
      </div>
    )
  }

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (normalizedValue / 100) * circumference
  
  // Determine color based on score
  const getColor = (val) => {
    if (val >= 80) return '#10b981' // green
    if (val >= 60) return '#3b82f6' // blue
    if (val >= 40) return '#f59e0b' // orange
    return '#ef4444' // red
  }

  const color = getColor(normalizedValue)

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg
        className="circular-progress-svg"
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
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
          className="circular-progress-circle"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      {showLabel && (
        <div className="circular-progress-content">
          <span className="circular-progress-text" style={{ color }}>
            {Math.round(normalizedValue)}%
          </span>
        </div>
      )}
    </div>
  )
}

export default CircularProgress

