"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    id: 1,
    type: "Brute Force",
    message: "Multiple failed login attempts from 192.168.1.100",
    severity: "critical",
    time: "2 min ago",
    status: "active",
  },
  {
    id: 2,
    type: "Port Scan",
    message: "Sequential port scan detected on server-01",
    severity: "high",
    time: "15 min ago",
    status: "investigating",
  },
  {
    id: 3,
    type: "DDoS",
    message: "Unusual traffic spike from multiple IPs",
    severity: "high",
    time: "32 min ago",
    status: "mitigated",
  },
  {
    id: 4,
    type: "Insider Threat",
    message: "Abnormal data access pattern by user_284",
    severity: "medium",
    time: "1 hour ago",
    status: "investigating",
  },
  {
    id: 5,
    type: "Malware",
    message: "Suspicious file detected on workstation-45",
    severity: "critical",
    time: "2 hours ago",
    status: "quarantined",
  },
]

const severityColors: Record<string, string> = {
  critical: "bg-cyber-red text-foreground",
  high: "bg-cyber-yellow/80 text-background",
  medium: "bg-cyber-purple text-foreground",
  low: "bg-cyber-green text-background",
}

const statusColors: Record<string, string> = {
  active: "border-cyber-red text-cyber-red",
  investigating: "border-cyber-yellow text-cyber-yellow",
  mitigated: "border-cyber-green text-cyber-green",
  quarantined: "border-cyber-purple text-cyber-purple",
}

export function AlertsPanel() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-cyber-red" />
            <span className="font-mono text-sm font-medium text-foreground">Live Alerts</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start justify-between rounded-lg border border-border bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Badge className={severityColors[alert.severity]}>{alert.type}</Badge>
                <Badge variant="outline" className={statusColors[alert.status]}>
                  {alert.status}
                </Badge>
              </div>
              <p className="text-sm text-foreground">{alert.message}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {alert.time}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
