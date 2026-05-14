"use client"

import { useState, useCallback } from "react"
import { mockMessages } from "@/lib/mock-data"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const mockResponses = [
  "That's a great question! Let me think about that for a moment...\n\nBased on my analysis, I would recommend considering the following approaches:\n\n1. Start with a clear problem definition\n2. Break down the problem into smaller components\n3. Test each component individually\n4. Iterate and refine your solution",
  "I understand what you're asking. Here's my perspective:\n\nThe key to success in this area is to focus on fundamentals while staying adaptable to new developments. Consider these points:\n\n- **Foundation**: Build strong foundational knowledge\n- **Practice**: Regular hands-on experience is crucial\n- **Community**: Engage with others in the field",
  "Excellent question! This is something many people wonder about.\n\nThe short answer is that it depends on your specific context, but generally speaking, you should:\n\n1. Evaluate your current situation\n2. Define clear goals\n3. Create a step-by-step plan\n4. Monitor progress and adjust as needed",
]

export function useMockChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4o")

  const sendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const regenerateLastResponse = useCallback(() => {
    setMessages((prev) => {
      const lastAssistantIndex = [...prev].reverse().findIndex((m) => m.role === "assistant")
      if (lastAssistantIndex === -1) return prev

      const index = prev.length - 1 - lastAssistantIndex
      const newMessages = [...prev]
      newMessages[index] = {
        ...newMessages[index],
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      }
      return newMessages
    })
  }, [])

  return {
    messages,
    isLoading,
    selectedModel,
    setSelectedModel,
    sendMessage,
    clearMessages,
    regenerateLastResponse,
  }
}
