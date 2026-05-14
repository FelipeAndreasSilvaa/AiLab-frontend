"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Languages,
  FileText,
  Loader2,
  Check,
} from "lucide-react"
import { mockOCRResult } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function OCRPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<typeof mockOCRResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleImageUpload = () => {
    // Simulate image selection
    setImage("/placeholder-invoice.png")
    setIsProcessing(true)
    setTimeout(() => {
      setResult(mockOCRResult)
      setIsProcessing(false)
    }, 2000)
  }

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
    handleImageUpload()
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">OCR</h1>
          <p className="mt-1 text-muted-foreground">
            Extraia texto de imagens com reconhecimento óptico de caracteres.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Upload de Imagem</CardTitle>
              <CardDescription>
                Arraste uma imagem ou clique para selecionar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {image ? (
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-24 w-24 text-muted-foreground/30" />
                    </div>
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                        <div className="text-center">
                          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                          <p className="mt-2 text-sm font-medium">Processando...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setImage(null)
                      setResult(null)
                    }}
                  >
                    Carregar outra imagem
                  </Button>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleImageUpload}
                  className={cn(
                    "flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 font-medium">Arraste uma imagem aqui</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG ou PDF (max 10MB)
                  </p>
                  <Button className="mt-4">Selecionar arquivo</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Texto Extraído</CardTitle>
                  <CardDescription>
                    {result
                      ? `Confiança: ${result.confidence}% • Idioma: ${result.language}`
                      : "O texto extraído aparecerá aqui"}
                  </CardDescription>
                </div>
                {result && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" />
                    Processado
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={result?.text || ""}
                readOnly
                placeholder="Aguardando processamento..."
                className="min-h-[300px] resize-none font-mono text-sm"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  disabled={!result}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </Button>
                <Button variant="outline" className="gap-2" disabled={!result}>
                  <Languages className="h-4 w-4" />
                  Traduzir
                </Button>
                <Button variant="outline" className="gap-2" disabled={!result}>
                  <FileText className="h-4 w-4" />
                  Resumir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info cards */}
        {result && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{result.confidence}%</p>
                  <p className="text-sm text-muted-foreground">Confiança</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{result.text.split(/\s+/).length}</p>
                  <p className="text-sm text-muted-foreground">Palavras detectadas</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{result.language}</p>
                  <p className="text-sm text-muted-foreground">Idioma detectado</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
