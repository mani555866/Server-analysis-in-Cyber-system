import { config } from "./config"
import { ApiResponse } from "./types"

/**
 * Custom API client with error handling and retries
 */
class ApiClient {
  private baseUrl: string
  private timeout: number
  private retries: number

  constructor() {
    this.baseUrl = config.api.baseUrl
    this.timeout = config.api.timeout
    this.retries = config.api.retries
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      ...options,
    })
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...options,
    })
  }

  /**
   * Generic request method with retry logic
   */
  private async request<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    let lastError: Error | null = null

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.timeout)

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status)
        }

        const data = await response.json()
        return {
          success: true,
          data: data as T,
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))

        // Don't retry on client errors (4xx) or authentication errors
        if (error instanceof ApiError && error.statusCode >= 400 && error.statusCode < 500) {
          break
        }

        // Wait before retrying (exponential backoff)
        if (attempt < this.retries) {
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || "Request failed",
    }
  }
}

/**
 * Custom API error
 */
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message)
    this.name = "ApiError"
  }
}

/**
 * Singleton instance
 */
export const apiClient = new ApiClient()

/**
 * Type-safe API response handler
 */
export function handleApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.error || "API request failed")
  }
  if (!response.data) {
    throw new Error("No data in response")
  }
  return response.data
}

/**
 * Create request with headers
 */
export function createHeaders(overrides?: Record<string, string>): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...overrides,
  }
}
