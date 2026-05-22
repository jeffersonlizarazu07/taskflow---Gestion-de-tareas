# TaskFlow

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/jeffersonlizarazu07/taskflow---Gestion-de-tareas)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jeffersonlizarazu07/taskflow---Gestion-de-tareas/pulls)

A professional task management application built as a technical demonstration. Features full CRUD operations, optimistic updates, local pagination, and dark/light theme support with a clean, responsive interface built with Next.js 15 and React 19.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Technical Decisions](#technical-decisions)
- [Code Quality](#code-quality)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

TaskFlow is a modern task management application designed to showcase best practices in frontend development. Built with Next.js 15 (App Router), React 19, and TypeScript, it implements a complete task management system with local state management, optimistic UI updates, and a responsive design system.

The application consumes the [DummyJSON](https://dummyjson.com/docs/todos) public API for initial data loading while managing all CRUD operations locally to ensure perfect consistency between UI and state.

## Features

✨ **Core Functionality**

- Complete CRUD operations (Create, Read, Update, Delete)
- Optimistic UI updates for immediate feedback
- Local pagination and filtering
- Task completion toggling
- Local task identification (isLocal flag)

🎨 **User Experience**

- Dark/Light theme toggle with system preference detection
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Accessible components (ARIA labels, keyboard navigation)
- Loading states and skeleton loaders
- Confirmation dialogs with blur backdrop
- Visual feedback for all operations (success/error messages)

🛠️ **Developer Experience**

- TypeScript 5 with strict type checking
- ESLint and Prettier for code quality
- Modular architecture with separation of concerns
- Custom hooks following Single Responsibility Principle
- Detailed technical documentation
- Conventional commit history

## Demo

![TaskFlow Dashboard](https://via.placeholder.com/800x450/0d1117/ffffff?text=TaskFlow+Dashboard+Screenshot)

_Live demo available at: [https://pt-taskflow-jefferson-lizarazu.vercel.app](https://pt-taskflow-jefferson-lizarazu.vercel.app)_

## Technology Stack

| Category          | Technology               | Version | Purpose                         |
| ----------------- | ------------------------ | ------- | ------------------------------- |
| **Framework**     | Next.js                  | 15.1.9  | React framework with App Router |
| **Library**       | React                    | 19.0.0  | UI library                      |
| **Language**      | TypeScript               | 5.0     | Static typing                   |
| **Styling**       | Tailwind CSS             | 4.0     | Utility-first CSS framework     |
| **Styling Utils** | class-variance-authority | 0.7.1   | Variant management              |
| **Styling Utils** | tailwind-merge + clsx    | -       | Safe class merging              |
| **Icons**         | lucide-react             | 0.577.0 | Consistent icon set             |
| **Quality**       | ESLint 9 + Prettier 3    | -       | Code formatting and linting     |
| **Dev**           | pnpm                     | 11.1.3  | Fast package manager            |

## Installation

### Prerequisites

- Node.js >= 20.x
- pnpm >= 8.x (recommended) or npm/yarn

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/jeffersonlizarazu07/taskflow---Gestion-de-tareas.git
cd taskflow---Gestion-de-tareas

# 2. Install dependencies
pnpm install

# 3. Configure environment (optional)
cp .env.example .env.local
# Edit .env.local if needed (defaults work for DummyJSON API)

# 4. Start development server
pnpm dev
```

### Alternative Package Managers

```bash
# Using npm
npm install
npm run dev

# Using yarn
yarn install
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable                   | Description                      | Default                 | Required |
| -------------------------- | -------------------------------- | ----------------------- | -------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for DummyJSON API       | `https://dummyjson.com` | No       |
| `NEXT_PUBLIC_APP_NAME`     | Application name displayed in UI | `TaskFlow`              | No       |

Create a `.env.local` file in the root directory to override defaults:

```env
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
NEXT_PUBLIC_APP_NAME=TaskFlow
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with metadata and providers
│   ├── page.tsx           # Home page - pure component composition
│   └── globals.css        # CSS variables, design tokens, base styles
├── components/
│   ├── ui/                # Reusable UI primitives
│   │   ├── Button.tsx     # CVA-based button with variants
│   │   ├── ConfirmDialog.tsx # Accessible modal (Portal-based)
│   │   ├── EmptyState.tsx # Reusable empty state component
│   │   ├── ErrorMessage.tsx # Error display with retry action
│   │   ├── ModeButton.tsx # Theme toggle button
│   │   └── Skeleton.tsx   # Loading skeleton component
│   └── features/
│       └── todos/         # Task domain components
│           ├── TodoFilters.tsx   # Filter tabs (All/Active/Completed)
│           ├── TodoForm.tsx      # Task creation form with validation
│           ├── TodoItem.tsx      # Individual task with toggle/delete
│           ├── TodoList.tsx      # List orchestrator (loading/error/empty/data)
│           └── TodoPagination.tsx# Pagination controls
├── config/
│   └── env.ts             # Environment validation at build time
├── constants/
│   └── todos.ts           # Application constants (TODOS_PER_PAGE)
├── hooks/
│   ├── useTodos.ts        # Public hook - UI entry point
│   ├── useTodosFetch.ts   # Data fetching and local pagination
│   ├── useTodosMutations.ts # CRUD operations with optimistic updates
│   └── useTodosFilter.ts  # Local filtering logic
├── lib/
│   └── utils.ts           # Utility functions (cn() for class merging)
├── services/
│   └── todoService.ts     # API service layer (fetchAllTodos, etc.)
└── types/
    └── todo.ts            # TypeScript domain types
```

## Technical Decisions

### Data Loading Strategy

Instead of paginated API requests, the application loads all todos once (`GET /todos?limit=0`) and manages pagination/filtering locally. This approach was chosen because:

- The DummyJSON API doesn't persist write operations
- API-based pagination would cause inconsistencies between local changes and server state
- Local management guarantees perfect UI-state synchronization
- Initial load of ~250 records is performant for modern browsers

### State Management

Selected `useState` in custom hooks over external libraries (Zustand, Redux) because:

- Single-page application with one data domain
- No cross-context state sharing requirements
- Simplicity and zero additional dependencies
- Sufficient for application scale (would reconsider for multi-page apps)

### Hook Architecture

Applied Single Responsibility Principle by splitting concerns:
| Hook | Responsibility |
|------|----------------|
| `useTodosFetch` | Initial data load, local pagination, `allTodos` exposure |
| `useTodosMutations` | Create/update/delete operations with optimistic updates |
| `useTodosFilter` | Local filtering by completion state |
| `useTodos` | Orchestrator exposing unified public API |

Data flow: `allTodos → filteredTodos → getPageSlice(page)`

### Optimistic Updates

Implemented for `toggleTodo` operation:

1. UI updates immediately without waiting for API response
2. On API failure, automatically reverts to previous state
3. Chosen because toggle is low-risk operation with zero perceived latency
4. Would use post-response update for higher-risk operations (e.g., financial transactions)

### Local Task Identification

Addresses DummyJSON's limitation where POST /todos/add returns non-existent IDs:

- Local tasks marked with `isLocal: true`
- Temporary negative IDs generated via `-Date.now()`
- `useTodosMutations` skips API calls for local tasks
- UI displays "Local" badge for client-created tasks

### Confirmation Dialog

Built custom `ConfirmDialog` using React Portal:

- Avoids external dependencies
- Features: backdrop blur, Escape key handling, scroll locking
- Full accessibility compliance (role, aria-modal, aria-labelledby)
- More polished than `window.confirm()`

## Code Quality

- **TypeScript**: Strict mode enabled, zero `any` types in production code
- **Linting**: ESLint 9 flat config with explicit Next.js, React, React Hooks, JSX accessibility, import, and TypeScript rules
- **Formatting**: Automatic Tailwind class ordering via `prettier-plugin-tailwindcss`
- **Commits**: Descriptive messages following Conventional Commits (feat/fix/chore/docs)
- **Build**: Zero errors in `pnpm build`
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

### ESLint Configuration

The project uses `eslint.config.mjs` with an explicit flat configuration instead of relying on the legacy `next/core-web-vitals` preset import directly.

This is intentional:

- ESLint 9 uses the flat config model as the modern configuration format.
- The config manually composes the recommended rules from Next.js, React, React Hooks, TypeScript, JSX accessibility, and import tooling.
- Plugins are resolved from the `eslint-config-next` package context through `createRequire(...)`, which keeps resolution stable with pnpm's strict dependency layout.
- Prettier is applied last through `eslint-config-prettier` to avoid formatting-rule conflicts.
- Generated output and framework artifacts are ignored: `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`.
- `no-undef` is disabled for TypeScript files because TypeScript already validates symbols and type-only references more accurately than the base ESLint rule.

Run the linter with:

```bash
pnpm lint
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run linting
pnpm lint

# Format code
pnpm format
```

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [DummyJSON](https://dummyjson.com) for providing the free public API
- [Next.js](https://nextjs.org) team for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS approach
- [Lucide](https://lucide.dev) for the beautiful open-source icon set
- All contributors who have helped shape this project

---

Made with ❤️ by Jefferson Lizarazu for the Orquestia technical assessment.
