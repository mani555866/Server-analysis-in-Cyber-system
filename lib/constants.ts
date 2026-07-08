// Navigation
export const NAVIGATION_ITEMS = [
  { label: "Dashboard", href: "/", icon: "activity" },
  { label: "Network Scanner", href: "/scanner", icon: "network" },
  { label: "Threats", href: "/threats", icon: "alert-triangle" },
  { label: "Analytics", href: "/analytics", icon: "chart-line" },
  { label: "Behavior", href: "/behavior", icon: "users" },
  { label: "AI Models", href: "/models", icon: "cpu" },
  { label: "Logs", href: "/logs", icon: "file-text" },
  { label: "Settings", href: "/settings", icon: "settings" },
]

// Severity levels
export const SEVERITY_LEVELS = {
  critical: { label: "Critical", color: "text-cyber-red" },
  high: { label: "High", color: "text-cyber-yellow" },
  medium: { label: "Medium", color: "text-cyan-500" },
  low: { label: "Low", color: "text-cyber-green" },
} as const

// Risk levels
export const RISK_LEVELS = {
  critical: { label: "Critical", variant: "destructive" },
  high: { label: "High", variant: "secondary" },
  medium: { label: "Medium", variant: "secondary" },
  low: { label: "Low", variant: "outline" },
  none: { label: "None", variant: "outline" },
} as const

// Threat types
export const THREAT_TYPES = {
  brute_force: "Brute Force",
  ddos: "DDoS Attack",
  insider: "Insider Threat",
  malware: "Malware",
  sql_injection: "SQL Injection",
  xss: "XSS Attack",
} as const

// Log categories
export const LOG_CATEGORIES = {
  auth: "Authentication",
  network: "Network",
  system: "System",
  anomaly: "Anomaly",
  access: "Access",
} as const

// Monitoring modes
export const MONITORING_MODES = {
  passive: "Passive - Low sensitivity, minimal CPU usage",
  standard: "Standard - Balanced detection and performance",
  aggressive: "Aggressive - High sensitivity, maximum detection",
} as const

// Storage keys
export const STORAGE_KEYS = {
  settings: "cyberSettings",
  threats: "cyberThreats",
  logs: "cyberLogs",
  scanHistory: "cyberScanHistory",
} as const

// Default values
export const DEFAULTS = {
  LOG_RETENTION_DAYS: 90,
  MAX_STORAGE_GB: 500,
  SESSION_TIMEOUT_MINUTES: 30,
  ITEMS_PER_PAGE: 20,
  CHART_REFRESH_INTERVAL: 5000, // 5 seconds
  ALERTS_CHECK_INTERVAL: 10000, // 10 seconds
} as const

// Error messages
export const ERROR_MESSAGES = {
  INVALID_INPUT: "Please provide valid input",
  NETWORK_ERROR: "Network error occurred. Please try again.",
  SAVE_FAILED: "Failed to save settings",
  OPERATION_FAILED: "Operation failed",
  MISSING_FIELDS: "Please fill in all required fields",
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  SETTINGS_SAVED: "Settings saved successfully",
  THREAT_CREATED: "Threat created successfully",
  SCAN_COMPLETED: "Scan completed successfully",
  OPERATION_COMPLETED: "Operation completed",
} as const
