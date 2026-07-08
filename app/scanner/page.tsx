"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Network,
  Play,
  Square,
  AlertTriangle,
  Shield,
  Server,
  Globe,
  Wifi,
  Lock,
  Unlock,
  RefreshCw,
} from "lucide-react"

interface ScanResult {
  port: number
  service: string
  status: "open" | "closed" | "filtered"
  risk: "critical" | "high" | "medium" | "low" | "none"
  protocol: string
  banner?: string
}

const mockScanResults: ScanResult[] = [
  { port: 21, service: "FTP", status: "open", risk: "critical", protocol: "TCP", banner: "vsftpd 3.0.3" },
  { port: 22, service: "SSH", status: "open", risk: "low", protocol: "TCP", banner: "OpenSSH 8.9" },
  { port: 23, service: "Telnet", status: "filtered", risk: "critical", protocol: "TCP" },
  { port: 25, service: "SMTP", status: "open", risk: "medium", protocol: "TCP", banner: "Postfix" },
  { port: 53, service: "DNS", status: "open", risk: "low", protocol: "UDP", banner: "BIND 9.18" },
  { port: 80, service: "HTTP", status: "open", risk: "high", protocol: "TCP", banner: "nginx 1.22" },
  { port: 443, service: "HTTPS", status: "open", risk: "none", protocol: "TCP", banner: "nginx 1.22" },
  { port: 3306, service: "MySQL", status: "filtered", risk: "critical", protocol: "TCP" },
  { port: 5432, service: "PostgreSQL", status: "closed", risk: "none", protocol: "TCP" },
  { port: 6379, service: "Redis", status: "open", risk: "high", protocol: "TCP" },
  { port: 8080, service: "HTTP-Alt", status: "open", risk: "medium", protocol: "TCP", banner: "Tomcat 9.0" },
  { port: 27017, service: "MongoDB", status: "open", risk: "critical", protocol: "TCP" },
]

const riskColors: Record<string, string> = {
  critical: "bg-cyber-red text-foreground",
  high: "bg-cyber-yellow/80 text-background",
  medium: "bg-cyber-purple text-foreground",
  low: "bg-primary text-primary-foreground",
  none: "bg-cyber-green text-background",
}

const statusIcons: Record<string, React.ReactNode> = {
  open: <Unlock className="h-4 w-4 text-cyber-red" />,
  closed: <Lock className="h-4 w-4 text-cyber-green" />,
  filtered: <Shield className="h-4 w-4 text-cyber-yellow" />,
}

export default function ScannerPage() {
  const [target, setTarget] = useState("192.168.1.1")
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<ScanResult[]>([])
  const [scanComplete, setScanComplete] = useState(false)

  const startScan = () => {
    if (!target.trim()) {
      toast.error("Please enter a target IP or hostname")
      return
    }
    setScanning(true)
    setScanComplete(false)
    setResults([])
    setProgress(0)
    toast.info(`Starting scan on ${target}...`)

    // Simulate scanning
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanning(false)
          setScanComplete(true)
          setResults(mockScanResults)
          toast.success("Scan completed successfully!")
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const stopScan = () => {
    setScanning(false)
    setProgress(0)
    setResults([])
  }

  const vulnerabilities = results.filter((r) => r.status === "open" && r.risk !== "none" && r.risk !== "low")

  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Network Vulnerability Scanner</h1>
            <p className="text-sm text-muted-foreground">
              Scan network targets for open ports and security vulnerabilities
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Scan Configuration */}
            <Card className="bg-card border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Scan Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-muted-foreground mb-2 block">Target IP / Domain</label>
                    <Input
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder="192.168.1.1 or example.com"
                      className="font-mono bg-input"
                      disabled={scanning}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    {!scanning ? (
                      <Button onClick={startScan} className="bg-primary hover:bg-primary/90">
                        <Play className="mr-2 h-4 w-4" />
                        Start Scan
                      </Button>
                    ) : (
                      <Button onClick={stopScan} variant="destructive">
                        <Square className="mr-2 h-4 w-4" />
                        Stop
                      </Button>
                    )}
                    <Button variant="outline" size="icon" disabled={scanning}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {scanning && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Scanning ports...</span>
                      <span className="font-mono text-primary">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="font-mono text-2xl font-bold text-foreground">
                      {results.filter((r) => r.status === "open").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Open Ports</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-2xl font-bold text-cyber-red">
                      {results.filter((r) => r.risk === "critical").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-2xl font-bold text-cyber-yellow">
                      {results.filter((r) => r.risk === "high").length}
                    </div>
                    <div className="text-xs text-muted-foreground">High Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-2xl font-bold text-cyber-green">
                      {results.filter((r) => r.status === "closed").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vulnerability Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-cyber-red" />
                  <span className="font-mono text-sm">Vulnerabilities Found</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scanComplete ? (
                  <div className="space-y-3">
                    {vulnerabilities.length > 0 ? (
                      vulnerabilities.map((vuln) => (
                        <div
                          key={vuln.port}
                          className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-medium text-foreground">
                                Port {vuln.port}
                              </span>
                              <Badge className={riskColors[vuln.risk]}>{vuln.risk}</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">{vuln.service}</span>
                          </div>
                          {vuln.risk === "critical" && (
                            <AlertTriangle className="h-5 w-5 text-cyber-red animate-pulse" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Shield className="mx-auto h-12 w-12 text-cyber-green mb-2" />
                        <p className="text-sm text-muted-foreground">No critical vulnerabilities found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Network className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Run a scan to detect vulnerabilities</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Scan Results Table */}
          {results.length > 0 && (
            <Card className="mt-6 bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Port Scan Results - {target}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Port</th>
                        <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Protocol</th>
                        <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Risk</th>
                        <th className="px-4 py-3 text-left text-xs font-mono font-medium text-muted-foreground">Banner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr key={result.port} className="border-b border-border hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-sm text-foreground">{result.port}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{result.service}</td>
                          <td className="px-4 py-3 font-mono text-sm text-muted-foreground">{result.protocol}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {statusIcons[result.status]}
                              <span className="text-sm text-foreground capitalize">{result.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={riskColors[result.risk]}>{result.risk}</Badge>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                            {result.banner || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
