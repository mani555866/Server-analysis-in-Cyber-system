import { useCallback, useEffect, useState } from "react"
import { STORAGE_KEYS } from "./constants"

/**
 * Hook for managing local storage with type safety
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // Get from local storage
  useEffect(() => {
    try {
      const item = typeof window !== "undefined" ? window.localStorage.getItem(key) : null
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error)
    } finally {
      setIsLoaded(true)
    }
  }, [key])

  // Save to local storage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(`Error saving to localStorage: ${key}`, error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue, isLoaded] as const
}

/**
 * Hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for API calls with loading and error states
 */
export function useAsyncOperation<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: Error | null
  }>({
    data: null,
    loading: immediate,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null })
    try {
      const response = await asyncFunction()
      setState({ data: response, loading: false, error: null })
      return response
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      setState({ data: null, loading: false, error: err })
      throw err
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute }
}

/**
 * Hook for managing state with localStorage persistence
 */
export function usePersistentState<T>(storageKey: string, initialValue: T) {
  const [value, setValue, isLoaded] = useLocalStorage(storageKey, initialValue)

  return {
    value,
    setValue,
    isLoaded,
  }
}
