'use client'

import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

interface StatsLayoutProps {
  children: ReactNode
}

export function StatsLayout({ children }: StatsLayoutProps) {
  const t = useTranslations('layout')

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {t('title')}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t('subtitle')}
              </p>
            </div>
            <div className="flex gap-2 sm:pt-1 sm:self-start sm:ml-auto">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
