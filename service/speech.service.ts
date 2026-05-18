import api from './api.service';

export const SpeechService = {
  async transcribe(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/speech/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};