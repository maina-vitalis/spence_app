"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

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

    // Find code blocks or pre elements that contain mermaid diagrams
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

      // Remove markdown backticks if present
      let cleanCode = text.trim();
      if (cleanCode.startsWith("```mermaid")) {
        cleanCode = cleanCode.replace(/^```mermaid\s*/i, "").replace(/```$/, "").trim();
      } else if (cleanCode.startsWith("```")) {
        cleanCode = cleanCode.replace(/^```\s*/, "").replace(/```$/, "").trim();
      }

      const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}-${index}`;

      try {
        const { svg } = await mermaid.render(id, cleanCode);
        const wrapper = document.createElement("div");
        wrapper.className =
          "mermaid-diagram flex justify-center my-6 overflow-x-auto p-4 bg-muted/30 rounded-xl border border-border";
        wrapper.innerHTML = svg;
        targetElement.replaceWith(wrapper);
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
