'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(2)

    useEffect(() => {
        // Countdown timer
        const interval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        // Redirect timer
        const timeout = setTimeout(() => {
            router.push('/')
        }, 2000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-8">
                Page Not Found / Page Introuvable
            </h2>
            <div className="text-muted-foreground animate-pulse">
                <p>Redirecting to homepage in {countdown}...</p>
                <p className="text-sm mt-1">Redirection vers l&apos;accueil dans {countdown}...</p>
            </div>
        </div>
    )
}
