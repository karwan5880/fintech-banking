# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FinBank is a modern digital banking application built with Next.js 16, React 19, and TypeScript. It provides real-time transactions, account management, virtual cards, and push notifications. The backend uses Convex (TypeScript full-stack platform) and Clerk for authentication.

## Common Commands

### Development
- **Start dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build for production**: `npm run build`
- **Run production build locally**: `npm start`
- **Lint code**: `npm run lint`

## Tech Stack & Key Dependencies

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui
- **Backend/Database**: Convex (real-time database with built-in auth hooks)
- **Authentication**: Clerk (handles user signup/signin, stores clerkId in Convex users table)
- **UI Components**: shadcn/ui, Lucide React icons, Radix UI
- **Additional Services**: ElevenLabs (voice notifications), Stripe (payment processing - demo mode)

## Project Structure

```
src/
├── app/
│   ├── dashboard/           # Main dashboard (authenticated)
│   ├── sign-in/             # Clerk sign-in page route
│   ├── sign-up/             # Clerk sign-up page route
│   ├── layout.tsx           # Root layout with ClerkProvider
│   └── page.tsx             # Landing/home page
├── components/
│   ├── ui/                  # shadcn/ui components (button, card, tabs)
│   ├── layout/              # Layout components (MobileNav)
│   └── features/            # Feature components (AccountsList, CardsList, TransactionsList, SendMoney, NotificationsList)
├── types/
│   └── banking.ts           # TypeScript interfaces for BankAccount, Transaction, VirtualCard, Notification, DashboardSummary
└── lib/
    └── utils.ts             # Utility functions (class merging with clsx/tailwind-merge)

convex/
└── schema.ts                # Convex database schema with 5 tables: users, accounts, transactions, cards, notifications
```

## Database Schema (Convex)

**users**: clerkId (indexed), email, fullName, profileImage, createdAt
**accounts**: userId (indexed), accountType (checking/savings), accountNumber (indexed), balance, currency, createdAt, updatedAt
**transactions**: fromAccountId (indexed), toAccountId (indexed), amount, currency, description, status (pending/completed/failed), type (transfer/deposit/withdrawal), createdAt (indexed), updatedAt
**cards**: userId (indexed), cardNumber, cardHolder, expiryDate, cvv, status (active/inactive/blocked), balance, createdAt, updatedAt
**notifications**: userId (indexed), type (transaction/alert/reminder), title, message, read, createdAt, userId+read compound index

## Authentication Flow

1. Clerk handles user signup/signin via ClerkProvider in layout.tsx
2. User credentials verified through Clerk API
3. Convex syncs user data to the "users" table via Clerk webhook (userId = clerkId)
4. Dashboard page checks `useUser()` hook; redirects to /sign-in if not authenticated
5. Real-time updates available via Convex subscriptions

## Important Implementation Notes

- **Dashboard (src/app/dashboard/page.tsx)**: Uses mock data (mockAccounts, mockCards, mockTransactions, mockNotifications) for demo. Production should query Convex.
- **Client Components**: Most pages use "use client" directive for client-side state and auth checks.
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints (md:, lg:); MobileNav for mobile navigation.
- **Path Aliases**: @/* maps to src/* (configured in tsconfig.json)
- **Environment Variables**: Clerk keys (public and secret), Convex deployment URL, ElevenLabs/Stripe API keys, APP_URL in .env.local.example

## Common Development Patterns

- **UI Components**: Import from @/components/ui for consistent styling
- **Feature Components**: Located in @/components/features, accept data via props
- **Type Safety**: Use banking.ts types for all account/transaction/card/notification operations
- **Clerk Integration**: Use `useUser()` hook to get current user; check `isLoaded` before rendering authenticated content
- **Responsive Classes**: Use Tailwind utilities like `grid-cols-1 md:grid-cols-2` for responsive layouts

## Deployment

Application is configured for Vercel deployment. Environment variables must be set in Vercel dashboard for Clerk, Convex, ElevenLabs, and Stripe integration.
