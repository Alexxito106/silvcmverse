# AGENT.md - SilviVerse Context Guide

**Every AI assistant working on SilviVerse must read this file before making any modifications.**

---

## Project Overview

### Project Name
**SilviVerse**

### Project Description
SilviVerse is a **romantic interactive web experience** built as a digital universe dedicated to someone called Silvi.

It acts like a **digital scrapbook / memory museum / emotional diary** where memories, feelings, letters, and flowers can be stored and explored interactively.

**Design Philosophy:**
- The site must feel magical, artistic, intimate, and emotional
- This is NOT a typical productivity web app
- **Emotion, beauty, and softness are more important than complexity**
- Every interaction should feel personal and meaningful

---

## Technology Stack

### Core Technologies
- **Next.js 16.1.6** (App Router) - Server-side rendering and routing
- **React 19.2.3** - Component framework
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Utility-first styling
- **Framer Motion** - Smooth, romantic animations

### Optional Utilities
- **html2canvas** - Export memory cards as PNG images
- **LocalStorage API** - Client-side data persistence

### Key Principle
The project should always remain **frontend-focused and lightweight**. Do not introduce backend dependencies unless explicitly required by the user.

---

## Project Architecture

### Directory Structure
```
verse/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home/hero page
│   ├── globals.css             # Global styling
│   ├── recuerdos/page.tsx       # Memory gallery
│   ├── sensaciones/page.tsx     # Emotional notes
│   ├── cartas/page.tsx          # Secret letters
│   └── flores/page.tsx          # Flower garden
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Desktop navigation
│   │   ├── MobileNavbar.tsx     # Mobile bottom nav
│   │   ├── MemoryCard.tsx       # Memory display
│   │   ├── FeelingCard.tsx      # Feeling display
│   │   ├── LetterDisplay.tsx    # Letter component
│   │   ├── Flower.tsx           # Individual flower
│   │   ├── ParticleSystem.tsx   # Particle effects
│   │   ├── WelcomeOverlay.tsx   # First-time intro
│   │   └── KeyboardShortcuts.tsx # Keyboard handling
│   ├── lib/
│   │   ├── storage.ts           # LocalStorage abstraction
│   │   └── utils.ts             # Helper functions
│   ├── providers/
│   │   ├── ToastProvider.tsx    # Global toast context
│   │   └── RootProviders.tsx    # All app providers wrapper
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── data/
│   │   └── sample.ts            # Sample data for demos
│   ├── hooks/
│   │   └── useStatistics.ts     # Statistics hook
│   └── styles/
│       └── globals.css          # Global CSS (via app/)
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

### Architectural Principles

**1. Modular Components**
- Each feature (recuerdos, sensaciones, cartas, flores) is independent
- Components are small, focused, and reusable
- Props are typed with TypeScript interfaces

**2. Centralized State Management**
- Use React Context for global features (Toast, Theme)
- Use LocalStorage for persistence
- Avoid unnecessary global state
- Keep state as local as possible

**3. Provider System**
- `RootProviders.tsx` wraps the entire app
- Includes: ToastProvider, ParticleSystem, Navbar, WelcomeOverlay
- All providers are initialized at the root level

**4. Utility Layer**
- `lib/storage.ts` - All LocalStorage operations
- `lib/utils.ts` - Helper functions (generateId, formatDate, etc.)
- Utilities are pure functions with no side effects

---

## UI Philosophy

### Visual Identity

**Overall Feel:**
- Romantic, soft, elegant, pastel, dreamlike
- Intimate and personal
- Beautiful without being ostentatious
- Emotional and non-intrusive

### Color Palette
```
--color-rose-primary:      #FFE4EF  (light pink)
--color-purple-primary:    #EDE0FF  (light purple)
--color-teal-primary:      #DFF7EA  (light teal)
--color-cream-primary:     #FFF7F3  (cream)
--color-warm-primary:      #F5E6D3  (warm beige)
```

### Design Principles
- **Rounded cards** - All components use rounded corners
- **Soft shadows** - Gentle, diffuse shadows (not harsh)
- **Pastel colors** - Muted, romantic tones
- **Generous spacing** - Breathing room between elements
- **Typography** - Playfair Display for headings, Crimson Text for romantic text
- **Smooth transitions** - All interactions are animated smoothly

### UI Components Guidelines
- Buttons should be soft rectangles with rounded corners
- Cards should have subtle shadows and light backgrounds
- Inputs should feel delicate with soft focus states
- Modals should fade in, not pop
- All text colors should be readable but soft

---

## Core Features

### 1. Recuerdos (Memories)
- Gallery view of stored memories
- Each memory: title, poem, tags, created date
- Export individual memory cards as PNG
- Add new memories via form
- Delete memories
- Masonry grid layout

### 2. Sensaciones (Feelings/Emotions)
- Short emotional notes with emoji reactions
- Display as cards in a grid
- Random romantic phrases
- Timestamp tracking
- Quick add/delete functionality

### 3. Cartas (Secret Letters)
- Password-protected letter system
- Letters are hidden by default
- Reveal with password entry
- Particle effects on reveal
- View history of letters
- Delete functionality

### 4. Flores (Flowers)
- Interactive flower garden
- Send virtual bouquets
- Bouquet history display
- Multiple flower types (roses, tulips, daisies, cherry blossoms)
- Animated flower interactions

### 5. Home Page
- Hero section with welcome message
- Navigation grid to all sections
- Particle system background
- Animated introduction text

---

## Navigation System

### Desktop Navigation
- **Navbar component** - Fixed top navigation
- Shows all routes clearly
- Brand/logo on left
- Navigation links on right
- Responsive to hover states

### Mobile Navigation
- **Bottom navigation bar** - Fixed at bottom
- Icon-based navigation
- Tap-friendly (48px+ touch targets)
- Shows currently active page

### Routes
| Route | Purpose |
|-------|---------|
| `/` | Home/Hero page |
| `/recuerdos` | Memory gallery |
| `/sensaciones` | Emotional notes |
| `/cartas` | Secret letters |
| `/flores` | Flower garden |

### Navigation Principles
- Always visible and accessible
- Clear indication of current page
- Smooth transitions between pages
- Mobile-first responsive design

---

## Toast System

### Overview
Global toast notifications for user feedback (success, error, info, warning).

### Architecture
- **ToastProvider** wraps entire app in `RootProviders.tsx`
- `useToast()` hook provides `addToast()` function
- Toasts auto-dismiss after 3 seconds
- Stacked display at top-right

### Usage Example
```typescript
const { addToast } = useToast();
addToast('✅ Memory saved successfully!', 'success');
addToast('❌ Error deleting memory', 'error');
addToast('ℹ️ Just a notification', 'info');
```

### Rules
- **CRITICAL**: `useToast()` must ONLY be called inside components wrapped by ToastProvider
- Never try to use `useToast()` in layout components or outside the provider
- All async operations should trigger toast notifications
- Toast messages should be brief and emotional (use emojis)

---

## Animation Guidelines

### Principles
- Animations should be **gentle, slow, and romantic**
- Prefer **subtle fades** and **float animations**
- All animations should be **non-intrusive**
- Duration: 0.3s - 0.8s for most interactions
- Easing: `ease-in-out` preferred over `linear`

### Common Patterns

**Fade-in on Page Load:**
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.6 }}
```

