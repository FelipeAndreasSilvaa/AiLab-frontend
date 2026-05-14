// Mock data for AI Lab Playground

export const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/user.png",
}

export const mockConversations = [
  { id: "1", title: "How to build a REST API", date: "2024-01-15", preview: "I need help understanding..." },
  { id: "2", title: "React best practices", date: "2024-01-14", preview: "What are the current..." },
  { id: "3", title: "TypeScript generics", date: "2024-01-13", preview: "Can you explain..." },
  { id: "4", title: "Database optimization", date: "2024-01-12", preview: "My queries are slow..." },
  { id: "5", title: "CSS Grid vs Flexbox", date: "2024-01-11", preview: "When should I use..." },
]

export const mockMessages = [
  {
    id: "1",
    role: "user" as const,
    content: "Hello! Can you explain how machine learning works?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "assistant" as const,
    content: "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. Here are the key concepts:\n\n1. **Training Data**: ML models learn from large datasets\n2. **Algorithms**: Mathematical models that identify patterns\n3. **Features**: Input variables used for predictions\n4. **Model Training**: Process of learning from data\n5. **Prediction**: Using the trained model on new data",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    role: "user" as const,
    content: "What are some common types of machine learning?",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    role: "assistant" as const,
    content: "There are three main types of machine learning:\n\n**1. Supervised Learning**\n- Uses labeled training data\n- Examples: Classification, Regression\n\n**2. Unsupervised Learning**\n- Finds patterns in unlabeled data\n- Examples: Clustering, Dimensionality Reduction\n\n**3. Reinforcement Learning**\n- Learns through trial and error\n- Examples: Game playing, Robotics",
    timestamp: "10:33 AM",
  },
]

export const mockModels = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "claude-sonnet", name: "Claude Sonnet", provider: "Anthropic" },
  { id: "gemini-2.5", name: "Gemini 2.5", provider: "Google" },
]

export const mockPDFs = [
  { id: "1", name: "Research Paper.pdf", size: "2.4 MB", pages: 15, uploadedAt: "2024-01-15" },
  { id: "2", name: "Technical Documentation.pdf", size: "1.8 MB", pages: 32, uploadedAt: "2024-01-14" },
  { id: "3", name: "User Manual.pdf", size: "890 KB", pages: 8, uploadedAt: "2024-01-13" },
]

export const mockOCRResult = {
  text: `INVOICE

Invoice Number: INV-2024-001
Date: January 15, 2024

Bill To:
John Smith
123 Main Street
New York, NY 10001

Items:
1. Web Development Services - $2,500.00
2. UI/UX Design - $1,200.00
3. Consulting - $800.00

Subtotal: $4,500.00
Tax (10%): $450.00
Total: $4,950.00

Payment Terms: Net 30
Due Date: February 14, 2024`,
  confidence: 98.5,
  language: "English",
}

export const mockEmbeddings = [
  [0.0234, -0.0156, 0.0891, 0.0432, -0.0678, 0.0123, -0.0456, 0.0789],
  [0.0567, -0.0234, 0.0678, 0.0123, -0.0891, 0.0456, -0.0789, 0.0345],
  [-0.0123, 0.0456, -0.0789, 0.0234, 0.0567, -0.0891, 0.0678, -0.0345],
]

export const mockApiKeys = [
  { id: "1", provider: "OpenAI", key: "sk-...xxxx", status: "active", lastUsed: "2024-01-15" },
  { id: "2", provider: "Anthropic", key: "sk-ant-...xxxx", status: "active", lastUsed: "2024-01-14" },
  { id: "3", provider: "Google AI", key: "AIza...xxxx", status: "inactive", lastUsed: "2024-01-10" },
]

export const mockDashboardStats = [
  { title: "API Calls Today", value: "1,234", change: "+12%", icon: "activity" },
  { title: "Tokens Used", value: "45.2K", change: "+8%", icon: "coins" },
  { title: "Active Models", value: "3", change: "0%", icon: "brain" },
  { title: "Documents Processed", value: "28", change: "+15%", icon: "file-text" },
]

