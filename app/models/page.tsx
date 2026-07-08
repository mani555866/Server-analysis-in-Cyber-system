"use client"

import { CyberSidebar } from "@/components/cyber/sidebar"
import { CyberHeader } from "@/components/cyber/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  Target,
  Zap,
  RefreshCw,
  Play,
  Pause,
  Settings,
  BarChart3,
  Users,
  Shield,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const predictionData = [
  { time: "00:00", actual: 12, predicted: 14, probability: 0.85 },
  { time: "04:00", actual: 8, predicted: 10, probability: 0.78 },
  { time: "08:00", actual: 25, predicted: 22, probability: 0.92 },
  { time: "12:00", actual: 45, predicted: 48, probability: 0.89 },
  { time: "16:00", actual: 38, predicted: 35, probability: 0.91 },
  { time: "20:00", actual: 22, predicted: 25, probability: 0.87 },
  { time: "Now", actual: 18, predicted: 20, probability: 0.94 },
]

const models = [
  {
    id: "model-001",
    name: "Attack Predictor",
    type: "Classification",
    description: "Predicts probability of attack based on network patterns",
    accuracy: 94.2,
    precision: 92.8,
    recall: 95.1,
    f1Score: 93.9,
    status: "active",
    lastTrained: "2 hours ago",
    predictions: 15420,
    icon: Target,
  },
  {
    id: "model-002",
    name: "User Risk Classifier",
    type: "Regression",
    description: "Calculates risk score for user behavior analysis",
    accuracy: 91.5,
    precision: 89.2,
    recall: 93.8,
    f1Score: 91.4,
    status: "active",
    lastTrained: "4 hours ago",
    predictions: 8932,
    icon: Users,
  },
  {
    id: "model-003",
    name: "Anomaly Detector",
    type: "Unsupervised",
    description: "Detects anomalies in network traffic and user behavior",
    accuracy: 96.8,
    precision: 95.4,
    recall: 97.2,
    f1Score: 96.3,
    status: "active",
    lastTrained: "1 hour ago",
    predictions: 42156,
    icon: Zap,
  },
  {
    id: "model-004",
    name: "User Clustering",
    type: "K-Means",
    description: "Groups users into risk categories based on behavior",
    accuracy: 88.9,
    precision: 87.5,
    recall: 90.1,
    f1Score: 88.8,
    status: "training",
    lastTrained: "Training...",
    predictions: 1146,
    icon: BarChart3,
  },
]

const upcomingPredictions = [
  { time: "Next 1h", attackProbability: 32, confidence: 94 },
  { time: "Next 6h", attackProbability: 58, confidence: 87 },
  { time: "Next 24h", attackProbability: 74, confidence: 78 },
]

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-background">
      <CyberSidebar />
      <div className="ml-64 flex flex-col h-screen">
        <CyberHeader />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-mono text-2xl font-bold text-foreground">AI Models</h1>
              <p className="text-sm text-muted-foreground">
                Machine learning models for prediction and classification
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retrain All
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Brain className="mr-2 h-4 w-4" />
                New Model
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Models</p>
                    <p className="font-mono text-2xl font-bold text-foreground">4</p>
                  </div>
                  <Brain className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Accuracy</p>
                    <p className="font-mono text-2xl font-bold text-cyber-green">92.8%</p>
                  </div>
                  <Target className="h-8 w-8 text-cyber-green" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Predictions Today</p>
                    <p className="font-mono text-2xl font-bold text-foreground">67,654</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-cyber-purple" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Threats Prevented</p>
                    <p className="font-mono text-2xl font-bold text-cyber-cyan">2,847</p>
                  </div>
                  <Shield className="h-8 w-8 text-cyber-cyan" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Chart */}
          <Card className="bg-card border-border mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-mono text-sm">Attack Prediction vs Actual (24h)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 12 }}
                      axisLine={{ stroke: "oklch(0.25 0.02 240)" }}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.65 0.02 240)", fontSize: 12 }}
                      axisLine={{ stroke: "oklch(0.25 0.02 240)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.12 0.015 240)",
                        border: "1px solid oklch(0.25 0.02 240)",
                        borderRadius: "8px",
                        fontFamily: "monospace",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="oklch(0.6 0.22 25)"
                      strokeWidth={2}
                      dot={{ fill: "oklch(0.6 0.22 25)" }}
                      name="Actual Attacks"
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="oklch(0.75 0.18 175)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "oklch(0.75 0.18 175)" }}
                      name="Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Models List */}
            <div className="lg:col-span-2 space-y-4">
              {models.map((model) => (
                <Card key={model.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          model.status === "active" ? "bg-primary/10" : "bg-cyber-yellow/10"
                        }`}>
                          <model.icon className={`h-6 w-6 ${
                            model.status === "active" ? "text-primary" : "text-cyber-yellow"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-foreground">{model.name}</h3>
                            <Badge variant="outline" className="font-mono text-xs">
                              {model.type}
                            </Badge>
                            <Badge className={model.status === "active" ? "bg-cyber-green text-background" : "bg-cyber-yellow text-background"}>
                              {model.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                          
                          {/* Metrics */}
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Accuracy</p>
                              <p className="font-mono text-sm font-bold text-cyber-green">{model.accuracy}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Precision</p>
                              <p className="font-mono text-sm font-bold text-foreground">{model.precision}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Recall</p>
                              <p className="font-mono text-sm font-bold text-foreground">{model.recall}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">F1 Score</p>
                              <p className="font-mono text-sm font-bold text-foreground">{model.f1Score}%</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span>Last trained: {model.lastTrained}</span>
                            <span>Predictions: {model.predictions.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          {model.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Predictions Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Attack Probability */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-cyber-red" />
                    <span className="font-mono text-sm">Attack Probability</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingPredictions.map((pred) => (
                    <div key={pred.time} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{pred.time}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-sm font-bold ${
                            pred.attackProbability >= 70 ? "text-cyber-red" :
                            pred.attackProbability >= 40 ? "text-cyber-yellow" : "text-cyber-green"
                          }`}>
                            {pred.attackProbability}%
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {pred.confidence}% conf
                          </Badge>
                        </div>
                      </div>
                      <Progress
                        value={pred.attackProbability}
                        className="h-2"
                        style={{
                          background: "oklch(0.18 0.02 240)",
                        }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Model Performance */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span className="font-mono text-sm">Model Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {models.map((model) => (
                      <div key={model.id} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{model.name}</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-1.5 rounded-full bg-cyber-green"
                            style={{ width: `${model.accuracy}px` }}
                          />
                          <span className="font-mono text-xs text-muted-foreground w-12">
                            {model.accuracy}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyber-cyan" />
                    <span className="font-mono text-sm">Current Risk Level</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="relative inline-block">
                      <svg width="120" height="120" className="-rotate-90">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="oklch(0.18 0.02 240)"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          stroke="oklch(0.8 0.18 85)"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${(58 / 100) * 314} 314`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-3xl font-bold text-cyber-yellow">58</span>
                        <span className="text-xs text-muted-foreground">MODERATE</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Based on current traffic patterns and threat intelligence
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
