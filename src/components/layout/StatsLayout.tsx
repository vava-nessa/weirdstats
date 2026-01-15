'use client'

import { ReactNode } from 'react'

interface StatsLayoutProps {
  children: ReactNode
}

export function StatsLayout({ children }: StatsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            🌍 Statistiques Mondiales en Temps Réel
          </h1>
          <p className="mt-2 text-gray-600">
            Simulation des événements mondiaux en direct
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
