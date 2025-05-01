"use client";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Code2 } from "lucide-react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useTheme } from "next-themes";

export function CodeBlockWindow() {
  const { theme } = useTheme();

  return (
    <div className="w-full space-y-1 border border-gray-200 dark:border-gray-800 rounded-3xl relative">
      <ShineBorder
        shineColor={theme === "dark" ? ["#2563eb"] : ["#3b82f6"]}
        className="z-10"
      />
      <AspectRatio
        ratio={16 / 9}
        className="relative w-full rounded-3xl overflow-hidden bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black/90"
      >
        {/* Header */}
        <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-black/40 border-b border-gray-200 dark:border-white/5">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <Badge
            variant="outline"
            className="ml-4 px-3 py-1 rounded-md bg-gray-200/50 dark:bg-black/40 text-[10px] text-gray-600 dark:text-gray-400 border-none"
          >
            App.tsx
          </Badge>
        </div>

        {/* Code Block */}
        <div className="p-0 h-full relative dark:bg-gradient-to-t dark:from-black dark:via-gray-900/80 dark:to-transparent">
          <div className="h-full">
            <pre className="p-4 text-[10px] md:text-xs font-mono text-gray-800 dark:text-gray-300/90 whitespace-pre-wrap">
              <code className="flex flex-col gap-1">
                <span className="text-blue-600 dark:text-blue-400">
                  import React from &apos;react&apos;
                </span>
                <span className="text-gray-700 dark:text-gray-400">
                  const App = &#40;&#41; =&gt; &#123;
                </span>
                <span className="text-purple-600 dark:text-violet-400 pl-2">
                  {" "}
                  const [data, setData] = useState&lt;Data[]&gt;&#40;[]&#41;
                </span>
                <span className="text-green-600 dark:text-emerald-400 pl-2">
                  {`// Fetch process data`}
                </span>
                <span className="text-orange-600 dark:text-orange-400 pl-2">
                  {" "}
                  return &lt;Layout&gt;&#123;&#125;&lt;/Layout&gt;
                </span>
                <span className="text-gray-700 dark:text-gray-400">&#125;</span>
              </code>
            </pre>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white dark:to-black" />
      </AspectRatio>
      <div className="space-y-2 px-4 py-3">
        <span className="flex gap-3 items-center">
          <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50">
            <Code2
              className="text-blue-600 dark:text-blue-400"
              size={20}
              strokeWidth={2.5}
            />
          </div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            Website and Mobile Development
          </h1>
        </span>

        <p className="font-light text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          Spence Creations crafts full-stack digital experiences using
          TypeScript, React, Next.js, Express, and PostgreSQL delivering
          seamless, scalable solutions from pixel-perfect websites to powerful
          backend-driven web apps.
        </p>
      </div>
    </div>
  );
}