**Floating Animation:**
```typescript
animate={{ y: [-10, 0, -10] }}
transition={{ duration: 3, repeat: Infinity }}
```

**Card Hover:**
```typescript
whileHover={{ scale: 1.02, boxShadow: "0 20px 25px..." }}
transition={{ duration: 0.3 }}
```

### What to Avoid
- Aggressive motion or rapid animations
- Spinning or rotation effects (unless poetic)
- Jerky or unnatural movements
- Animations that distract from content

---

## Data Persistence

### LocalStorage Structure
Use centralized `lib/storage.ts` for all persistence operations:

```typescript
// Memory operations
getMemories(): Memory[]
saveMemory(memory: Memory): void
deleteMemory(id: string): void

// Feeling operations
getFeelings(): Feeling[]
saveFeling(feeling: Feeling): void
deleteFeeling(id: string): void

// Letter operations
getLetters(): Letter[]
saveLetter(letter: Letter): void
deleteLetter(id: string): void

// Bouquet operations
getBouquets(): Bouquet[]
saveBouquet(bouquet: Bouquet): void

// Statistics
getStatistics(): Statistics
setStatistics(stats: Statistics): void
incrementStatistic(key: string): void

// Welcome flag
hasSeenWelcome(): boolean
setWelcomeSeen(): void
```

