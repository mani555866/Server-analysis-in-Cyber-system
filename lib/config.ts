/**
 * Application configuration
 */

export const config = {
  // App metadata
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "CyberForensics AI",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    description: "Advanced cyber security forensics platform with AI-powered threat detection",
  },

  // Environment
  env: {
    isDevelopment: process.env.NEXT_PUBLIC_ENV === "development",
    isProduction: process.env.NEXT_PUBLIC_ENV === "production",
    isStaging: process.env.NEXT_PUBLIC_ENV === "staging",
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 30000, // 30 seconds
    retries: 3,
  },

  // Feature flags
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    notifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === "true",
    webhook: process.env.NEXT_PUBLIC_ENABLE_WEBHOOK === "true",
  },

  // Logging
  logging: {
    level: (process.env.LOG_LEVEL || "info") as "debug" | "info" | "warn" | "error",
    enableDebug: process.env.ENABLE_DEBUG_MODE === "true",
  },

  // AWS Configuration
  aws: {
    region: process.env.AWS_REGION || "us-east-1",
  },

  // UI Configuration
  ui: {
    theme: "dark",
    sidebar: {
      collapsible: true,
      defaultState: "expanded",
    },
  },

  // Default pagination
  pagination: {
    pageSize: 20,
    maxPages: 100,
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  },

  // Session configuration
  session: {
    timeout: 30 * 60 * 1000, // 30 minutes
    warningTime: 5 * 60 * 1000, // 5 minutes before timeout
  },

  // Security
  security: {
    enableCSRF: true,
    enableCORS: true,
    corsOrigins: ["http://localhost:3000"],
    enableHTTPS: true,
    hstsMaxAge: 31536000, // 1 year
  },
}

/**
 * Validate required environment variables
 */
export function validateConfig(): void {
  const requiredVars: (keyof typeof process.env)[] = ["NEXT_PUBLIC_ENV"]

  const missing = requiredVars.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(`[CONFIG] Missing environment variables: ${missing.join(", ")}`)
  }
}

// Validate on module load in development
if (config.env.isDevelopment) {
  validateConfig()
}
