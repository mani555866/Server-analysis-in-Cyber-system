"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { toast } from "sonner"
import { Database, AlertTriangle, Shield, Code, Play, Filter } from "lucide-react"

interface SQLInjectionAttempt {
  id: string
  timestamp: string
  sourceIP: string
  targetDatabase: string
  payload: string
  riskLevel: "critical" | "high" | "medium" | "low"
  blocked: boolean
  detectionMethod: string
}

const sqlAttempts: SQLInjectionAttempt[] = [
  {
    id: "SQLI-001",
    timestamp: "2 min ago",
    sourceIP: "192.168.1.105",
    targetDatabase: "users_db",
    payload: "' OR '1'='1",
    riskLevel: "critical",
    blocked: true,
    detectionMethod: "Regex + WAF",
  },
  {
    id: "SQLI-002",
    timestamp: "15 min ago",
    sourceIP: "10.0.0.45",
    targetDatabase: "products_db",
    payload: "UNION SELECT * FROM admin",
    riskLevel: "high",
    blocked: true,
    detectionMethod: "Pattern Recognition",
  },
  {
    id: "SQLI-003",
    timestamp: "1 hour ago",
    sourceIP: "172.16.0.88",
    targetDatabase: "transactions_db",
    payload: "DROP TABLE users;--",
    riskLevel: "critical",
    blocked: true,
    detectionMethod: "Behavioral Analysis",
  },
]

const injectionTrends = [
  { time: "00:00", attempts: 12, blocked: 12, success: 0 },
  { time: "04:00", attempts: 18, blocked: 17, success: 1 },
  { time: "08:00", attempts: 24, blocked: 23, success: 1 },
  { time: "12:00", attempts: 35, blocked: 35, success: 0 },
  { time: "16:00", attempts: 28, blocked: 27, success: 1 },
  { time: "20:00", attempts: 31, blocked: 31, success: 0 },
  { time: "24:00", attempts: 19, blocked: 19, success: 0 },
]

export default function SQLInjectionPage() {
  const [attempts, setAttempts] = useState<SQLInjectionAttempt[]>(sqlAttempts)
  const [testPayload, setTestPayload] = useState("")
  const [testDatabase, setTestDatabase] = useState("")

  const blockedCount = attempts.filter((a) => a.blocked).length
  const criticalCount = attempts.filter((a) => a.riskLevel === "critical").length
  const blockRate = attempts.length > 0 ? ((blockedCount / attempts.length) * 100).toFixed(1) : "0"

  const testInjection = () => {
    if (!testPayload.trim() || !testDatabase.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    const newAttempt: SQLInjectionAttempt = {
      id: `SQLI-${String(attempts.length + 1).padStart(3, "0")}`,
      timestamp: "now",
      sourceIP: "127.0.0.1",
      targetDatabase: testDatabase,
      payload: testPayload,
      riskLevel: testPayload.includes("DROP") || testPayload.includes("DELETE") ? "critical" : "high",
      blocked: true,
      detectionMethod: "Manual Test",
    }

    setAttempts([newAttempt, ...attempts])
    setTestPayload("")
    setTestDatabase("")
    toast.success("Injection test logged and blocked")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <CyberSidebar />
      <div className="flex-1 overflow-auto">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">SQL Injection Detection</h1>
            <p className="text-sm text-muted-foreground">
              Advanced SQL injection prevention with WAF, pattern recognition, and behavioral analysis
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-cyber-red" />
                  Total Attempts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-red">{attempts.length}</p>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  Blocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{blockedCount}</p>
                <p className="text-xs text-muted-foreground">All prevented</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Code className="h-4 w-4 text-cyber-yellow" />
                  Critical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-yellow">{criticalCount}</p>
                <p className="text-xs text-muted-foreground">High severity</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Filter className="h-4 w-4 text-cyber-green" />
                  Block Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-green">{blockRate}%</p>
                <p className="text-xs text-muted-foreground">Protection rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Test Form */}
          <Card className="mb-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Test SQL Injection Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Database</Label>
                  <Input
                    placeholder="e.g., users_db"
                    value={testDatabase}
                    onChange={(e) => setTestDatabase(e.target.value)}
                    className="bg-input font-mono"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>SQL Payload to Test</Label>
                <Textarea
                  placeholder="e.g., ' OR '1'='1"
                  value={testPayload}
                  onChange={(e) => setTestPayload(e.target.value)}
                  className="bg-input font-mono"
                  rows={3}
                />
              </div>
              <Button onClick={testInjection} className="bg-primary hover:bg-primary/90">
                <Play className="mr-2 h-4 w-4" />
                Test Detection
              </Button>
            </CardContent>
          </Card>

          {/* Trends Chart */}
          <Card className="mb-6 bg-card border-border">
            <CardHeader>
              <CardTitle>SQL Injection Attempts & Block Rate</CardTitle>
              <CardDescription>24-hour trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={injectionTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Legend />
                  <Line type="monotone" dataKey="attempts" stroke="var(--cyber-red)" strokeWidth={2} />
                  <Line type="monotone" dataKey="blocked" stroke="var(--cyber-green)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attempts Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Recent SQL Injection Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">ID</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Time</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Source IP</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Database</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Payload</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Risk</th>
                      <th className="text-left py-2 px-3 font-mono text-xs font-bold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.map((attempt) => (
                      <tr key={attempt.id} className="border-b border-border hover:bg-secondary/50">
                        <td className="py-2 px-3 font-mono text-xs text-primary">{attempt.id}</td>
                        <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{attempt.timestamp}</td>
                        <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{attempt.sourceIP}</td>
                        <td className="py-2 px-3 font-mono text-xs text-foreground">{attempt.targetDatabase}</td>
                        <td className="py-2 px-3 font-mono text-xs text-cyber-red truncate max-w-xs">{attempt.payload}</td>
                        <td className="py-2 px-3">
                          <Badge
                            variant="outline"
                            className={
                              attempt.riskLevel === "critical"
                                ? "bg-cyber-red/20 text-cyber-red border-cyber-red/50"
                                : "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/50"
                            }
                          >
                            {attempt.riskLevel.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-2 px-3">
                          <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/50 border">
                            BLOCKED
                          </Badge>
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
