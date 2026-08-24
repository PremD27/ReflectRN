'use client';

import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Props {
  data: { emotion: string; count: number }[]
}

const EMOTION_COLORS: Record<string, string> = {
    confident: '#5C6B4A', // sage-600
    happy: '#0ea5e9',     // sky-500
    anxious: '#d97706',   // amber-600
    overwhelmed: '#e11d48', // rose-600
}

export default function EmotionChart({ data }: Props) {
  const coloredData = data.map((item) => ({
    ...item,
    fill: EMOTION_COLORS[item.emotion] ?? '#9ca3af',
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={coloredData}
          dataKey="count"
          nameKey="emotion"
          innerRadius="40%"
          outerRadius="65%"
        />
        <Tooltip
          contentStyle={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span style={{ fontSize: 11, color: '#6b7280' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}