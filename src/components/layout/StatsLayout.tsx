'use client'

import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from './LanguageSwitcher'

interface StatsLayoutProps {
  children: ReactNode
}

export function StatsLayout({ children }: StatsLayoutProps) {
  const t = useTranslations('layout')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('title')}
              </h1>
              <p className="mt-2 text-gray-600">{t('subtitle')}</p>
            </div>
            <div className="sm:pt-1 sm:self-start sm:ml-auto">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
