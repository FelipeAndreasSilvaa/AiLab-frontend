"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Copy, ThumbsUp, RefreshCw, Sparkles, User } from "lucide-react"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp: string
  onCopy?: () => void
  onLike?: () => void
  onRegenerate?: () => void
}

export function ChatMessage({
  role,
  content,
  timestamp,
  onCopy,
  onLike,
  onRegenerate,
}: ChatMessageProps) {
  const isAssistant = role === "assistant"

  // Simple markdown-like formatting
  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Headers
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-semibold">
            {line.slice(2, -2)}
          </p>
        )
      }
      // Bold text inline
      const parts = line.split(/(\*\*.*?\*\*)/g)
      return (
        <p key={i} className="min-h-[1.5em]">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j}>{part.slice(2, -2)}</strong>
            }
            return part
          })}
        </p>
      )
    })
  }

  return (
    <div
      className={cn(
        "group flex gap-4 px-4 py-6",
        isAssistant ? "bg-muted/30" : "bg-transparent"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            isAssistant
              ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
              : "bg-secondary"
          )}
        >
          {isAssistant ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isAssistant ? "AI Assistant" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-1">
          {formatContent(content)}
        </div>
        {isAssistant && (
          <div className="flex items-center gap-1 pt-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7"
              onClick={onCopy}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7"
              onClick={onLike}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7"
              onClick={onRegenerate}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
