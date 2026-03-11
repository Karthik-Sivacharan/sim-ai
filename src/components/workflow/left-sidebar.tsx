"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IconName } from "@/lib/icons";

const SIDEBAR_WIDTH = 208;
const COLLAPSED_HEIGHT = 48;

const WORKFLOWS = [
  { id: "1", name: "Chatbot with Internal …" },
  { id: "2", name: "Automated Gmail Lab…" },
  { id: "3", name: "Support Ticket Router" },
] as const;

const bottomItems: { icon: IconName; label: string }[] = [
  { icon: "scroll-text", label: "Logs" },
  { icon: "layout-template", label: "Templates" },
  { icon: "book-open", label: "Knowledge Base" },
  { icon: "help-circle", label: "Help" },
  { icon: "settings", label: "Settings" },
];

export function LeftSidebar() {
  const [expanded, setExpanded] = useState(true);
  const [activeWorkflow, setActiveWorkflow] = useState<string>("2");

  const toggle = useCallback(() => setExpanded((v) => !v), []);

  return (
    <div
      className={cn(
        "absolute top-4 left-4 z-10 flex flex-col overflow-hidden",
        "border border-border-glass bg-surface-translucent shadow-glass backdrop-panel",
        "transition-[height,border-radius] ease-[var(--ease-out-expo)]",
        expanded
          ? "rounded-2xl duration-[var(--duration-panel)]"
          : "rounded-xl duration-[calc(var(--duration-panel)*0.8)]"
      )}
      style={{
        width: SIDEBAR_WIDTH,
        height: expanded ? "calc(100% - 2rem)" : COLLAPSED_HEIGHT,
      }}
    >
      {/* Header — always visible */}
      <div className="flex shrink-0 items-center justify-between p-3">
        <button
          onClick={expanded ? undefined : toggle}
          className={cn(
            "flex items-center gap-1.5",
            !expanded && "cursor-pointer"
          )}
        >
          <Icon name="workflow" size="sm" className="text-muted-foreground" />
          <span className="whitespace-nowrap text-sm font-medium">
            Your Workspace
          </span>
          {expanded && (
            <Icon name="chevron-down" size="xs" className="text-muted-foreground" />
          )}
        </button>

        <Button
          variant="ghost"
          size="icon-xs"
          className={cn(
            "shrink-0 text-muted-foreground",
            "transition-opacity ease-[var(--ease-out)]",
            expanded
              ? "opacity-100 duration-[var(--duration-normal)]"
              : "pointer-events-none opacity-0 duration-[var(--duration-fast)]"
          )}
          onClick={toggle}
          tabIndex={expanded ? 0 : -1}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <Icon name="panel-left-close" size="xs" />
          ) : (
            <Icon name="panel-left-open" size="xs" />
          )}
        </Button>
      </div>

      {/* Expandable content — fades + collapses via grid rows */}
      <div
        className={cn(
          "grid min-h-0 flex-1 overflow-hidden",
          "transition-[opacity,grid-template-rows] ease-[var(--ease-out-expo)]",
          expanded
            ? "grid-rows-[1fr] opacity-100 duration-[var(--duration-panel)]"
            : "grid-rows-[0fr] opacity-0 duration-[calc(var(--duration-panel)*0.8)]"
        )}
      >
        <div className="flex min-h-0 flex-col overflow-hidden">
          {/* Search */}
          <div className="shrink-0 px-3 pb-2">
            <button className="flex h-8 w-full items-center gap-2 rounded-lg border border-border bg-background/50 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-background">
              <Icon name="search" size="xs" />
              <span className="flex-1 text-left">Search</span>
              <kbd className="flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Workflows section */}
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex shrink-0 items-center justify-between px-3 py-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Workflows
              </span>
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon-xs" className="size-6 text-muted-foreground hover:text-foreground">
                  <Icon name="download" size="xs" />
                </Button>
                <Button variant="ghost" size="icon-xs" className="size-6 text-muted-foreground hover:text-foreground">
                  <Icon name="file-add" size="xs" />
                </Button>
                <Button variant="ghost" size="icon-xs" className="size-6 text-muted-foreground hover:text-foreground">
                  <Icon name="plus" size="xs" />
                </Button>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-1.5">
              {WORKFLOWS.map(({ id, name }) => (
                <button
                  key={id}
                  onClick={() => setActiveWorkflow(id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
                    activeWorkflow === id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <div className="size-2.5 shrink-0 rounded-[3px] bg-primary" />
                  <span className="truncate">{name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <nav className="flex shrink-0 flex-col gap-0.5 p-2">
            {bottomItems.map(({ icon, label }) => (
              <Tooltip key={label}>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <Icon name={icon} size="sm" />
                      <span className="truncate text-sm">{label}</span>
                    </Button>
                  }
                />
              </Tooltip>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
