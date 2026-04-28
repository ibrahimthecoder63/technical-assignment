# Technical Assignment - TypeScript Monorepo

A full-stack TypeScript monorepo using pnpm workspaces, featuring an Express backend, React frontends, and shared libraries for API management and database operations.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Available Commands](#available-commands)
- [Development Workflow](#development-workflow)
- [Packages](#packages)

## Overview

This is a monorepo project that combines multiple applications and libraries:
- **API Server**: An Express.js backend with OpenAPI documentation
- **Shop**: A React e-commerce frontend with product listings
- **Mockup Sandbox**: A component library showcase with UI components
- **Shared Libraries**: Reusable packages for API clients, schemas, and database management

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Monorepo Tool** | pnpm workspaces |
| **Runtime** | Node.js 24 |
| **Language** | TypeScript 5.9 |
| **Backend Framework** | Express 5 |
| **Frontend Framework** | React 18+ |
| **Build Tool** | Vite, esbuild |
| **Database** | PostgreSQL + Drizzle ORM |
| **Validation** | Zod v4, Drizzle-Zod |
| **API Codegen** | Orval (from OpenAPI spec) |
| **State Management** | TanStack React Query |
| **UI Components** | Radix UI |
| **Form Handling** | React Hook Form |
| **Logging** | Pino |
| **Code Quality** | TypeScript, Prettier |

## 📁 Project Structure

```
.
├── artifacts/                      # Applications & frontends
│   ├── api-server/                # Express API server
│   ├── shop/                       # E-commerce shop application
│   └── mockup-sandbox/            # UI component showcase
├── lib/                           # Shared libraries
│   ├── api-client-react/          # React hooks for API calls
│   ├── api-spec/                  # OpenAPI specification & codegen
│   ├── api-zod/                   # Auto-generated Zod schemas
│   └── db/                        # Database schema & utilities
├── scripts/                       # Utility scripts
├── package.json                  # Workspace root configuration
├── pnpm-workspace.yaml           # Workspace configuration
└── tsconfig.base.json            # Shared TypeScript config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 24.x or higher
- **pnpm**: Latest version

Ensure you have pnpm installed. If not:
```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Technical-Assignment
```

2. Install dependencies:
```bash
pnpm install
```

3. Build shared libraries:
```bash
pnpm run typecheck:libs
pnpm run build
```

## 📝 Available Commands

### Root Level Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development mode (runs shop by default) |
| `pnpm build` | Run typecheck and build all packages |
| `pnpm typecheck` | Full typecheck across all packages |
| `pnpm typecheck:libs` | Typecheck only shared libraries |

### API Server Commands

```bash
pnpm --filter @workspace/api-server run dev      # Start API server in dev mode
pnpm --filter @workspace/api-server run build    # Build API server
pnpm --filter @workspace/api-server run start    # Start API server (production)
```

### Shop Application Commands

```bash
pnpm --filter @workspace/shop run dev      # Start shop dev server
pnpm --filter @workspace/shop run build    # Build shop for production
pnpm --filter @workspace/shop run serve    # Preview production build
```

### Mockup Sandbox Commands

```bash
pnpm --filter @workspace/mockup-sandbox run dev      # Start mockup sandbox
pnpm --filter @workspace/mockup-sandbox run build    # Build mockup sandbox
pnpm --filter @workspace/mockup-sandbox run preview  # Preview build
```

### Database Commands

```bash
pnpm --filter @workspace/db run push       # Push schema changes to database
pnpm --filter @workspace/db run push-force # Force push schema changes
```

### API Codegen Command

```bash
pnpm --filter @workspace/api-spec run codegen  # Regenerate API hooks and Zod schemas from OpenAPI spec
```

## 🔄 Development Workflow

### 1. Create an API Schema

Define your API endpoints in [lib/api-spec/openapi.yaml](lib/api-spec/openapi.yaml)

### 2. Generate API Types and Hooks

```bash
pnpm --filter @workspace/api-spec run codegen
```

This generates:
- `lib/api-zod/src/generated/` - Zod schemas for validation
- `lib/api-client-react/src/generated/` - React hooks for API calls

### 3. Develop a Database Schema

Update [lib/db/src/schema/index.ts](lib/db/src/schema/index.ts) with your tables

### 4. Push Database Changes

```bash
pnpm --filter @workspace/db run push
```

### 5. Implement API Endpoints

Add routes in [artifacts/api-server/src/routes/](artifacts/api-server/src/routes/)

### 6. Use Generated Hooks in React

Import and use the auto-generated hooks in your React components:

```typescript
import { useGetProducts } from '@workspace/api-client-react';

function ProductList() {
  const { data, isLoading } = useGetProducts();
  // ...
}
```

## 📦 Packages

### Applications

#### `@workspace/api-server`
Express-based REST API server with OpenAPI documentation support. Includes:
- CORS and cookie handling middleware
- Structured logging with Pino
- PostgreSQL database integration via Drizzle ORM
- Health check endpoint

**Location**: [artifacts/api-server/](artifacts/api-server/)

#### `@workspace/shop`
React e-commerce frontend built with Vite. Features:
- Product listing and details
- Responsive UI with Radix UI components
- Form handling with React Hook Form
- Mobile detection and toast notifications

**Location**: [artifacts/shop/](artifacts/shop/)

#### `@workspace/mockup-sandbox`
Component library and UI showcase. Includes:
- Comprehensive Radix UI component library
- Form components and utilities
- Product list mockup components
- Interactive component preview

**Location**: [artifacts/mockup-sandbox/](artifacts/mockup-sandbox/)

### Shared Libraries

#### `@workspace/api-spec`
OpenAPI specification and code generation:
- Central API schema definition
- Orval-powered code generation
- Generates TypeScript hooks and Zod schemas

**Location**: [lib/api-spec/](lib/api-spec/)

#### `@workspace/api-zod`
Auto-generated Zod validation schemas:
- Generated from OpenAPI spec
- Provides runtime validation for API responses
- Type-safe validation across the application

**Location**: [lib/api-zod/](lib/api-zod/)

#### `@workspace/api-client-react`
React hooks for API communication:
- Auto-generated from OpenAPI spec
- Built on TanStack React Query
- Provides `useGetX`, `usePostY`, etc. hooks
- Custom fetch client with error handling

**Location**: [lib/api-client-react/](lib/api-client-react/)

#### `@workspace/db`
Database schema and utilities:
- Drizzle ORM schema definitions
- PostgreSQL integration
- Drizzle-Zod schema exports for validation
- Database migration scripts

**Location**: [lib/db/](lib/db/)

## 🔐 Security

- **Supply Chain Attack Defense**: pnpm workspace enforces a 1-day minimum release age for npm packages
- **Type Safety**: Full TypeScript coverage across all packages
- **Validation**: Zod schemas for runtime validation

## 📄 License

MIT

## 🤝 Contributing

1. Ensure all packages pass typecheck: `pnpm run typecheck`
2. Build all packages: `pnpm run build`
3. Follow existing code patterns and conventions
4. Update API spec if adding new endpoints
5. Run codegen to update derived packages: `pnpm --filter @workspace/api-spec run codegen`

## 📞 Support

For issues or questions, refer to the individual package documentation.
md file for additional workspace information.
