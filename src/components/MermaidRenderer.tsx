"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import svgPanZoom from "svg-pan-zoom";

interface MermaidRendererProps {
  content: string;
}

function isMermaidCode(text: string): boolean {
  const trimmed = text.trim();
  return (
    trimmed.startsWith("flowchart") ||
    trimmed.startsWith("graph") ||
    trimmed.startsWith("sequenceDiagram") ||
    trimmed.startsWith("classDiagram") ||
    trimmed.startsWith("stateDiagram") ||
    trimmed.startsWith("erDiagram") ||
    trimmed.startsWith("gantt") ||
    trimmed.startsWith("pie") ||
    trimmed.startsWith("gitGraph") ||
    trimmed.startsWith("mindmap") ||
    trimmed.startsWith("timeline") ||
    trimmed.startsWith("C4Context")
  );
}

export function MermaidRenderer({ content }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    if (!containerRef.current) return;

    const codeBlocks = Array.from(
      containerRef.current.querySelectorAll("pre, code, div.mermaid")
    );

    codeBlocks.forEach(async (node, index) => {
      const text = node.textContent || "";
      if (!isMermaidCode(text)) return;

      const targetElement =
        node.tagName.toLowerCase() === "code" && node.parentElement?.tagName.toLowerCase() === "pre"
          ? node.parentElement
          : node;

      if (!targetElement || (targetElement as HTMLElement).dataset.mermaidProcessed) return;
      (targetElement as HTMLElement).dataset.mermaidProcessed = "true";

      let cleanCode = text.trim();
      if (cleanCode.startsWith("```mermaid")) {
        cleanCode = cleanCode.replace(/^```mermaid\s*/i, "").replace(/```$/, "").trim();
      } else if (cleanCode.startsWith("```")) {
        cleanCode = cleanCode.replace(/^```\s*/, "").replace(/```$/, "").trim();
      }

      const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}-${index}`;

      try {
        const { svg } = await mermaid.render(id, cleanCode);
        
        // Container wrapper
        const container = document.createElement("div");
        container.className =
          "mermaid-wrapper relative my-6 rounded-xl border border-border bg-card/60 overflow-hidden shadow-sm";

        // Controls header bar
        const toolbar = document.createElement("div");
        toolbar.className =
          "flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/40 text-xs text-muted-foreground select-none";
        toolbar.innerHTML = `
          <span class="font-medium tracking-wide uppercase text-[10px]">Diagram</span>
          <div class="flex items-center gap-1">
            <button type="button" class="zoom-in px-2 py-0.5 rounded hover:bg-muted font-bold transition-colors" title="Zoom In">+</button>
            <button type="button" class="zoom-out px-2 py-0.5 rounded hover:bg-muted font-bold transition-colors" title="Zoom Out">-</button>
            <button type="button" class="zoom-reset px-2 py-0.5 rounded hover:bg-muted transition-colors" title="Reset View">Reset</button>
          </div>
        `;

        // SVG viewport area
        const viewport = document.createElement("div");
        viewport.className = "w-full h-[450px] cursor-grab active:cursor-grabbing overflow-hidden";
        viewport.innerHTML = svg;

        const svgElement = viewport.querySelector("svg");
        if (svgElement) {
          svgElement.style.width = "100%";
          svgElement.style.height = "100%";
          svgElement.style.maxWidth = "100%";
        }

        container.appendChild(toolbar);
        container.appendChild(viewport);
        targetElement.replaceWith(container);

        if (svgElement) {
          const panZoomInstance = svgPanZoom(svgElement, {
            zoomEnabled: true,
            controlIconsEnabled: false,
            fit: true,
            center: true,
            minZoom: 0.5,
            maxZoom: 10,
            zoomScaleSensitivity: 0.2,
          });

          toolbar.querySelector(".zoom-in")?.addEventListener("click", () => {
            panZoomInstance.zoomIn();
          });
          toolbar.querySelector(".zoom-out")?.addEventListener("click", () => {
            panZoomInstance.zoomOut();
          });
          toolbar.querySelector(".zoom-reset")?.addEventListener("click", () => {
            panZoomInstance.reset();
            panZoomInstance.fit();
            panZoomInstance.center();
          });
        }
      } catch (err) {
        console.error("Mermaid rendering error:", err);
      }
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="tiptap-content prose prose-neutral dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
