import api from "./api.service";

export interface Document {
  id: string;
  title: string;
  content?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AskDocumentResponse {
  answer: string;
}

class DocumentsService {
  async upload(file: File): Promise<Document> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  async getAll(): Promise<Document[]> {
    const response = await api.get("/documents");
    return response.data;
  }

  async getById(id: string): Promise<Document> {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  }

  async ask(
    documentId: string,
    question: string
  ): Promise<AskDocumentResponse> {
    const response = await api.post(`/documents/${documentId}/ask`, {
      question,
    });

    return response.data;
  }

  async update(documentId: string, title: string): Promise<Document> {
    const response = await api.patch(`/documents/${documentId}`, {
      title,
    });

    return response.data;
  }

  async delete(documentId: string): Promise<void> {
    await api.delete(`/documents/${documentId}`);
  }
}

const documentsService = new DocumentsService();

export default documentsService;