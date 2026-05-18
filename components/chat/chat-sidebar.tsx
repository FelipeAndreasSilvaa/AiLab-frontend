"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Conversation {
  id: string
  title: string
  date: string
  preview: string
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId?: string;
  onNewChat: () => void;
  onDeleteConversation: (
    id: string,
  ) => void;
}

export function ChatSidebar({ conversations, activeId, onNewChat, onDeleteConversation }: ChatSidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-muted/30">
      <div className="p-3">
        <Button onClick={onNewChat} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Nova conversa
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {conversations.map((conv) => (
            <Link key={conv.id} href={`/chat?id=${conv.id}`}>
              <div
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                  activeId === conv.id && "bg-accent"
                )}
              >
                <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 truncate">
                  <p className="truncate font-medium">{conv.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {conv.date}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Renomear</DropdownMenuItem>
                    <DropdownMenuItem
                    className="text-destructive"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                  >
                    Excluir
                  </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
