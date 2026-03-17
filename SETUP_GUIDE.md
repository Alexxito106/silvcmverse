# 🌹 SilviVerse - Setup Guide

## Overview
SilviVerse is a romantic digital universe for Silvi built with Next.js 16, Supabase, and Framer Motion. It features:
- **Recuerdos** (Memories) - Save photos, poems, and tags
- **Sensaciones** (Feelings) - Express emotions and save them
- **Cartas** (Letters) - Write secret letters with optional password protection
- **Flores** (Flowers) - Create and send digital flowers
- **Bouquets** - Organize flowers into special collections

## Prerequisites
- Node.js 18+
- pnpm package manager
- Supabase account (free tier is fine)

## Installation Steps

### 1. Install Dependencies
```bash
cd verse
pnpm install
```

### 2. Set Up Supabase Tables

**Important**: You need to create the database tables in Supabase:

1. Go to your Supabase dashboard: https://app.supabase.com
2. Open the project (threuucouasrkpnheven)
3. Go to SQL Editor → New Query
4. Copy and paste the contents of `supabase_schema.sql`
5. Click "Run"

This will create all necessary tables:
- `recuerdos` - Memories with images, poems, tags
- `sensaciones` - Feelings/emotions
- `cartas` - Secret letters with optional password
- `flores` - Individual flowers
- `bouquets` - Collections of flowers
- `recuerdos` storage bucket - For image uploads

### 3. Environment Variables

The `.env.local` file already has the Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://threuucouasrkpnheven.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These are public keys - it's safe to commit them.

### 4. Start Development Server
```bash
pnpm dev
```

Navigate to http://localhost:3000

## Features

### 📝 Recuerdos (Memories)
- Create memories with title, poem, date, and image
- Upload images to Supabase Storage
- Add tags for organization
- Download memories as images
- Masonry grid layout with smooth animations

### 💭 Sensaciones (Feelings)
- Quick text input for emotions
- Random romantic phrases generator
- Swipeable cards
- All stored in Supabase

### 💌 Cartas (Letters)
- Write secret letters
- Optional password protection
- Typewriter-style reveal animation
- Password validation before revealing

### 🌹 Flores (Flowers)
- Click/touch to create flowers on canvas
- Multiple flower types (roses, tulips, daisies, cherry blossoms)
- Create bouquets from selected flowers
- Send and save bouquets

## Architecture

```
verse/
├── app/                      # Next.js pages
│   ├── recuerdos/           # Memories page
│   ├── sensaciones/         # Feelings page
│   ├── cartas/              # Letters page
│   ├── flores/              # Flowers page
│   └── layout.tsx           # Root layout with providers
├── src/
│   ├── components/          # Reusable React components
│   │   ├── MemoryCard.tsx
│   │   ├── MemoryForm.tsx
│   │   ├── FeelingCard.tsx
│   │   ├── LetterDisplay.tsx
│   │   ├── Flower.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useMemories.ts
│   │   ├── useFeelings.ts
│   │   ├── useLetters.ts
│   │   ├── useFlowers.ts
│   │   └── index.ts
│   ├── lib/                # Utility functions
│   │   ├── supabase.ts     # Supabase client
│   │   ├── memories.ts     # Memory operations
│   │   └── storage.ts      # Legacy localStorage (deprecated)
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── providers/          # Context providers
│   │   └── ToastProvider.tsx
│   └── data/               # Static data
│       └── sample.ts       # Sample data
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── supabase_schema.sql     # Database schema
```

## Key Technologies

- **Next.js 16** - React framework with app router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Supabase** - Backend & database
- **html2canvas** - Download memories as images

## Hooks API

### useMemories()
```typescript
const { fetchMemories, addMemory, updateMemory, deleteMemory, loading, error } = useMemories();
```

### useFeelings()
```typescript
const { fetchFeelings, addFeeling, deleteFeeling, loading, error } = useFeelings();
```

### useLetters()
```typescript
const { fetchLetters, addLetter, updateLetter, deleteLetter, loading, error } = useLetters();
```

### useFlowers()
```typescript
const { fetchFlowers, addFlower, deleteFlower, fetchBouquets, addBouquet, deleteBouquet, loading, error } = useFlowers();
```

## Troubleshooting

### 401 Unauthorized Error
This means the Supabase tables aren't set up. Run the SQL from `supabase_schema.sql` in your Supabase dashboard.

### Images not uploading
- Verify the `recuerdos` storage bucket exists in Supabase
- Check bucket policies allow public uploads
- Ensure the API key in `.env.local` is correct

### Data not persisting
- Confirm you ran the SQL schema to create tables
- Verify Row Level Security is disabled (or policies are correct)
- Check browser console for Supabase error messages

### Styling issues
Make sure Tailwind CSS is properly configured:
```bash
pnpm exec tailwindcss init
```

## Building for Production

```bash
pnpm build
pnpm start
```

The app will be optimized and ready for deployment.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repo to Vercel
3. Environment variables set automatically from `.env.local`
4. Deploy!

### Other Platforms
- Netlify, AWS Amplify, Heroku all support Next.js
- Just ensure environment variables are set

## Future Enhancements

- [ ] User authentication (optional)
- [ ] Sharing memories/letters with others
- [ ] Search and filtering
- [ ] Statistics dashboard
- [ ] Export all data as backup
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Dark mode toggle (already in CSS)

## Support

For issues or questions, check:
1. Browser console for errors
2. Supabase dashboard for table status
3. Network tab for API calls

---

**Made with 💖 for Silvi**
