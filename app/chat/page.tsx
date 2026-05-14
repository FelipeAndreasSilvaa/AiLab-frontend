"use client"

import { useRef, useEffect } from "react"
import { AppLayout } from "@/components/layout"
import { ChatMessage, ChatInput, ChatSidebar } from "@/components/chat"
import { useMockChat } from "@/hooks/use-mock-chat"
import { mockConversations, mockModels } from "@/lib/mock-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"

export default function ChatPage() {
  const { messages, isLoading, selectedModel, setSelectedModel, sendMessage, regenerateLastResponse, clearMessages } = useMockChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="hidden md:block">
          <ChatSidebar
            conversations={mockConversations}
            activeId="1"
            onNewChat={clearMessages}
          />
        </div>

        {/* Main chat area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Coins className="h-3 w-3" />
              ~2,450 tokens
            </Badge>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollRef} className="flex-1">
            <div className="mx-auto max-w-3xl">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  onCopy={() => handleCopy(msg.content)}
                  onLike={() => {}}
                  onRegenerate={regenerateLastResponse}
                />
              ))}
              {isLoading && (
                <div className="flex gap-4 px-4 py-6 bg-muted/30">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-white/50" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </AppLayout>
  )
}
