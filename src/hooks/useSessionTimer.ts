'use client'

import { useEffect, useState } from 'react'

/**
 * Custom hook to track session time
 * @returns Object containing sessionStartTime and elapsedSeconds
 */
export function useSessionTimer() {
  const [sessionStartTime] = useState<number>(() => Date.now())
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - sessionStartTime) / 1000
      setElapsedSeconds(elapsed)
    }, 100)

    return () => clearInterval(interval)
  }, [sessionStartTime])

  return { sessionStartTime, elapsedSeconds }
}
