"use client"

import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { StatsCards } from "@/components/cyber/stats-cards"
import { ThreatChart } from "@/components/cyber/threat-chart"
import { AlertsPanel } from "@/components/cyber/alerts-panel"
import { NetworkStatus } from "@/components/cyber/network-status"
import { RiskScore } from "@/components/cyber/risk-score"
import { LiveLogs } from "@/components/cyber/live-logs"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Security Overview</h1>
            <p className="text-sm text-muted-foreground">
              Real-time monitoring and threat intelligence
            </p>
          </div>

          <div className="space-y-6">
            {/* Stats Cards */}
            <StatsCards />

            {/* Main Charts Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ThreatChart />
              </div>
              <RiskScore />
            </div>

            {/* Bottom Row */}
            <div className="grid gap-6 lg:grid-cols-3">
              <AlertsPanel />
              <NetworkStatus />
              <LiveLogs />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
