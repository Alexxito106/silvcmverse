# AGENT.md - SilviVerse Context Guide

**Every AI assistant working on SilviVerse must read this file before making any modifications.**

---

## IMPORTANT: Recent Architectural Changes

### Major Update: Supabase Integration
The project has transitioned from **LocalStorage-only to Supabase PostgreSQL backend**. This is a significant architectural change:

- **Data Storage:** All persistent data now stored in Supabase
- **Frontend:** React components interact with Supabase via custom hooks
- **Authentication:** Password-protected operations for sensitive actions (delete, edit)
- **Database Schema:** Includes fields like `memory_date` for custom dates
- **Migration Status:** Ongoing - some features may still reference old LocalStorage patterns

### New Features (Recent Additions)
1. **Custom Date Selection** - Users select when memories occurred (not just creation date)
2. **Memory Edit Functionality** - Password-protected ("admin") memory editing
3. **Detail Modal** - MemoryEditModal component for viewing/editing memories
4. **Sorting by Date** - Memories displayed by custom memory_date (newest first)
5. **Edit Authorization** - Both delete and edit require "admin" password

### Active Bugs Requiring Immediate Attention
- ⚠️ **React Error #310** - Memory detail modal crashes on open
- ⚠️ **Data Loss on Update** - Memory disappears after edit
- ⚠️ **Date Migration** - Existing records may have NULL dates

**See "Known Issues & Active Bugs" section below for details and fixes.**

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
- **React 19.2.3** - Component framework with Hooks
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Utility-first styling
- **Framer Motion** - Smooth, romantic animations
- **Supabase** - PostgreSQL backend for persistent data storage

### Data Layer
- **Supabase PostgreSQL** - Primary data persistence
- **LocalStorage API** - Client-side caching (where appropriate)
- Custom hooks for database operations (useMemories, useFeelings, useLetters, useFlowers)

### Optional Utilities
- **html-to-image** - Export memory cards as PNG images
- Supabase JS client for real-time operations

### Key Principle
The project uses **Supabase for persistent backend storage** while maintaining a romantic, lightweight frontend experience. All database operations should be abstracted through `/src/lib/supabase.ts` and custom hooks in `/src/hooks/`.

---

## Project Architecture

### Directory Structure
```
verse/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home/hero page
│   ├── globals.css             # Global styling
│   ├── recuerdos/page.tsx       # Memory gallery (with Supabase)
│   ├── sensaciones/page.tsx     # Emotional notes
│   ├── cartas/page.tsx          # Secret letters
│   └── flores/page.tsx          # Flower garden
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Desktop navigation
│   │   ├── MobileNavbar.tsx     # Mobile bottom nav
│   │   ├── MemoryCard.tsx       # Memory display with edit/delete
│   │   ├── MemoryEditModal.tsx  # Memory detail view & edit modal
│   │   ├── MemoryForm.tsx       # Memory creation form with date picker
│   │   ├── FeelingCard.tsx      # Feeling display
│   │   ├── LetterDisplay.tsx    # Letter component
│   │   ├── Flower.tsx           # Individual flower
│   │   ├── ParticleSystem.tsx   # Particle effects
│   │   ├── WelcomeOverlay.tsx   # First-time intro
│   │   ├── KeyboardShortcuts.tsx # Keyboard handling
│   │   ├── RootLayoutClient.tsx # Client-side layout wrapper
│   │   └── ToastProvider.tsx    # Toast notification context
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client configuration
│   │   ├── memories.ts          # Memory CRUD operations (Supabase)
│   │   ├── storage.ts           # LocalStorage abstraction (legacy)
│   │   └── utils.ts             # Helper functions
│   ├── providers/
│   │   ├── ToastProvider.tsx    # Global toast context
│   │   └── RootProviders.tsx    # All app providers wrapper
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── data/
│   │   └── sample.ts            # Sample data for demos
│   ├── hooks/
│   │   ├── index.ts             # Hook exports
│   │   ├── useMemories.ts       # Memory operations hook
│   │   ├── useFeelings.ts       # Feeling operations hook
│   │   ├── useLetters.ts        # Letter operations hook
│   │   ├── useFlowers.ts        # Flower operations hook
│   │   └── useStatistics.ts     # Statistics hook
│   └── styles/
│       └── globals.css          # Global CSS (via app/)
├── public/                      # Static assets
├── supabase_schema.sql          # Database schema
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
- **Gallery view** of stored memories with masonry grid layout
- **Each memory includes**: title, content/poem, tags, custom date, image (optional)
- **Memory Cards** display preview with action buttons
- **Detail Modal** (MemoryEditModal) shows full memory when clicked
  - Full-resolution image display
  - Complete text viewing
  - Edit button (password-protected with "admin")
  - Delete button (password-protected with "admin")
  - Export button (PNG/JSON fallback)
- **Create new memories** via MemoryForm with:
  - Title input
  - Content/poem editor
  - Tag input (comma-separated)
  - Image upload
  - **Custom date picker** (when did this memory occur?)
- **Edit memories** - Updates fields with full preservation of data
- **Delete memories** - With "admin" password confirmation
- **Sort by date** - Memories displayed by custom memory_date (newest first)
- **Export** - Individual memory cards as PNG images

**Database:** `memories` table with `memory_date` field for custom dates

### 2. Sensaciones (Feelings/Emotions)
- Short emotional notes with emoji reactions
- Display as cards in a grid
- Random romantic phrases
- Timestamp tracking
- Quick add/delete functionality
- Password confirmation for delete

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

---

## Data Persistence & Supabase Integration

### Architecture
- **Supabase PostgreSQL** - Primary data storage for all memories, feelings, letters, and flowers
- **Client-Side Operations** - All CRUD operations via `/src/lib/memories.ts` and custom hooks
- **Real-Time Sync** - Supabase client handles data synchronization
- **LocalStorage Caching** - Optional client-side caching for offline access

### Supabase Configuration
- Supabase client initialized in `/src/lib/supabase.ts`
- Environment variables required in `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
  ```

### Database Schema

#### memories table
```sql
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  memory_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Custom date for memory
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Key Fields:**
- `memory_date` - Custom date selected by user (when memory occurred, not when created)
- `created_at` - When memory record was created in database
- `image_url` - URL to uploaded image (or data URL for local images)

