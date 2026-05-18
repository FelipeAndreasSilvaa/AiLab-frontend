// src/services/chat.service.ts
import api from './api.service';

export interface CreateChatResponse {
  id: string;
  title: string;
  createdAt: string;
}

export interface ChatMessageResponse {
  message: string;
  response: string;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  messages?: {
    id: string;
    role: 'USER' | 'ASSISTANT';
    content: string;
    createdAt: string;
  }[];
}

export const ChatService = {
  // POST /chat
  async createChat(): Promise<CreateChatResponse> {
    const response = await api.post('/chat');
    return response.data;
  },

  // GET /chat
  async getChats(): Promise<Chat[]> {
    const response = await api.get('/chat');
    return response.data;
  },

  // GET /chat/:chatId
  async getChat(chatId: string): Promise<Chat> {
    const response = await api.get(`/chat/${chatId}`);
    return response.data;
  },

  // POST /chat/:chatId/messages
  async sendMessage(
    chatId: string,
    message: string,
  ): Promise<ChatMessageResponse> {
    const response = await api.post(
      `/chat/${chatId}/messages`,
      { message },
    );

    return response.data;
  },

  async updateChat(
    chatId: string,
    data: { title: string },
  ) {
    const response = await api.patch(
      `/chat/${chatId}`,
      data,
    );
  
    return response.data;
  },

  async deleteChat(chatId: string) {
    const response = await api.delete(
      `/chat/${chatId}`,
    );
  
    return response.data;
  }
};