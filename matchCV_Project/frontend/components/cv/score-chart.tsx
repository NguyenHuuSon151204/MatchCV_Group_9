'use client'

import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface ScoreChartProps {
  score: number
}

export function ScoreChart({ score }: ScoreChartProps) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ]

  const COLORS = ['var(--color-primary)', 'var(--color-muted)']

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Average Score</h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ value }) => `${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <p className="text-3xl font-bold">{score}%</p>
        <p className="text-sm text-muted-foreground">Overall Match Score</p>
      </div>
    </Card>
  )
}

