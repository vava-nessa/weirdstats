'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function NotFound() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(2)

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        const timeout = setTimeout(() => {
            router.push('/')
        }, 2000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [router])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-8"
            >
                <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
                    404
                </h1>

                <div className="space-y-2 text-neutral-400 text-xl font-light tracking-wide">
                    <p>Page Not Found</p>
                    <p>Page Introuvable</p>
                </div>

                <div className="pt-8">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                        <div className="relative w-4 h-4 flex items-center justify-center">
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                            <div className="relative w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="text-sm font-medium text-neutral-300">
                            Redirecting in <span className="text-white font-bold">{countdown}s</span>
                        </span>
                        <span className="text-sm font-medium text-neutral-300 border-l border-neutral-800 pl-3">
                            Redirection dans <span className="text-white font-bold">{countdown}s</span>
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black z-[-1]" />
        </div>
    )
}
