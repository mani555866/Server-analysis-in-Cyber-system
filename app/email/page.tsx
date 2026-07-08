"use client"

import { useState } from "react"
import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Mail,
  AlertTriangle,
  CheckCircle,
  Link as LinkIcon,
  User,
  Paperclip,
  Shield,
  Zap,
  Search,
  Trash2,
} from "lucide-react"

interface EmailAnalysis {
  id: string
  sender: string
  subject: string
  timestamp: string
  riskScore: number
  riskLevel: "safe" | "suspicious" | "dangerous"
  contentAnalysis: {
    urgentWords: boolean
    suspiciousLinks: boolean
    maliciousPatterns: boolean
    fearWords: number
  }
  linkAnalysis: {
    totalLinks: number
    suspiciousLinks: number
    shortenerLinks: number
  }
  senderAnalysis: {
    domainAge: string
    isFakeDomain: boolean
    hasMisspelling: boolean
  }
  attachmentAnalysis: {
    totalAttachments: number
    dangerousAttachments: string[]
  }
}

const DANGEROUS_EXTENSIONS = [".exe", ".zip", ".js", ".bat", ".cmd", ".scr", ".vbs", ".jar"]
const URGENT_KEYWORDS = ["urgent", "verify", "confirm", "immediately", "act now", "click here", "update password"]
const SUSPICIOUS_KEYWORDS = ["bank", "account", "suspended", "limited", "alert", "unusual activity"]
const SHORTENER_SERVICES = ["bit.ly", "tinyurl", "short.link", "ow.ly", "goo.gl"]

