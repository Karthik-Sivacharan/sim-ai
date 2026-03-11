# Sim AI — Visual Workflow Builder

A modern visual AI agent workflow builder inspired by [sim.ai](https://sim.ai)'s canvas-based approach. Built as a design engineering demo with a polished, production-grade UI featuring node-based workflow composition and a distinctive design system.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 with OKLCH design tokens
- **Components:** shadcn/ui + Vercel AI Elements
- **Workflow Canvas:** React Flow (@xyflow/react v12)
- **State Management:** Zustand
- **Auto-Layout:** Dagre
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Dark Mode:** next-themes

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the workflow builder.

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main workflow editor
│   └── globals.css             # OKLCH design tokens
├── components/
│   ├── ai-elements/            # Vercel AI Elements (canvas, node, edge, controls)
│   ├── ui/                     # shadcn/ui primitives
│   └── workflow/               # Workflow-specific components
│       ├── workflow-canvas.tsx  # React Flow canvas wrapper
│       ├── workflow-header.tsx  # Top bar with toolbar
│       ├── workflow-toolbar.tsx # Add, undo/redo, save, run
│       ├── node-config-panel.tsx # Node properties panel
│       ├── config-panel-sidebar.tsx # Resizable right sidebar
│       ├── action-grid.tsx     # Searchable action picker
│       └── nodes/              # Custom node types (trigger, action)
├── stores/
│   └── workflow-store.ts       # Zustand: nodes, edges, selection, undo/redo
└── lib/
    └── workflow/               # Types, constants, layout utils
```

## Features

- Drag-and-drop node-based workflow canvas
- Trigger nodes (Manual, Schedule, Webhook)
- Action nodes with provider integrations (AI Gateway, GitHub, Slack, Resend, Stripe)
- Searchable action picker with collapsible provider groups
- Node configuration panel with Properties/Code/Runs tabs
- Undo/redo support
- Dark mode toggle
- OKLCH-based design token system

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```

## License

MIT
