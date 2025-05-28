import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { InteractiveGridPattern } from "../../magicui/interactive-grid-pattern";
import { IconCloud } from "./SkillCloud";

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-dvh">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "absolute inset-0 opacity-50"
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
          <Button
            asChild
            className="rounded-full hover:scale-105 transition-all duration-200 ease-in-out hover:shadow-md"
          >
            <Link href="/contact" className="text-white">
              Get Started
            </Link>
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <IconCloud />
        </div>
      </div>
    </section>
  );
}

export default Hero;
