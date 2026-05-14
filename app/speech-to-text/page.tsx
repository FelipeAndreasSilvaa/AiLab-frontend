"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { mockLanguages } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function SpeechToTextPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [language, setLanguage] = useState("pt")
  const [duration, setDuration] = useState(0)
  const [transcription, setTranscription] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((d) => d + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      setIsTranscribing(true)
      // Simulate transcription
      setTimeout(() => {
        setTranscription(
          "Esta é uma transcrição de exemplo gerada automaticamente. O sistema de reconhecimento de fala converteu o áudio em texto com alta precisão. Você pode copiar, editar ou processar este texto conforme necessário."
        )
        setIsTranscribing(false)
      }, 2000)
    } else {
      setDuration(0)
      setTranscription("")
      setIsRecording(true)
    }
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Speech-to-Text</h1>
          <p className="mt-1 text-muted-foreground">
            Transcreva áudio em texto com alta precisão usando IA.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recording Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Gravação de Áudio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Idioma</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Recording button */}
              <div className="flex flex-col items-center gap-6 py-8">
                <button
                  onClick={handleToggleRecording}
                  disabled={isTranscribing}
                  className={cn(
                    "relative flex h-32 w-32 items-center justify-center rounded-full transition-all duration-300",
                    isRecording
                      ? "bg-red-500 shadow-lg shadow-red-500/30"
                      : "bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-emerald-500/30 hover:scale-105",
                    isTranscribing && "opacity-50"
                  )}
                >
                  {isRecording ? (
                    <MicOff className="h-12 w-12 text-white" />
                  ) : (
                    <Mic className="h-12 w-12 text-white" />
                  )}
                  {isRecording && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-30" />
                  )}
                </button>

                {/* Timer */}
                <div className="text-center">
                  <p className="text-4xl font-mono font-bold">
                    {formatDuration(duration)}
                  </p>
                  <Badge variant={isRecording ? "destructive" : "secondary"} className="mt-2">
                    {isRecording ? "Gravando" : isTranscribing ? "Transcrevendo..." : "Pronto"}
                  </Badge>
                </div>

                {/* Sound wave animation */}
                {isRecording && (
                  <div className="flex items-center gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-green-500"
                        style={{
                          height: `${Math.random() * 30 + 10}px`,
                          animation: `pulse 0.5s ease-in-out ${i * 0.1}s infinite alternate`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <Button
                className="w-full"
                disabled={!isRecording && !transcription}
                onClick={handleToggleRecording}
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Transcrevendo...
                  </>
                ) : isRecording ? (
                  "Parar e Transcrever"
                ) : (
                  "Iniciar Gravação"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Transcription Section */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Transcrição</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="A transcrição aparecerá aqui..."
                className="min-h-[300px] resize-none"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={!transcription}
                  onClick={() => navigator.clipboard.writeText(transcription)}
                >
                  Copiar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={!transcription}
                >
                  Baixar
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  disabled={!transcription}
                  onClick={() => setTranscription("")}
                >
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          from {
            transform: scaleY(0.5);
          }
          to {
            transform: scaleY(1.5);
          }
        }
      `}</style>
    </AppLayout>
  )
}
