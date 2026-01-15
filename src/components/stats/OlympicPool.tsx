'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface OlympicPoolProps {
  fillPercentage: number
  color: 'brown' | 'yellow'
  index: number
}

export function OlympicPool({ fillPercentage, color, index }: OlympicPoolProps) {
  const fillColor = color === 'brown' ? '#8B4513' : '#FFD700'
  const [currentFill, setCurrentFill] = useState(0)

  useEffect(() => {
    setCurrentFill(fillPercentage)
  }, [fillPercentage])

  const poolHeight = 34
  const fillHeight = (poolHeight * currentFill) / 100
  const fillY = 9 + poolHeight - fillHeight

  return (
    <div className="relative inline-block" style={{ width: '60px', height: '50px' }}>
      {/* Pool outline (black border in U shape) */}
      <svg
        width="60"
        height="50"
        viewBox="0 0 60 50"
        className="absolute inset-0"
      >
        {/* Pool border - U shape */}
        <path
          d="M 7 7 L 7 43 L 53 43 L 53 7"
          fill="none"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="square"
        />

        {/* Fill liquid - animates from bottom to top */}
        <motion.rect
          x={9}
          width={42}
          fill={fillColor}
          initial={{ y: 43, height: 0 }}
          animate={{
            y: fillY,
            height: fillHeight,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 0.5,
          }}
        />
      </svg>
    </div>
  )
}
