# Simple Shop List

A beautiful, modern marketplace platform for showcasing and managing curated collections. Perfect for antique dealers, art galleries, jewelry stores, and collectors who want to present their treasures with elegance and manage inventory effortlessly.

## ✨ Why Simple Shop List?

**For Your Customers:**
- **Stunning Visual Experience**: Browse your curated collection with a beautiful, responsive interface that works flawlessly on any device
- **Fast & Intuitive**: Lightning-fast search and filtering help customers find exactly what they're looking for
- **Rich Details**: Showcase your items with multiple high-quality photos and detailed descriptions
- **Professional Presentation**: Elegant design that reflects the quality of your collection

**For You:**
- **Powerful Admin Dashboard**: Manage your entire inventory from one centralized, easy-to-use dashboard
- **Effortless Photo Management**: Upload and automatically optimize multiple photos per listing
- **Smart Organization**: Organize by categories and control visibility with status management
- **Secure & Reliable**: Built with modern security best practices and authentication

## 🛠️ Built With Modern Technology

### Core
- **Next.js 16.1.0** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5.9.3** - Type safety

### Database & ORM
- **PostgreSQL** - Database (Neon-compatible)
- **Drizzle ORM 0.45.1** - Type-safe database toolkit
- **Drizzle Kit** - Database migrations and studio

### Authentication
- **Better Auth 1.4.7** - Modern authentication solution

### Storage
- **Vercel Blob 2.0.0** - Image storage and CDN
- **browser-image-compression 2.0.2** - Client-side image optimization

### UI & Styling
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Lucide React** - Icon library
- **next-themes** - Dark mode support

### State Management & Data Fetching
- **TanStack Query 5.90.12** - Server state management
- **TanStack Form 1.27.5** - Form state management

### Validation
- **Zod 4.2.1** - Schema validation
- **@t3-oss/env-nextjs** - Type-safe environment variables

## 📦 Quick Start

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- PostgreSQL database (or Neon account)
- Vercel account (for Blob storage, optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd simple-shop-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:port/database"
   DATABASE_URL_UNPOOLED="postgresql://user:password@host:port/database" # Optional
   
   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
   BETTER_AUTH_URL="http://localhost:3000" # Optional, defaults to current URL
   NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000" # Optional
   
   # Vercel Blob (optional, for image uploads)
   BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
   
   # Node Environment
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate migrations
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # Or push schema directly (development only)
   npm run db:push
   
   # (Optional) Seed the database
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes directly (dev only)
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed the database with sample data

## Project Structure

```
simple-shop-list/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin dashboard
│   │   │   └── dashboard/      # Admin dashboard page
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── listings/       # Listing CRUD endpoints
│   │   │   └── upload/         # Image upload endpoints
│   │   ├── listing/            # Public listing pages
│   │   │   └── [id]/           # Individual listing detail page
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── admin/              # Admin-specific components
│   │   ├── layout/             # Layout components (Header, Footer)
│   │   ├── listings/           # Listing display components
│   │   └── ui/                 # shadcn/ui components
│   ├── contexts/               # React contexts
│   │   └── AuthContext.tsx     # Authentication context
│   ├── db/                     # Database schema
│   │   └── schema.ts           # Drizzle schema definitions
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-admin-listings.ts
│   │   ├── use-listings.ts
│   │   └── use-photo-upload.ts
│   ├── lib/                    # Utility libraries
│   │   ├── auth.ts             # Better Auth configuration
│   │   ├── db.ts               # Database connection
│   │   ├── listings-*.ts       # Listing data access layers
│   │   ├── image-compression.ts
│   │   └── validations/        # Zod schemas
│   └── types/                  # TypeScript type definitions
├── scripts/                    # Utility scripts
│   └── seed.ts                 # Database seeding script
├── drizzle/                    # Generated migrations
├── public/                     # Static assets
└── drizzle.config.ts           # Drizzle configuration
```

## 🎯 Perfect For

- **Antique Dealers** - Showcase vintage furniture, collectibles, and rare finds
- **Art Galleries** - Present artwork with professional photography and detailed provenance
- **Jewelry Stores** - Display fine jewelry and watches with stunning imagery
- **Collectors** - Organize and present your personal collection
- **Auction Houses** - Manage catalog items and track status through the sales process
- **Boutique Retailers** - Curate and present unique, high-end items

## 🚀 Key Features

### For Your Customers
- **Beautiful Catalog**: Elegant, responsive design that showcases your items beautifully
- **Smart Search**: Find items quickly with category filters and keyword search
- **Rich Details**: Multiple high-quality photos and comprehensive descriptions
- **Mobile-First**: Perfect experience on phones, tablets, and desktops

### For Administrators
- **Intuitive Dashboard**: Manage all listings from one powerful admin panel
- **Easy Photo Upload**: Drag-and-drop multiple photos with automatic optimization
- **Status Control**: Manage listing visibility (draft, active, reserved, sold, inactive)
- **Category Management**: Organize by jewelry, watches, art, furniture, collectibles, antiques, fashion, and more
- **Secure Access**: Protected admin area with modern authentication

## 🌐 Deployment

### Deploy to Vercel (Recommended)

Deploying is simple and takes just minutes:

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Configure environment variables in the Vercel dashboard
4. Click deploy!

The application automatically:
- Builds on every push to main
- Runs database migrations
- Deploys to production with zero downtime

### Production Environment Variables

Set these in your deployment platform:
- `DATABASE_URL` - Your PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Authentication secret (min 32 characters)
- `BETTER_AUTH_URL` - Your production URL
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Your production URL (public)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob token (for image storage)

## 💻 Development

### Code Quality
- **TypeScript** - Full type safety throughout
- **ESLint** - Next.js best practices enforced
- **Modern React** - Built with React 19 and Next.js 16
- **Component Library** - shadcn/ui for consistent, accessible components

### Extending the Platform

The codebase is well-organized and easy to extend:
- **UI Components**: Use shadcn/ui CLI or add custom components to `src/components/ui/`
- **Features**: Add new features following the existing patterns in `src/components/`
- **Database**: Modify `src/db/schema.ts` and run migrations with `npm run db:generate`

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, your help makes this project better.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[Add your license here]

## 💬 Support & Questions

Have questions or need help? Open an issue on GitHub and we'll be happy to assist!
