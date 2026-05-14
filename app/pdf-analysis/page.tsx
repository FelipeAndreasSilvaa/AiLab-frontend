"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Upload,
  FileText,
  X,
  MessageSquare,
  Lightbulb,
  FileQuestion,
  Send,
  Loader2,
} from "lucide-react"
import { mockPDFs } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function PDFAnalysisPage() {
  const [files, setFiles] = useState(mockPDFs)
  const [selectedFile, setSelectedFile] = useState(mockPDFs[0])
  const [isDragging, setIsDragging] = useState(false)
  const [question, setQuestion] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant" as const, content: "Olá! Selecionei o documento \"Research Paper.pdf\". Posso ajudá-lo a analisar o conteúdo, responder perguntas ou gerar resumos." },
  ])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Simulate file upload
    const newFile = {
      id: Date.now().toString(),
      name: "New Document.pdf",
      size: "1.2 MB",
      pages: 10,
      uploadedAt: new Date().toISOString().split("T")[0],
    }
    setFiles((prev) => [newFile, ...prev])
  }

  const handleAsk = () => {
    if (!question.trim()) return
    setChatMessages((prev) => [
      ...prev,
      { role: "user" as const, content: question },
    ])
    setQuestion("")
    // Simulate response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: "Baseado na análise do documento, posso informar que o texto aborda principalmente temas relacionados a inteligência artificial e machine learning. O documento apresenta uma estrutura bem organizada com introdução, metodologia, resultados e conclusão.",
        },
      ])
    }, 1000)
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* File List */}
        <div className="hidden w-64 flex-col border-r border-border bg-muted/30 md:flex">
          <div className="p-4">
            <h2 className="font-semibold">Documentos</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                    selectedFile?.id === file.id && "bg-accent"
                  )}
                >
                  <FileText className="h-4 w-4 shrink-0 text-orange-500" />
                  <div className="flex-1 truncate">
                    <p className="truncate font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.pages} páginas • {file.size}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* PDF Preview / Upload */}
          <div className="flex-1 p-6">
            {selectedFile ? (
              <Card className="h-full border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">{selectedFile.name}</CardTitle>
                    <CardDescription>
                      {selectedFile.pages} páginas • {selectedFile.size}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(files[0])}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                  <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                    <div className="text-center">
                      <FileText className="mx-auto h-16 w-16 text-muted-foreground/50" />
                      <p className="mt-4 text-sm text-muted-foreground">
                        Preview do PDF
                      </p>
                      <p className="text-xs text-muted-foreground">
                        (Simulação - sem renderização real)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "flex h-full items-center justify-center rounded-xl border-2 border-dashed transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/30"
                )}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 font-medium">Arraste um PDF aqui</p>
                  <p className="text-sm text-muted-foreground">
                    ou clique para selecionar
                  </p>
                  <Button className="mt-4">Selecionar arquivo</Button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Panel */}
          <div className="w-full border-t border-border lg:w-96 lg:border-l lg:border-t-0">
            <div className="flex h-full flex-col">
              {/* Tabs-like header */}
              <div className="border-b border-border p-4">
                <h2 className="font-semibold">Análise do Documento</h2>
              </div>

              {/* Quick insights */}
              <div className="space-y-3 border-b border-border p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Resumo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Documento acadêmico sobre técnicas de processamento de linguagem natural e suas aplicações em sistemas de IA conversacional.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">AI</Badge>
                  <Badge variant="secondary">NLP</Badge>
                  <Badge variant="secondary">Machine Learning</Badge>
                </div>
              </div>

              {/* Suggested questions */}
              <div className="space-y-2 border-b border-border p-4">
                <div className="flex items-center gap-2">
                  <FileQuestion className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Perguntas sugeridas</span>
                </div>
                <div className="space-y-1">
                  {[
                    "Qual é o objetivo principal?",
                    "Quais são as conclusões?",
                    "Resuma a metodologia.",
                  ].map((q, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className="h-auto w-full justify-start px-2 py-1 text-left text-sm"
                      onClick={() => setQuestion(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-2 border-b border-border p-4">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Chat Contextual</span>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-lg p-3 text-sm",
                          msg.role === "assistant"
                            ? "bg-muted"
                            : "ml-8 bg-primary text-primary-foreground"
                        )}
                      >
                        {msg.content}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Pergunte sobre o documento..."
                      onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                    />
                    <Button size="icon" onClick={handleAsk}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
