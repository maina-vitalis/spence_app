"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useTheme } from "next-themes";

export function UiDesign() {
  const { theme } = useTheme();

  return (
    <div className="w-full rounded-2xl relative">
      <ShineBorder
        shineColor={
          theme === "dark" ? ["#7c2d12", "#ea580c"] : ["#f97316", "#c2410c"]
        }
        className="z-10"
      />
      <AspectRatio
        ratio={16 / 9}
        className="relative w-full max-w-2xl rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900/50"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-800 dark:to-orange-700 p-4 flex justify-between items-center">
          <span className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-white" />
            <p className="text-sm font-medium text-white">Main</p>
          </span>
          <div className="flex gap-2">
            <div className="h-5 w-5 rounded-md bg-white/10 shadow-inner" />
            <div className="h-5 w-5 rounded-md bg-white/10 shadow-inner" />
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 p-4 bg-white dark:bg-orange-900/80 gap-2 h-64 relative">
          <div className="col-span-3 bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-800 dark:to-orange-900 rounded-md shadow-md" />
          <div className="col-span-6 flex flex-col gap-3">
            <div className="bg-orange-500/10 dark:bg-orange-500/30 h-full rounded-md shadow-sm" />
            <div className="bg-orange-500/20 dark:bg-orange-500/40 h-full rounded-md shadow-sm" />
            <div className="bg-orange-500/5 dark:bg-orange-500/20 h-full rounded-md shadow-sm" />
          </div>
          <div className="col-span-3 bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-800 dark:to-orange-900 rounded-md shadow-md" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white dark:to-black" />
      </AspectRatio>
      <div className="space-y-2 px-4 py-3">
        <span className="flex gap-3 items-center">
          <div className="p-1.5 rounded-full bg-orange-100 dark:bg-orange-900">
            <FigmaLogoIcon className="text-orange-600 dark:text-orange-400 w-5 h-5" />
          </div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            UI/UX & Graphic Design
          </h1>
        </span>

        <p className="font-light text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          We create visually stunning and intuitive user interfaces that enhance
          user engagement and brand identity. Our UI/UX design services focus on
          usability, accessibility, and seamless interaction, ensuring your
          digital products are both beautiful and easy to use.
        </p>
      </div>
    </div>
  );
}
