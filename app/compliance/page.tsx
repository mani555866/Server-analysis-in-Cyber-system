"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Search, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

interface ComplianceStandard {
  id: string
  name: string
  status: "compliant" | "warning" | "non-compliant"
  score: number
  lastAudit: string
  nextAudit: string
  violations: number
}

const standards: ComplianceStandard[] = [
  {
    id: "gdpr",
    name: "GDPR",
    status: "compliant",
    score: 94,
    lastAudit: "2 weeks ago",
    nextAudit: "In 2 months",
    violations: 1,
  },
  {
    id: "hipaa",
    name: "HIPAA",
    status: "compliant",
    score: 96,
    lastAudit: "1 month ago",
    nextAudit: "In 3 months",
    violations: 0,
  },
  {
    id: "pci-dss",
    name: "PCI-DSS",
    status: "warning",
    score: 87,
    lastAudit: "3 weeks ago",
    nextAudit: "In 1 month",
    violations: 3,
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    status: "compliant",
    score: 92,
    lastAudit: "1 week ago",
    nextAudit: "In 3 months",
    violations: 2,
  },
  {
    id: "sox",
    name: "SOX",
    status: "non-compliant",
    score: 76,
    lastAudit: "2 days ago",
    nextAudit: "Urgent",
    violations: 5,
  },
]

const complianceHistory = [
  { month: "Jan", gdpr: 92, hipaa: 94, pci: 85, iso: 90, sox: 80 },
  { month: "Feb", gdpr: 93, hipaa: 95, pci: 86, iso: 91, sox: 78 },
  { month: "Mar", gdpr: 94, hipaa: 96, pci: 87, iso: 92, sox: 76 },
  { month: "Apr", gdpr: 94, hipaa: 96, pci: 87, iso: 92, sox: 76 },
]

export default function CompliancePage() {
  const [standards_, setStandards] = useState<ComplianceStandard[]>(standards)

  const compliantCount = standards_.filter((s) => s.status === "compliant").length
  const warningCount = standards_.filter((s) => s.status === "warning").length
  const nonCompliantCount = standards_.filter((s) => s.status === "non-compliant").length
  const avgScore = (standards_.reduce((acc, s) => acc + s.score, 0) / standards_.length).toFixed(1)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <CyberSidebar />
      <div className="flex-1 overflow-auto">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Compliance Monitoring</h1>
            <p className="text-sm text-muted-foreground">
              Monitor GDPR, HIPAA, PCI-DSS, ISO 27001, and SOX compliance status
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{avgScore}%</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyber-green" />
                  Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-green">{compliantCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-cyber-yellow" />
                  Warning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-yellow">{warningCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-cyber-red" />
                  Non-Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-red">{nonCompliantCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-purple">{standards_.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Trend Chart */}
          <Card className="mb-6 bg-card border-border">
            <CardHeader>
              <CardTitle>Compliance Score Trends</CardTitle>
              <CardDescription>4-month compliance history</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={complianceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Legend />
                  <Line type="monotone" dataKey="gdpr" stroke="var(--cyber-green)" strokeWidth={2} />
                  <Line type="monotone" dataKey="hipaa" stroke="var(--cyber-cyan)" strokeWidth={2} />
                  <Line type="monotone" dataKey="pci" stroke="var(--cyber-yellow)" strokeWidth={2} />
                  <Line type="monotone" dataKey="iso" stroke="var(--cyber-purple)" strokeWidth={2} />
                  <Line type="monotone" dataKey="sox" stroke="var(--cyber-red)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Standards Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Compliance Standards Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {standards_.map((standard) => (
                  <div key={standard.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-mono font-bold text-foreground">{standard.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            standard.status === "compliant"
                              ? "bg-cyber-green/20 text-cyber-green border-cyber-green/50"
                              : standard.status === "warning"
                              ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/50"
                              : "bg-cyber-red/20 text-cyber-red border-cyber-red/50"
                          }
                        >
                          {standard.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-foreground">{standard.score}%</p>
                        <p className="text-xs text-muted-foreground">{standard.violations} violations</p>
                      </div>
                    </div>
                    <Progress value={standard.score} className="h-2 mb-3" />
                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                      <span>Last Audit: {standard.lastAudit}</span>
                      <span>Next Audit: {standard.nextAudit}</span>
                    </div>
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
