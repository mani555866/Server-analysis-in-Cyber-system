/**
 * Validation utilities for common security patterns
 */

export const validations = {
  /**
   * Validate IP address (IPv4 or IPv6)
   */
  isValidIP: (ip: string): boolean => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex =
      /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:ffff:)?(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    return ipv4Regex.test(ip) || ipv6Regex.test(ip)
  },

  /**
   * Validate hostname or domain
   */
  isValidHostname: (hostname: string): boolean => {
    const hostnameRegex = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    return hostnameRegex.test(hostname) && hostname.length <= 255
  },

  /**
   * Validate port number
   */
  isValidPort: (port: number): boolean => {
    return port >= 1 && port <= 65535
  },

  /**
   * Validate email
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate URL
   */
  isValidURL: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * Validate API Key format
   */
  isValidAPIKey: (key: string): boolean => {
    return key.length >= 20 && /^[a-zA-Z0-9_-]+$/.test(key)
  },

  /**
   * Check if value is not empty
   */
  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0
  },

  /**
   * Check if value is number
   */
  isNumber: (value: unknown): value is number => {
    return typeof value === "number" && !isNaN(value)
  },

  /**
   * Check if value is positive number
   */
  isPositiveNumber: (value: unknown): boolean => {
    return validations.isNumber(value) && value > 0
  },
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement("div")
  div.textContent = input
  return div.innerHTML
}

/**
 * Format and validate CIDR notation
 */
export function isValidCIDR(cidr: string): boolean {
  const [ip, mask] = cidr.split("/")
  if (!ip || !mask) return false

  const maskNum = parseInt(mask)
  return validations.isValidIP(ip) && !isNaN(maskNum) && maskNum >= 0 && maskNum <= 32
}

/**
 * Validate threat description
 */
export function isValidThreatDescription(description: string): boolean {
  return validations.isNotEmpty(description) && description.length >= 10 && description.length <= 500
}

/**
 * Validate target for network scan
 */
export function isValidScanTarget(target: string): boolean {
  return validations.isValidIP(target) || validations.isValidHostname(target)
}
