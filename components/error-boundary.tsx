"use client"

import React, { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Error caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <div className="max-w-md space-y-4 text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-cyber-red" />
            <h1 className="font-mono text-2xl font-bold text-foreground">Error Occurred</h1>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                }}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  window.location.href = "/"
                }}
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
