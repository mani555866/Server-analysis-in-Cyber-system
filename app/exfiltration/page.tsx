"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AlertTriangle, Eye, Lock, TrendingUp, Users } from "lucide-react"

interface ExfiltrationEvent {
  id: string
  timestamp: string
  user: string
  dataType: string
  volume: string
  riskLevel: "critical" | "high" | "medium" | "low"
  destination: string
  blocked: boolean
}

const exfilEvents: ExfiltrationEvent[] = [
  {
    id: "EXF-001",
    timestamp: "3 min ago",
    user: "john.doe@company.com",
    dataType: "Customer Database (PII)",
    volume: "2.3 GB",
    riskLevel: "critical",
    destination: "Unknown FTP Server",
    blocked: true,
  },
  {
    id: "EXF-002",
    timestamp: "25 min ago",
    user: "jane.smith@company.com",
    dataType: "Financial Records",
    volume: "856 MB",
    riskLevel: "high",
    destination: "Cloud Storage (Suspicious)",
    blocked: true,
  },
  {
    id: "EXF-003",
    timestamp: "2 hours ago",
    user: "admin@company.com",
    dataType: "API Keys & Credentials",
    volume: "12.4 MB",
    riskLevel: "critical",
    destination: "GitHub Repository",
    blocked: false,
  },
]

const exfilTrends = [
  { time: "00:00", volume: 120, attempts: 5, blocked: 5 },
  { time: "04:00", volume: 245, attempts: 8, blocked: 7 },
  { time: "08:00", volume: 356, attempts: 12, blocked: 11 },
  { time: "12:00", volume: 428, attempts: 15, blocked: 14 },
  { time: "16:00", volume: 512, attempts: 18, blocked: 17 },
  { time: "20:00", volume: 634, attempts: 22, blocked: 21 },
  { time: "24:00", volume: 745, attempts: 25, blocked: 24 },
]

const dataBreakdown = [
  { name: "Database Records", value: 2300, color: "var(--cyber-red)" },
  { name: "Financial Data", value: 856, color: "var(--cyber-yellow)" },
  { name: "Credentials", value: 124, color: "var(--cyber-purple)" },
  { name: "Source Code", value: 445, color: "var(--cyber-green)" },
]

export default function ExfiltrationPage() {
  const [events, setEvents] = useState<ExfiltrationEvent[]>(exfilEvents)

  const criticalEvents = events.filter((e) => e.riskLevel === "critical").length
  const blockedCount = events.filter((e) => e.blocked).length
  const totalVolume = events.reduce((acc, e) => {
    const value = parseInt(e.volume.split(" ")[0])
    return acc + value
  }, 0)

  const blockEvent = (id: string) => {
    setEvents(
      events.map((e) =>
        e.id === id ? { ...e, blocked: true } : e
      )
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <CyberSidebar />
      <div className="flex-1 overflow-auto">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Data Exfiltration Detection</h1>
            <p className="text-sm text-muted-foreground">
              Monitor unauthorized data access and prevent sensitive information leaks
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-cyber-red" />
                  Critical Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-red">{criticalEvents}</p>
                <p className="text-xs text-muted-foreground">Requires investigation</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Lock className="h-4 w-4 text-primary" />
                  Blocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{blockedCount}</p>
                <p className="text-xs text-muted-foreground">Successfully prevented</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-cyber-yellow" />
                  Data Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-yellow">{totalVolume} MB</p>
                <p className="text-xs text-muted-foreground">Attempted exfiltration</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-cyber-green" />
                  Users Involved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-green">3</p>
                <p className="text-xs text-muted-foreground">Suspicious behavior</p>
              </CardContent>
            </Card>
          </div>

          {/* Data Breakdown & Trends */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Data Types at Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={dataBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}MB`} outerRadius={80} dataKey="value">
                      {dataBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Exfiltration Trends</CardTitle>
                <CardDescription>24-hour data volume analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={exfilTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                    <Area type="monotone" dataKey="volume" fill="var(--cyber-red)" stroke="var(--cyber-red)" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Events Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Detected Exfiltration Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">ID</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Time</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">User</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Data Type</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Volume</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Destination</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Risk</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b border-border hover:bg-secondary/50">
                        <td className="py-2 px-3 font-mono text-xs text-primary">{event.id}</td>
                        <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{event.timestamp}</td>
                        <td className="py-2 px-3 font-mono text-xs text-foreground">{event.user}</td>
                        <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{event.dataType}</td>
                        <td className="py-2 px-3 font-mono text-xs text-cyber-red font-bold">{event.volume}</td>
                        <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{event.destination}</td>
                        <td className="py-2 px-3">
                          <Badge
                            variant="outline"
                            className={
                              event.riskLevel === "critical"
                                ? "bg-cyber-red/20 text-cyber-red border-cyber-red/50"
                                : "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/50"
                            }
                          >
                            {event.riskLevel.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-2 px-3">
                          {event.blocked ? (
                            <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/50 border">BLOCKED</Badge>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => blockEvent(event.id)} className="h-6 text-xs">
                              Block Now
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
