"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, ArrowRight } from "lucide-react"

export function RiskScore() {
  const riskScore = 67
  const circumference = 2 * Math.PI * 60

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm font-medium text-foreground">Security Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative">
          <svg width="160" height="160" className="-rotate-90">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="oklch(0.18 0.02 240)"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke={riskScore >= 70 ? "oklch(0.7 0.2 145)" : riskScore >= 40 ? "oklch(0.8 0.18 85)" : "oklch(0.6 0.22 25)"}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (riskScore / 100) * circumference}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-4xl font-bold text-foreground">{riskScore}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>

        <div className="mt-4 w-full space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Risk Level</span>
            <span className="font-mono font-medium text-cyber-yellow">MODERATE</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Vulnerabilities</span>
              <span className="font-mono text-cyber-red">12 Critical</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Compliance</span>
              <span className="font-mono text-cyber-green">94%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Last Scan</span>
              <span className="font-mono text-foreground">2h ago</span>
            </div>
          </div>

          <div className="flex items-center gap-1 pt-2 text-xs text-primary cursor-pointer hover:text-primary/80">
            <TrendingUp className="h-3 w-3" />
            <span>View detailed report</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
