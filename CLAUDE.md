# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an n8n/Zapier-style workflow automation platform built with Next.js 16, featuring user authentication, workflow management, background job execution, and AI integration. The application uses a modern React Server Components architecture with PostgreSQL for persistence.

## Development Commands

### Running the application

- `pnpm dev` - Start Next.js development server only
- `pnpm dev:all` - Start both Next.js and Inngest dev server using mprocs (recommended for full development)
- `pnpm inngest:dev` - Start Inngest dev server separately
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server

### Database

- `pnpm db:generate` - Generate Drizzle migrations from schema changes in lib/db/schema.ts
- `pnpm db:migrate` - Apply pending migrations to the database

### Code quality

- `pnpm lint` - Run Biome linter (checks code quality)
- `pnpm format` - Format code with Biome

## Architecture

### Application Structure

The app uses Next.js App Router with route groups for organizational separation:

- `app/(auth)/` - Authentication pages (login, register) with dedicated auth layout
- `app/(dashboard)/(rest)/` - Dashboard pages with sidebar (workflows list, executions, credentials)
- `app/(dashboard)/(editor)/` - Full-screen workflow editor pages without sidebar
- `app/features/` - Feature-based components (auth forms, etc.)

Route groups `(auth)`, `(dashboard)`, `(rest)`, and `(editor)` are used purely for layout organization and do not affect URL paths.

### Key Technology Stack

- **Framework**: Next.js 16 with React 19 Server Components
- **Database**: PostgreSQL via Neon serverless with Drizzle ORM
- **Authentication**: better-auth with email/password support
- **Background Jobs**: Inngest for workflow execution and async tasks
- **AI Integration**: Google Gemini (gemini-2.5-flash) via Vercel AI SDK
- **Error Tracking**: Sentry for both client and server-side errors
- **UI Components**: Radix UI primitives with custom components in components/ui/
- **Styling**: Tailwind CSS v4
- **Code Quality**: Biome for linting and formatting

### Database Layer

- Schema defined in `lib/db/schema.ts` using Drizzle ORM
- Database client configured in `lib/db/drizzle.ts` using Neon HTTP driver
- Tables: user, session, account, verification (auth), workflow (app domain)
- Migrations stored in `migrations/` directory
- Always run `db:generate` after schema changes, then `db:migrate`

### Authentication Flow

- Better-auth handles authentication with Drizzle adapter
- Configuration in `lib/auth.ts` (server) and `lib/auth-client.ts` (client)
- API route at `app/api/auth/[...all]/route.ts`
- Data access layer in `data/auth.ts` with `requireAuth()` helper for protected pages
- User data access in `data/user.ts`

### Background Jobs (Inngest)

- Inngest client configured in `lib/inngest/client.ts` with id "n8n-zapier-clone"
- Functions defined in `lib/inngest/function.ts`
- API endpoint at `app/api/inngest/route.ts` exposes GET, POST, PUT handlers
- When developing features requiring background jobs, run `pnpm dev:all` to start both Next.js and Inngest servers
- Example: `execute` function demonstrates AI integration with Gemini and Sentry logging

### Server Actions

- Located in `lib/actions/` directory
- Examples: create-workflow.ts, test-ai.ts
- Use for form submissions and mutations from Server Components

### Data Access Layer

- Centralized in `data/` directory (auth.ts, user.ts, workflows.ts)
- Provides reusable data fetching functions
- Separates data logic from UI components

### Monitoring

- Sentry configured for error tracking and performance monitoring
- Configuration in instrumentation.ts, sentry.server.config.ts, and sentry.edge.config.ts
- Tunnel route at `/monitoring` to bypass ad-blockers
- Automatic Vercel Cron monitoring enabled

### UI Components

- Radix UI-based components in `components/ui/`
- Linter disabled for ui/ directory (see biome.json)
- Shared app components: app-sidebar.tsx, app-header.tsx
- Sonner for toast notifications (configured in root layout)

## Important Conventions

### Route Configuration

- Root path `/` redirects to `/workflows` (see next.config.ts)
- Protected routes should use `await requireAuth()` from data/auth.ts at the top of page components
- Dashboard pages use SidebarProvider layout, editor pages use full-screen layout

### Code Style

- Biome enforces consistent formatting (120 char line width, 2 space indentation)
- Always use semicolons and trailing commas
- Arrow functions require parentheses
- Import organization happens automatically

### Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string (used by Drizzle)
- Sentry configuration variables (for error tracking)
- Google AI API credentials (for Gemini integration)

### Development Workflow

1. When adding new database tables, update `lib/db/schema.ts` then run `pnpm db:generate` followed by `pnpm db:migrate`
2. For background jobs, define functions in `lib/inngest/function.ts` and register them in `app/api/inngest/route.ts`
3. Use Server Actions in `lib/actions/` for mutations, data fetching in `data/` layer
4. Run `pnpm dev:all` for full-stack development including background job testing
