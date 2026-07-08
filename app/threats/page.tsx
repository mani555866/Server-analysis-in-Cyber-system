"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  AlertTriangle,
  Shield,
  Zap,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  RefreshCw,
  Filter,
  Plus,
} from "lucide-react"

interface ThreatEvent {
  id: string
  type: "brute_force" | "ddos" | "insider" | "malware" | "sql_injection" | "xss"
  severity: "critical" | "high" | "medium" | "low"
  status: "active" | "investigating" | "mitigated" | "resolved"
  source: string
  target: string
  description: string
  timestamp: string
  detectionMethod: "rule" | "ml" | "behavioral"
  confidence: number
}

const threatEvents: ThreatEvent[] = [
  {
    id: "THR-001",
    type: "brute_force",
    severity: "critical",
    status: "active",
    source: "203.0.113.42",
    target: "auth-server-01",
    description: "Over 500 failed login attempts in 10 minutes",
    timestamp: "2 min ago",
    detectionMethod: "rule",
    confidence: 98,
  },
  {
    id: "THR-002",
    type: "ddos",
    severity: "critical",
    status: "mitigated",
    source: "Multiple IPs",
    target: "web-frontend",
    description: "Volumetric DDoS attack - 50Gbps traffic spike detected",
    timestamp: "15 min ago",
    detectionMethod: "ml",
    confidence: 95,
  },
  {
    id: "THR-003",
    type: "insider",
    severity: "high",
    status: "investigating",
    source: "user_284",
    target: "customer-db",
    description: "Unusual data export pattern - 50GB downloaded in 1 hour",
    timestamp: "32 min ago",
    detectionMethod: "behavioral",
    confidence: 87,
  },
  {
    id: "THR-004",
    type: "sql_injection",
    severity: "high",
    status: "active",
    source: "198.51.100.23",
    target: "api-gateway",
    description: "SQL injection attempts detected in login endpoint",
    timestamp: "45 min ago",
    detectionMethod: "rule",
    confidence: 92,
  },
  {
    id: "THR-005",
    type: "malware",
    severity: "critical",
    status: "resolved",
    source: "workstation-45",
    target: "internal-network",
    description: "Ransomware signature detected and quarantined",
    timestamp: "1 hour ago",
    detectionMethod: "ml",
    confidence: 99,
  },
  {
    id: "THR-006",
    type: "xss",
    severity: "medium",
    status: "investigating",
    source: "192.0.2.156",
    target: "user-portal",
    description: "Cross-site scripting attempt in comment field",
    timestamp: "2 hours ago",
    detectionMethod: "rule",
    confidence: 85,
  },
  {
    id: "THR-007",
    type: "brute_force",
    severity: "low",
    status: "resolved",
    source: "203.0.113.78",
    target: "ssh-server",
    description: "SSH brute force attempt blocked by fail2ban",
    timestamp: "3 hours ago",
    detectionMethod: "rule",
    confidence: 100,
  },
]

const threatTypeLabels: Record<string, string> = {
  brute_force: "Brute Force",
  ddos: "DDoS Attack",
  insider: "Insider Threat",
  malware: "Malware",
  sql_injection: "SQL Injection",
  xss: "XSS Attack",
}

const severityColors: Record<string, string> = {
  critical: "bg-cyber-red text-foreground",
  high: "bg-cyber-yellow/80 text-background",
  medium: "bg-cyber-purple text-foreground",
  low: "bg-primary text-primary-foreground",
}

const statusColors: Record<string, string> = {
  active: "border-cyber-red text-cyber-red",
  investigating: "border-cyber-yellow text-cyber-yellow",
  mitigated: "border-primary text-primary",
  resolved: "border-cyber-green text-cyber-green",
}

const detectionMethodLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  rule: { label: "Rule-Based", icon: <Shield className="h-3 w-3" /> },
  ml: { label: "ML Detection", icon: <Zap className="h-3 w-3" /> },
  behavioral: { label: "Behavioral", icon: <Users className="h-3 w-3" /> },
}

