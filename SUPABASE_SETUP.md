# SilviVerse - Setup Guide

## 🚀 Quick Start

SilviVerse is a romantic digital universe built with Next.js 16, Turbopack, Tailwind CSS, Framer Motion, and Supabase.

### Prerequisites

- Node.js 18+
- pnpm
- Supabase account

### 1. Supabase Setup

#### Create Database Tables

1. Go to [Supabase Console](https://app.supabase.com)
2. Select your project
3. Go to SQL Editor
4. Run the SQL from `supabase_schema.sql` file:
   - This creates all tables: `recuerdos`, `sensaciones`, `cartas`, `flores`, `bouquets`
   - Sets up Row Level Security (RLS)
   - Creates the storage bucket for images

#### Configure Storage

1. Go to Storage → Buckets in Supabase
2. Make sure the `recuerdos` bucket is public
3. Set CORS policy to allow all origins

#### Get Your Credentials

The `.env.local` file already has your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://threuucouasrkpnheven.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Install Dependencies

```bash
cd c:\Users\alexf\Desktop\verse
pnpm install
```

### 3. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## 📋 Features Overview

### 1. Recuerdos (Memories)
- ✅ Create, read, update, delete memories
- ✅ Upload images to Supabase Storage
- ✅ Add tags and dates
- ✅ Download memories as PNG
- ✅ Masonry grid layout with animations

**Database Fields:**
- `id`: UUID
- `titulo`: String (title)
- `poema`: String (poem/description)
- `fecha`: String (date)
- `imagen_url`: String (image URL from storage)
- `tags`: JSON array
- `created_at`: Timestamp

### 2. Sensaciones (Feelings)
- ✅ Create and delete feelings
- ✅ Quick input with emoji support
- ✅ Random romantic phrases
- ✅ Instant save to cloud

**Database Fields:**
- `id`: UUID
- `texto`: String (feeling text)
- `created_at`: Timestamp

### 3. Cartas Secretas (Secret Letters)
- ✅ Write protected letters
- ✅ Optional password protection
- ✅ Reveal with password verification
- ✅ Romantic animations

**Database Fields:**
- `id`: UUID
- `texto`: String (letter text)
- `password`: String (optional)
- `created_at`: Timestamp

### 4. Flores (Flowers)
- ✅ Click to place flowers on canvas
- ✅ Multiple flower types/emojis
- ✅ Create and save bouquets
- ✅ Gallery of past bouquets

**Database Fields:**
- `id`: UUID
- `tipo`: String (emoji)
- `created_at`: Timestamp

**Bouquets:**
- `id`: UUID
- `flores`: JSON array of emojis
- `created_at`: Timestamp

## 🎨 Key Components

### Hooks
- `useMemories()` - CRUD for memories
- `useFeelings()` - CRUD for feelings
- `useLetters()` - CRUD for letters
- `useFlowers()` - CRUD for flowers and bouquets

### Components
- `MemoryCard` - Displays individual memory with export
- `MemoryForm` - Create new memories with image upload
- `FeelingCard` - Display feeling with delete option
- `LetterDisplay` - Show letters with password reveal
- `Navbar` - Navigation between sections
- `RootProviders` - Toast provider wrapper
- `ParticleSystem` - Animations for interactions

### Pages
- `/` - Home page
- `/recuerdos` - Memories gallery
- `/sensaciones` - Feelings collection
- `/cartas` - Secret letters
- `/flores` - Flower canvas and bouquets

## 🔧 Development

### File Structure

```
verse/
├── app/
│   ├── recuerdos/
│   ├── sensaciones/
│   ├── cartas/
│   ├── flores/
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom hooks (useMemories, etc)
│   ├── lib/
│   │   ├── supabase.ts   # Supabase client
│   │   ├── memories.ts   # Memory utilities
│   │   └── storage.ts    # Local storage utilities
│   ├── providers/        # React providers
│   ├── types/            # TypeScript interfaces
│   └── data/             # Sample data
└── supabase_schema.sql   # Database schema
```

### Key TypeScript Types

```typescript
// Memory
interface Memory {
  id: string;
  titulo: string;
  poema: string;
  fecha: string;
  imagen_url?: string;
  tags: string[];
  created_at: string;
}

// Feeling
interface Feeling {
  id: string;
  texto: string;
  created_at: string;
}

// Letter
interface Letter {
  id: string;
  texto: string;
  password?: string;
  created_at: string;
}

// Flower
interface Flower {
  id: string;
  tipo: string;
  created_at: string;
}
```

## 🌐 Supabase API Examples

### Fetch Memories
```typescript
const { data, error } = await supabase
  .from('recuerdos')
  .select('*')
  .order('created_at', { ascending: false });
```

### Upload Image
```typescript
const { error } = await supabase.storage
  .from('recuerdos')
  .upload('recuerdos/filename.jpg', file);

const { data } = supabase.storage
  .from('recuerdos')
  .getPublicUrl('recuerdos/filename.jpg');
```

### Create Memory
```typescript
const { data, error } = await supabase
  .from('recuerdos')
  .insert([{
    titulo: 'Title',
    poema: 'Poem',
    fecha: '2026-03-16',
    imagen_url: 'https://...',
    tags: ['tag1', 'tag2']
  }])
  .select();
```

## 🎯 Next Steps

1. ✅ Database schema created (run `supabase_schema.sql`)
2. ✅ Hooks implemented
3. ✅ Components updated for Supabase
4. ✅ Pages migrated to cloud-first
5. 🔄 Test all features
6. 🔄 Add more animations
7. 🔄 Add user authentication (optional)
8. 🔄 Deploy to Vercel

## 🚀 Deployment

### Deploy to Vercel

```bash
# Push to Git
git add .
git commit -m "SilviVerse with Supabase"
git push

# Then connect to Vercel and deploy
```

### Environment Variables on Vercel

1. Go to Vercel project settings
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📱 Mobile Optimization

All pages are responsive and mobile-friendly using Tailwind CSS breakpoints:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

## 🎬 Animations

- Framer Motion for component animations
- Particle system for interactive effects
- Smooth transitions between pages
- Hover and tap animations on cards

## 💾 Data Persistence

- All data saved to Supabase cloud
- No local storage (now using Supabase)
- Real-time updates possible with Supabase subscriptions
- Images stored in Supabase Storage

## 🔒 Security

- RLS policies configured for public access
- CORS enabled for API requests
- Passwords hashed in database (optional)
- Storage bucket restricted to image files

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🎉 Enjoy SilviVerse!

This is a special digital universe for special people. Customize it, add more features, and make it uniquely yours!

---

**Last Updated:** March 16, 2026
**Status:** Ready for development and deployment
