"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  MessageSquare,
  Mic,
  FileText,
  Binary,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Chat com IA",
    description: "Integração com GPT-4, Claude e Gemini para conversas inteligentes.",
  },
  {
    icon: Mic,
    title: "Speech-to-Text",
    description: "Transcrição de áudio em tempo real com alta precisão.",
  },
  {
    icon: FileText,
    title: "Análise de Documentos",
    description: "Extraia insights de PDFs e imagens automaticamente.",
  },
  {
    icon: Binary,
    title: "Embeddings",
    description: "Geração de vetores semânticos para busca e RAG.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Suas chaves de API são criptografadas e protegidas.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Otimizado para baixa latência e alta disponibilidade.",
  },
]

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    description: "Ideal para experimentar",
    features: ["1.000 tokens/mês", "Modelos básicos", "Suporte por email"],
  },
  {
    name: "Pro",
    price: "R$ 99",
    description: "Para desenvolvedores",
    features: [
      "100.000 tokens/mês",
      "Todos os modelos",
      "Suporte prioritário",
      "API Keys ilimitadas",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    description: "Para grandes equipes",
    features: [
      "Tokens ilimitados",
      "Modelos dedicados",
      "SLA garantido",
      "Suporte 24/7",
      "On-premise disponível",
    ],
  },
]

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold">AI Lab Playground</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Funcionalidades
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Preços
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Documentação
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-cyan-950/20" />
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-1 h-3 w-3" />
            Novo: Suporte para GPT-4o e Claude 3.5
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Seu ambiente sandbox para{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              integrações com IA
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Experimente, prototipe e aprenda a integrar as melhores APIs de
            Inteligência Artificial em um único lugar. Chat, Speech, OCR,
            Embeddings e muito mais.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Começar Gratuitamente
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="gap-2">
                Ver Documentação
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Sem necessidade de cartão de crédito
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tudo que você precisa para IA
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ferramentas completas para experimentar com inteligência artificial
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-card/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Planos para cada necessidade
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comece gratuitamente e escale conforme suas necessidades
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-border/50 ${
                  plan.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Mais Popular
                  </Badge>
                )}
                <CardContent className="pt-8">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <p className="mt-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.name !== "Enterprise" && (
                      <span className="text-muted-foreground">/mês</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Falar com vendas" : "Começar agora"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Junte-se a milhares de desenvolvedores que já estão experimentando
            com IA no AI Lab Playground.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Criar conta gratuita
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold">AI Lab Playground</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground">
                Documentação
              </Link>
              <Link href="#" className="hover:text-foreground">
                Termos
              </Link>
              <Link href="#" className="hover:text-foreground">
                Privacidade
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} AI Lab Playground. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
