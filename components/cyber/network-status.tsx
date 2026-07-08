"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Network, Server, Database, Globe, Wifi } from "lucide-react"

const systems = [
  {
    name: "Firewall",
    status: "online",
    load: 45,
    icon: Network,
    uptime: "99.9%",
  },
  {
    name: "Web Server",
    status: "online",
    load: 72,
    icon: Server,
    uptime: "99.5%",
  },
  {
    name: "Database",
    status: "online",
    load: 38,
    icon: Database,
    uptime: "99.8%",
  },
  {
    name: "CDN",
    status: "degraded",
    load: 89,
    icon: Globe,
    uptime: "97.2%",
  },
  {
    name: "VPN Gateway",
    status: "online",
    load: 23,
    icon: Wifi,
    uptime: "100%",
  },
]

export function NetworkStatus() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm font-medium text-foreground">System Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systems.map((system) => (
          <div key={system.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <system.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{system.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{system.uptime}</span>
                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      system.status === "online"
                        ? "bg-cyber-green"
                        : system.status === "degraded"
                        ? "bg-cyber-yellow"
                        : "bg-cyber-red"
                    }`}
                  />
                  <span
                    className={`text-xs font-mono ${
                      system.status === "online"
                        ? "text-cyber-green"
                        : system.status === "degraded"
                        ? "text-cyber-yellow"
                        : "text-cyber-red"
                    }`}
                  >
                    {system.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={system.load}
                className="h-1.5 flex-1"
                style={{
                  background: "oklch(0.18 0.02 240)",
                }}
              />
              <span className="text-xs text-muted-foreground w-8">{system.load}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
