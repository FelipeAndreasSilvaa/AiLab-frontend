"use client"

import { useSidebar } from "@/hooks/use-sidebar"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isOpen, isCollapsed, isMobile, toggle, toggleCollapse, close } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        isOpen={isOpen || !isMobile}
        onClose={close}
        isMobile={isMobile}
      />
      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          !isMobile && (isCollapsed ? "ml-16" : "ml-64")
        )}
      >
        <AppHeader onMenuClick={toggle} isMobile={isMobile} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
