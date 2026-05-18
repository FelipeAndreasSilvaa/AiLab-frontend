// src/app/ocr/page.tsx
"use client";

import { useRef, useState } from "react";
import { AppLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Loader2,
  Check,
  FileJson,
  ScanText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import ocrService from "@/service/ocr.service";

interface OcrResult {
  filename: string;
  data: Record<string, any>;
}

export default function OCRPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<OcrResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  async function processFile(file: File) {
    try {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsProcessing(true);
      setResult(null);
      setError(null);

      const response = await ocrService.extract(file);

      if (!response) {
        throw new Error("Resposta vazia do serviço OCR.");
      }

      const extractedData = response.data ?? response.text;

      if (!extractedData || typeof extractedData !== "object") {
        throw new Error(
          `Campo 'data'/'text' ausente ou inválido. Resposta recebida: ${JSON.stringify(
            response
          )}`
        );
      }

      setResult({
        filename: response.filename,
        data: extractedData,
      });
    } catch (err: any) {
      console.error("Erro ao processar OCR:", err);
      setError(err?.message ?? "Erro desconhecido ao processar a imagem.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  }

  function handleCopy() {
    if (!result?.data) return;
    navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function formatLabel(label: string) {
    return label
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Garante que data é um objeto válido antes de iterar
  const safeEntries =
    result?.data && typeof result.data === "object"
      ? Object.entries(result.data)
      : [];

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">OCR Inteligente</h1>
          <p className="mt-1 text-muted-foreground">
            Extraia dados estruturados de imagens com IA.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Upload da Imagem</CardTitle>
              <CardDescription>PNG, JPG ou JPEG (máx. 10MB)</CardDescription>
            </CardHeader>

            <CardContent>
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full object-contain max-h-[400px]"
                    />

                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                        <div className="text-center">
                          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                          <p className="mt-2 text-sm font-medium">
                            Processando OCR...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleReset}
                  >
                    Carregar outra imagem
                  </Button>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
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
                    ou clique para selecionar
                  </p>
                  <Button className="mt-4">Selecionar arquivo</Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>Dados Extraídos</CardTitle>
                  <CardDescription>
                    {result
                      ? `Arquivo: ${result.filename}`
                      : "Os dados estruturados aparecerão aqui."}
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
              {/* Banner de erro */}
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                  <p className="font-semibold mb-1">Erro ao processar OCR</p>
                  <p className="font-mono break-words">{error}</p>
                </div>
              )}

              {result ? (
                <>
                  {safeEntries.length === 0 ? (
                    <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm text-yellow-700">
                      OCR concluído, mas nenhum campo foi extraído. Verifique o
                      retorno do serviço.
                    </div>
                  ) : (
                    <>
                      {/* JSON formatado com botão de copiar */}
                      <div className="relative">
                        <Textarea
                          readOnly
                          value={JSON.stringify(result.data, null, 2)}
                          className="min-h-[300px] resize-none font-mono text-sm pr-10"
                        />
                        <button
                          onClick={handleCopy}
                          className="absolute top-2 right-2 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          title="Copiar JSON"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {/* Cards por campo */}
                      <div className="grid gap-3">
                        {safeEntries.map(([key, value]) => (
                          <div key={key} className="rounded-lg border p-3">
                            <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
                              {formatLabel(key)}
                            </p>
                            <p className="text-sm break-words">
                              {typeof value === "object"
                                ? JSON.stringify(value, null, 2)
                                : String(value)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleCopy}
                      disabled={safeEntries.length === 0}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copiar JSON
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : !error ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-muted-foreground">
                  <ScanText className="mb-4 h-12 w-12 opacity-30" />
                  <p>Faça upload de uma imagem para extrair os dados.</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        {result && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="border-border/50">
              <CardContent className="pt-6 text-center">
                <FileJson className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-2xl font-bold">{safeEntries.length}</p>
                <p className="text-sm text-muted-foreground">
                  Campos extraídos
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6 text-center">
                <ImageIcon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-2xl font-bold">
                  {selectedFile
                    ? (selectedFile.size / 1024 / 1024).toFixed(2)
                    : "0"}
                  MB
                </p>
                <p className="text-sm text-muted-foreground">
                  Tamanho do arquivo
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6 text-center">
                <ScanText className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-2xl font-bold">
                  {selectedFile
                    ? selectedFile.type.split("/").pop()?.toUpperCase()
                    : "-"}
                </p>
                <p className="text-sm text-muted-foreground">Formato</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
