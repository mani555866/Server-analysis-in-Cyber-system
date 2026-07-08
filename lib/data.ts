import { ThreatEvent, LogEntry, ScanResult } from "./types"

// Mock data generator - Replace with API calls in production
export const generateMockThreats = (): ThreatEvent[] => {
  return [
    {
      id: "THR-001",
      type: "brute_force",
      severity: "critical",
      status: "active",
      source: "192.168.1.45",
      target: "auth-server",
      description: "Multiple failed login attempts detected from single IP",
      timestamp: "2 min ago",
      detectionMethod: "rule",
      confidence: 98,
    },
    {
      id: "THR-002",
      type: "ddos",
      severity: "high",
      status: "investigating",
      source: "203.0.113.42",
      target: "api-gateway",
      description: "Abnormal traffic spike detected on port 443",
      timestamp: "15 min ago",
      detectionMethod: "ml",
      confidence: 87,
    },
    {
      id: "THR-003",
      type: "sql_injection",
      severity: "high",
      status: "mitigated",
      source: "10.0.0.78",
      target: "database",
      description: "SQL injection attempt in search parameter",
      timestamp: "1 hour ago",
      detectionMethod: "behavioral",
      confidence: 95,
    },
    {
      id: "THR-004",
      type: "malware",
      severity: "critical",
      status: "active",
      source: "Unknown",
      target: "workstation-12",
      description: "Suspicious executable detected and quarantined",
      timestamp: "30 min ago",
      detectionMethod: "ml",
      confidence: 92,
    },
    {
      id: "THR-005",
      type: "xss",
      severity: "medium",
      status: "resolved",
      source: "192.168.2.15",
      target: "web-app",
      description: "XSS payload detected in user input",
      timestamp: "2 hours ago",
      detectionMethod: "rule",
      confidence: 89,
    },
  ]
}

export const generateMockLogs = (): LogEntry[] => {
  const messages = [
    "User login successful",
    "Failed authentication attempt",
    "Port scan detected",
    "Unusual network traffic",
    "Database query anomaly",
    "File access denied",
    "Configuration changed",
    "System reboot initiated",
    "Backup completed",
    "API rate limit exceeded",
  ]

  const categories = ["auth", "network", "system", "anomaly", "access"] as const
  const levels = ["info", "warning", "error", "critical"] as const

  return Array.from({ length: 50 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    level: levels[Math.floor(Math.random() * levels.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    ip: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    user: `user${Math.floor(Math.random() * 10)}`,
  }))
}

export const generateMockScanResults = (): ScanResult[] => {
  return [
    { port: 22, status: "open", service: "SSH", version: "7.4", riskLevel: "medium", banner: "OpenSSH_7.4" },
    { port: 80, status: "open", service: "HTTP", version: "1.1", riskLevel: "low", banner: "Apache/2.4.6" },
    { port: 443, status: "open", service: "HTTPS", version: "1.2", riskLevel: "low", banner: "nginx/1.14.0" },
    { port: 3306, status: "open", service: "MySQL", version: "5.7", riskLevel: "critical", cve: ["CVE-2021-2109"] },
    { port: 5432, status: "open", service: "PostgreSQL", version: "12", riskLevel: "medium", cve: ["CVE-2021-32027"] },
    { port: 6379, status: "open", service: "Redis", version: "6.2", riskLevel: "high", cve: ["CVE-2021-3711"] },
    { port: 27017, status: "open", service: "MongoDB", version: "4.4", riskLevel: "critical" },
    { port: 139, status: "open", service: "Netbios", riskLevel: "high" },
    { port: 445, status: "open", service: "SMB", version: "3.0", riskLevel: "critical" },
    { port: 23, status: "closed", service: "Telnet", riskLevel: "none" },
  ]
}

export const getDefaultSettings = () => ({
  monitoringMode: "standard" as const,
  realtimeAlerts: true,
  anomalyDetection: true,
  deepPacketInspection: false,
  criticalAlerts: true,
  emailNotifications: true,
  slackIntegration: false,
  smsAlerts: false,
  autoBlockThreats: true,
  mlDetection: true,
  behavioralAnalysis: true,
  honeypotMonitoring: false,
  logRetention: 90,
  maxStorage: 500,
  autoArchive: true,
  apiKey: "sk_live_••••••••••••••••",
  webhookUrl: "https://api.example.com/webhook",
  rateLimiting: true,
  awsRegion: "us-east-1",
  cloudBackup: true,
  multiRegion: false,
  twoFactorAuth: true,
  ssoIntegration: true,
  sessionTimeout: 30,
})
