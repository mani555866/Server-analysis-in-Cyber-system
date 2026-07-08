"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Search,
  AlertTriangle,
  Clock,
  Activity,
  Shield,
  TrendingUp,
  TrendingDown,
  Eye,
  Lock,
  FileText,
  Download,
} from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface UserProfile {
  id: string
  name: string
  email: string
  department: string
  role: string
  riskScore: number
  riskLevel: "normal" | "suspicious" | "high-risk"
  lastLogin: string
  loginFrequency: number
  avgSessionDuration: string
  dataAccessVolume: string
  anomalies: number
  loginTimes: { hour: string; count: number }[]
  behaviorMetrics: { metric: string; value: number; baseline: number }[]
}

const users: UserProfile[] = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john.smith@company.com",
    department: "Engineering",
    role: "Senior Developer",
    riskScore: 15,
    riskLevel: "normal",
    lastLogin: "2 hours ago",
    loginFrequency: 22,
    avgSessionDuration: "6.5h",
    dataAccessVolume: "2.3GB",
    anomalies: 0,
    loginTimes: [
      { hour: "08:00", count: 18 },
      { hour: "09:00", count: 4 },
      { hour: "10:00", count: 0 },
    ],
    behaviorMetrics: [
      { metric: "Login Pattern", value: 95, baseline: 90 },
      { metric: "Data Access", value: 88, baseline: 85 },
      { metric: "Session Duration", value: 92, baseline: 90 },
      { metric: "Resource Usage", value: 78, baseline: 75 },
      { metric: "Network Activity", value: 85, baseline: 80 },
    ],
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    department: "Finance",
    role: "Financial Analyst",
    riskScore: 72,
    riskLevel: "suspicious",
    lastLogin: "30 min ago",
    loginFrequency: 45,
    avgSessionDuration: "9.2h",
    dataAccessVolume: "15.8GB",
    anomalies: 3,
    loginTimes: [
      { hour: "06:00", count: 8 },
      { hour: "09:00", count: 12 },
      { hour: "22:00", count: 15 },
      { hour: "23:00", count: 10 },
    ],
    behaviorMetrics: [
      { metric: "Login Pattern", value: 45, baseline: 90 },
      { metric: "Data Access", value: 180, baseline: 85 },
      { metric: "Session Duration", value: 140, baseline: 90 },
      { metric: "Resource Usage", value: 95, baseline: 75 },
      { metric: "Network Activity", value: 120, baseline: 80 },
    ],
  },
  {
    id: "USR-003",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    department: "IT Security",
    role: "Security Admin",
    riskScore: 28,
    riskLevel: "normal",
    lastLogin: "15 min ago",
    loginFrequency: 35,
    avgSessionDuration: "8.1h",
    dataAccessVolume: "5.2GB",
    anomalies: 1,
    loginTimes: [
      { hour: "07:00", count: 5 },
      { hour: "08:00", count: 15 },
      { hour: "09:00", count: 10 },
      { hour: "18:00", count: 5 },
    ],
    behaviorMetrics: [
      { metric: "Login Pattern", value: 88, baseline: 90 },
      { metric: "Data Access", value: 92, baseline: 85 },
      { metric: "Session Duration", value: 95, baseline: 90 },
      { metric: "Resource Usage", value: 110, baseline: 75 },
      { metric: "Network Activity", value: 82, baseline: 80 },
    ],
  },
  {
    id: "USR-004",
    name: "Emily Davis",
    email: "emily.d@company.com",
    department: "HR",
    role: "HR Manager",
    riskScore: 89,
    riskLevel: "high-risk",
    lastLogin: "5 min ago",
    loginFrequency: 68,
    avgSessionDuration: "12.4h",
    dataAccessVolume: "48.5GB",
    anomalies: 8,
    loginTimes: [
      { hour: "02:00", count: 12 },
      { hour: "03:00", count: 15 },
      { hour: "04:00", count: 18 },
      { hour: "09:00", count: 8 },
      { hour: "14:00", count: 5 },
    ],
    behaviorMetrics: [
      { metric: "Login Pattern", value: 25, baseline: 90 },
      { metric: "Data Access", value: 320, baseline: 85 },
      { metric: "Session Duration", value: 180, baseline: 90 },
      { metric: "Resource Usage", value: 150, baseline: 75 },
      { metric: "Network Activity", value: 200, baseline: 80 },
    ],
  },
  {
    id: "USR-005",
    name: "Alex Turner",
    email: "alex.t@company.com",
    department: "Marketing",
    role: "Marketing Lead",
    riskScore: 22,
    riskLevel: "normal",
    lastLogin: "1 hour ago",
    loginFrequency: 18,
    avgSessionDuration: "5.8h",
    dataAccessVolume: "1.8GB",
    anomalies: 0,
    loginTimes: [
      { hour: "09:00", count: 15 },
      { hour: "10:00", count: 3 },
    ],
    behaviorMetrics: [
      { metric: "Login Pattern", value: 92, baseline: 90 },
      { metric: "Data Access", value: 82, baseline: 85 },
      { metric: "Session Duration", value: 88, baseline: 90 },
      { metric: "Resource Usage", value: 72, baseline: 75 },
      { metric: "Network Activity", value: 78, baseline: 80 },
    ],
  },
]