export default function ThreatsPage() {
  const [threats, setThreats] = useState<ThreatEvent[]>(threatEvents)
  const [selectedTab, setSelectedTab] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    source: "",
    target: "",
    type: "brute_force" as const,
    description: "",
    severity: "medium" as const,
  })

  const filteredThreats =
    selectedTab === "all"
      ? threats
      : threats.filter((t) => t.status === selectedTab)

  const handleCreateThreat = () => {
    if (!formData.source || !formData.target || !formData.description) {
      toast.error("Please fill in all fields")
      return
    }

    const newThreat: ThreatEvent = {
      id: `THR-${String(threats.length + 1).padStart(3, "0")}`,
      type: formData.type,
      severity: formData.severity,
      status: "active",
      source: formData.source,
      target: formData.target,
      description: formData.description,
      timestamp: "now",
      detectionMethod: "ml",
      confidence: Math.floor(Math.random() * 20 + 80),
    }

    setThreats([newThreat, ...threats])
    setFormData({ source: "", target: "", type: "brute_force", description: "", severity: "medium" })
    setShowCreateForm(false)
    toast.success("Threat created successfully!")
  }

  const activeThreats = threats.filter((t) => t.status === "active").length
  const criticalThreats = threats.filter((t) => t.severity === "critical").length
  const mitigatedToday = threats.filter(
    (t) => t.status === "mitigated" || t.status === "resolved"
  ).length

  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-2xl font-bold text-foreground">Threat Detection</h1>
              <p className="text-sm text-muted-foreground">
                Real-time threat monitoring with rule-based and ML detection
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowCreateForm(!showCreateForm)} size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Threat
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Create Threat Form */}
          {showCreateForm && (
            <Card className="mb-6 bg-card border-border">
              <CardHeader>
                <CardTitle>Create Manual Threat Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source IP/User</Label>
                    <Input 
                      placeholder="e.g., 192.168.1.100" 
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      className="bg-input font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target</Label>
                    <Input 
                      placeholder="e.g., api-gateway" 
                      value={formData.target}
                      onChange={(e) => setFormData({...formData, target: e.target.value})}
                      className="bg-input font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Threat Type</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v as any})}>
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brute_force">Brute Force</SelectItem>
                        <SelectItem value="ddos">DDoS Attack</SelectItem>
                        <SelectItem value="insider">Insider Threat</SelectItem>
                        <SelectItem value="malware">Malware</SelectItem>
                        <SelectItem value="sql_injection">SQL Injection</SelectItem>
                        <SelectItem value="xss">XSS Attack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select value={formData.severity} onValueChange={(v) => setFormData({...formData, severity: v as any})}>
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="Describe the threat..." 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-input font-mono"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateThreat}>Create Threat</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Threats</p>
                    <p className="font-mono text-3xl font-bold text-cyber-red">{activeThreats}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-cyber-red/10 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-cyber-red" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Critical Severity</p>
                    <p className="font-mono text-3xl font-bold text-cyber-yellow">{criticalThreats}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-cyber-yellow/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-cyber-yellow" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Mitigated Today</p>
                    <p className="font-mono text-3xl font-bold text-cyber-green">{mitigatedToday}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-cyber-green/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-cyber-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Response Time</p>
                    <p className="font-mono text-3xl font-bold text-primary">4.2m</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Threat Events */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-cyber-red" />
                <span className="font-mono text-sm">Threat Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="bg-secondary mb-4">
                  <TabsTrigger value="all" className="font-mono text-xs">
                    All ({threatEvents.length})
                  </TabsTrigger>
                  <TabsTrigger value="active" className="font-mono text-xs">
                    Active ({threatEvents.filter((t) => t.status === "active").length})
                  </TabsTrigger>
                  <TabsTrigger value="investigating" className="font-mono text-xs">
                    Investigating ({threatEvents.filter((t) => t.status === "investigating").length})
                  </TabsTrigger>
                  <TabsTrigger value="mitigated" className="font-mono text-xs">
                    Mitigated ({threatEvents.filter((t) => t.status === "mitigated").length})
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="font-mono text-xs">
                    Resolved ({threatEvents.filter((t) => t.status === "resolved").length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="mt-0">
                  <div className="space-y-3">
                    {filteredThreats.map((threat) => (
                      <div
                        key={threat.id}
                        className="rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-xs text-muted-foreground">
                                {threat.id}
                              </span>
                              <Badge className={severityColors[threat.severity]}>
                                {threat.severity}
                              </Badge>
                              <Badge variant="outline" className={statusColors[threat.status]}>
                                {threat.status}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary rounded px-2 py-0.5">
                                {detectionMethodLabels[threat.detectionMethod].icon}
                                {detectionMethodLabels[threat.detectionMethod].label}
                              </div>
                            </div>
                            <h4 className="font-medium text-foreground mb-1">
                              {threatTypeLabels[threat.type]}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {threat.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>
                                <strong className="text-foreground">Source:</strong> {threat.source}
                              </span>
                              <span>
                                <strong className="text-foreground">Target:</strong> {threat.target}
                              </span>
                              <span>
                                <strong className="text-foreground">Confidence:</strong>{" "}
                                <span className={threat.confidence >= 90 ? "text-cyber-green" : "text-cyber-yellow"}>
                                  {threat.confidence}%
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {threat.timestamp}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Ban className="h-4 w-4" />
                            </Button>
                            {threat.status === "active" && (
                              <Button size="sm" className="bg-cyber-green hover:bg-cyber-green/90">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Mitigate
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
