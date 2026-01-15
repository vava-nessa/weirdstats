import './globals.css'
import { headers } from 'next/headers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = headers().get('x-next-intl-locale') ?? 'fr'

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
