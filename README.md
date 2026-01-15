# 🌍 WeirdStats - World Statistics Dashboard

A real-time world statistics simulation dashboard built with Next.js, displaying global events like births, deaths, social events, and physiological data updated every 100ms.

## ✨ Features

- **Real-time Updates**: Statistics refresh every 100ms using TanStack Query
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
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/)
- **Data Tables**: [TanStack Table](https://tanstack.com/table/)
- **Package Manager**: npm
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
│   │   ├── constants.ts         # Rates, regions, pool volume
│   │   ├── calculations.ts      # Stat calculation logic
│   │   ├── formatters.ts        # Number formatting
│   │   └── types.ts
│   └── types/
│       └── stats.ts             # TypeScript interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🏗️ Architecture Decisions

### Why TanStack Query?

TanStack Query provides:
- **Automatic refetching** with configurable intervals (100ms for real-time feel)
- **Caching and synchronization** across components
- **Loading and error states** out of the box
- **Optimized re-renders** only when data changes

### Component Design Philosophy

- **Separation of Concerns**: Business logic in `lib/`, presentation in `components/`
- **Composition over Configuration**: Small, focused components that compose together
- **Type Safety**: Strict TypeScript with proper interfaces for all data structures
- **Reusability**: Generic UI components (`Card`, `Table`) used throughout

### Type Safety Approach

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