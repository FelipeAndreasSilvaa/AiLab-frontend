"use client";

import { useEffect, useRef } from "react";
import { Coins } from "lucide-react";

import { AppLayout } from "@/components/layout";
import { ChatInput, ChatMessage, ChatSidebar } from "@/components/chat";

import { useChat } from "@/hooks/use-chat";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Modelos disponíveis
const models = [
  {
    id: "groq-llama",
    name: "Groq Llama 3",
  },
  {
    id: "openai-gpt4",
    name: "GPT-4",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
  },
];

export default function ChatPage() {
  const {
    chatId,
    messages,
    conversations,
    isLoading,
    selectedModel,
    setSelectedModel,
    sendMessage,
    regenerateLastResponse,
    deleteConversation,
    clearMessages,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Copiar mensagem
  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error("Erro ao copiar:", error);
    }
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="hidden md:block">
          <ChatSidebar
            conversations={conversations.map((conversation) => ({
              id: conversation.id,
              title: conversation.title || "Nova conversa",
              date: new Date(conversation.createdAt).toLocaleDateString(
                "pt-BR"
              ),
              preview: "",
            }))}
            activeId={chatId || ""}
            onNewChat={clearMessages}
            onDeleteConversation={deleteConversation}
          />
        </div>

        {/* Área principal do chat */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>

                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Badge variant="secondary" className="gap-1">
              <Coins className="h-3 w-3" />
              Chat IA
            </Badge>
          </div>

          {/* Mensagens */}
          <ScrollArea ref={scrollRef} className="flex-1">
            <div className="mx-auto max-w-3xl">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={new Date(message.createdAt).toLocaleTimeString(
                    "pt-BR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                  onCopy={() => handleCopy(message.content)}
                  onLike={() => {}}
                  onRegenerate={regenerateLastResponse}
                />
              ))}

              {/* Loading */}
              {isLoading && (
                <div className="flex gap-4 bg-muted/30 px-4 py-6">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
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
  );
}
