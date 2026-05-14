"use client"

import { AppLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Code,
  Zap,
  MessageSquare,
  Mic,
  FileText,
  Binary,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react"
import { mockDocSections, mockCodeExamples } from "@/lib/mock-data"
import { useState } from "react"

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="mt-1 text-muted-foreground">
            Documentação completa e guias de integração do AI Lab Playground.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <Card className="border-border/50 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Navegação</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <nav className="space-y-1 p-4 pt-0">
                  {mockDocSections.map((section) => (
                    <div key={section.id} className="space-y-1">
                      <p className="px-3 py-2 font-medium">{section.title}</p>
                      {section.items.map((item) => (
                        <Button
                          key={item.href}
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground"
                          size="sm"
                        >
                          {item.title}
                        </Button>
                      ))}
                    </div>
                  ))}
                </nav>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Quick Start Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border/50 group cursor-pointer transition-colors hover:border-primary/50">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary">Quick Start</h3>
                    <p className="text-sm text-muted-foreground">
                      Comece a usar em menos de 5 minutos
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
              <Card className="border-border/50 group cursor-pointer transition-colors hover:border-primary/50">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                    <Code className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary">API Reference</h3>
                    <p className="text-sm text-muted-foreground">
                      Documentação completa da API
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </div>

            {/* Feature Documentation */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Guias de Integração</CardTitle>
                <CardDescription>
                  Aprenda a integrar cada funcionalidade do AI Lab
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: MessageSquare, title: "Chat API", color: "text-blue-500", bg: "bg-blue-500/10" },
                    { icon: Mic, title: "Speech APIs", color: "text-green-500", bg: "bg-green-500/10" },
                    { icon: FileText, title: "Document Processing", color: "text-orange-500", bg: "bg-orange-500/10" },
                    { icon: Binary, title: "Embeddings", color: "text-purple-500", bg: "bg-purple-500/10" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Ver documentação</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Exemplos de Código</CardTitle>
                <CardDescription>
                  Exemplos práticos de integração
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chat">
                  <TabsList>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="embedding">Embedding</TabsTrigger>
                    <TabsTrigger value="speech">Speech-to-Text</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chat" className="mt-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-2 top-2"
                        onClick={() => copyCode(mockCodeExamples.chat, "chat")}
                      >
                        {copiedCode === "chat" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <pre className="overflow-x-auto rounded-lg bg-muted/50 p-4 text-sm">
                        <code>{mockCodeExamples.chat}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="embedding" className="mt-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-2 top-2"
                        onClick={() => copyCode(mockCodeExamples.embedding, "embedding")}
                      >
                        {copiedCode === "embedding" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <pre className="overflow-x-auto rounded-lg bg-muted/50 p-4 text-sm">
                        <code>{mockCodeExamples.embedding}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="speech" className="mt-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-2 top-2"
                        onClick={() => copyCode(mockCodeExamples.speechToText, "speech")}
                      >
                        {copiedCode === "speech" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <pre className="overflow-x-auto rounded-lg bg-muted/50 p-4 text-sm">
                        <code>{mockCodeExamples.speechToText}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recursos Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    GitHub Repository
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    API Changelog
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    Community Discord
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    Video Tutorials
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    Best Practices
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
