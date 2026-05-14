"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, MicOff, Volume2, Sparkles, User } from "lucide-react"
import { mockVoices } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type AssistantStatus = "idle" | "listening" | "thinking" | "speaking"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function VoiceAssistantPage() {
  const [status, setStatus] = useState<AssistantStatus>("idle")
  const [voice, setVoice] = useState("nova")
  const [volume, setVolume] = useState([75])
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Olá! Como posso ajudá-lo hoje?" },
    { id: "2", role: "user", content: "Qual é a previsão do tempo para amanhã?" },
    { id: "3", role: "assistant", content: "Baseado nos dados mais recentes, amanhã será um dia ensolarado com temperaturas entre 22°C e 28°C. Não há previsão de chuva." },
  ])

  const handleMicToggle = () => {
    if (status === "idle") {
      setStatus("listening")
      // Simulate voice interaction
      setTimeout(() => {
        setStatus("thinking")
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role: "user", content: "Quais são as notícias de hoje?" },
          ])
          setStatus("speaking")
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "As principais notícias de hoje incluem avanços em inteligência artificial, mercados financeiros em alta e novos desenvolvimentos em energia renovável.",
              },
            ])
            setStatus("idle")
          }, 2000)
        }, 1500)
      }, 3000)
    } else {
      setStatus("idle")
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "listening":
        return "from-green-500 to-emerald-500"
      case "thinking":
        return "from-yellow-500 to-orange-500"
      case "speaking":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "listening":
        return "Ouvindo..."
      case "thinking":
        return "Pensando..."
      case "speaking":
        return "Falando..."
      default:
        return "Clique para falar"
    }
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Voice Assistant</h1>
          <p className="mt-1 text-muted-foreground">
            Assistente de voz interativo para conversas naturais.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Avatar and Controls */}
          <Card className="border-border/50 lg:col-span-1">
            <CardContent className="flex flex-col items-center gap-6 p-6">
              {/* Animated Avatar */}
              <div className="relative">
                <div
                  className={cn(
                    "flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br transition-all duration-500",
                    getStatusColor()
                  )}
                >
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
                {status !== "idle" && (
                  <>
                    <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-20" style={{ animationDuration: "1.5s" }} />
                    <span className="absolute inset-[-10px] animate-pulse rounded-full border-2 border-current opacity-30" />
                  </>
                )}
              </div>

              {/* Status */}
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className={cn(
                    "px-4 py-1",
                    status === "listening" && "bg-green-500/20 text-green-400",
                    status === "thinking" && "bg-yellow-500/20 text-yellow-400",
                    status === "speaking" && "bg-blue-500/20 text-blue-400"
                  )}
                >
                  {getStatusText()}
                </Badge>
              </div>

              {/* Mic Button */}
              <Button
                onClick={handleMicToggle}
                size="lg"
                className={cn(
                  "h-16 w-16 rounded-full transition-all",
                  status === "listening"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                )}
              >
                {status === "listening" ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>

              {/* Voice Settings */}
              <div className="w-full space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Voz do Assistente</label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVoices.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.name} ({v.gender})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Volume</label>
                    <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversation History */}
          <Card className="border-border/50 lg:col-span-2">
            <CardHeader>
              <CardTitle>Histórico da Conversa</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3",
                        msg.role === "user" && "flex-row-reverse"
                      )}
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback
                          className={cn(
                            msg.role === "assistant"
                              ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                              : "bg-secondary"
                          )}
                        >
                          {msg.role === "assistant" ? (
                            <Sparkles className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2",
                          msg.role === "assistant"
                            ? "bg-muted"
                            : "bg-primary text-primary-foreground"
                        )}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