const riskLevelColors: Record<string, string> = {
  "normal": "bg-cyber-green text-background",
  "suspicious": "bg-cyber-yellow text-background",
  "high-risk": "bg-cyber-red text-foreground",
}

const clusterData = [
  { cluster: "Normal", count: 892, percentage: 78 },
  { cluster: "Suspicious", count: 186, percentage: 16 },
  { cluster: "High Risk", count: 68, percentage: 6 },
]

export default function BehaviorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(users[1])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Behavior Analytics</h1>
            <p className="text-sm text-muted-foreground">
              AI-powered user profiling and anomaly detection
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Users</p>
                    <p className="font-mono text-2xl font-bold text-foreground">1,146</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">High Risk Users</p>
                    <p className="font-mono text-2xl font-bold text-cyber-red">68</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-cyber-red" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Anomalies Detected</p>
                    <p className="font-mono text-2xl font-bold text-cyber-yellow">234</p>
                  </div>
                  <Activity className="h-8 w-8 text-cyber-yellow" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Model Accuracy</p>
                    <p className="font-mono text-2xl font-bold text-cyber-green">94.8%</p>
                  </div>
                  <Shield className="h-8 w-8 text-cyber-green" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* User List */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="font-mono text-sm">User Profiles</span>
                  <Badge variant="outline" className="font-mono">
                    {filteredUsers.length} users
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input font-mono text-sm"
                  />
                </div>
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`rounded-lg border p-3 cursor-pointer transition-colors ${
                        selectedUser?.id === user.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{user.name}</span>
                        <Badge className={riskLevelColors[user.riskLevel]}>
                          {user.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{user.department}</span>
                        <span>Risk: {user.riskScore}</span>
                      </div>
                      <Progress
                        value={user.riskScore}
                        className="h-1 mt-2"
                        style={{
                          background: "oklch(0.18 0.02 240)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Details */}
            {selectedUser && (
              <Card className="bg-card border-border lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-foreground">
                          {selectedUser.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{selectedUser.name}</h3>
                        <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-4 w-4" />
                        Monitor
                      </Button>
                      <Button variant="outline" size="sm">
                        <Lock className="mr-1 h-4 w-4" />
                        Lock Account
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* User Info Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-6 p-4 rounded-lg bg-secondary/30">
                    <div>
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="font-mono text-sm text-foreground">{selectedUser.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Role</p>
                      <p className="font-mono text-sm text-foreground">{selectedUser.role}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Login</p>
                      <p className="font-mono text-sm text-foreground">{selectedUser.lastLogin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Risk Score</p>
                      <p className={`font-mono text-sm font-bold ${
                        selectedUser.riskScore >= 70 ? "text-cyber-red" :
                        selectedUser.riskScore >= 40 ? "text-cyber-yellow" : "text-cyber-green"
                      }`}>
                        {selectedUser.riskScore}/100
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 rounded-lg border border-border">
                      <p className="font-mono text-xl font-bold text-foreground">{selectedUser.loginFrequency}</p>
                      <p className="text-xs text-muted-foreground">Logins/Month</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border border-border">
                      <p className="font-mono text-xl font-bold text-foreground">{selectedUser.avgSessionDuration}</p>
                      <p className="text-xs text-muted-foreground">Avg Session</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border border-border">
                      <p className="font-mono text-xl font-bold text-foreground">{selectedUser.dataAccessVolume}</p>
                      <p className="text-xs text-muted-foreground">Data Access</p>
                    </div>
                    <div className="text-center p-3 rounded-lg border border-border">
                      <p className={`font-mono text-xl font-bold ${
                        selectedUser.anomalies > 5 ? "text-cyber-red" :
                        selectedUser.anomalies > 0 ? "text-cyber-yellow" : "text-cyber-green"
                      }`}>
                        {selectedUser.anomalies}
                      </p>
                      <p className="text-xs text-muted-foreground">Anomalies</p>
                    </div>
                  </div>

                  {/* Behavior Radar */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-mono text-sm font-medium text-foreground mb-3">Behavior Profile</h4>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={selectedUser.behaviorMetrics}>
                            <PolarGrid stroke="oklch(0.25 0.02 240)" />
                            <PolarAngleAxis
                              dataKey="metric"
                              tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 10 }}
                            />
                            <PolarRadiusAxis
                              tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 10 }}
                              domain={[0, 200]}
                            />
                            <Radar
                              name="Baseline"
                              dataKey="baseline"
                              stroke="oklch(0.7 0.2 145)"
                              fill="oklch(0.7 0.2 145)"
                              fillOpacity={0.2}
                            />
                            <Radar
                              name="Current"
                              dataKey="value"
                              stroke={selectedUser.riskLevel === "high-risk" ? "oklch(0.6 0.22 25)" : "oklch(0.75 0.18 175)"}
                              fill={selectedUser.riskLevel === "high-risk" ? "oklch(0.6 0.22 25)" : "oklch(0.75 0.18 175)"}
                              fillOpacity={0.3}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-sm font-medium text-foreground mb-3">Login Time Distribution</h4>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={selectedUser.loginTimes}>
                            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                            <XAxis
                              dataKey="hour"
                              tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 10 }}
                              axisLine={{ stroke: "oklch(0.25 0.02 240)" }}
                            />
                            <YAxis
                              tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 10 }}
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
                            <Bar
                              dataKey="count"
                              fill={selectedUser.riskLevel === "high-risk" ? "oklch(0.6 0.22 25)" : "oklch(0.75 0.18 175)"}
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* User Clustering */}
          <Card className="mt-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-mono text-sm">K-Means User Clustering</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {clusterData.map((cluster) => (
                  <div
                    key={cluster.cluster}
                    className="rounded-lg border border-border p-4 text-center"
                  >
                    <div className={`mx-auto mb-3 h-16 w-16 rounded-full flex items-center justify-center ${
                      cluster.cluster === "Normal" ? "bg-cyber-green/20" :
                      cluster.cluster === "Suspicious" ? "bg-cyber-yellow/20" : "bg-cyber-red/20"
                    }`}>
                      <Users className={`h-8 w-8 ${
                        cluster.cluster === "Normal" ? "text-cyber-green" :
                        cluster.cluster === "Suspicious" ? "text-cyber-yellow" : "text-cyber-red"
                      }`} />
                    </div>
                    <h4 className={`font-mono text-lg font-bold ${
                      cluster.cluster === "Normal" ? "text-cyber-green" :
                      cluster.cluster === "Suspicious" ? "text-cyber-yellow" : "text-cyber-red"
                    }`}>
                      {cluster.cluster}
                    </h4>
                    <p className="font-mono text-2xl font-bold text-foreground mt-1">{cluster.count}</p>
                    <p className="text-sm text-muted-foreground">{cluster.percentage}% of users</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
