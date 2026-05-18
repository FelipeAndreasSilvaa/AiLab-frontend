// src/services/documents.service.ts
import api from './api.service';

export interface Document {
  id: string;
  title: string;
  fileName: string;
  createdAt: string;
}

export interface AskDocumentResponse {
  answer: string;
}

export interface UpdateDocumentDto {
  title?: string;
}

export const DocumentsService = {
  // POST /documents/upload
  async upload(file: File): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(
      '/documents/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  // POST /documents/:id/ask
  async ask(
    documentId: string,
    question: string,
  ): Promise<AskDocumentResponse> {
    const response = await api.post(
      `/documents/${documentId}/ask`,
      { question },
    );

    return response.data;
  },

  // GET /documents
  async getAll(): Promise<Document[]> {
    const response = await api.get('/documents');
    return response.data;
  },

  // GET /documents/:id
  async getById(documentId: string): Promise<Document> {
    const response = await api.get(
      `/documents/${documentId}`,
    );
    return response.data;
  },

  // PATCH /documents/:id
  async update(
    documentId: string,
    data: UpdateDocumentDto,
  ): Promise<Document> {
    const response = await api.patch(
      `/documents/${documentId}`,
      data,
    );

    return response.data;
  },

  // DELETE /documents/:id
  async remove(documentId: string): Promise<void> {
    await api.delete(`/documents/${documentId}`);
  },
};