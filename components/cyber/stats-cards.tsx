"use client"

import { AlertTriangle, Shield, Activity, Users, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Active Threats",
    value: "23",
    change: "+5",
    trend: "up",
    icon: AlertTriangle,
    color: "text-cyber-red",
    bgColor: "bg-cyber-red/10",
  },
  {
    title: "Systems Protected",
    value: "156",
    change: "+12",
    trend: "up",
    icon: Shield,
    color: "text-cyber-green",
    bgColor: "bg-cyber-green/10",
  },
  {
    title: "Network Traffic",
    value: "2.4TB",
    change: "-8%",
    trend: "down",
    icon: Activity,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Users Monitored",
    value: "1,284",
    change: "+48",
    trend: "up",
    icon: Users,
    color: "text-cyber-purple",
    bgColor: "bg-cyber-purple/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-cyber-green" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-cyber-red" />
                )}
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-cyber-green" : "text-cyber-red"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-mono text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