#### Other Tables
- `feelings` - Emotional notes with emoji and timestamp
- `letters` - Password-protected letters with reveal status
- `flowers` - Bouquet history and flower types

### Data Operations

**Memory Operations:**
```typescript
// In lib/memories.ts
export const createMemory = async (
  title: string,
  content: string,
  tags: string[],
  imageUrl?: string,
  memoryDate?: Date
): Promise<Memory> => { /* ... */ }

export const updateMemory = async (
  id: string,
  updates: Partial<Memory>
): Promise<Memory> => { /* ... */ }

export const deleteMemory = async (id: string): Promise<void> => { /* ... */ }

export const getMemories = async (): Promise<Memory[]> => { /* ... */ }
```

**Custom Hooks (Recommended):**
```typescript
// In hooks/useMemories.ts
const { memories, loading, error, createMemory, updateMemory, deleteMemory } = useMemories();
```

### Data Types

```typescript
interface Memory {
  id: string;
  title: string;
  content: string;
  tags: string[];
  image_url?: string;
  memory_date: Date;        // When the memory occurred
  created_at: Date;
  updated_at: Date;
}

interface Feeling {
  id: string;
  emoji: string;
  message: string;
  created_at: Date;
}

interface Letter {
  id: string;
  password: string;
  content: string;
  is_revealed: boolean;
  created_at: Date;
}

interface Bouquet {
  id: string;
  flowers: string[];
  sent_at: Date;
}
```

### Authentication & Protected Operations

**Password Protection:**
Sensitive operations use "admin" password verification:
- **Delete Memory**: Requires "admin" password prompt
- **Edit Memory**: Requires "admin" password prompt
- **Delete Feeling**: Requires confirmation

Password check is client-side (UI protection only). For production security, implement server-side validation.

### Backend vs Frontend Operations

Most operations are client-side for simplicity:
- No separate API routes needed
- Direct Supabase client calls from components
- Operations handled through custom hooks
- All database queries use JavaScript/TypeScript

---

## AI Assistant Rules

### Critical Rules
Before making ANY changes, an AI assistant MUST:

1. **Read AGENT.md completely** - No exceptions
2. **Understand the romantic aesthetic** - Softness over functionality
3. **Check existing patterns** - Don't reinvent, follow established ways
4. **Maintain TypeScript types** - Never use `any`
5. **Preserve mobile-first design** - Test on mobile
6. **Use Supabase for data** - Do not use LocalStorage for persistent data
7. **Test on both desktop and mobile** - Responsive design is critical

### Critical Component Rules

**useEffect Hook Dependencies ⚠️ CRITICAL**
- ALWAYS include ALL variables used in the effect in the dependency array
- NEVER include object references that change on every render (like `memory` object)
- If you need to use an unstable object, wrap it with `useMemo()` or `useCallback()`
- Test by checking browser console for React errors #310 ("Too many re-renders")
- Example of common bug:
  ```typescript
  // ❌ BAD: 'memory' changes on every render
  useEffect(() => {
    setEditData(memory);
  }, [memory])
  
  // ✅ GOOD: Memoize memory object first
  const memoizedMemory = useMemo(() => memory, [memory?.id]);
  useEffect(() => {
    setEditData(memoizedMemory);
  }, [memoizedMemory])
  ```

