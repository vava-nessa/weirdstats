'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Locale, locales } from '@/i18n/config'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function buildLocalePathname(pathname: string, locale: Locale) {
  if (!pathname) {
    return `/${locale}`
  }

  const segments = pathname.split('/')

  if (segments.length > 1) {
    segments[1] = locale
    return segments.join('/') || `/${locale}`
  }

  return `/${locale}`
}

export function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher')
  const pathname = usePathname()
  const activeLocale = useLocale()

  const flags: Record<Locale, string> = {
    fr: '🇫🇷',
    en: '🇬🇧',
    zh: '🇨🇳',
    ar: '🇸🇦',
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label={t('label')} className="text-foreground dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80">
          <span className="mr-2">{flags[activeLocale as Locale]}</span>
          {t(`languages.${activeLocale}`)}
          <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} asChild>
            <Link href={buildLocalePathname(pathname, locale)} className="cursor-pointer w-full flex items-center">
              <span className="mr-2">{flags[locale]}</span>
              {t(`languages.${locale}`)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
