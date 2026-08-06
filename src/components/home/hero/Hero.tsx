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
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <p className="text-sm font-medium text-primary">Developer portfolio</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            I build <span className="text-primary">modern</span> web experiences.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Full-stack developer sharing projects, design process, and the
            stories behind each build.
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Button
              asChild
              className="rounded-full hover:scale-105 transition-all duration-200 ease-in-out hover:shadow-md"
            >
              <Link href="/projects">View my work</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full flex items-center justify-center">
          <IconCloud />
        </div>
      </div>
    </section>
  );
}

export default Hero;
