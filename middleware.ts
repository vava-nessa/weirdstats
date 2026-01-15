import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './src/i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
})

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}
