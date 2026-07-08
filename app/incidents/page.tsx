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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Activity, Plus, Clock, AlertTriangle, CheckCircle, Eye } from "lucide-react"

interface Incident {
  id: string
  title: string
  status: "open" | "investigating" | "resolved" | "closed"
  severity: "critical" | "high" | "medium" | "low"
  createdAt: string
  resolvedAt: string | null
  assignee: string
  description: string
  affectedSystems: string[]
}

const initialIncidents: Incident[] = [
  {
    id: "INC-001",
    title: "Unauthorized Database Access Attempt",
    status: "investigating",
    severity: "critical",
    createdAt: "2 hours ago",
    resolvedAt: null,
    assignee: "Security Team Lead",
    description: "Multiple failed login attempts detected on production database",
    affectedSystems: ["database-primary", "api-gateway"],
  },
  {
    id: "INC-002",
    title: "DDoS Attack on API Endpoint",
    status: "resolved",
    severity: "high",
    createdAt: "5 hours ago",
    resolvedAt: "1 hour ago",
    assignee: "Network Engineer",
    description: "Sustained DDoS attack from 10K+ sources blocked by WAF",
    affectedSystems: ["api-gateway", "cdn"],
  },
  {
    id: "INC-003",
    title: "Malware Detected in User Upload",
    status: "open",
    severity: "high",
    createdAt: "30 min ago",
    resolvedAt: null,
    assignee: "Malware Analyst",
    description: "Trojan variant found in uploaded file, quarantined immediately",
    affectedSystems: ["file-storage", "antivirus"],
  },
]

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "high" as const,
    assignee: "",
  })

  const openCount = incidents.filter((i) => i.status === "open").length
  const investigatingCount = incidents.filter((i) => i.status === "investigating").length
  const resolvedCount = incidents.filter((i) => i.status === "resolved").length
  const criticalCount = incidents.filter((i) => i.severity === "critical").length

  const handleCreateIncident = () => {
    if (!formData.title || !formData.description || !formData.assignee) {
      toast.error("Please fill in all fields")
      return
    }

    const newIncident: Incident = {
      id: `INC-${String(incidents.length + 1).padStart(3, "0")}`,
      title: formData.title,
      status: "open",
      severity: formData.severity,
      createdAt: "now",
      resolvedAt: null,
      assignee: formData.assignee,
      description: formData.description,
      affectedSystems: [],
    }

    setIncidents([newIncident, ...incidents])
    setFormData({ title: "", description: "", severity: "high", assignee: "" })
    setShowCreateForm(false)
    toast.success("Incident created successfully!")
  }

  const updateIncidentStatus = (id: string, newStatus: Incident["status"]) => {
    setIncidents(
      incidents.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: newStatus,
              resolvedAt: newStatus === "resolved" ? "now" : null,
            }
          : inc
      )
    )
    toast.success("Incident status updated")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <CyberSidebar />
      <div className="flex-1 overflow-auto">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Incident Response</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track security incidents from detection to resolution
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-cyber-red" />
                  Critical
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-red">{criticalCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Open</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-yellow">{openCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Investigating</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{investigatingCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyber-green" />
                  Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-green">{resolvedCount}</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cyber-purple">{incidents.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Create Incident Button */}
          <div className="mb-6">
            <Button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Incident
            </Button>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <Card className="mb-6 bg-card border-border">
              <CardHeader>
                <CardTitle>Report New Security Incident</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Incident Title</Label>
                  <Input
                    placeholder="e.g., Suspicious Login Activity"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-input font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select value={formData.severity} onValueChange={(v) => setFormData({ ...formData, severity: v as any })}>
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
                  <div className="space-y-2">
                    <Label>Assignee</Label>
                    <Input
                      placeholder="Team member name"
                      value={formData.assignee}
                      onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                      className="bg-input font-mono"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Detailed incident description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-input font-mono"
                    rows={4}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateIncident}>Create</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Incidents List */}
          <div className="space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-mono font-bold text-foreground">{incident.title}</h3>
                        <Badge
                          variant="outline"
                          className={
                            incident.severity === "critical"
                              ? "bg-cyber-red/20 text-cyber-red border-cyber-red/50"
                              : incident.severity === "high"
                              ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/50"
                              : "bg-cyber-green/20 text-cyber-green border-cyber-green/50"
                          }
                        >
                          {incident.severity.toUpperCase()}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            incident.status === "open"
                              ? "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/50"
                              : incident.status === "investigating"
                              ? "bg-primary/20 text-primary border-primary/50"
                              : "bg-cyber-green/20 text-cyber-green border-cyber-green/50"
                          }
                        >
                          {incident.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{incident.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedIncident(selectedIncident?.id === incident.id ? null : incident)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                {selectedIncident?.id === incident.id && (
                  <CardContent className="space-y-4 border-t border-border pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground">Incident ID</p>
                        <p className="font-mono text-foreground">{incident.id}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground">Assignee</p>
                        <p className="font-mono text-foreground">{incident.assignee}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground">Created</p>
                        <p className="font-mono text-foreground">{incident.createdAt}</p>
                      </div>
                      {incident.resolvedAt && (
                        <div>
                          <p className="text-xs font-mono text-muted-foreground">Resolved</p>
                          <p className="font-mono text-foreground">{incident.resolvedAt}</p>
                        </div>
                      )}
                    </div>

                    {incident.affectedSystems.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-2">Affected Systems</p>
                        <div className="flex flex-wrap gap-2">
                          {incident.affectedSystems.map((sys) => (
                            <Badge key={sys} variant="secondary" className="font-mono text-xs">
                              {sys}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t border-border">
                      {incident.status !== "resolved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateIncidentStatus(incident.id, "investigating")}
                        >
                          Investigate
                        </Button>
                      )}
                      {incident.status !== "resolved" && (
                        <Button
                          size="sm"
                          className="bg-cyber-green hover:bg-cyber-green/90"
                          onClick={() => updateIncidentStatus(incident.id, "resolved")}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
