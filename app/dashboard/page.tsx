"use client"

import { AppLayout } from "@/components/layout"
import { ModuleCard, StatCard } from "@/components/dashboard"
import { mockModules, mockDashboardStats } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Bem-vindo ao AI Lab Playground. Selecione um módulo para começar.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockDashboardStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Module Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Módulos Disponíveis</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockModules.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={module.description}
                icon={module.icon}
                href={module.href}
                color={module.color}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
