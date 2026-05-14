"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, Copy, Check, Sparkles } from "lucide-react"
import { mockEmbeddings } from "@/lib/mock-data"

export default function EmbeddingsPage() {
  const [text, setText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [embeddings, setEmbeddings] = useState<number[][] | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!text.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setEmbeddings(mockEmbeddings)
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopy = () => {
    if (embeddings) {
      navigator.clipboard.writeText(JSON.stringify(embeddings, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Embeddings</h1>
          <p className="mt-1 text-muted-foreground">
            Gere embeddings vetoriais para análise semântica de texto.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Texto de Entrada</CardTitle>
              <CardDescription>
                Digite ou cole o texto para gerar embeddings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite seu texto aqui...

Por exemplo: 'Inteligência artificial é uma área da computação que busca criar sistemas capazes de realizar tarefas que normalmente requerem inteligência humana.'"
                className="min-h-[200px] resize-none"
              />
              <Button
                onClick={handleGenerate}
                disabled={!text.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando Embeddings...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Embedding
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Metrics Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Métricas</CardTitle>
              <CardDescription>
                Informações sobre o embedding gerado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {embeddings ? "1536" : "-"}
                  </p>
                  <p className="text-sm text-muted-foreground">Dimensão</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {embeddings ? "ada-002" : "-"}
                  </p>
                  <p className="text-sm text-muted-foreground">Modelo</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {embeddings ? "0.23s" : "-"}
                  </p>
                  <p className="text-sm text-muted-foreground">Tempo</p>
                </div>
              </div>

              {embeddings && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Vetor de Embedding (amostra)</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar JSON
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="rounded-lg border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Index</TableHead>
                          {embeddings[0].slice(0, 4).map((_, i) => (
                            <TableHead key={i} className="text-right">
                              [{i}]
                            </TableHead>
                          ))}
                          <TableHead className="text-center">...</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {embeddings.map((row, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-mono text-muted-foreground">
                              {i}
                            </TableCell>
                            {row.slice(0, 4).map((val, j) => (
                              <TableCell key={j} className="text-right font-mono text-sm">
                                {val.toFixed(4)}
                              </TableCell>
                            ))}
                            <TableCell className="text-center text-muted-foreground">
                              ...
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mostrando apenas os primeiros 4 valores de cada linha. O vetor completo possui 1536 dimensões.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Use cases */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Casos de Uso</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Busca Semântica",
                description: "Encontre documentos similares baseado no significado",
              },
              {
                title: "Clustering",
                description: "Agrupe textos por similaridade semântica",
              },
              {
                title: "Recomendação",
                description: "Recomende conteúdo baseado em preferências",
              },
              {
                title: "RAG",
                description: "Retrieval Augmented Generation para LLMs",
              },
            ].map((useCase, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-2">
                    {useCase.title}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