**Database Operations in useEffect**
- Load data in useEffect, not in component body
- Use proper dependency arrays to prevent infinite loops
- Handle loading and error states
- Example:
  ```typescript
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getMemories();
        setData(result);
      } catch (error) {
        console.error('Error loading memories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []); // Empty array - load once on mount
  ```

**Custom Hooks Pattern**
- Create custom hooks in `/src/hooks/` for repeated database operations
- Hooks should return: `{ data, loading, error, operations }`
- Use hooks instead of direct Supabase calls in components
- Example (useMemories):
  ```typescript
  const { memories, loading, error, createMemory, updateMemory, deleteMemory } = useMemories();
  ```

### Do's ✅
- DO use Supabase for all persistent data
- DO create custom hooks for database operations
- DO keep animations gentle and romantic
- DO use TypeScript interfaces for all data
- DO place business logic in `/lib`
- DO follow existing color palette
- DO test features on mobile
- DO add proper error handling with toasts
- DO stabilize object dependencies in useEffect
- DO document complex functions
- DO keep components under 300 lines

### Don'ts ❌
- DON'T break existing components
- DON'T add harsh colors or aggressive UI
- DON'T create monolithic components (>300 lines)
- DON'T use inline styles (use TailwindCSS)
- DON'T use LocalStorage for main app data
- DON'T use `any` type in TypeScript
- DON'T forget to wrap UI interactions with toasts
- DON'T create unnecessary global state
- DON'T include unstable objects in useEffect dependencies
- DON'T forget to include all used variables in useEffect dependency arrays
- DON'T call hooks conditionally - always at top level
- DON'T use custom hooks outside components or conditionally

### Feature Addition Process
When adding a new feature:

1. **Design Phase**
   - Sketch component hierarchy
   - Plan data structure and Supabase schema
   - Ensure it fits romantic aesthetic
   - Design custom hooks for data operations

2. **Database Setup Phase** (if needed)
   - Create/update Supabase table schema
   - Add TypeScript interfaces in `/src/types/index.ts`
   - Create migration if modifying existing schema

3. **Backend Integration Phase**
   - Create library functions in `/src/lib/` for Supabase operations
   - Create custom hooks in `/src/hooks/` to abstract database layer
   - Add proper error handling and type safety

4. **Component Implementation Phase**
   - Create reusable components
   - Add TypeScript types
   - Use custom hooks for data operations
   - Add animations for romantic feel

5. **Testing Phase**
   - Test on desktop and mobile
   - Verify animations feel romantic
   - Check data persistence in Supabase
   - Test error states and edge cases
   - Verify no React errors in console

6. **Integration Phase**
   - Add navigation if needed
   - Add toast notifications
   - Update provider if needed
   - Ensure consistency with existing features

### Supabase Operations Checklist
When working with Supabase:
- [ ] Table schema defined in supabase_schema.sql
- [ ] TypeScript types match database schema
- [ ] Error handling for network failures
- [ ] Toast notifications for user feedback
- [ ] Loading states for async operations
- [ ] Tested on actual database (not mock)
- [ ] Proper date handling (created_at vs custom dates)

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

## Known Issues & Active Bugs

### 🔴 CRITICAL - React Error #310 in MemoryEditModal
**Status:** ACTIVE BUG - Blocks memory detail view
**Symptom:** App throws "Too many re-renders" error when clicking memory card
**Location:** `src/components/MemoryEditModal.tsx` (useEffect hook)
**Root Cause:** useEffect dependency array includes unstable `memory` object reference
**Impact:** Cannot view memory details at all
**Fix Required:**
- Memoize the `memory` object using `useMemo()` or `useCallback()`
- Review all useEffect hooks for dependency array correctness
- Ensure all values used in effect are declared as dependencies
- Test: Click memory card should open modal without console errors

### 🔴 CRITICAL - Data Loss on Memory Update
**Status:** ACTIVE BUG - Causes data deletion
**Symptom:** Memory disappears after user clicks edit and saves changes
**Location:** `src/lib/memories.ts` (`updateMemory()` function) and form submission
**Root Cause:** `updateMemory()` may not preserve all fields OR deletes instead of updating
**Impact:** User data is being lost unexpectedly
**Fix Required:**
- Verify `updateMemory()` correctly updates existing record in Supabase
- Ensure form submission includes ALL fields: title, content, tags, image_url, memory_date
- Add console logging to trace update operations
- Test: Edit and save memory should preserve and update all data

### 🟡 HIGH - Date Field Migration Incomplete
**Status:** DEGRADED - May break sorting/queries
**Symptom:** Old memories show NULL dates, sorting may be unreliable
**Location:** Database schema + `getMemories()` query
**Root Cause:** Migration didn't backfill `memory_date` for existing records
**Impact:** Sorting by date may fail for old records, NULL handling needed
**Fix Required:**
- Run migration: `UPDATE memories SET memory_date = created_at WHERE memory_date IS NULL;`
- Update queries to handle NULL dates gracefully
- Test with both old and new memories

