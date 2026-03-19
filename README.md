# Sim AI

Visual AI agent workflow builder. Canvas-based node editor for composing, configuring, and running multi-step AI workflows.

## Features

- **Visual workflow canvas** — drag-and-drop node editor built on React Flow v12
- **Node types** — trigger nodes, action nodes (Gmail, AI Agent, etc.) with inline field editing
- **Copilot chat** — built-in AI assistant panel for workflow building help
- **Toolbar & blocks** — triggers, integrations, and logic blocks (conditions, loops, routers)
- **Dark mode** — full light/dark theme with OKLCH color tokens
- **Glass UI** — translucent panels with backdrop blur and glow effects
- **Mobile responsive** — full touch support with slide-in sheet panels on mobile (<768px)
- **Undo/redo** — full history support via Zustand

## Stack

Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui · React Flow · Zustand · Hugeicons · Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main workflow editor page
│   └── globals.css               # Design tokens, glass utilities, motion tokens
├── components/
│   ├── ui/                       # shadcn/ui primitives (all use Hugeicons)
│   ├── ai-elements/              # Reusable AI component library (canvas, node, edge)
│   ├── workflow/                  # Workflow-specific components
│   │   ├── workflow-canvas.tsx    # React Flow wrapper with touch support
│   │   ├── workflow-header.tsx    # Header with mobile toggles
│   │   ├── left-sidebar.tsx      # Workspace sidebar (Sheet on mobile)
│   │   ├── config-panel-sidebar.tsx # Config panel (Sheet on mobile)
│   │   ├── logs-panel.tsx        # Logs panel (bottom Sheet on mobile)
│   │   ├── node-config-panel.tsx # Copilot, toolbar, and editor tabs
│   │   ├── node-hover-toolbar.tsx # Node actions (visible on tap for touch)
│   │   ├── nodes/                # Custom node types (trigger, action)
│   │   └── canvas-controls.tsx   # Zoom in/out/fit controls
│   └── theme-toggle.tsx          # Light/dark mode toggle
├── stores/
│   └── workflow-store.ts         # Zustand store (nodes, edges, history, panel state)
├── hooks/
│   └── use-is-mobile.ts          # SSR-safe mobile breakpoint detection
└── lib/
    ├── icons.ts                  # Icon registry (Hugeicons, single source of truth)
    ├── utils.ts                  # cn() utility
    └── workflow/                 # Types, constants, helpers
```

## Design System

- **Colors:** OKLCH color space with semantic tokens (`--primary`, `--muted`, `--surface-translucent`)
- **Glass surfaces:** `backdrop-panel`, `backdrop-toolbar`, `backdrop-overlay` utilities
- **Shadows:** `--shadow-glass`, `--shadow-elevated`, `--shadow-glow-blue`, `--shadow-glow-green`
- **Motion:** Duration tokens (`--duration-fast` to `--duration-slow`) and easing curves (`--ease-out`, `--ease-out-expo`)
- **Layout:** CSS custom properties for panel dimensions (`--layout-sidebar-width`, `--layout-config-panel-width`, etc.)
- **Icons:** Hugeicons only — centralized in `src/lib/icons.ts`

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

## License

MIT
