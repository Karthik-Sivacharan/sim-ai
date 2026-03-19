# Sim AI — Visual Workflow Builder

## Project Overview
A modern visual AI agent workflow builder inspired by sim.ai's canvas-based approach. Built with a polished, production-grade UI featuring node-based workflow composition, custom connectors, and a distinctive design system.

## Tech Stack
- **Framework:** Next.js 16.x (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x with OKLCH design tokens
- **Components:** shadcn/ui (via CLI)
- **Workflow Canvas:** @xyflow/react (React Flow v12+)
- **State Management:** Zustand
- **Auto-Layout:** Dagre
- **Animation:** Motion (Framer Motion)
- **Icons:** Hugeicons (`@hugeicons/react` + `@hugeicons/core-free-icons`)
- **Dark Mode:** next-themes
- **Variants:** class-variance-authority (cva)
- **Notifications:** Sonner

## Project Structure
```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main workflow editor
│   └── globals.css             # Design tokens + shadcn variables
├── components/
│   ├── ui/                     # shadcn/ui primitives (button, dialog, etc.)
│   ├── workflow/               # Workflow-specific components
│   │   ├── canvas.tsx          # 'use client' React Flow wrapper
│   │   ├── nodes/              # Custom node types
│   │   ├── edges/              # Custom edge types
│   │   ├── panels/             # Config panels, node picker
│   │   └── toolbar/            # Workflow toolbar
│   ├── layout/                 # App shell, navbar, sidebar
│   └── shared/                 # Cross-cutting components
├── stores/                     # Zustand stores
│   └── workflow-store.ts       # Nodes, edges, selection, history
├── hooks/                      # Custom React hooks
│   └── use-is-mobile.ts        # SSR-safe mobile breakpoint hook
├── lib/
│   ├── utils.ts                # cn() utility
│   └── workflow/               # Types, constants, layout, validation
└── types/                      # Shared TypeScript types
```

## Coding Conventions

### File Naming
- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Types/interfaces: `PascalCase`

### Import Alias
- `@/*` maps to `src/*`

### Component Rules
- **Server Components by default** — no `'use client'` unless needed for interactivity
- **`'use client'` boundary as low as possible** — keep it on leaf components
- React Flow components MUST be `'use client'` and wrapped in `<ReactFlowProvider>`
- Composition over inheritance (Card/CardHeader/CardBody pattern)
- Use `React.memo` for pure components to prevent unnecessary re-renders

### State Management
- Zustand for workflow state (nodes, edges, selection, undo/redo)
- Never mutate state — always create new copies (spread, .map(), etc.)
- Custom hooks to encapsulate store access patterns

### Styling Rules
- **Never use raw Tailwind colors** (e.g., `bg-blue-500`) — always semantic tokens (`bg-primary`, `bg-muted`)
- Use CSS variables for all design tokens
- Use `cn()` utility for conditional class merging
- Use `cva()` for component variants
- Workflow-specific tokens: `--color-node-*`, `--color-edge-*`, `--shadow-node-*`

### Icons
- **Single icon family:** Hugeicons only — never import from `lucide-react`
- All icons are registered in `src/lib/icons.ts` (single source of truth)
- Custom components use `<Icon name="..." size="sm" />` from `src/components/ui/icon.tsx`
- shadcn/ui primitives use `<HugeiconsIcon icon={icons["..."]} />` directly
- To add a new icon: import from `@hugeicons/core-free-icons` in `icons.ts`, add to the `icons` map

### Mobile Responsiveness
- **Breakpoint:** Tailwind `md:` (768px) — mobile-first approach
- **Hook:** `useIsMobile()` in `src/hooks/use-is-mobile.ts` (SSR-safe via `useSyncExternalStore`)
- **Layout tokens** in `globals.css`: `--layout-sidebar-width`, `--layout-config-panel-width`, `--layout-logs-panel-height`, `--layout-header-height`, `--layout-panel-gap`
- **Mobile panels:** Sidebars render as `Sheet` (slide-in drawers) on mobile, absolute panels on desktop
- **Panel state:** `leftSidebarOpen`, `configPanelOpen`, `logsPanelOpen` in Zustand store (mobile only)
- **Touch:** `selectionOnDrag` disabled on mobile for touch panning; handles enlarged via `@media (pointer: coarse)`
- **Font sizes:** Use `text-sm md:text-xs` pattern (14px mobile, 12px desktop) for small text
- **Desktop unchanged:** All mobile paths gate on `useIsMobile()` — desktop code paths are identical

### Code Quality
- Functions < 50 lines
- Files < 400 lines (800 max)
- No deep nesting (> 4 levels)
- Explicit error handling at every level
- Validate all user input with Zod at system boundaries
- No hardcoded values — use constants or tokens

### Git
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- Never commit secrets or .env files

## Available Skills
Skills are in `.agents/skills/` — Claude will auto-discover them:
- **react-flow-skill** — React Flow patterns, custom nodes/edges, Zustand state, layouting
- **frontend-patterns** — React/Next.js patterns, performance, data fetching
- **design-system-patterns** — Design tokens, theming, component architecture
- **design-motion-principles** — Animation audit, motion design principles
- **taste-skill** — Aesthetic tuning (variance, motion, density)
- **coding-standards** — JS/TS best practices
- **e2e-testing** — Playwright E2E patterns
- **security-review** — Security audit checklist
- **liquid-glass-design** — Modern glassmorphism patterns
- **web-design-guidelines** — Web design system guidelines
- **vercel-react-best-practices** — React best practices

## Available Commands
42 slash commands in `.claude/commands/tools/` and 15 workflows in `.claude/commands/workflows/`.
Key ones: `/accessibility-audit`, `/refactor-clean`, `/tdd-red`, `/tdd-green`, `/feature-development`, `/full-review`, `/performance-optimization`

## MCP Servers
- **Figma** — Design-to-code, token extraction, screenshots
- **Playwright** — Visual testing, browser automation
- **shadcn** — Component registry access
- **Sequential Thinking** — Complex multi-step reasoning
- **Memory** — Persistent knowledge graph

## Quick Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```
