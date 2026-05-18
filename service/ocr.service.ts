import api from "./api.service";

export interface OcrResponse {
  filename: string;
  data?: Record<string, any>;
  text?: Record<string, any>;
}

class OcrService {
  async extract(file: File): Promise<OcrResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/ocr/extract", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const raw = response.data;

    return {
      filename: raw.filename,
      data: raw.data ?? raw.text,
    };
  }
  
}

const ocrService = new OcrService();

export default ocrService;