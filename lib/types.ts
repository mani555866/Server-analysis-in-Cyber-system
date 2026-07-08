// Threat Types
export type ThreatSeverity = "critical" | "high" | "medium" | "low"
export type ThreatStatus = "active" | "investigating" | "mitigated" | "resolved"
export type ThreatType = "brute_force" | "ddos" | "insider" | "malware" | "sql_injection" | "xss"
export type DetectionMethod = "rule" | "ml" | "behavioral"

export interface ThreatEvent {
  id: string
  type: ThreatType
  severity: ThreatSeverity
  status: ThreatStatus
  source: string
  target: string
  description: string
  timestamp: string
  detectionMethod: DetectionMethod
  confidence: number
}

// Log Types
export type LogLevel = "info" | "warning" | "error" | "critical"
export type LogCategory = "auth" | "network" | "system" | "anomaly" | "access"

export interface LogEntry {
  timestamp: string
  level: LogLevel
  category: LogCategory
  message: string
  ip?: string
  user?: string
  details?: Record<string, unknown>
}

// Scan Types
export type RiskLevel = "none" | "low" | "medium" | "high" | "critical"

export interface ScanResult {
  port: number
  status: "open" | "closed" | "filtered"
  service: string
  version?: string
  riskLevel: RiskLevel
  banner?: string
  cve?: string[]
}

// Settings Types
export type MonitoringMode = "passive" | "standard" | "aggressive"

export interface SecuritySettings {
  monitoringMode: MonitoringMode
  realtimeAlerts: boolean
  anomalyDetection: boolean
  deepPacketInspection: boolean
  criticalAlerts: boolean
  emailNotifications: boolean
  slackIntegration: boolean
  smsAlerts: boolean
  autoBlockThreats: boolean
  mlDetection: boolean
  behavioralAnalysis: boolean
  honeypotMonitoring: boolean
  logRetention: number
  maxStorage: number
  autoArchive: boolean
  apiKey: string
  webhookUrl: string
  rateLimiting: boolean
  awsRegion: string
  cloudBackup: boolean
  multiRegion: boolean
  twoFactorAuth: boolean
  ssoIntegration: boolean
  sessionTimeout: number
}

// Stats Types
export interface DashboardStats {
  activeThreats: number
  criticalThreats: number
  mitigatedToday: number
  systemHealth: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