export const mockModules = [
  {
    id: "chat",
    title: "Chat com IA",
    description: "Converse com modelos de linguagem avançados como GPT-4, Claude e Gemini.",
    icon: "message-square",
    href: "/chat",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "speech-to-text",
    title: "Speech-to-Text",
    description: "Transcreva áudio em texto com alta precisão usando IA.",
    icon: "mic",
    href: "/speech-to-text",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "voice-assistant",
    title: "Voice Assistant",
    description: "Assistente de voz interativo para conversas naturais.",
    icon: "audio-waveform",
    href: "/voice-assistant",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "pdf-analysis",
    title: "PDF Analysis",
    description: "Analise e extraia informações de documentos PDF.",
    icon: "file-text",
    href: "/pdf-analysis",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "ocr",
    title: "OCR",
    description: "Extraia texto de imagens com reconhecimento óptico de caracteres.",
    icon: "scan-text",
    href: "/ocr",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "embeddings",
    title: "Embeddings",
    description: "Gere embeddings vetoriais para análise semântica.",
    icon: "binary",
    href: "/embeddings",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "prompt-playground",
    title: "Prompt Playground",
    description: "Experimente e refine prompts para otimizar resultados.",
    icon: "wand-sparkles",
    href: "/prompt-playground",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "api-keys",
    title: "API Keys",
    description: "Gerencie suas chaves de API para diferentes provedores.",
    icon: "key",
    href: "/api-keys",
    color: "from-slate-500 to-zinc-500",
  },
  {
    id: "docs",
    title: "Documentation",
    description: "Documentação completa e guias de integração.",
    icon: "book-open",
    href: "/docs",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure suas preferências e personalize a experiência.",
    icon: "settings",
    href: "/settings",
    color: "from-gray-500 to-slate-500",
  },
]

export const mockLanguages = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
]

export const mockVoices = [
  { id: "alloy", name: "Alloy", gender: "Neutral" },
  { id: "echo", name: "Echo", gender: "Male" },
  { id: "fable", name: "Fable", gender: "Neutral" },
  { id: "onyx", name: "Onyx", gender: "Male" },
  { id: "nova", name: "Nova", gender: "Female" },
  { id: "shimmer", name: "Shimmer", gender: "Female" },
]

export const mockDocSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of AI Lab Playground",
    items: [
      { title: "Introduction", href: "#intro" },
      { title: "Quick Start", href: "#quick-start" },
      { title: "Installation", href: "#installation" },
    ],
  },
  {
    id: "chat-api",
    title: "Chat API",
    description: "Integrate chat capabilities into your applications",
    items: [
      { title: "Basic Usage", href: "#chat-basic" },
      { title: "Streaming", href: "#chat-streaming" },
      { title: "Function Calling", href: "#function-calling" },
    ],
  },
  {
    id: "speech",
    title: "Speech APIs",
    description: "Convert speech to text and text to speech",
    items: [
      { title: "Speech-to-Text", href: "#stt" },
      { title: "Text-to-Speech", href: "#tts" },
      { title: "Real-time Transcription", href: "#realtime" },
    ],
  },
  {
    id: "embeddings",
    title: "Embeddings",
    description: "Generate and use vector embeddings",
    items: [
      { title: "Create Embeddings", href: "#create-embeddings" },
      { title: "Similarity Search", href: "#similarity" },
      { title: "RAG Implementation", href: "#rag" },
    ],
  },
]

export const mockCodeExamples = {
  chat: `import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, how are you?' }
  ],
});

console.log(response.choices[0].message.content);`,
  embedding: `import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'Your text to embed',
});

console.log(response.data[0].embedding);`,
  speechToText: `import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const transcription = await openai.audio.transcriptions.create({
  file: fs.createReadStream('audio.mp3'),
  model: 'whisper-1',
});

console.log(transcription.text);`,
}
