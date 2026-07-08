"use client"

import { useState, useEffect } from "react"
import { Bell, Search, Terminal, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CyberHeader() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [alerts] = useState([
    { id: 1, message: "Brute force attempt detected", severity: "high", time: "2m ago" },
    { id: 2, message: "Unusual login pattern from IP 192.168.1.45", severity: "medium", time: "15m ago" },
    { id: 3, message: "Port scan detected on subnet", severity: "low", time: "1h ago" },
  ])

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs, IPs, users..."
            className="w-80 bg-input pl-10 font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Clock */}
        <div className="flex items-center gap-2 rounded-md bg-card px-3 py-1.5 border border-border">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm text-foreground">
            {currentTime ? currentTime.toLocaleTimeString("en-US", { hour12: false }) : "--:--:--"}
          </span>
        </div>

        {/* Terminal Button */}
        <Button variant="outline" size="icon" className="border-border">
          <Terminal className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative border-border">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyber-red text-[10px] font-bold text-foreground">
                {alerts.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 border-b border-border">
              <h4 className="font-mono text-sm font-semibold">Security Alerts</h4>
            </div>
            {alerts.map((alert) => (
              <DropdownMenuItem key={alert.id} className="flex flex-col items-start gap-1 p-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      alert.severity === "high"
                        ? "bg-cyber-red"
                        : alert.severity === "medium"
                        ? "bg-cyber-yellow"
                        : "bg-cyber-green"
                    }`}
                  />
                  <span className="text-sm">{alert.message}</span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">A</span>
          </div>
        </div>
      </div>
    </header>
  )
}
