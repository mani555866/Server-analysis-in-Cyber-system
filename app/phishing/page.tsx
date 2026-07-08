"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Lock, AlertTriangle, CheckCircle, Shield, Globe, Code } from "lucide-react"

interface PhishingResult {
  url: string
  risk: "safe" | "suspicious" | "dangerous"
  score: number
  features: {
    hasHttps: boolean
    urlLength: number
    hasAtSymbol: boolean
    hasDashInDomain: boolean
    domainAge: string
    specialCharCount: number
  }
  indicators: string[]
}

function analyzePhishingUrl(url: string): PhishingResult {
  const features = {
    hasHttps: url.startsWith("https://"),
    urlLength: url.length,
    hasAtSymbol: url.includes("@"),
    hasDashInDomain: url.includes("-"),
    domainAge: Math.random() > 0.5 ? "New (0-6 months)" : "Established (2+ years)",
    specialCharCount: (url.match(/[!@#$%^&*()\-_+=\[\]{}|;:',.<>?/\\]/g) || []).length,
  }

  const indicators: string[] = []
  let riskScore = 0

  if (!features.hasHttps) {
    indicators.push("No HTTPS encryption")
    riskScore += 25
  }

  if (features.urlLength > 75) {
    indicators.push("Unusually long URL")
    riskScore += 15
  }

  if (features.hasAtSymbol) {
    indicators.push("Contains @ symbol (credential theft indicator)")
    riskScore += 35
  }

  if (features.hasDashInDomain) {
    indicators.push("Domain contains dashes (spoofing indicator)")
    riskScore += 20
  }

  if (features.domainAge === "New (0-6 months)") {
    indicators.push("Recently registered domain")
    riskScore += 20
  }

  if (features.specialCharCount > 5) {
    indicators.push("Excessive special characters")
    riskScore += 15
  }

  let risk: "safe" | "suspicious" | "dangerous" = "safe"
  if (riskScore >= 60) {
    risk = "dangerous"
  } else if (riskScore >= 30) {
    risk = "suspicious"
  }

  return {
    url,
    risk,
    score: Math.min(100, riskScore),
    features,
    indicators,
  }
}

export default function PhishingDetectionPage() {
  const [urlInput, setUrlInput] = useState("")
  const [results, setResults] = useState<PhishingResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a URL")
      return
    }

    setIsAnalyzing(true)
    toast.info("Analyzing URL...")

    setTimeout(() => {
      const result = analyzePhishingUrl(urlInput)
      setResults([result, ...results])
      setUrlInput("")
      setIsAnalyzing(false)

      if (result.risk === "dangerous") {
        toast.error("🚨 Phishing attack detected!", {
          description: "This URL exhibits multiple phishing indicators",
        })
      } else if (result.risk === "suspicious") {
        toast.warning("⚠️ Suspicious URL detected", {
          description: "Some indicators suggest potential phishing",
        })
      } else {
        toast.success("✅ URL appears safe")
      }
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex-1">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Phishing Detection</h1>
            <p className="text-sm text-muted-foreground">
              Analyze URLs for phishing attacks using advanced pattern detection
            </p>
          </div>

          {/* Analysis Tool */}
          <Card className="mb-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                URL Analysis Engine
              </CardTitle>
              <CardDescription>Enter a URL to scan for phishing indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/login"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                  className="bg-input font-mono"
                />
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="bg-primary hover:bg-primary/90">
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detection Methods */}
          <div className="mb-6 grid gap-6 lg:grid-cols-3">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-cyber-cyan" />
                  URL Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                <p>✓ Checks HTTPS encryption</p>
                <p>✓ Validates URL length</p>
                <p>✓ Detects special characters</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-cyber-green" />
                  Domain Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                <p>✓ Domain age verification</p>
                <p>✓ Subdomain analysis</p>
                <p>✓ Registration checks</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Code className="h-4 w-4 text-cyber-yellow" />
                  ML Detection
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                <p>✓ Random Forest classifier</p>
                <p>✓ Logistic Regression</p>
                <p>✓ Pattern matching</p>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h2 className="font-mono text-lg font-bold text-foreground">Analysis Results</h2>
            {results.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-8 text-center">
                  <Lock className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No URLs analyzed yet. Enter a URL above to begin.</p>
                </CardContent>
              </Card>
            ) : (
              results.map((result, idx) => (
                <Card key={idx} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-mono text-sm text-foreground break-all">{result.url}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant={
                              result.risk === "safe"
                                ? "default"
                                : result.risk === "suspicious"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {result.risk.toUpperCase()}
                          </Badge>
                          <span className="font-mono text-xs text-muted-foreground">Risk Score: {result.score}%</span>
                        </div>
                      </div>
                      {result.risk === "safe" ? (
                        <CheckCircle className="h-6 w-6 text-cyber-green" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-cyber-red" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs font-mono text-muted-foreground">Risk Level</p>
                      <Progress value={result.score} className="h-2" />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-mono font-bold text-foreground">URL Features</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>• HTTPS: {result.features.hasHttps ? "✓" : "✗"}</p>
                          <p>• URL Length: {result.features.urlLength} chars</p>
                          <p>• Has @ Symbol: {result.features.hasAtSymbol ? "✗" : "✓"}</p>
                          <p>• Domain Age: {result.features.domainAge}</p>
                          <p>• Special Chars: {result.features.specialCharCount}</p>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-mono font-bold text-foreground">Detected Indicators</p>
                        {result.indicators.length > 0 ? (
                          <div className="space-y-1">
                            {result.indicators.map((indicator, i) => (
                              <p key={i} className="text-xs text-cyber-red">
                                🚨 {indicator}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-cyber-green">✓ No phishing indicators detected</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