### Data Types
```typescript
interface Memory {
  id: string;
  title: string;
  poem: string;
  tags: string[];
  createdAt: number;
}

interface Feeling {
  id: string;
  emoji: string;
  message: string;
  createdAt: number;
}

interface Letter {
  id: string;
  password: string;
  content: string;
  isRevealed: boolean;
  createdAt: number;
}

interface Bouquet {
  id: string;
  flowers: string[];
  sentAt: number;
}
```

### Client-Side Only
- All data is stored in browser's LocalStorage
- No backend required
- Data persists across sessions
- User can clear data anytime

---

## AI Assistant Rules

### Critical Rules
Before making ANY changes, an AI assistant MUST:

1. **Read this file completely** - No exceptions
2. **Understand the romantic aesthetic** - Softness over functionality
3. **Check existing patterns** - Don't reinvent, follow established ways
4. **Maintain TypeScript types** - Never use `any`
5. **Preserve mobile-first design** - Test on mobile

### Do's ✅
- DO create small, reusable components
- DO keep animations gentle and romantic
- DO use TypeScript interfaces for all data
- DO place business logic in `/lib`
- DO follow existing color palette
- DO test features on mobile
- DO add proper error handling with toasts
- DO document complex functions
- DO keep components under 300 lines

### Don'ts ❌
- DON'T break existing components
- DON'T add harsh colors or aggressive UI
- DON'T create monolithic components (>300 lines)
- DON'T use inline styles (use TailwindCSS)
- DON'T introduce backend dependencies without asking
- DON'T use `any` type in TypeScript
- DON'T forget to wrap UI interactions with toasts
- DON'T create unnecessary global state
- DON'T modify data persistence without updating tests

### Feature Addition Process
When adding a new feature:

1. **Design Phase**
   - Sketch component hierarchy
   - Plan data structure
   - Ensure it fits romantic aesthetic

2. **Implementation Phase**
   - Create reusable components
   - Add TypeScript types
   - Place utilities in `/lib`
   - Add animations

3. **Testing Phase**
   - Test on desktop and mobile
   - Verify animations feel romantic
   - Check LocalStorage persistence
   - Test edge cases

4. **Integration Phase**
   - Add navigation if needed
   - Add toast notifications
   - Update provider if needed
   - Ensure consistency with existing features

---

## Code Quality Standards

### TypeScript
- All components must be fully typed
- No `any` types
- Use interfaces for data structures
- Export types from `/src/types/index.ts`

### React Components
- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused and single-purpose
- Props should be typed with interfaces

### File Organization
- One component per file (except related sub-components)
- Page components in `app/*/page.tsx`
- Reusable components in `src/components/`
- Business logic in `src/lib/`
- Types in `src/types/`

### Naming Conventions
- Components: PascalCase (e.g., `MemoryCard.tsx`)
- Functions/utilities: camelCase (e.g., `generateId()`)
- Constants: UPPER_SNAKE_CASE (e.g., `DEFAULT_DURATION`)
- Files: kebab-case or matching component name

