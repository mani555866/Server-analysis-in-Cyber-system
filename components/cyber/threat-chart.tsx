"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { time: "00:00", threats: 12, blocked: 10, suspicious: 45 },
  { time: "04:00", threats: 8, blocked: 7, suspicious: 32 },
  { time: "08:00", threats: 25, blocked: 22, suspicious: 78 },
  { time: "12:00", threats: 45, blocked: 42, suspicious: 120 },
  { time: "16:00", threats: 38, blocked: 35, suspicious: 95 },
  { time: "20:00", threats: 22, blocked: 20, suspicious: 65 },
  { time: "Now", threats: 18, blocked: 16, suspicious: 52 },
]

export function ThreatChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="font-mono text-sm font-medium text-foreground">Threat Activity (24h)</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyber-red" />
              <span className="text-xs text-muted-foreground">Threats</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyber-green" />
              <span className="text-xs text-muted-foreground">Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyber-yellow" />
              <span className="text-xs text-muted-foreground">Suspicious</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.7 0.2 145)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.7 0.2 145)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="suspiciousGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.8 0.18 85)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.8 0.18 85)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
              <XAxis
                dataKey="time"
                tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.25 0.02 240)" }}
              />
              <YAxis
                tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.25 0.02 240)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.12 0.015 240)",
                  border: "1px solid oklch(0.25 0.02 240)",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                }}
                labelStyle={{ color: "oklch(0.95 0.01 240)" }}
              />
              <Area
                type="monotone"
                dataKey="suspicious"
                stroke="oklch(0.8 0.18 85)"
                fill="url(#suspiciousGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="oklch(0.6 0.22 25)"
                fill="url(#threatGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="oklch(0.7 0.2 145)"
                fill="url(#blockedGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
