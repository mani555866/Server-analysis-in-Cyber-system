"use client"

import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Globe,
  Clock,
  Users,
  AlertTriangle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Traffic Data
const trafficData = [
  { day: "Mon", inbound: 4200, outbound: 3800, blocked: 420 },
  { day: "Tue", inbound: 5100, outbound: 4200, blocked: 380 },
  { day: "Wed", inbound: 4800, outbound: 4100, blocked: 520 },
  { day: "Thu", inbound: 6200, outbound: 5100, blocked: 680 },
  { day: "Fri", inbound: 5800, outbound: 4800, blocked: 450 },
  { day: "Sat", inbound: 3200, outbound: 2800, blocked: 280 },
  { day: "Sun", inbound: 2800, outbound: 2400, blocked: 220 },
]

// Attack Types Distribution
const attackTypes = [
  { name: "Brute Force", value: 35, color: "oklch(0.6 0.22 25)" },
  { name: "SQL Injection", value: 25, color: "oklch(0.8 0.18 85)" },
  { name: "XSS", value: 18, color: "oklch(0.65 0.2 280)" },
  { name: "DDoS", value: 12, color: "oklch(0.75 0.18 175)" },
  { name: "Other", value: 10, color: "oklch(0.7 0.2 145)" },
]

// Hourly Attack Pattern
const hourlyAttacks = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  attacks: Math.floor(Math.random() * 50) + 10 + (i >= 9 && i <= 17 ? 30 : 0),
}))

// Top Risky IPs
const riskyIPs = [
  { ip: "203.0.113.42", country: "CN", attacks: 1284, blocked: true, lastSeen: "2 min ago" },
  { ip: "198.51.100.23", country: "RU", attacks: 892, blocked: true, lastSeen: "5 min ago" },
  { ip: "192.0.2.156", country: "BR", attacks: 654, blocked: false, lastSeen: "12 min ago" },
  { ip: "198.51.100.89", country: "US", attacks: 421, blocked: false, lastSeen: "18 min ago" },
  { ip: "203.0.113.78", country: "KR", attacks: 312, blocked: true, lastSeen: "25 min ago" },
]

// Login Pattern Data
const loginPatterns = [
  { time: "00:00", success: 45, failed: 12 },
  { time: "04:00", success: 23, failed: 8 },
  { time: "08:00", success: 156, failed: 34 },
  { time: "12:00", success: 289, failed: 45 },
  { time: "16:00", success: 312, failed: 52 },
  { time: "20:00", success: 178, failed: 28 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Data Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Traffic analysis, attack patterns, and security metrics
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Traffic (24h)</p>
                    <p className="font-mono text-2xl font-bold text-foreground">32.4 TB</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-cyber-green" />
                </div>
                <p className="text-xs text-cyber-green mt-2">+12% from yesterday</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Attacks Blocked</p>
                    <p className="font-mono text-2xl font-bold text-foreground">2,847</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-cyber-red" />
                </div>
                <p className="text-xs text-cyber-red mt-2">+28% from yesterday</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Unique Visitors</p>
                    <p className="font-mono text-2xl font-bold text-foreground">14,582</p>
                  </div>
                  <Users className="h-8 w-8 text-cyber-purple" />
                </div>
                <p className="text-xs text-cyber-green mt-2">+5% from yesterday</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Response Time</p>
                    <p className="font-mono text-2xl font-bold text-foreground">124ms</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-cyber-green mt-2">-8ms from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Traffic Trend */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Weekly Traffic Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                      <XAxis
                        dataKey="day"
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
                      />
                      <Legend />
                      <Bar dataKey="inbound" fill="oklch(0.75 0.18 175)" name="Inbound" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="outbound" fill="oklch(0.65 0.2 280)" name="Outbound" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="blocked" fill="oklch(0.6 0.22 25)" name="Blocked" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Attack Types Distribution */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-cyber-red" />
                  <span className="font-mono text-sm">Attack Type Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attackTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {attackTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(0.12 0.015 240)",
                          border: "1px solid oklch(0.25 0.02 240)",
                          borderRadius: "8px",
                          fontFamily: "monospace",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 ml-4">
                    {attackTypes.map((type) => (
                      <div key={type.name} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: type.color }}
                        />
                        <span className="text-sm text-foreground">{type.name}</span>
                        <span className="text-sm text-muted-foreground">({type.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Charts Row */}
          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            {/* Hourly Attack Pattern */}
            <Card className="bg-card border-border lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Hourly Attack Pattern</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyAttacks}>
                      <defs>
                        <linearGradient id="attackGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                      <XAxis
                        dataKey="hour"
                        tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 10 }}
                        axisLine={{ stroke: "oklch(0.25 0.02 240)" }}
                        interval={3}
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
                      />
                      <Area
                        type="monotone"
                        dataKey="attacks"
                        stroke="oklch(0.6 0.22 25)"
                        fill="url(#attackGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Login Patterns */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyber-purple" />
                  <span className="font-mono text-sm">Login Patterns</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={loginPatterns}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                      <XAxis
                        dataKey="time"
                        tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 10 }}
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
                      />
                      <Line
                        type="monotone"
                        dataKey="success"
                        stroke="oklch(0.7 0.2 145)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="failed"
                        stroke="oklch(0.6 0.22 25)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyber-green" />
                    <span className="text-xs text-muted-foreground">Success</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyber-red" />
                    <span className="text-xs text-muted-foreground">Failed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Risky IPs Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <span className="font-mono text-sm">Top Risky IP Addresses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">IP Address</th>
                      <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Attack Count</th>
                      <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskyIPs.map((ip) => (
                      <tr key={ip.ip} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 font-mono text-sm text-foreground">{ip.ip}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{ip.country}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-foreground">{ip.attacks.toLocaleString()}</span>
                            <div
                              className="h-1.5 rounded-full bg-cyber-red"
                              style={{ width: `${(ip.attacks / 1500) * 100}px`, maxWidth: "100px" }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            className={
                              ip.blocked
                                ? "bg-cyber-red text-foreground"
                                : "bg-cyber-yellow/80 text-background"
                            }
                          >
                            {ip.blocked ? "Blocked" : "Monitoring"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{ip.lastSeen}</td>
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