---

## Database & Storage Schema

### Supabase Tables
The following tables are created and managed in Supabase PostgreSQL:

**memories** - Stores all user memories
- `id` (UUID, PK) - Unique memory identifier
- `title` (TEXT) - Memory title
- `content` (TEXT) - Memory content/poem
- `tags` (TEXT[]) - Array of tags
- `image_url` (TEXT, nullable) - URL to associated image
- `memory_date` (TIMESTAMP) - **Custom date when memory occurred** (user-selected)
- `created_at` (TIMESTAMP) - When record created in database
- `updated_at` (TIMESTAMP) - When record last updated

**feelings** - Emotional notes
- `id`, `emoji`, `message`, `created_at`

**letters** - Secret password-protected letters
- `id`, `password`, `content`, `is_revealed`, `created_at`

**flowers** - Bouquet data
- `id`, `flowers` (JSON array), `sent_at`

### Legacy LocalStorage Keys (For Reference)
```typescript
const STORAGE_KEYS = {
  MEMORIES: 'sv_memories',           // Deprecated - use Supabase
  FEELINGS: 'sv_feelings',
  LETTERS: 'sv_letters',
  BOUQUETS: 'sv_bouquets',
  STATISTICS: 'sv_statistics',
  WELCOME_SEEN: 'sv_welcome_seen',
};
```

### Migration Strategy
- New data stored in Supabase
- Old LocalStorage data can be migrated or deprecated
- Gradual transition to fully Supabase-based storage
- Keep LocalStorage for non-critical data (welcome flag, statistics)

### Backward Compatibility
- Handle both Supabase and LocalStorage during transition period
- Migrate user data on first load if needed
- Use custom hooks to abstract storage layer

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

**Supabase Connection Errors**
- Solution: Check `.env.local` for correct SUPABASE_URL and SUPABASE_ANON_KEY
- Verify: Is Supabase database running and accessible?
- Debug: Check Supabase dashboard for any service outages
- Browser Console: Look for CORS or auth-related errors

**Memory Detail Modal Not Displaying (React Error #310)**
- Symptom: "Too many re-renders" error when clicking memory card
- **ROOT CAUSE**: useEffect dependency array includes unstable object references
- **SOLUTION**: 
  - Ensure `memory` object in dependencies is stable (use useCallback wrapping parent)
  - Use `useMemo` to stabilize `memory` object if needed
  - Avoid setting state inside useEffect for effects that depend on that state
  - Check that dependency array includes all values used in effect
- Files affected: MemoryEditModal.tsx
- Debug: Set breakpoint in useEffect to see what triggers re-renders

**Memory Update Causing Data Loss (Memory Deleted After Edit)**
- Symptom: Updating a memory causes it to disappear from list
- **ROOT CAUSE**: updateMemory() function not preserving all fields or deleting instead of updating
- **SOLUTION**:
  - Verify updateMemory() in lib/memories.ts correctly updates existing record
  - Ensure form submission includes ALL memory fields (title, content, tags, image_url, memory_date)
  - Add console logging to trace update operations
  - Check Supabase dashboard to see if record was deleted or just fields were cleared
  - Verify form state properly captures all fields before submission
- Files affected: lib/memories.ts, MemoryForm.tsx, MemoryEditModal.tsx

**CSS not loading or styles missing**
- Solution: Check import order in `app/globals.css`
- Ensure TailwindCSS `@import` comes before other styles
- Clear `.next` directory and rebuild

**Animations feel janky or unsmooth**
- Solution: Reduce animation duration
- Check for CPU-heavy operations during animation
- Use `transform` and `opacity` (GPU-accelerated properties)

**Memory Date Field Showing as NULL**
- Symptom: Custom dates not appearing, sorting broken
- **ROOT CAUSE**: Database migration incomplete or existing records not backfilled
- **SOLUTION**:
  - Verify all existing memories have valid memory_date values (or set default)
  - Update queries to handle NULL dates (treat as created_at)
  - For new memories, ensure memory_date is always set
  - Run data migration: `UPDATE memories SET memory_date = created_at WHERE memory_date IS NULL;`

---

## Project-Specific Commands

### Development
```bash
pnpm dev        # Start dev server (localhost:3000)
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Check code quality (if configured)
```

### Supabase Setup
```bash
# Environment setup
# Add .env.local with:
# NEXT_PUBLIC_SUPABASE_URL=<your-url>
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>

# Note: Schema already defined in supabase_schema.sql
# Run migrations manually in Supabase dashboard if needed
```

### Maintenance & Debugging
```bash
pnpm dev         # Run with console for debugging React errors
# Check browser console (F12) for React #310 errors
# Check Supabase dashboard for data verification
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
