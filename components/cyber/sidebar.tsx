"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Shield,
  Network,
  BarChart3,
  Brain,
  AlertTriangle,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Lock,
  Zap,
  Bug,
  Database,
  Eye,
  Search,
  Code,
  Activity,
  Mail,
} from "lucide-react"

const navItems = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Network Scanner",
    href: "/scanner",
    icon: Network,
  },
  {
    title: "Threat Detection",
    href: "/threats",
    icon: AlertTriangle,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Behavior Analysis",
    href: "/behavior",
    icon: Users,
  },
  {
    title: "AI Models",
    href: "/models",
    icon: Brain,
  },
  {
    title: "Log Forensics",
    href: "/logs",
    icon: FileText,
  },
  {
    title: "Email Analyzer",
    href: "/email",
    icon: Mail,
  },
  {
    title: "Phishing Detection",
    href: "/phishing",
    icon: Lock,
  },
  {
    title: "DDoS Detection",
    href: "/ddos",
    icon: Zap,
  },
  {
    title: "Malware Detection",
    href: "/malware",
    icon: Bug,
  },
  {
    title: "SQL Injection",
    href: "/sqli",
    icon: Database,
  },
  {
    title: "Data Exfiltration",
    href: "/exfiltration",
    icon: Eye,
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: Search,
  },
  {
    title: "Incidents",
    href: "/incidents",
    icon: Activity,
  },
]

export function CyberSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-mono text-sm font-bold text-primary">CYBER</span>
                <span className="font-mono text-sm text-foreground">FORENSICS</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary mx-auto">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Status */}
        <div className="border-t border-sidebar-border p-4">
          {!collapsed && (
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">System Online</span>
            </div>
          )}
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  )
}
