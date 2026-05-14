"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Play, Loader2, Copy, Check, Settings2 } from "lucide-react"
import { mockModels } from "@/lib/mock-data"

export default function PromptPlaygroundPage() {
  const [prompt, setPrompt] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant.")
  const [model, setModel] = useState("gpt-4o")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([1024])
  const [topP, setTopP] = useState([1])
  const [isRunning, setIsRunning] = useState(false)
  const [response, setResponse] = useState("")
  const [copied, setCopied] = useState(false)

  const handleRun = () => {
    if (!prompt.trim()) return
    setIsRunning(true)
    setResponse("")

    // Simulate streaming response
    const mockResponse = `Baseado no seu prompt, aqui está uma resposta detalhada:

**Análise do Prompt**
O prompt fornecido apresenta uma estrutura clara e objetiva. Vamos analisar cada componente:

1. **Contexto**: O contexto está bem definido, permitindo uma compreensão clara do escopo da tarefa.

2. **Instrução**: A instrução é específica e direciona a resposta de forma adequada.

3. **Formato esperado**: O formato de saída está implícito, mas poderia ser mais explícito para melhores resultados.

**Sugestões de Melhoria**
- Adicione exemplos (few-shot learning)
- Especifique o formato de saída desejado
- Inclua restrições ou limitações relevantes

**Conclusão**
Com pequenos ajustes, este prompt pode gerar resultados ainda mais precisos e úteis para sua aplicação.`

    let index = 0
    const interval = setInterval(() => {
      if (index < mockResponse.length) {
        setResponse(mockResponse.slice(0, index + 10))
        index += 10
      } else {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 20)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Prompt Playground</h1>
          <p className="mt-1 text-muted-foreground">
            Experimente e refine prompts para otimizar resultados.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Prompt Input */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Prompt</CardTitle>
                <CardDescription>
                  Digite seu prompt e execute para ver a resposta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Digite seu prompt aqui...

Exemplo: Analise o seguinte texto e extraia os principais pontos-chave. Formate a resposta como uma lista numerada."
                  className="min-h-[200px] resize-none"
                />
                <Button
                  onClick={handleRun}
                  disabled={!prompt.trim() || isRunning}
                  className="w-full"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Executando...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Executar
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Response */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resposta</CardTitle>
                    <CardDescription>
                      Saída gerada pelo modelo
                    </CardDescription>
                  </div>
                  {response && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-h-[200px] rounded-lg border border-border bg-muted/30 p-4">
                  {response ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                      {response}
                      {isRunning && <span className="animate-pulse">▊</span>}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      A resposta aparecerá aqui após executar o prompt.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5" />
                  <CardTitle>Configurações</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Model */}
                <div className="space-y-2">
                  <Label>Modelo</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockModels.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Temperature */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Temperature</Label>
                    <span className="text-sm text-muted-foreground">
                      {temperature[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    min={0}
                    max={2}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controla a aleatoriedade das respostas
                  </p>
                </div>

                {/* Max Tokens */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Max Tokens</Label>
                    <span className="text-sm text-muted-foreground">
                      {maxTokens[0]}
                    </span>
                  </div>
                  <Slider
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    min={100}
                    max={4096}
                    step={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    Limite máximo de tokens na resposta
                  </p>
                </div>

                {/* Top P */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Top P</Label>
                    <span className="text-sm text-muted-foreground">
                      {topP[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={topP}
                    onValueChange={setTopP}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Nucleus sampling (alternativa a temperature)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* System Prompt */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>System Prompt</CardTitle>
                <CardDescription>
                  Define o comportamento do modelo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="You are a helpful AI assistant..."
                  className="min-h-[120px] resize-none"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