### Code Style
```typescript
// ✅ Good: Clear, typed, reusable
export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete }) => {
  const { addToast } = useToast();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-rose-50 p-4 shadow-sm"
    >
      {/* content */}
    </motion.div>
  );
};

// ❌ Bad: No types, inline styles, unclean
const memoryCard = (memory) => {
  return (
    <div style={{ padding: '16px', background: '#FFE4EF' }}>
      {memory.title}
    </div>
  );
};
```

### File Size Guidelines
- Components: 50-300 lines
- Utils: 100-500 lines
- Pages: 100-400 lines
- Keep files focused and readable

---

## Database/Storage Schema

### STORAGE_KEYS
```typescript
const STORAGE_KEYS = {
  MEMORIES: 'sv_memories',
  FEELINGS: 'sv_feelings',
  LETTERS: 'sv_letters',
  BOUQUETS: 'sv_bouquets',
  STATISTICS: 'sv_statistics',
  WELCOME_SEEN: 'sv_welcome_seen',
};
```

### Backward Compatibility
- Never delete localStorage keys
- If modifying data structure, create migration
- Always version data if structure changes
- Test with old browser data

---

## Future Feature Guidelines

### Possible Enhancements (Do Not Implement Unless Requested)
- Timeline view of all memories chronologically
- Voice message support
- Background music
- "Constellation of moments" visualization
- Interactive love notes with responses
- 3D flower garden
- Shared galleries
- Mobile app version

### Future Feature Rules
- All features must maintain romantic aesthetic
- Keep the product lightweight and fast
- Avoid bloat and feature creep
- Always ask user before major changes
- Preserve existing feature functionality

---

## Debugging & Troubleshooting

### Common Issues

**Toast Error: "useToast must be used within ToastProvider"**
- Solution: Ensure the component is inside `RootProviders` wrapper
- Check: Is the component being rendered within `app/layout.tsx` → `RootProviders`?

**CSS not loading or styles missing**
- Solution: Check import order in `app/globals.css`
- Ensure TailwindCSS `@import` comes before other styles
- Clear `.next` directory and rebuild

**LocalStorage not persisting**
- Solution: Check browser's private mode or storage restrictions
- Verify `IS_BROWSER` check in `lib/storage.ts`
- Clear browser cache and try again

**Animations feel janky or unsmooth**
- Solution: Reduce animation duration
- Check for CPU-heavy operations during animation
- Use `transform` and `opacity` (GPU-accelerated properties)

---

## Project-Specific Commands

### Development
```bash
pnpm dev        # Start dev server (localhost:3000)
pnpm build      # Build for production
pnpm start      # Start production server
```

### Maintenance
```bash
pnpm lint       # Check code quality (if configured)
pnpm type-check # TypeScript type checking
```

---

## Contact & Questions

When in doubt, refer back to this document. If the issue is not covered:

1. Check existing component patterns
2. Test changes on both desktop and mobile
3. Ensure romantic aesthetic is maintained
4. Ask the user for clarification
5. Document the decision for future AI assistants

---

## Final Notes

### The Spirit of SilviVerse
SilviVerse is more than code—it's a **digital love letter**. Every pixel, animation, and interaction should convey emotion and care.

### For AI Assistants
You are not just fixing bugs or adding features. You are **crafting an emotional experience**. Before writing a single line of code, ask yourself:

> "Does this change make SilviVerse feel more romantic, more intimate, more meaningful?"

If the answer is no, reconsider the approach.

### Success Metrics
A change is successful when:
- ✅ It feels natural and romantic
- ✅ It works on mobile and desktop
- ✅ It doesn't break existing features
- ✅ Users smile when using it

---

**Every AI assistant working on SilviVerse must read this file before making any modifications.**

*Last Updated: March 16, 2026*
*Version: 1.0*
