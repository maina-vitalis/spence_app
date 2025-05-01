import React from "react";
import { InteractiveGridPattern } from "../magicui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { IconCloud } from "./SkillCloud";

import { ShimmerButton } from "../magicui/shimmer-button";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-dvh">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "absolute inset-0 opacity-50 "
        )}
        height={60}
        width={60}
        squaresClassName="hover:fill-blue-500"
      />

      <div className="relative z-10 flex flex-col-reverse lg:flex-row h-full items-center justify-center px-6 py-12 gap-y-12">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-primary">Build</span> modern digital products.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Leveraging cutting-edge tech to deliver reliable, scalable, and
            modern solutions for your next project.
          </p>
          <Link href="/contact">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started
              </span>
            </ShimmerButton>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <IconCloud />
        </div>
      </div>
    </section>
  );
}

export default Hero;
