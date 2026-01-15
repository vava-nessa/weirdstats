# 🌍 WeirdStats - World Statistics Dashboard

A real-time world statistics simulation dashboard built with Next.js, displaying global events like births, deaths, social events, and physiological data updated every 100ms.

## ✨ Features

- **Real-time Updates**: Statistics refresh every 100ms with smooth transitions
- **🎬 Animated Numbers**: Smooth spring-physics animations for all counters (configurable)
- **Two Types of Statistics**:
  - **Cumulative Stats**: Events that accumulate over your session (deaths, births, injuries, marriages, etc.)
  - **Snapshot Stats**: Real-time distribution by continent (people at home, at work, in transit, unemployed)
- **Session Timer**: Track how long you've been viewing the statistics
- **Responsive Design**: Mobile-first approach with horizontal scroll for wide tables
- **Type-Safe**: Full TypeScript implementation with no `any` types
- **Number Formatting**: Smart formatting (1.5K, 2.3M) with tabular numbers for stability
- **Color-Coded Categories**: Visual distinction between death, birth, social, and physiological events

## 🚀 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) for smooth number transitions
- **State Management**: useMemo for derived calculations
- **Data Tables**: [TanStack Table](https://tanstack.com/table/)
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier


## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/vavanesssa/weirdstats.git
   cd weirdstats
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

### Linting and Formatting

```bash
npm run lint
npm run format
```

## 📁 Project Structure

```
weirdstats/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Main dashboard page
│   │   ├── providers.tsx        # TanStack Query provider
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── stats/               # Statistics components
│   │   │   ├── CumulativeStatsTable.tsx
│   │   │   ├── SnapshotStatsTable.tsx
│   │   │   ├── PopulationCounter.tsx
│   │   │   ├── SessionTimer.tsx
│   │   │   └── StatRow.tsx
│   │   ├── ui/                  # Base UI components
│   │   │   ├── AnimatedNumber.tsx  # 🎬 Animated counter component
│   │   │   ├── Table.tsx
│   │   │   └── Card.tsx
│   │   └── layout/              # Layout components
│   │       └── StatsLayout.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useStats.ts          # Main stats aggregator
│   │   ├── useCumulativeStats.ts
│   │   ├── useSnapshotStats.ts
│   │   └── useSessionTimer.ts
│   ├── lib/                     # Utility functions
│   │   ├── animationConfig.ts   # 🎛️ Animation settings & presets
│   │   ├── constants.ts         # Rates, regions, pool volume
│   │   ├── calculations.ts      # Stat calculation logic
│   │   └── formatters.ts        # Number formatting
│   └── types/
│       └── stats.ts             # TypeScript interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🏗️ Architecture Decisions

### State Management with useMemo

Statistics are calculated using `useMemo` hooks that recompute when elapsed time changes:
- **No external API calls** - all data is derived from rates and elapsed time
- **Smooth updates** - timer ticks every 100ms, memoized calculations prevent unnecessary re-renders
- **Type-safe** - full TypeScript interfaces for all data structures

### Component Design Philosophy

- **Separation of Concerns**: Business logic in `lib/`, presentation in `components/`
- **Composition over Configuration**: Small, focused components that compose together
- **Type Safety**: Strict TypeScript with proper interfaces for all data structures
- **Reusability**: Generic UI components (`Card`, `Table`, `AnimatedNumber`) used throughout

---

## 🎬 AnimatedNumber Component

A reusable animated number component that smoothly transitions between values using spring physics.

### Location
- **Component**: `src/components/ui/AnimatedNumber.tsx`
- **Configuration**: `src/lib/animationConfig.ts`

### Basic Usage

```tsx
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

// Simple usage
<AnimatedNumber to={1500} />

// With formatting
<AnimatedNumber to={1500000} separator="," useCompactNotation={true} />
```

### Props Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `to` | `number` | **required** | The target number to animate to |
| `from` | `number` | `0` | Initial number (only on mount) |
| `direction` | `"up" \| "down"` | `"up"` | Direction of count |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `duration` | `number` | `0.5` | Animation duration factor |
| `className` | `string` | `""` | CSS class for styling |
| `startWhen` | `boolean` | `true` | Control when animation starts |
| `separator` | `string` | `" "` | Thousands separator (` ` French, `,` US) |
| `useCompactNotation` | `boolean` | `true` | Use K/M suffixes |
| `compactDecimals` | `number` | `1` | Decimals for K/M notation |
| `compactThresholdK` | `number` | `1000` | Threshold for K suffix |
| `compactThresholdM` | `number` | `1000000` | Threshold for M suffix |
| `damping` | `number` | `60` | Spring damping (10-100) |
| `stiffness` | `number` | `100` | Spring stiffness (50-500) |
| `mass` | `number` | `1` | Spring mass (0.1-10) |
| `onStart` | `() => void` | — | Callback when animation starts |
| `onEnd` | `() => void` | — | Callback when animation ends |

### Animation Presets

Ready-to-use animation presets in `src/lib/animationConfig.ts`:

```tsx
import { ANIMATION_PRESETS } from '@/lib/animationConfig'

// Balanced default
<AnimatedNumber to={100} {...ANIMATION_PRESETS.default} />

// Fast, snappy (good for rapid updates)
<AnimatedNumber to={100} {...ANIMATION_PRESETS.snappy} />

// Smooth, fluid (good for large changes)
<AnimatedNumber to={100} {...ANIMATION_PRESETS.smooth} />

// Bouncy, playful (good for celebrations)
<AnimatedNumber to={100} {...ANIMATION_PRESETS.bouncy} />

// Instant, no animation
<AnimatedNumber to={100} {...ANIMATION_PRESETS.instant} />
```

### Customizing Global Defaults

Edit `src/lib/animationConfig.ts` to change defaults for all AnimatedNumber instances:

```typescript
// ─── src/lib/animationConfig.ts ───────────────────────────────

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  // ─── Timing ──────────────────────────────────────────────
  duration: 0.5,      // Animation duration (seconds)
  delay: 0,           // Delay before start (seconds)

  // ─── Spring Physics ──────────────────────────────────────
  damping: 60,        // Higher = less bouncy (10-100)
  stiffness: 100,     // Higher = faster snap (50-500)
  mass: 1,            // Higher = more inertia (0.1-10)

  // ─── Formatting ──────────────────────────────────────────
  separator: ' ',           // Thousands separator
  useCompactNotation: true, // Show 1.5K, 1.5M
  compactDecimals: 1,       // Decimal places for K/M
  compactThresholdK: 1000,  // When to use K
  compactThresholdM: 1000000, // When to use M
}
```

### Spring Physics Explained

The animation uses Framer Motion's spring physics:

| Parameter | Low Value | High Value |
|-----------|-----------|------------|
| **damping** | More oscillation/bounce | Smooth, controlled |
| **stiffness** | Slow, fluid | Fast, snappy |
| **mass** | Light, responsive | Heavy, more inertia |

**Recommended combinations:**

- **Real-time stats**: `damping: 80, stiffness: 200` (snappy preset)
- **Large counters**: `damping: 40, stiffness: 60` (smooth preset)
- **Gamification**: `damping: 15, stiffness: 80` (bouncy preset)

---


- All statistics have proper TypeScript interfaces
- No `any` types allowed (enforced by ESLint)
- Utility functions have JSDoc comments with examples
- Type inference used where appropriate to reduce boilerplate

## 📊 Statistics Explained

### Cumulative Stats (Incremental)

These statistics accumulate over time since you loaded the page:

- **Deaths**: Broken down by cause (murder, suicide, tobacco, hunger, road accidents, other)
- **Births**: Total births worldwide
- **Net Growth**: Births minus deaths
- **Injuries**: Broken legs and arms
- **Social Events**: Marriages, divorces, abandonments, adoptions
- **Physiological**: Poop, pee, sneezes, water consumption (in liters)
- **Pool Equivalents**: Olympic pools filled with waste products

### Snapshot Stats (Real-time Distribution)

These statistics show the current state based on time of day in each region:

- **At Home**: People currently at home
- **At Work**: People currently at work (based on work hours 9am-6pm)
- **In Transit**: People commuting (7-9am, 6-8pm)
- **Unemployed**: Based on regional unemployment rates

### How Calculations Work

1. **Session Timer**: Tracks elapsed time in seconds
2. **Rate Application**: Each event has a rate per second (e.g., 4.43 births/second)
3. **Cumulative Calculation**: `event_count = rate × elapsed_seconds`
4. **Population Updates**: `current_population = base_population + net_growth`
5. **Regional Distribution**: Based on time zones and work/home patterns

### Data Sources

⚠️ **Note**: All statistics are **simulated** based on approximate global rates. This is an educational visualization, not a source of precise real-world data.

Rates are derived from:
- WHO mortality data
- UN birth rate statistics  
- International labor statistics
- Approximate physiological averages

## 🎨 Styling

The design follows a clean, minimal aesthetic:

- **Color Coding**:
  - Deaths: Red (red-50/red-700)
  - Births: Green (green-50/green-700)
  - Growth: Blue (blue-50/blue-600)
  - Injuries: Orange (orange-50/orange-700)
  - Social: Amber (amber-50/amber-700)
  - Physiological: Purple (purple-50/purple-700)
  - Pools: Cyan (cyan-50/cyan-800)

- **Typography**: 
  - Tabular numbers for stable display
  - Inter font family
  - Responsive font sizes

## 🌐 Internationalization

Currently in French with structure ready for i18n:
- All labels could be extracted to locale files
- Number formatting supports different locales
- Date/time formatting is locale-aware

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality Guidelines

- Follow the existing code style (Prettier configuration)
- Write TypeScript with proper types (no `any`)
- Add JSDoc comments for utility functions
- Keep components small and focused
- Extract magic numbers to constants
- Test your changes thoroughly

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by real-world statistics dashboards
- Built with modern React and Next.js patterns
- Powered by the TanStack ecosystem

---

**Made with ❤️ for understanding our world through data**