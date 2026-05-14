"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Eye,
  EyeOff,
  Save,
  TestTube,
  Plus,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react"
import { mockApiKeys } from "@/lib/mock-data"

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(mockApiKeys)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [newKeys, setNewKeys] = useState({
    openai: "",
    anthropic: "",
    google: "",
  })
  const [testResults, setTestResults] = useState<Record<string, "success" | "error" | null>>({})

  const toggleShowKey = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleTest = (provider: string) => {
    // Simulate API test
    setTimeout(() => {
      setTestResults((prev) => ({
        ...prev,
        [provider]: Math.random() > 0.3 ? "success" : "error",
      }))
    }, 1000)
  }

  const maskKey = (key: string) => {
    if (key.length <= 8) return key
    return key.slice(0, 4) + "..." + key.slice(-4)
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie suas chaves de API para diferentes provedores de IA.
          </p>
        </div>

        <div className="space-y-6">
          {/* Add New Keys */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Adicionar API Keys</CardTitle>
              <CardDescription>
                Configure suas chaves de API para utilizar os serviços de IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OpenAI */}
              <div className="space-y-2">
                <Label htmlFor="openai">OpenAI API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="openai"
                    type="password"
                    placeholder="sk-..."
                    value={newKeys.openai}
                    onChange={(e) =>
                      setNewKeys((prev) => ({ ...prev, openai: e.target.value }))
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleTest("openai")}
                    className="gap-2"
                  >
                    <TestTube className="h-4 w-4" />
                    Testar
                  </Button>
                </div>
                {testResults.openai && (
                  <p
                    className={`flex items-center gap-1 text-sm ${
                      testResults.openai === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {testResults.openai === "success" ? (
                      <>
                        <Check className="h-4 w-4" />
                        Conexão bem-sucedida
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        Falha na conexão
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Anthropic */}
              <div className="space-y-2">
                <Label htmlFor="anthropic">Anthropic API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="anthropic"
                    type="password"
                    placeholder="sk-ant-..."
                    value={newKeys.anthropic}
                    onChange={(e) =>
                      setNewKeys((prev) => ({ ...prev, anthropic: e.target.value }))
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleTest("anthropic")}
                    className="gap-2"
                  >
                    <TestTube className="h-4 w-4" />
                    Testar
                  </Button>
                </div>
                {testResults.anthropic && (
                  <p
                    className={`flex items-center gap-1 text-sm ${
                      testResults.anthropic === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {testResults.anthropic === "success" ? (
                      <>
                        <Check className="h-4 w-4" />
                        Conexão bem-sucedida
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        Falha na conexão
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Google AI */}
              <div className="space-y-2">
                <Label htmlFor="google">Google AI API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="google"
                    type="password"
                    placeholder="AIza..."
                    value={newKeys.google}
                    onChange={(e) =>
                      setNewKeys((prev) => ({ ...prev, google: e.target.value }))
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleTest("google")}
                    className="gap-2"
                  >
                    <TestTube className="h-4 w-4" />
                    Testar
                  </Button>
                </div>
                {testResults.google && (
                  <p
                    className={`flex items-center gap-1 text-sm ${
                      testResults.google === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {testResults.google === "success" ? (
                      <>
                        <Check className="h-4 w-4" />
                        Conexão bem-sucedida
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4" />
                        Falha na conexão
                      </>
                    )}
                  </p>
                )}
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Salvar API Keys
              </Button>
            </CardContent>
          </Card>

          {/* Existing Keys */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Chaves Configuradas</CardTitle>
              <CardDescription>
                API Keys atualmente configuradas na sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provedor</TableHead>
                    <TableHead>Chave</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último uso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">
                        {key.provider}
                      </TableCell>
                      <TableCell className="font-mono">
                        <div className="flex items-center gap-2">
                          <span>
                            {showKeys[key.id] ? key.key : maskKey(key.key)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => toggleShowKey(key.id)}
                          >
                            {showKeys[key.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            key.status === "active" ? "default" : "secondary"
                          }
                        >
                          {key.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="flex items-start gap-3 pt-6">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <p className="font-medium text-amber-500">Aviso de segurança</p>
                <p className="text-sm text-muted-foreground">
                  Suas API Keys são armazenadas de forma segura e criptografadas.
                  Nunca compartilhe suas chaves com terceiros. Caso suspeite de
                  comprometimento, regenere suas chaves imediatamente nos
                  respectivos provedores.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
