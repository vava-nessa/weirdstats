'use client'

import { useEffect, useRef } from 'react'
import { useSpring, useTransform, motion, MotionValue } from 'framer-motion'
import {
    AnimationConfig,
    DEFAULT_ANIMATION_CONFIG,
} from '@/lib/animationConfig'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🔢 ANIMATED NUMBER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * A performant animated number component using Framer Motion springs.
 * Smoothly animates between number values with configurable physics.
 *
 * @example
 * // Basic usage
 * <AnimatedNumber to={1500} />
 *
 * @example
 * // With custom settings
 * <AnimatedNumber
 *   to={1000000}
 *   from={0}
 *   duration={1}
 *   separator=","
 *   className="text-2xl font-bold"
 * />
 *
 * @example
 * // Using a preset
 * import { ANIMATION_PRESETS } from '@/lib/animationConfig'
 * <AnimatedNumber to={500} {...ANIMATION_PRESETS.bouncy} />
 */

export interface AnimatedNumberProps extends Partial<AnimationConfig> {
    /**
     * The target number to animate to.
     * @required
     */
    to: number

    /**
     * The starting number (default: 0).
     * Only used on initial mount, subsequent changes animate from current value.
     */
    from?: number

    /**
     * Direction of count: "up" or "down".
     * When "down", from and to are reversed.
     * @default "up"
     */
    direction?: 'up' | 'down'

    /**
     * Whether to start the animation.
     * Useful for triggering on scroll into view.
     * @default true
     */
    startWhen?: boolean

    /**
     * CSS class to apply to the component.
     */
    className?: string

    /**
     * Callback when animation starts.
     */
    onStart?: () => void

    /**
     * Callback when animation ends.
     */
    onEnd?: () => void
}

/**
 * Format a number based on configuration
 */
function formatValue(
    value: number,
    config: AnimationConfig
): string {
    const {
        useCompactNotation,
        compactDecimals,
        compactThresholdK,
        compactThresholdM,
        separator,
        fractionDigits
    } = config

    if (useCompactNotation) {
        if (value >= compactThresholdM) {
            return (value / 1_000_000).toFixed(compactDecimals) + 'M'
        }
        if (value >= compactThresholdK) {
            return (value / 1_000).toFixed(compactDecimals) + 'K'
        }
    }

    // Format with separator
    const fixedValue = value.toFixed(fractionDigits)
    const [integerPart, decimalPart] = fixedValue.split('.')

    let formattedInteger = integerPart
    if (separator) {
        formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    }

    // Use comma for decimal separator if we have decimals (French style as requested)
    return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger
}

/**
 * Hook to get formatted display value from motion value
 */
function useFormattedValue(
    motionValue: MotionValue<number>,
    config: AnimationConfig
): MotionValue<string> {
    return useTransform(motionValue, (value) => formatValue(value, config))
}

export function AnimatedNumber({
    to,
    from = 0,
    direction = 'up',
    startWhen = true,
    className = '',
    onStart,
    onEnd,
    duration = DEFAULT_ANIMATION_CONFIG.duration,
    delay = DEFAULT_ANIMATION_CONFIG.delay,
    damping = DEFAULT_ANIMATION_CONFIG.damping,
    stiffness = DEFAULT_ANIMATION_CONFIG.stiffness,
    mass = DEFAULT_ANIMATION_CONFIG.mass,
    separator = DEFAULT_ANIMATION_CONFIG.separator,
    useCompactNotation = DEFAULT_ANIMATION_CONFIG.useCompactNotation,
    compactDecimals = DEFAULT_ANIMATION_CONFIG.compactDecimals,
    compactThresholdK = DEFAULT_ANIMATION_CONFIG.compactThresholdK,
    compactThresholdM = DEFAULT_ANIMATION_CONFIG.compactThresholdM,
    fractionDigits = DEFAULT_ANIMATION_CONFIG.fractionDigits,
}: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const hasStartedRef = useRef(false)
    const prevToRef = useRef(from)

    // Build config object
    const config: AnimationConfig = {
        duration,
        delay,
        damping,
        stiffness,
        mass,
        separator,
        useCompactNotation,
        compactDecimals,
        compactThresholdK,
        compactThresholdM,
        fractionDigits,
    }

    // Determine actual from/to based on direction
    const actualFrom = direction === 'down' ? to : from
    const actualTo = direction === 'down' ? from : to

    // Create spring animation
    const springValue = useSpring(prevToRef.current, {
        damping,
        stiffness,
        mass,
    })

    // Format the animated value
    const displayValue = useFormattedValue(springValue, config)

    // Handle animation start/end callbacks
    useEffect(() => {
        if (!startWhen) return

        const unsubscribe = springValue.on('change', (current) => {
            // Check if animation just started
            if (!hasStartedRef.current && current !== prevToRef.current) {
                hasStartedRef.current = true
                onStart?.()
            }

            // Check if animation ended (close enough to target)
            if (hasStartedRef.current && Math.abs(current - actualTo) < 0.5) {
                hasStartedRef.current = false
                onEnd?.()
            }
        })

        return () => unsubscribe()
    }, [springValue, actualTo, startWhen, onStart, onEnd])

    // Animate to new value when 'to' changes
    useEffect(() => {
        if (!startWhen) return

        const timeoutId = setTimeout(() => {
            springValue.set(actualTo)
            prevToRef.current = actualTo
        }, delay * 1000)

        return () => clearTimeout(timeoutId)
    }, [actualTo, delay, springValue, startWhen])

    return (
        <motion.span
            ref={ref}
            className={`tabular-nums ${className}`}
        >
            {displayValue}
        </motion.span>
    )
}

export default AnimatedNumber
