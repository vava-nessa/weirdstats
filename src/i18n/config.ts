export const locales = ['fr', 'en', 'zh', 'ar'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'
