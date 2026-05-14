import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Coins, Brain, FileText, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  coins: Coins,
  brain: Brain,
  "file-text": FileText,
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: string
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
  const Icon = iconMap[icon] || Activity
  const isPositive = change.startsWith("+")
  const isNeutral = change === "0%"

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            "text-xs",
            isNeutral
              ? "text-muted-foreground"
              : isPositive
              ? "text-emerald-500"
              : "text-red-500"
          )}
        >
          {change} from last period
        </p>
      </CardContent>
    </Card>
  )
}
