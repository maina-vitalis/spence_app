"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  content: string;
}

export function MermaidRenderer({ content }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });

    if (!containerRef.current) return;

    // Find all pre.mermaid or pre > code.language-mermaid elements inside container
    const mermaidNodes = containerRef.current.querySelectorAll(
      "pre.mermaid, pre code.language-mermaid, div.mermaid"
    );

    mermaidNodes.forEach((node, index) => {
      const code = node.textContent || "";
      if (!code.trim()) return;

      const parentElement = node.tagName.toLowerCase() === "code" ? node.parentElement : node;
      if (!parentElement) return;

      const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}-${index}`;
      
      mermaid
        .render(id, code)
        .then(({ svg }) => {
          const wrapper = document.createElement("div");
          wrapper.className = "mermaid-diagram flex justify-center my-6 overflow-x-auto p-4 bg-card rounded-lg border border-border";
          wrapper.innerHTML = svg;
          parentElement.replaceWith(wrapper);
        })
        .catch((err) => {
          console.error("Mermaid rendering error:", err);
        });
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
