/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎬 ANIMATION CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file contains all animation settings for the AnimatedNumber component.
 * Modify these values to customize the animation behavior across the app.
 *
 * @see src/components/ui/AnimatedNumber.tsx - The component using these settings
 * @see README.md - Full documentation
 */

export interface AnimationConfig {
    /**
     * Duration of the count animation in seconds.
     * Higher values = slower, smoother animation.
     * @default 0.5
     */
    duration: number

    /**
     * Delay before the animation starts (in seconds).
     * Useful for staggering multiple counters.
     * @default 0
     */
    delay: number

    /**
     * Spring damping for the animation.
     * Higher values = less oscillation, more controlled.
     * Lower values = more bouncy effect.
     * @default 60
     * @range 10-100
     */
    damping: number

    /**
     * Spring stiffness for the animation.
     * Higher values = faster, snappier animation.
     * Lower values = slower, more fluid animation.
     * @default 100
     * @range 50-500
     */
    stiffness: number

    /**
     * Spring mass for the animation.
     * Higher values = more inertia, heavier feel.
     * Lower values = lighter, more responsive.
     * @default 1
     * @range 0.1-10
     */
    mass: number

    /**
     * Thousands separator character.
     * Use ' ' for French style (1 000 000)
     * Use ',' for US style (1,000,000)
     * Use '' for no separator
     * @default ' '
     */
    separator: string

    /**
     * Enable/disable K/M suffix formatting.
     * When true: 1500 → "1.5K", 1500000 → "1.5M"
     * When false: 1500 → "1 500"
     * @default true
     */
    useCompactNotation: boolean

    /**
     * Number of decimal places for compact notation (K/M).
     * @default 1
     */
    compactDecimals: number

    /**
     * Threshold for using K suffix.
     * Numbers >= this value will show as "XK"
     * @default 1000
     */
    compactThresholdK: number

    /**
     * Threshold for using M suffix.
     * Numbers >= this value will show as "XM"
     * @default 1000000
     */
    compactThresholdM: number

    /**
     * Number of decimal places to show when not using compact notation.
     * @default 0
     */
    fractionDigits: number
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎛️ DEFAULT ANIMATION SETTINGS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Modify these values to change the default behavior of all AnimatedNumber
 * components in the application.
 */
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
    // ─── Timing ──────────────────────────────────────────────────────────────
    duration: 0.5,
    delay: 0,

    // ─── Spring Physics ──────────────────────────────────────────────────────
    // These control the "feel" of the number transition
    damping: 60,    // Higher = less bouncy (10-100)
    stiffness: 100, // Higher = faster snap (50-500)
    mass: 1,        // Higher = more inertia (0.1-10)

    // ─── Formatting ──────────────────────────────────────────────────────────
    separator: ' ',           // Thousands separator: ' ' for French, ',' for US
    useCompactNotation: false, // Show 1500 as "1 500", 1500000 as "1 500 000"
    compactDecimals: 1,       // Decimal places for compact notation
    compactThresholdK: 1000,  // Threshold for K suffix
    compactThresholdM: 1000000, // Threshold for M suffix
    fractionDigits: 0,        // Default to integers
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎨 PRESET CONFIGURATIONS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Ready-to-use presets for different animation styles.
 * Usage: <AnimatedNumber to={1000} {...ANIMATION_PRESETS.snappy} />
 */
export const ANIMATION_PRESETS = {
    /**
     * Default balanced animation
     */
    default: DEFAULT_ANIMATION_CONFIG,

    /**
     * Fast, snappy transitions - good for rapid updates
     */
    snappy: {
        ...DEFAULT_ANIMATION_CONFIG,
        duration: 0.2,
        damping: 80,
        stiffness: 200,
    } as AnimationConfig,

    /**
     * Smooth, fluid transitions - good for large number changes
     */
    smooth: {
        ...DEFAULT_ANIMATION_CONFIG,
        duration: 0.8,
        damping: 40,
        stiffness: 60,
    } as AnimationConfig,

    /**
     * Bouncy, playful animation - good for celebrations
     */
    bouncy: {
        ...DEFAULT_ANIMATION_CONFIG,
        duration: 0.6,
        damping: 15,
        stiffness: 80,
        mass: 0.8,
    } as AnimationConfig,

    /**
     * Instant, no animation - for very fast updates
     */
    instant: {
        ...DEFAULT_ANIMATION_CONFIG,
        duration: 0,
        damping: 100,
        stiffness: 500,
    } as AnimationConfig,
} as const
