"use client";

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Upload,
  FileText,
  X,
  MessageSquare,
  Lightbulb,
  FileQuestion,
  Send,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import documentService from "@/service/documents.service";

interface Document {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "Resuma este documento.",
  "Qual é o objetivo principal?",
  "Quais são as conclusões?",
];

export default function PDFAnalysisPage() {
  const [files, setFiles] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<Document | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [loadingFiles, setLoadingFiles] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  function createMessage(
    role: "user" | "assistant",
    content: string
  ): ChatMessage {
    return {
      id: crypto.randomUUID(),
      role,
      content,
    };
  }

  async function loadDocuments() {
    try {
      setLoadingFiles(true);

      const documents = await documentService.getAll();

      setFiles(documents);

      if (documents.length > 0) {
        const firstDocument = documents[0];
        setSelectedFile(firstDocument);

        setChatMessages([
          createMessage(
            "assistant",
            `Olá! Selecionei o documento "${firstDocument.title}". Posso responder perguntas sobre ele.`
          ),
        ]);
      }
    } catch (error) {
      console.error("Erro ao carregar documentos:", error);
    } finally {
      setLoadingFiles(false);
    }
  }

  async function handleUpload(file: File) {
    try {
      setUploading(true);

      const newDocument = await documentService.upload(file);

      setFiles((prev) => [newDocument, ...prev]);
      setSelectedFile(newDocument);

      setChatMessages([
        createMessage(
          "assistant",
          `Documento "${newDocument.title}" enviado com sucesso! Agora você pode fazer perguntas sobre ele.`
        ),
      ]);
    } catch (error) {
      console.error("Erro ao enviar PDF:", error);
      alert("Erro ao enviar PDF.");
    } finally {
      setUploading(false);
    }
  }

  async function handleAsk() {
    if (!question.trim() || !selectedFile || asking) return;

    const currentQuestion = question.trim();

    setChatMessages((prev) => [
      ...prev,
      createMessage("user", currentQuestion),
    ]);

    setQuestion("");
    setAsking(true);

    try {
      const response = await documentService.ask(
        selectedFile.id,
        currentQuestion
      );

      setChatMessages((prev) => [
        ...prev,
        createMessage("assistant", response.answer),
      ]);
    } catch (error) {
      console.error("Erro ao perguntar:", error);

      setChatMessages((prev) => [
        ...prev,
        createMessage(
          "assistant",
          "Ocorreu um erro ao processar sua pergunta."
        ),
      ]);
    } finally {
      setAsking(false);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file && file.type === "application/pdf") {
      handleUpload(file);
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      handleUpload(file);
    }
  }

  function selectDocument(doc: Document) {
    setSelectedFile(doc);

    setChatMessages([
      createMessage(
        "assistant",
        `Documento "${doc.title}" selecionado. Faça sua pergunta.`
      ),
    ]);
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="hidden w-64 flex-col border-r border-border bg-muted/30 md:flex">
          <div className="p-4">
            <h2 className="font-semibold">Documentos</h2>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {loadingFiles ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : files.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  Nenhum documento enviado.
                </p>
              ) : (
                files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => selectDocument(file)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                      selectedFile?.id === file.id && "bg-accent"
                    )}
                  >
                    <FileText className="h-4 w-4 shrink-0 text-orange-500" />

                    <div className="flex-1 truncate">
                      <p className="truncate font-medium">{file.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(file.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main */}
        <div className="flex flex-1 flex-col lg:flex-row">
          {/* Upload / Preview */}
          <div className="flex-1 p-6">
            {selectedFile ? (
              <Card className="h-full border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">
                      {selectedFile.title}
                    </CardTitle>
                    <CardDescription>
                      Enviado em{" "}
                      {new Date(selectedFile.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </CardDescription>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>

                <CardContent className="h-[calc(100%-80px)]">
                  <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
                    <div className="text-center">
                      <FileText className="mx-auto h-16 w-16 text-muted-foreground/50" />
                      <p className="mt-4 text-sm text-muted-foreground">
                        PDF processado e pronto para análise
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

                  <label>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleFileInput}
                    />

                    <Button className="mt-4" asChild>
                      <span>
                        {uploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Selecionar arquivo"
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="w-full border-t border-border lg:w-96 lg:border-l lg:border-t-0">
            <div className="flex h-full flex-col">
              {/* Summary */}
              <div className="space-y-3 border-b border-border p-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">
                    Análise Inteligente
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Faça perguntas sobre o conteúdo do PDF e receba respostas
                  contextualizadas com IA.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">PDF</Badge>
                  <Badge variant="secondary">RAG</Badge>
                  <Badge variant="secondary">IA</Badge>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-2 border-b border-border p-4">
                <div className="flex items-center gap-2">
                  <FileQuestion className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">
                    Perguntas sugeridas
                  </span>
                </div>

                {SUGGESTED_QUESTIONS.map((q) => (
                  <Button
                    key={q}
                    variant="ghost"
                    className="h-auto w-full justify-start px-2 py-1 text-left text-sm"
                    onClick={() => setQuestion(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>

              {/* Chat Messages */}
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-2 border-b border-border p-4">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Chat Contextual</span>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
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

                    {asking && (
                      <div className="rounded-lg bg-muted p-3 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Pergunte sobre o documento..."
                      disabled={!selectedFile || asking}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAsk();
                        }
                      }}
                    />

                    <Button
                      size="icon"
                      onClick={handleAsk}
                      disabled={!selectedFile || asking || !question.trim()}
                    >
                      {asking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
