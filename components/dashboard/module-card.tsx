import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Mic,
  AudioWaveform,
  FileText,
  ScanText,
  Binary,
  WandSparkles,
  BookOpen,
  Key,
  Settings,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  "message-square": MessageSquare,
  mic: Mic,
  "audio-waveform": AudioWaveform,
  "file-text": FileText,
  "scan-text": ScanText,
  binary: Binary,
  "wand-sparkles": WandSparkles,
  "book-open": BookOpen,
  key: Key,
  settings: Settings,
}

interface ModuleCardProps {
  title: string
  description: string
  icon: string
  href: string
  color: string
}

export function ModuleCard({ title, description, icon, href, color }: ModuleCardProps) {
  const Icon = iconMap[icon] || MessageSquare

  return (
    <Link href={href}>
      <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg">
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10",
            `bg-gradient-to-br ${color}`
          )}
        />
        <CardHeader className="pb-2">
          <div
            className={cn(
              "mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
              color
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button variant="ghost" className="group/btn -ml-3 gap-2 px-3 text-muted-foreground transition-colors hover:text-foreground">
            Abrir módulo
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
