"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { toast } from "sonner"
import { Zap, AlertTriangle, CheckCircle, TrendingUp, Wifi, Clock } from "lucide-react"

interface DDoSEvent {
  timestamp: string
  sourceIp: string
  requestCount: number
  bandwidth: number
  riskLevel: "low" | "medium" | "high" | "critical"
  patterns: string[]
}

interface TrafficData {
  time: string
  normalTraffic: number
  suspiciousTraffic: number
  blockedTraffic: number
}

function generateTrafficData(): TrafficData[] {
  const data: TrafficData[] = []
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      normalTraffic: Math.floor(Math.random() * 1000 + 500),
      suspiciousTraffic: Math.floor(Math.random() * 300 + 100),
      blockedTraffic: Math.floor(Math.random() * 200),
    })
  }
  return data
}

function generateDDoSEvents(): DDoSEvent[] {
  const ips = ["192.168.1.100", "10.0.0.45", "172.16.0.200", "203.0.113.42", "198.51.100.99"]
  const events: DDoSEvent[] = []

  for (let i = 0; i < 8; i++) {
    const requestCount = Math.floor(Math.random() * 10000 + 100)
    let riskLevel: "low" | "medium" | "high" | "critical" = "low"
    const patterns: string[] = []

    if (requestCount > 5000) {
      riskLevel = "critical"
      patterns.push("Abnormal traffic spike (>5000 req/sec)")
    } else if (requestCount > 2000) {
      riskLevel = "high"
      patterns.push("High request frequency detected")
    } else if (requestCount > 500) {
      riskLevel = "medium"
      patterns.push("Elevated traffic pattern")
    } else {
      patterns.push("Normal traffic baseline")
    }

    if (Math.random() > 0.6) {
      patterns.push("Single IP multiple connections")
    }
    if (Math.random() > 0.7) {
      patterns.push("Short connection duration")
    }

    events.push({
      timestamp: new Date(Date.now() - i * 300000).toLocaleTimeString(),
      sourceIp: ips[Math.floor(Math.random() * ips.length)],
      requestCount,
      bandwidth: Math.floor(requestCount * 1.5),
      riskLevel,
      patterns,
    })
  }

  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export default function DDoSDetectionPage() {
  const [trafficData] = useState<TrafficData[]>(generateTrafficData())
  const [ddosEvents, setDdosEvents] = useState<DDoSEvent[]>(generateDDoSEvents())
  const [monitoring, setMonitoring] = useState(true)

  const totalRequests = ddosEvents.reduce((sum, event) => sum + event.requestCount, 0)
  const criticalThreats = ddosEvents.filter((e) => e.riskLevel === "critical").length
  const averageBandwidth = Math.floor(ddosEvents.reduce((sum, event) => sum + event.bandwidth, 0) / ddosEvents.length)

  const handleStartMonitoring = () => {
    setMonitoring(true)
    toast.info("DDoS monitoring started", {
      description: "Real-time traffic analysis enabled",
    })
  }

  const handleStopMonitoring = () => {
    setMonitoring(false)
    toast.info("DDoS monitoring paused")
  }

  const handleBlockIp = (ip: string) => {
    toast.success(`IP ${ip} blocked`, {
      description: "Added to firewall blocklist",
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex-1">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-2xl font-bold text-foreground">DDoS Detection</h1>
              <p className="text-sm text-muted-foreground">
                Real-time distributed denial-of-service attack monitoring
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleStartMonitoring}
                disabled={monitoring}
                variant={monitoring ? "secondary" : "default"}
                className={monitoring ? "" : "bg-primary hover:bg-primary/90"}
              >
                <Wifi className="mr-2 h-4 w-4" />
                Start Monitoring
              </Button>
              <Button onClick={handleStopMonitoring} disabled={!monitoring} variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Stop Monitoring
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid gap-4 lg:grid-cols-4">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Requests</p>
                    <p className="text-2xl font-bold text-foreground font-mono">{totalRequests.toLocaleString()}</p>
                  </div>
                  <Zap className="h-8 w-8 text-cyber-yellow opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Critical Alerts</p>
                    <p className="text-2xl font-bold text-cyber-red font-mono">{criticalThreats}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-cyber-red opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Bandwidth</p>
                    <p className="text-2xl font-bold text-foreground font-mono">{(averageBandwidth / 1000).toFixed(1)} KB/s</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-cyber-cyan opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-card border-border ${monitoring ? "border-cyber-green" : "border-border"}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className={`text-sm font-bold font-mono ${monitoring ? "text-cyber-green" : "text-muted-foreground"}`}>
                      {monitoring ? "MONITORING" : "IDLE"}
                    </p>
                  </div>
                  {monitoring && <div className="h-3 w-3 rounded-full bg-cyber-green animate-pulse" />}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Chart */}
          <Card className="mb-6 bg-card border-border">
            <CardHeader>
              <CardTitle>24-Hour Traffic Analysis</CardTitle>
              <CardDescription>Real-time traffic patterns showing normal vs suspicious requests</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="normalTraffic"
                    stroke="var(--cyber-green)"
                    strokeWidth={2}
                    name="Normal Traffic"
                  />
                  <Line
                    type="monotone"
                    dataKey="suspiciousTraffic"
                    stroke="var(--cyber-yellow)"
                    strokeWidth={2}
                    name="Suspicious Traffic"
                  />
                  <Line
                    type="monotone"
                    dataKey="blockedTraffic"
                    stroke="var(--cyber-red)"
                    strokeWidth={2}
                    name="Blocked Traffic"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detection Methods */}
          <div className="mb-6 grid gap-6 lg:grid-cols-3">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Traffic Spike Detection</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                <p>✓ Normal baseline: 50 req/sec</p>
                <p>✓ Alert threshold: 500 req/sec</p>
                <p>✓ Critical threshold: 5000 req/sec</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">IP Frequency Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                <p>✓ Detect single IP attacks</p>
                <p>✓ Track request frequency</p>
                <p>✓ Identify botnet patterns</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Connection Pattern</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                <p>✓ Rapid connection cycling</p>
                <p>✓ Short duration connections</p>
                <p>✓ Unusual port targeting</p>
              </CardContent>
            </Card>
          </div>

          {/* DDoS Events */}
          <div className="space-y-4">
            <h2 className="font-mono text-lg font-bold text-foreground">Detected Attack Events</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {ddosEvents.map((event, idx) => (
                <Card key={idx} className="bg-card border-border">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-mono text-sm text-foreground">{event.sourceIp}</p>
                          <Badge
                            variant={
                              event.riskLevel === "critical"
                                ? "destructive"
                                : event.riskLevel === "high"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {event.riskLevel.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                        </div>

                        <div className="grid gap-2 lg:grid-cols-2 text-xs mb-3">
                          <div>
                            <p className="text-muted-foreground">Request Rate</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={(event.requestCount / 10000) * 100} className="flex-1 h-1.5" />
                              <span className="font-mono text-foreground">{event.requestCount} req/sec</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Bandwidth</p>
                            <span className="font-mono text-foreground">{(event.bandwidth / 1000).toFixed(1)} KB/s</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          {event.patterns.map((pattern, i) => (
                            <p key={i} className="text-cyber-red">
                              🚨 {pattern}
                            </p>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBlockIp(event.sourceIp)}
                        className="ml-4"
                      >
                        Block IP
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
