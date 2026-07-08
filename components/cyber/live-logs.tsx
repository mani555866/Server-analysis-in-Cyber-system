"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Terminal, Circle } from "lucide-react"

const logTemplates = [
  { type: "INFO", message: "Connection established from 10.0.0.{ip}", color: "text-cyber-cyan" },
  { type: "WARN", message: "Failed authentication attempt for user_{user}", color: "text-cyber-yellow" },
  { type: "ERROR", message: "Blocked malicious request from 203.0.{ip}.{sub}", color: "text-cyber-red" },
  { type: "INFO", message: "Firewall rule updated: ACCEPT TCP port {port}", color: "text-cyber-cyan" },
  { type: "DEBUG", message: "Packet inspection completed: {count} packets analyzed", color: "text-muted-foreground" },
  { type: "WARN", message: "Unusual traffic pattern detected on interface eth{num}", color: "text-cyber-yellow" },
  { type: "INFO", message: "SSL certificate renewed for domain-{num}.local", color: "text-cyber-cyan" },
  { type: "ERROR", message: "DDoS mitigation triggered: {count} requests blocked", color: "text-cyber-red" },
  { type: "INFO", message: "Backup completed successfully: {size}GB transferred", color: "text-cyber-green" },
  { type: "WARN", message: "Memory usage threshold exceeded on node-{num}", color: "text-cyber-yellow" },
]

interface LogEntry {
  id: number
  timestamp: string
  type: string
  message: string
  color: string
}

export function LiveLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    // Initialize with some logs
    const initialLogs: LogEntry[] = Array.from({ length: 8 }, (_, i) => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)]
      return {
        id: i,
        timestamp: new Date(Date.now() - (8 - i) * 5000).toLocaleTimeString("en-US", { hour12: false }),
        type: template.type,
        message: generateMessage(template.message),
        color: template.color,
      }
    })
    setLogs(initialLogs)

    // Add new logs periodically
    const interval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)]
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        type: template.type,
        message: generateMessage(template.message),
        color: template.color,
      }
      setLogs((prev) => [...prev.slice(-7), newLog])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm font-medium text-foreground">Live Logs</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-2 w-2 fill-cyber-green text-cyber-green animate-pulse" />
            <span className="text-xs text-muted-foreground">Streaming</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 font-mono text-xs bg-background rounded-lg p-3 max-h-[280px] overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2 leading-relaxed">
              <span className="text-muted-foreground shrink-0">[{log.timestamp}]</span>
              <span className={`shrink-0 ${log.color}`}>[{log.type}]</span>
              <span className="text-foreground">{log.message}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function generateMessage(template: string): string {
  return template
    .replace("{ip}", String(Math.floor(Math.random() * 255)))
    .replace("{sub}", String(Math.floor(Math.random() * 255)))
    .replace("{user}", String(Math.floor(Math.random() * 1000)))
    .replace("{port}", String([80, 443, 22, 3306, 5432][Math.floor(Math.random() * 5)]))
    .replace("{count}", String(Math.floor(Math.random() * 10000)))
    .replace("{num}", String(Math.floor(Math.random() * 10)))
    .replace("{size}", String((Math.random() * 100).toFixed(1)))
}
