"use client";

import { useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { NodeConfigPanel } from "@/components/workflow/node-config-panel";

const MIN_WIDTH = 320;
const MAX_WIDTH = 480;
const DEFAULT_WIDTH = 360;

export function ConfigPanelSidebar() {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [collapsed, setCollapsed] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = width;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = startX - moveEvent.clientX;
        const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta));
        setWidth(newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [width]
  );

  if (collapsed) {
    return (
      <div className="flex flex-col border-l bg-background">
        <Button
          variant="ghost"
          size="icon"
          className="m-2"
          onClick={() => setCollapsed(false)}
        >
          <PanelRightOpen className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative flex" style={{ width }}>
      <div
        onMouseDown={handleMouseDown}
        className="group relative flex w-0 cursor-col-resize items-center justify-center"
      >
        <Separator orientation="vertical" className="h-full" />
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute z-10 -translate-x-1/2 bg-background"
          onClick={() => setCollapsed(true)}
        >
          <PanelRightClose className="size-3.5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto bg-background">
        <NodeConfigPanel />
      </div>
    </div>
  );
}
