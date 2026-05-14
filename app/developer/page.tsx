"use client"

import { AppLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Cpu,
  HardDrive,
  Network,
  Clock,
  Database,
  Server,
  Zap,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"

const systemMetrics = [
  { label: "CPU Usage", value: 45, icon: Cpu, color: "text-blue-500" },
  { label: "Memory", value: 62, icon: HardDrive, color: "text-green-500" },
  { label: "Network I/O", value: 28, icon: Network, color: "text-purple-500" },
  { label: "Disk Usage", value: 73, icon: Database, color: "text-orange-500" },
]

const recentRequests = [
  { endpoint: "/api/chat/completions", status: 200, latency: "145ms", time: "2s ago" },
  { endpoint: "/api/embeddings", status: 200, latency: "89ms", time: "5s ago" },
  { endpoint: "/api/speech/transcribe", status: 200, latency: "320ms", time: "12s ago" },
  { endpoint: "/api/chat/completions", status: 429, latency: "-", time: "15s ago" },
  { endpoint: "/api/ocr/extract", status: 200, latency: "456ms", time: "22s ago" },
  { endpoint: "/api/chat/completions", status: 200, latency: "167ms", time: "30s ago" },
]

const services = [
  { name: "OpenAI API", status: "operational", latency: "145ms" },
  { name: "Anthropic API", status: "operational", latency: "189ms" },
  { name: "Google AI API", status: "degraded", latency: "450ms" },
  { name: "Database", status: "operational", latency: "12ms" },
  { name: "Cache (Redis)", status: "operational", latency: "3ms" },
]

export default function DeveloperPage() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Developer Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Monitor de sistema e métricas técnicas.
          </p>
        </div>

        {/* System Metrics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systemMetrics.map((metric) => (
            <Card key={metric.label} className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}%</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
                <Progress value={metric.value} className="mt-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent API Requests */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <CardTitle>Recent API Requests</CardTitle>
              </div>
              <CardDescription>Last 10 API calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRequests.map((req, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={req.status === 200 ? "default" : "destructive"}
                        className="w-12 justify-center"
                      >
                        {req.status}
                      </Badge>
                      <code className="text-sm">{req.endpoint}</code>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {req.latency}
                      </span>
                      <span>{req.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Status */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <CardTitle>Service Status</CardTitle>
              </div>
              <CardDescription>External service health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {service.status === "operational" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          service.status === "operational" ? "secondary" : "outline"
                        }
                        className={
                          service.status === "operational"
                            ? "bg-green-500/10 text-green-500"
                            : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {service.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {service.latency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-border/50 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <CardTitle>Performance Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime (30d)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">156ms</p>
                  <p className="text-sm text-muted-foreground">Avg. Latency</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">12.4K</p>
                  <p className="text-sm text-muted-foreground">Requests (24h)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">0.02%</p>
                  <p className="text-sm text-muted-foreground">Error Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