export default function EmailAnalyzerPage() {
  const [emailText, setEmailText] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [attachments, setAttachments] = useState("")
  const [analyses, setAnalyses] = useState<EmailAnalysis[]>([])
  const [selectedAnalysis, setSelectedAnalysis] = useState<EmailAnalysis | null>(null)

  const extractUrgentWords = (text: string): number => {
    let count = 0
    URGENT_KEYWORDS.forEach((word) => {
      const regex = new RegExp(word, "gi")
      count += (text.match(regex) || []).length
    })
    return count
  }

  const checkSuspiciousLinks = (text: string): number => {
    const urlRegex = /(https?:\/\/[^\s]+)/gi
    const urls = text.match(urlRegex) || []
    return urls.filter((url) => {
      const lowercaseUrl = url.toLowerCase()
      const hasSuspiciousDomain = lowercaseUrl.includes("amazon") && lowercaseUrl.includes("0") // amaz0n
      const isMissingHttps = url.startsWith("http://")
      const hasNoTLD = !lowercaseUrl.includes(".")
      return hasSuspiciousDomain || isMissingHttps || hasNoTLD
    }).length
  }

  const analyzeEmail = () => {
    if (!emailText.trim() || !senderEmail.trim()) {
      toast.error("Please enter email content and sender address")
      return
    }

    const urgentWordCount = extractUrgentWords(emailText)
    const hasUrgentWords = urgentWordCount > 0
    const suspiciousLinksCount = checkSuspiciousLinks(emailText)
    const hasSuspiciousLinks = suspiciousLinksCount > 0

    // Extract links
    const urlRegex = /(https?:\/\/[^\s]+)/gi
    const totalLinks = (emailText.match(urlRegex) || []).length
    const shortenerLinks = totalLinks > 0
      ? (emailText.match(new RegExp(SHORTENER_SERVICES.join("|"), "gi")) || []).length
      : 0

    // Sender analysis
    const isFakeDomain = senderEmail.includes("0o") || senderEmail.includes("l1") || senderEmail.includes("rn")
    const commonDomains = ["gmail.com", "outlook.com", "yahoo.com", "company.com"]
    const isLegitDomain = commonDomains.some((d) => senderEmail.endsWith(d))

    // Attachment analysis
    const attachmentList = attachments
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a)
    const dangerousAttachments = attachmentList.filter((att) =>
      DANGEROUS_EXTENSIONS.some((ext) => att.toLowerCase().endsWith(ext))
    )

    // Calculate risk score
    let riskScore = 0
    if (hasUrgentWords) riskScore += 20
    if (hasSuspiciousLinks) riskScore += 25
    if (shortenerLinks > 0) riskScore += 15
    if (isFakeDomain && !isLegitDomain) riskScore += 25
    if (dangerousAttachments.length > 0) riskScore += 30
    if (emailText.toLowerCase().includes("verify") && emailText.toLowerCase().includes("password")) riskScore += 15

    const riskLevel = riskScore >= 70 ? "dangerous" : riskScore >= 40 ? "suspicious" : "safe"

    const analysis: EmailAnalysis = {
      id: `EMAIL-${Date.now()}`,
      sender: senderEmail,
      subject: emailText.split("\n")[0].substring(0, 50) || "No Subject",
      timestamp: new Date().toLocaleTimeString(),
      riskScore,
      riskLevel,
      contentAnalysis: {
        urgentWords: hasUrgentWords,
        suspiciousLinks: hasSuspiciousLinks,
        maliciousPatterns: emailText.toLowerCase().includes("re-activate") || emailText.toLowerCase().includes("update account"),
        fearWords: urgentWordCount,
      },
      linkAnalysis: {
        totalLinks,
        suspiciousLinks: suspiciousLinksCount,
        shortenerLinks,
      },
      senderAnalysis: {
        domainAge: isFakeDomain ? "Unknown" : "Verified",
        isFakeDomain,
        hasMisspelling: isFakeDomain,
      },
      attachmentAnalysis: {
        totalAttachments: attachmentList.length,
        dangerousAttachments,
      },
    }

    setAnalyses([analysis, ...analyses])
    setEmailText("")
    setSenderEmail("")
    setAttachments("")
    setSelectedAnalysis(analysis)

    if (riskLevel === "dangerous") {
      toast.error("Dangerous email detected! Block this sender immediately.")
    } else if (riskLevel === "suspicious") {
      toast.warning("Suspicious email detected. Review carefully before clicking links.")
    } else {
      toast.success("Email appears safe. No threats detected.")
    }
  }

  const deleteAnalysis = (id: string) => {
    setAnalyses(analyses.filter((a) => a.id !== id))
    if (selectedAnalysis?.id === id) setSelectedAnalysis(null)
  }

  const dangerousCount = analyses.filter((a) => a.riskLevel === "dangerous").length
  const suspiciousCount = analyses.filter((a) => a.riskLevel === "suspicious").length
  const safeCount = analyses.filter((a) => a.riskLevel === "safe").length

  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="flex-1 space-y-6 p-8">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold text-foreground">Email Analyzer</h1>
            <p className="text-sm text-muted-foreground">
              Advanced email threat detection with content, link, sender, and attachment analysis
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-cyber-red">{dangerousCount}</p>
                  <p className="text-xs text-muted-foreground mt-2">Dangerous</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-cyber-yellow">{suspiciousCount}</p>
                  <p className="text-xs text-muted-foreground mt-2">Suspicious</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-cyber-green">{safeCount}</p>
                  <p className="text-xs text-muted-foreground mt-2">Safe</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{analyses.length}</p>
                  <p className="text-xs text-muted-foreground mt-2">Total Analyzed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Email Input Form */}
            <div className="col-span-2 space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="font-mono text-sm">Email Scanner</span>
                  </CardTitle>
                  <CardDescription>Paste email content for threat analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Sender Email Address</Label>
                    <Input
                      placeholder="sender@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="bg-input font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Content</Label>
                    <Textarea
                      placeholder="Paste full email content here..."
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      className="bg-input font-mono min-h-32"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Attachments (comma-separated)</Label>
                    <Input
                      placeholder="document.pdf, image.exe, archive.zip"
                      value={attachments}
                      onChange={(e) => setAttachments(e.target.value)}
                      className="bg-input font-mono"
                    />
                  </div>
                  <Button onClick={analyzeEmail} className="w-full bg-primary hover:bg-primary/90">
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Selected Analysis Details */}
            {selectedAnalysis && (
              <Card className="bg-card border-border h-fit">
                <CardHeader>
                  <CardTitle className="text-base">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Risk Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={selectedAnalysis.riskScore} className="flex-1" />
                      <span className="font-mono text-sm font-bold">{selectedAnalysis.riskScore}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Risk Level</p>
                    <Badge
                      className={`${
                        selectedAnalysis.riskLevel === "dangerous"
                          ? "bg-cyber-red text-white"
                          : selectedAnalysis.riskLevel === "suspicious"
                            ? "bg-cyber-yellow text-black"
                            : "bg-cyber-green text-white"
                      }`}
                    >
                      {selectedAnalysis.riskLevel.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-mono text-muted-foreground">Content Threats</p>
                    <div className="space-y-1 text-xs">
                      {selectedAnalysis.contentAnalysis.urgentWords && (
                        <div className="flex items-center gap-2 text-cyber-yellow">
                          <AlertTriangle className="h-3 w-3" />
                          Urgent words: {selectedAnalysis.contentAnalysis.fearWords}
                        </div>
                      )}
                      {selectedAnalysis.contentAnalysis.suspiciousLinks && (
                        <div className="flex items-center gap-2 text-cyber-yellow">
                          <AlertTriangle className="h-3 w-3" />
                          Suspicious links detected
                        </div>
                      )}
                      {selectedAnalysis.contentAnalysis.maliciousPatterns && (
                        <div className="flex items-center gap-2 text-cyber-red">
                          <AlertTriangle className="h-3 w-3" />
                          Phishing patterns found
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <p className="text-xs font-mono text-muted-foreground">Links</p>
                    <div className="text-xs space-y-1">
                      <p>Total: {selectedAnalysis.linkAnalysis.totalLinks}</p>
                      <p className="text-cyber-yellow">Suspicious: {selectedAnalysis.linkAnalysis.suspiciousLinks}</p>
                      <p className="text-cyber-yellow">Shorteners: {selectedAnalysis.linkAnalysis.shortenerLinks}</p>
                    </div>
                  </div>

                  {selectedAnalysis.attachmentAnalysis.totalAttachments > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border">
                      <p className="text-xs font-mono text-muted-foreground">Attachments</p>
                      {selectedAnalysis.attachmentAnalysis.dangerousAttachments.length > 0 && (
                        <div className="text-xs text-cyber-red">
                          {selectedAnalysis.attachmentAnalysis.dangerousAttachments.map((att) => (
                            <p key={att} className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" /> {att}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Analyzed Emails List */}
          {analyses.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">Analysis History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {analyses.map((analysis) => (
                    <div
                      key={analysis.id}
                      onClick={() => setSelectedAnalysis(analysis)}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        selectedAnalysis?.id === analysis.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-mono text-sm font-bold text-foreground">{analysis.sender}</p>
                          <p className="text-xs text-muted-foreground">{analysis.subject}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${
                              analysis.riskLevel === "dangerous"
                                ? "bg-cyber-red text-white"
                                : analysis.riskLevel === "suspicious"
                                  ? "bg-cyber-yellow text-black"
                                  : "bg-cyber-green text-white"
                            }`}
                          >
                            {analysis.riskScore}%
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteAnalysis(analysis.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
