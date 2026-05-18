"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChatService } from "@/service/chat.service";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
}

export function useChat() {
  const searchParams = useSearchParams();

  const urlChatId = searchParams.get("id");

  const [chatId, setChatId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedModel, setSelectedModel] = useState("gpt-4");

  // Carrega conversas ao abrir a página
  useEffect(() => {
    loadConversations();
  }, []);

  // Sempre que o ?id= mudar, carrega o chat correspondente
  useEffect(() => {
    if (urlChatId) {
      loadChat(urlChatId);
    }
  }, [urlChatId]);

  async function loadConversations() {
    try {
      const chats = await ChatService.getChats();

      setConversations(chats);

      // Se não houver id na URL e existir conversa,
      // abre a primeira automaticamente.
      if (!urlChatId && chats.length > 0) {
        await loadChat(chats[0].id);
      }

      // Se não houver nenhuma conversa,
      // cria uma nova.
      if (chats.length === 0) {
        await createNewChat();
      }
    } catch (error) {
      console.error("Erro ao carregar conversas:", error);
    }
  }

  async function createNewChat() {
    try {
      const chat = await ChatService.createChat();

      await loadConversations();
      await loadChat(chat.id);

      // Atualiza URL
      window.history.pushState({}, "", `/chat?id=${chat.id}`);
    } catch (error) {
      console.error("Erro ao criar chat:", error);
    }
  }

  // Dentro da função loadChat(), substitua por:

  async function loadChat(id: string) {
    try {
      const chat = await ChatService.getChat(id);

      setChatId(id);

      const normalized: Message[] = (chat.messages || []).map(
        (msg: any): Message => ({
          id: msg.id,
          content: msg.content,
          createdAt: msg.createdAt,
          role: msg.role === "USER" ? "user" : "assistant",
        })
      );

      setMessages(normalized);
    } catch (error) {
      console.error("Erro ao carregar chat:", error);
    }
  }

  async function sendMessage(content: string) {
    if (!chatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      // Se for a primeira mensagem do chat,
      // atualiza o título da conversa.
      if (messages.length === 0) {
        const title =
          content.length > 30 ? content.slice(0, 30) + "..." : content;

        // Atualiza o título da conversa no frontend
        setConversations((prev) =>
          prev.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  title,
                }
              : chat
          )
        );
      }

      const response = await ChatService.sendMessage(chatId, content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Recarrega lista de conversas
      const chats = await ChatService.getChats();

      setConversations(chats);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function regenerateLastResponse() {
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");

    if (!lastUserMessage) return;

    await sendMessage(lastUserMessage.content);
  }

  async function deleteConversation(
    id: string,
  ) {
    try {
      await ChatService.deleteChat(id);
  
      // Remove da lista local
      const updated =
        conversations.filter(
          (chat) => chat.id !== id,
        );
  
      setConversations(updated);
  
      // Se o chat deletado era o atual
      if (chatId === id) {
        if (updated.length > 0) {
          await loadChat(updated[0].id);
  
          window.history.pushState(
            {},
            "",
            `/chat?id=${updated[0].id}`,
          );
        } else {
          await createNewChat();
        }
      }
    } catch (error) {
      console.error(
        "Erro ao deletar conversa:",
        error,
      );
    }
  }

  function clearMessages() {
    createNewChat();
  }

  return {
    chatId,
    messages,
    conversations,
    isLoading,
    selectedModel,
    setSelectedModel,
    sendMessage,
    regenerateLastResponse,
    clearMessages,
    createNewChat,
    deleteConversation,
    loadChat,
  };
}
