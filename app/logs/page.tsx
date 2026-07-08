"use client"

import { useState, useMemo } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Search,
  Download,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Info,
  AlertCircle,
  Bug,
  Clock,
  Server,
} from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  level: "INFO" | "WARN" | "ERROR" | "DEBUG" | "CRITICAL"
  source: string
  category: string
  message: string
  ip?: string
  user?: string
  details?: Record<string, string>
}

const generateLogs = (): LogEntry[] => {
  const levels: LogEntry["level"][] = ["INFO", "WARN", "ERROR", "DEBUG", "CRITICAL"]
  const sources = ["auth-server", "web-frontend", "api-gateway", "database", "firewall", "vpn-gateway", "mail-server"]
  const categories = ["Authentication", "Network", "Security", "System", "Application", "Database"]
  
  const messages: Record<LogEntry["level"], string[]> = {
    INFO: [
      "User login successful",
      "Session started",
      "Configuration loaded",
      "Service health check passed",
      "Backup completed successfully",
      "Certificate renewed",
    ],
    WARN: [
      "High memory usage detected",
      "Slow query execution",
      "Rate limit threshold reached",
      "Disk space running low",
      "Connection pool near capacity",
      "SSL certificate expires in 30 days",
    ],
    ERROR: [
      "Database connection failed",
      "Authentication timeout",
      "API request failed",
      "Service unavailable",
      "File not found",
      "Permission denied",
    ],
    DEBUG: [
      "Request payload processed",
      "Cache hit for key",
      "Query execution time: 45ms",
      "Memory allocation: 256MB",
      "Thread pool status: active",
    ],
    CRITICAL: [
      "Security breach detected",
      "System overload - emergency shutdown",
      "Data corruption detected",
      "Ransomware signature found",
      "Unauthorized root access attempt",
    ],
  }

  const users = ["admin", "user_284", "john.smith", "sarah.j", "mike.chen", "system", "root"]
  const ips = ["192.168.1.100", "10.0.0.45", "203.0.113.42", "198.51.100.23", "172.16.0.50"]

  return Array.from({ length: 100 }, (_, i) => {
    const level = levels[Math.floor(Math.random() * levels.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const message = messages[level][Math.floor(Math.random() * messages[level].length)]
    const timestamp = new Date(Date.now() - i * 60000 * Math.random() * 5).toISOString()

    return {
      id: `LOG-${String(1000 - i).padStart(4, "0")}`,
      timestamp,
      level,
      source,
      category,
      message,
      ip: Math.random() > 0.3 ? ips[Math.floor(Math.random() * ips.length)] : undefined,
      user: Math.random() > 0.4 ? users[Math.floor(Math.random() * users.length)] : undefined,
      details: Math.random() > 0.5 ? {
        requestId: `req_${Math.random().toString(36).substr(2, 9)}`,
        duration: `${Math.floor(Math.random() * 500)}ms`,
      } : undefined,
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

const levelConfig: Record<LogEntry["level"], { icon: React.ReactNode; color: string; bg: string }> = {
  INFO: { icon: <Info className="h-4 w-4" />, color: "text-primary", bg: "bg-primary/10" },
  WARN: { icon: <AlertTriangle className="h-4 w-4" />, color: "text-cyber-yellow", bg: "bg-cyber-yellow/10" },
  ERROR: { icon: <AlertCircle className="h-4 w-4" />, color: "text-cyber-red", bg: "bg-cyber-red/10" },
  DEBUG: { icon: <Bug className="h-4 w-4" />, color: "text-muted-foreground", bg: "bg-muted/10" },
  CRITICAL: { icon: <AlertTriangle className="h-4 w-4" />, color: "text-cyber-red", bg: "bg-cyber-red/20" },
}

export default function LogsPage() {
  const [logs] = useState<LogEntry[]>(generateLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const logsPerPage = 15

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        searchQuery === "" ||
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ip?.includes(searchQuery) ||
        log.user?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesLevel = levelFilter === "all" || log.level === levelFilter
      const matchesSource = sourceFilter === "all" || log.source === sourceFilter

      return matchesSearch && matchesLevel && matchesSource
    })
  }, [logs, searchQuery, levelFilter, sourceFilter])

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  )

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const sources = [...new Set(logs.map((log) => log.source))]

  const logCounts = {
    total: logs.length,
    critical: logs.filter((l) => l.level === "CRITICAL").length,
    error: logs.filter((l) => l.level === "ERROR").length,
    warn: logs.filter((l) => l.level === "WARN").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-2xl font-bold text-foreground">Log Forensics</h1>
              <p className="text-sm text-muted-foreground">
                Search, filter, and analyze system logs
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Logs</p>
                    <p className="font-mono text-2xl font-bold text-foreground">{logCounts.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Critical</p>
                    <p className="font-mono text-2xl font-bold text-cyber-red">{logCounts.critical}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-cyber-red" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Errors</p>
                    <p className="font-mono text-2xl font-bold text-cyber-yellow">{logCounts.error}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-cyber-yellow" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Warnings</p>
                    <p className="font-mono text-2xl font-bold text-primary">{logCounts.warn}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Log List */}
            <Card className="bg-card border-border lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="font-mono text-sm">System Logs</span>
                  <Badge variant="outline" className="font-mono">
                    {filteredLogs.length} entries
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="pl-10 bg-input font-mono text-sm"
                    />
                  </div>
                  <Select value={levelFilter} onValueChange={(v) => { setLevelFilter(v); setCurrentPage(1) }}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="CRITICAL">Critical</SelectItem>
                      <SelectItem value="ERROR">Error</SelectItem>
                      <SelectItem value="WARN">Warning</SelectItem>
                      <SelectItem value="INFO">Info</SelectItem>
                      <SelectItem value="DEBUG">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sourceFilter} onValueChange={(v) => { setSourceFilter(v); setCurrentPage(1) }}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Log Entries */}
                <div className="space-y-1 font-mono text-xs max-h-[500px] overflow-y-auto">
                  {paginatedLogs.map((log) => (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                        selectedLog?.id === log.id
                          ? "bg-primary/10 border border-primary"
                          : "hover:bg-secondary/50"
                      } ${log.level === "CRITICAL" ? "border-l-2 border-l-cyber-red" : ""}`}
                    >
                      <span className={`shrink-0 ${levelConfig[log.level].color}`}>
                        {levelConfig[log.level].icon}
                      </span>
                      <span className="text-muted-foreground shrink-0 w-[140px]">
                        {new Date(log.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })}
                      </span>
                      <Badge variant="outline" className={`shrink-0 text-[10px] ${levelConfig[log.level].color}`}>
                        {log.level}
                      </Badge>
                      <span className="text-primary shrink-0">[{log.source}]</span>
                      <span className="text-foreground truncate flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Showing {(currentPage - 1) * logsPerPage + 1}-{Math.min(currentPage * logsPerPage, filteredLogs.length)} of {filteredLogs.length}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="flex items-center px-3 text-sm text-muted-foreground">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Log Details */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm">Log Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLog ? (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-lg ${levelConfig[selectedLog.level].bg}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={levelConfig[selectedLog.level].color}>
                          {levelConfig[selectedLog.level].icon}
                        </span>
                        <Badge className={`${
                          selectedLog.level === "CRITICAL" || selectedLog.level === "ERROR"
                            ? "bg-cyber-red text-foreground"
                            : selectedLog.level === "WARN"
                            ? "bg-cyber-yellow text-background"
                            : "bg-primary text-primary-foreground"
                        }`}>
                          {selectedLog.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{selectedLog.message}</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Log ID</span>
                        <span className="font-mono text-foreground">{selectedLog.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timestamp</span>
                        <span className="font-mono text-foreground">
                          {new Date(selectedLog.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source</span>
                        <span className="font-mono text-primary">{selectedLog.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-mono text-foreground">{selectedLog.category}</span>
                      </div>
                      {selectedLog.ip && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">IP Address</span>
                          <span className="font-mono text-cyber-cyan">{selectedLog.ip}</span>
                        </div>
                      )}
                      {selectedLog.user && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">User</span>
                          <span className="font-mono text-foreground">{selectedLog.user}</span>
                        </div>
                      )}
                    </div>

                    {selectedLog.details && (
                      <div className="pt-3 border-t border-border">
                        <h4 className="text-xs font-medium text-muted-foreground mb-2">Additional Details</h4>
                        <div className="bg-background rounded p-3 font-mono text-xs space-y-1">
                          {Object.entries(selectedLog.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground">{key}:</span>
                              <span className="text-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Search className="mr-1 h-3 w-3" />
                        Related
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Filter className="mr-1 h-3 w-3" />
                        Filter
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">Select a log entry to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
