"use client";

import { ShoppingCart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useTheme } from "next-themes";

export function Ecommerce() {
  const { theme } = useTheme();

  return (
    <div className="w-full relative rounded-2xl">
      <ShineBorder
        shineColor={
          theme === "dark" ? ["#14532d", "#11291a"] : ["#22c55e", "#15803d"]
        }
        className="z-10"
      />

      <AspectRatio
        ratio={16 / 9}
        className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900/50"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 dark:from-green-800 dark:to-green-700 p-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShoppingCart size={17} className="text-white" />
            <p className="text-base font-semibold text-white">Kwaduka Stores</p>
          </span>
          <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full bg-white/20 shadow-inner" />
            <div className="h-4 w-4 rounded-full bg-white/20 shadow-inner" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-64">
          <div className="md:w-1/3 w-full bg-gradient-to-b from-green-100 to-green-50 dark:from-green-900 dark:to-green-950 flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 rounded-lg bg-green-600/20 dark:bg-green-500/30 flex items-center justify-center mb-4 shadow-md"></div>
          </div>
          <div className="md:w-2/3 w-full flex flex-col gap-3 p-6 bg-white/80 dark:bg-green-900/80">
            <div className="bg-green-500/10 dark:bg-green-500/20 h-10 rounded-md shadow-sm" />
            <div className="bg-green-500/20 dark:bg-green-500/30 h-10 rounded-md shadow-sm" />
            <div className="bg-green-500/5 dark:bg-green-500/10 h-10 rounded-md shadow-sm" />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white dark:to-black" />
      </AspectRatio>
      <div className="space-y-2 px-4 py-3">
        <span className="flex gap-3 items-center">
          <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900">
            <ShoppingCart
              className="text-green-700 dark:text-green-400"
              size={20}
              strokeWidth={2.5}
            />
          </div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            Ecommerce Solutions
          </h1>
        </span>

        <p className="font-light text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          We build robust ecommerce platforms tailored for your business,
          featuring seamless online shopping experiences, secure payment
          integration, and efficient product management.
        </p>
      </div>
    </div>
  );
}
