"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "Chat com IA", href: "/chat" },
  { icon: Mic, label: "Speech-to-Text", href: "/speech-to-text" },
  { icon: AudioWaveform, label: "Voice Assistant", href: "/voice-assistant" },
  { icon: FileText, label: "PDF Analysis", href: "/pdf-analysis" },
  { icon: ScanText, label: "OCR", href: "/ocr" },
  { icon: Binary, label: "Embeddings", href: "/embeddings" },
  { icon: WandSparkles, label: "Prompt Playground", href: "/prompt-playground" },
  { icon: BookOpen, label: "Documentation", href: "/docs" },
  { icon: Key, label: "API Keys", href: "/api-keys" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

interface AppSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isOpen: boolean
  onClose?: () => void
  isMobile?: boolean
}

export function AppSidebar({
  isCollapsed,
  onToggleCollapse,
  isOpen,
  onClose,
  isMobile,
}: AppSidebarProps) {
  const pathname = usePathname()

  if (!isOpen && isMobile) {
    return null
  }

  return (
    <TooltipProvider delayDuration={0}>
      <>
        {/* Mobile overlay */}
        {isMobile && isOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
        )}

        <aside
          className={cn(
            "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300",
            isCollapsed ? "w-16" : "w-64",
            isMobile && "shadow-xl"
          )}
        >
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {!isCollapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-sidebar-foreground">AI Lab</span>
              </Link>
            )}
            {isCollapsed && (
              <Link href="/" className="mx-auto">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </Link>
            )}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn("shrink-0", isCollapsed && "mx-auto")}
                onClick={onToggleCollapse}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="flex flex-col gap-1 px-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Link href={item.href} onClick={isMobile ? onClose : undefined}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            size="icon"
                            className={cn(
                              "w-full",
                              isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={8}>
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  )
                }

                return (
                  <Link key={item.href} href={item.href} onClick={isMobile ? onClose : undefined}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          {!isCollapsed && (
            <div className="border-t border-border p-4">
              <p className="text-xs text-muted-foreground">
                AI Lab Playground v1.0
              </p>
            </div>
          )}
        </aside>
      </>
    </TooltipProvider>
  )
}
