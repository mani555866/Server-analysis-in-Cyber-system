"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {
  Settings,
  Bell,
  Shield,
  Database,
  Cloud,
  Key,
  Users,
  Save,
  Eye,
  AlertCircle,
  Zap,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // Monitoring Modes
    monitoringMode: "standard" as "standard" | "aggressive" | "passive",
    realtimeAlerts: true,
    anomalyDetection: true,
    deepPacketInspection: false,
    // Notifications
    criticalAlerts: true,
    emailNotifications: true,
    slackIntegration: true,
    smsAlerts: true,
    // Security
    autoBlockThreats: true,
    mlDetection: true,
    behavioralAnalysis: true,
    honeypotMonitoring: true,
    // Database
    logRetention: 90,
    maxStorage: 500,
    autoArchive: true,
    // API
    apiKey: "sk_live_••••••••••••••••",
    webhookUrl: "https://api.example.com/webhook",
    rateLimiting: true,
    // Cloud
    awsRegion: "us-east-1",
    cloudBackup: true,
    multiRegion: true,
    // User Management
    twoFactorAuth: true,
    ssoIntegration: true,
    sessionTimeout: 30,
  })

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Save to localStorage as backup
      localStorage.setItem("cyberSettings", JSON.stringify(settings))
      
      toast.success("Settings saved successfully!", {
        description: "All configuration changes have been applied.",
      })
    } catch (error) {
      toast.error("Failed to save settings", {
        description: "Please try again later.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSwitchChange = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleInputChange = (key: keyof typeof settings, value: string | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Configure your security platform settings
            </p>
          </div>

          <div className="grid gap-6 mb-6">
            {/* Monitoring Modes */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Monitoring Modes</span>
                </CardTitle>
                <CardDescription>Configure monitoring sensitivity and detection methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Monitoring Level</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "passive", label: "Passive", desc: "Low sensitivity" },
                      { value: "standard", label: "Standard", desc: "Balanced" },
                      { value: "aggressive", label: "Aggressive", desc: "High sensitivity" },
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => handleInputChange("monitoringMode", mode.value)}
                        className={`p-3 rounded-md border-2 transition-all ${
                          settings.monitoringMode === mode.value
                            ? "border-primary bg-primary/10"
                            : "border-border bg-input hover:border-primary/50"
                        }`}
                      >
                        <p className="font-mono text-sm font-bold text-foreground">{mode.label}</p>
                        <p className="text-xs text-muted-foreground">{mode.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Real-time Alerts</Label>
                    <p className="text-xs text-muted-foreground">Instant threat notifications</p>
                  </div>
                  <Switch checked={settings.realtimeAlerts} onCheckedChange={(v) => handleSwitchChange("realtimeAlerts", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Anomaly Detection</Label>
                    <p className="text-xs text-muted-foreground">Detect unusual behavior patterns</p>
                  </div>
                  <Switch checked={settings.anomalyDetection} onCheckedChange={(v) => handleSwitchChange("anomalyDetection", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Deep Packet Inspection</Label>
                    <p className="text-xs text-muted-foreground">Analyze network packet contents</p>
                  </div>
                  <Switch checked={settings.deepPacketInspection} onCheckedChange={(v) => handleSwitchChange("deepPacketInspection", v)} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Notifications */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Notifications</span>
                </CardTitle>
                <CardDescription>Configure alert and notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Critical Alerts</Label>
                    <p className="text-xs text-muted-foreground">Receive alerts for critical threats</p>
                  </div>
                  <Switch checked={settings.criticalAlerts} onCheckedChange={(v) => handleSwitchChange("criticalAlerts", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send daily security reports via email</p>
                  </div>
                  <Switch checked={settings.emailNotifications} onCheckedChange={(v) => handleSwitchChange("emailNotifications", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Slack Integration</Label>
                    <p className="text-xs text-muted-foreground">Post alerts to Slack channel</p>
                  </div>
                  <Switch checked={settings.slackIntegration} onCheckedChange={(v) => handleSwitchChange("slackIntegration", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-xs text-muted-foreground">Send SMS for critical incidents</p>
                  </div>
                  <Switch checked={settings.smsAlerts} onCheckedChange={(v) => handleSwitchChange("smsAlerts", v)} />
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyber-green" />
                  <span className="font-mono text-sm">Security</span>
                </CardTitle>
                <CardDescription>Configure security and detection settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-block Threats</Label>
                    <p className="text-xs text-muted-foreground">Automatically block detected threats</p>
                  </div>
                  <Switch checked={settings.autoBlockThreats} onCheckedChange={(v) => handleSwitchChange("autoBlockThreats", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>ML Detection</Label>
                    <p className="text-xs text-muted-foreground">Enable machine learning threat detection</p>
                  </div>
                  <Switch checked={settings.mlDetection} onCheckedChange={(v) => handleSwitchChange("mlDetection", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Behavioral Analysis</Label>
                    <p className="text-xs text-muted-foreground">Monitor user behavior patterns</p>
                  </div>
                  <Switch checked={settings.behavioralAnalysis} onCheckedChange={(v) => handleSwitchChange("behavioralAnalysis", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Honeypot Monitoring</Label>
                    <p className="text-xs text-muted-foreground">Enable honeypot trap detection</p>
                  </div>
                  <Switch checked={settings.honeypotMonitoring} onCheckedChange={(v) => handleSwitchChange("honeypotMonitoring", v)} />
                </div>
              </CardContent>
            </Card>

            {/* Database Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-cyber-purple" />
                  <span className="font-mono text-sm">Database</span>
                </CardTitle>
                <CardDescription>Configure log storage and retention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Log Retention Period</Label>
                  <Input value={settings.logRetention} onChange={(e) => handleInputChange("logRetention", parseInt(e.target.value) || 0)} type="number" className="bg-input font-mono" />
                  <p className="text-xs text-muted-foreground">Days to retain log data</p>
                </div>
                <div className="space-y-2">
                  <Label>Max Storage Size</Label>
                  <Input value={settings.maxStorage} onChange={(e) => handleInputChange("maxStorage", parseInt(e.target.value) || 0)} type="number" className="bg-input font-mono" />
                  <p className="text-xs text-muted-foreground">Maximum storage in GB</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-archive</Label>
                    <p className="text-xs text-muted-foreground">Archive old logs to cold storage</p>
                  </div>
                  <Switch checked={settings.autoArchive} onCheckedChange={(v) => handleSwitchChange("autoArchive", v)} />
                </div>
              </CardContent>
            </Card>

            {/* API Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-cyber-yellow" />
                  <span className="font-mono text-sm">API Configuration</span>
                </CardTitle>
                <CardDescription>Manage API keys and integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input value={settings.apiKey} onChange={(e) => handleInputChange("apiKey", e.target.value)} type="password" className="bg-input font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input value={settings.webhookUrl} onChange={(e) => handleInputChange("webhookUrl", e.target.value)} className="bg-input font-mono" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rate Limiting</Label>
                    <p className="text-xs text-muted-foreground">Enable API rate limiting</p>
                  </div>
                  <Switch checked={settings.rateLimiting} onCheckedChange={(v) => handleSwitchChange("rateLimiting", v)} />
                </div>
              </CardContent>
            </Card>

            {/* Cloud Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Cloud Integration</span>
                </CardTitle>
                <CardDescription>Configure cloud service connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>AWS Region</Label>
                  <Input value={settings.awsRegion} onChange={(e) => handleInputChange("awsRegion", e.target.value)} className="bg-input font-mono" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cloud Backup</Label>
                    <p className="text-xs text-muted-foreground">Backup to cloud storage</p>
                  </div>
                  <Switch checked={settings.cloudBackup} onCheckedChange={(v) => handleSwitchChange("cloudBackup", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Multi-region</Label>
                    <p className="text-xs text-muted-foreground">Enable multi-region deployment</p>
                  </div>
                  <Switch checked={settings.multiRegion} onCheckedChange={(v) => handleSwitchChange("multiRegion", v)} />
                </div>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyber-cyan" />
                  <span className="font-mono text-sm">User Management</span>
                </CardTitle>
                <CardDescription>Configure user access and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Auth</Label>
                    <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch checked={settings.twoFactorAuth} onCheckedChange={(v) => handleSwitchChange("twoFactorAuth", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SSO Integration</Label>
                    <p className="text-xs text-muted-foreground">Enable Single Sign-On</p>
                  </div>
                  <Switch checked={settings.ssoIntegration} onCheckedChange={(v) => handleSwitchChange("ssoIntegration", v)} />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Input value={settings.sessionTimeout} onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value) || 0)} type="number" className="bg-input font-mono" />
                  <p className="text-xs text-muted-foreground">Minutes of inactivity before logout</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
