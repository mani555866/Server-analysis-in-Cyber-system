import { config } from "./config"

type LogLevel = "debug" | "info" | "warn" | "error"

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

/**
 * Simple logger with level control
 */
class Logger {
  private level: LogLevel
  private enableDebug: boolean

  constructor() {
    this.level = config.logging.level
    this.enableDebug = config.logging.enableDebug
  }

  /**
   * Check if log level should be displayed
   */
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level]
  }

  /**
   * Format log message
   */
  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`
    return `${prefix} ${message}${data ? ` ${JSON.stringify(data)}` : ""}`
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: unknown): void {
    if (!this.shouldLog("debug") || !this.enableDebug) return
    console.debug(this.formatMessage("debug", message, data))
  }

  /**
   * Log info message
   */
  info(message: string, data?: unknown): void {
    if (!this.shouldLog("info")) return
    console.info(this.formatMessage("info", message, data))
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: unknown): void {
    if (!this.shouldLog("warn")) return
    console.warn(this.formatMessage("warn", message, data))
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | unknown): void {
    if (!this.shouldLog("error")) return
    const errorData = error instanceof Error ? { name: error.name, message: error.message } : error
    console.error(this.formatMessage("error", message, errorData))
  }

  /**
   * Set log level
   */
  setLevel(level: LogLevel): void {
    this.level = level
  }

  /**
   * Enable/disable debug mode
   */
  setDebugMode(enabled: boolean): void {
    this.enableDebug = enabled
  }
}

/**
 * Export singleton instance
 */
export const logger = new Logger()

/**
 * Server-side logging utility
 */
export function logEvent(
  event: string,
  level: LogLevel = "info",
  data?: Record<string, unknown>
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    level,
    ...data,
  }

  if (level === "error") {
    logger.error(event, logEntry)
  } else if (level === "warn") {
    logger.warn(event, logEntry)
  } else if (level === "debug") {
    logger.debug(event, logEntry)
  } else {
    logger.info(event, logEntry)
  }
}

/**
 * Performance monitoring
 */
export function measurePerformance<T>(label: string, fn: () => T): T {
  const start = performance.now()
  const result = fn()
  const duration = performance.now() - start

  if (duration > 1000) {
    logger.warn(`Slow operation detected: ${label}`, { duration: `${duration.toFixed(2)}ms` })
  } else {
    logger.debug(`Performance: ${label}`, { duration: `${duration.toFixed(2)}ms` })
  }

  return result
}

/**
 * Async performance monitoring
 */
export async function measureAsyncPerformance<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()
  const result = await fn()
  const duration = performance.now() - start

  if (duration > 5000) {
    logger.warn(`Slow async operation detected: ${label}`, { duration: `${duration.toFixed(2)}ms` })
  } else {
    logger.debug(`Async Performance: ${label}`, { duration: `${duration.toFixed(2)}ms` })
  }

  return result
}
