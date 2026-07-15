import { ShineBorder } from "@/components/magicui/shine-border";
import Image from "next/image";
import { FaLaptopCode, FaPen } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import vitalis from "./../../../public/vitalis.png";

import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "About",
  description: `About ${siteConfig.name} — a developer portfolio focused on building modern web products and sharing the process behind them.`,
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      {/* Introduction Section */}
      <section className="py-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-2 items-center mb-1">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <p className="text-sm">About</p>
            <div className="w-1 h-1 rounded-full bg-primary" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
            About me & the work I build
          </h2>
          <p className="text-sm font-light">
            Full-stack developer sharing projects, process, and lessons from
            building modern web applications
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="flex justify-between flex-col md:flex-row gap-6 mt-16">
          <div className="p-4 rounded-4xl flex items-center gap-5 relative">
            <ShineBorder shineColor={["#22c55e"]} />
            <div className="p-4 bg-green-500 rounded-full flex items-center justify-center">
              <FaLaptopCode size={30} className="text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-sm font-semibold text-green-500">
                Full-Stack Development
              </h1>
              <p className="text-xs">
                End-to-end web apps with React, Next.js, and TypeScript — from
                API design and databases through to polished, performant UIs.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-4xl flex items-center gap-5 relative">
            <ShineBorder shineColor={["#2B7FFF"]} />
            <div className="p-4 bg-primary rounded-full flex items-center justify-center">
              <MdOutlineDesignServices size={30} className="text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-sm font-semibold text-blue-500">
                UI & Experience
              </h1>
              <p className="text-xs">
                Thoughtful interfaces and interactions — clean layouts, smooth
                motion, and details that make a product feel intentional.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-4xl flex items-center gap-5 relative">
            <ShineBorder shineColor={["#F54A00"]} />
            <div className="p-4 bg-orange-600 rounded-full flex items-center justify-center">
              <FaPen size={30} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-orange-500">
                Writing & Sharing
              </h1>
              <p className="text-xs">
                Case studies that document how projects are built,
                what worked, and what I learned along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Profile Section */}
      <section className="py-16">
        <div className="mx-auto space-y-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-2 items-center mb-1">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <p className="text-sm">Developer</p>
              <div className="w-1 h-1 rounded-full bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
              The person behind the projects
            </h2>
            <p className="text-sm font-light">
              A snapshot of who I am, what I work with, and what this site is
              for
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full">
            <div className="flex-1 p-2 overflow-auto font-mono text-sm relative">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                <span className="ml-2 text-xs">profile.tsx</span>
              </div>

              <pre className="text-gray-300">
                <code>
                  <span className="text-gray-500">{`// ${siteConfig.name}`}</span>
                  {"\n\n"}
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">developer</span> ={" "}
                  <span className="text-yellow-300">{"{"}</span>
                  {"\n  "}
                  <span className="text-pink-400">name</span>:{" "}
                  <span className="text-green-400">{`{"Vitalis Maina"}`}</span>,
                  {"\n  "}
                  <span className="text-pink-400">role</span>:{" "}
                  <span className="text-green-400">{`{"Full-Stack Developer"}`}</span>,
                  {"\n  "}
                  <span className="text-pink-400">location</span>:{" "}
                  <span className="text-green-400">{`{"Nairobi, Kenya"}`}</span>
                  {"\n"}
                  <span className="text-yellow-300">{"}"};</span>
                  {"\n\n"}
                  <span className="text-gray-500">{"// Tools I reach for often"}</span>
                  {"\n"}
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">stack</span> ={" "}
                  <span className="text-yellow-300">[</span>
                  {"\n  "}
                  <span className="text-green-400">{`"TypeScript"`}</span>,
                  {"\n  "}
                  <span className="text-green-400">{`"Next.js"`}</span>,
                  {"\n  "}
                  <span className="text-green-400">{`"React"`}</span>,
                  {"\n  "}
                  <span className="text-green-400">{`"Tailwind CSS"`}</span>,
                  {"\n  "}
                  <span className="text-yellow-300">];</span>
                  {"\n\n"}
                  <span className="text-gray-500">
                    {"// Building in public, one project at a time"}{" "}
                  </span>
                </code>
              </pre>

              <>
                <div className="absolute top-[148px] left-[278px] w-1 h-5 bg-white animate-pulse"></div>
              </>
            </div>

            <div className="p-2 flex-1 flex flex-col justify-center space-y-12">
              <div className="space-y-1">
                <div className="text-primary text-sm font-medium tracking-wider">
                  Background
                </div>
                <h2 className="text-lg md:text-2xl font-bold">
                  A developer who loves to build
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I&apos;m Vitalis Maina — a full-stack developer based in
                  Nairobi. Spence Creations is my personal portfolio: a place to
                  showcase projects, walk through how they were built, and share
                  what I pick up along the way.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-primary text-sm font-medium tracking-wider">
                  What this site is for
                </div>
                <h2 className="text-lg md:text-2xl font-bold">
                  Projects, process, and progress
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every item here is something I designed and shipped — from
                  concept to deployment. I document the tech choices, trade-offs,
                  and lessons so the work speaks for itself and others can learn
                  from it too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-2 items-center mb-1">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <p className="text-sm uppercase text-gray-600">Profile</p>
              <div className="w-1 h-1 rounded-full bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
              Vitalis Maina
            </h2>
            <p className="text-sm font-light text-center max-w-xl">
              Full-stack developer crafting web experiences with clean code,
              sharp design, and a habit of writing about the build.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative group w-72 h-72 rounded-full overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
              <ShineBorder
                shineColor={["#2B7FFF", "#00CFFF", "#6D83F2", "#A0E9FF"]}
                borderWidth={3}
              />

              <Image src={vitalis} alt="Vitalis Maina" />
              <div className="absolute inset-0 bg-primary bg-opacity-30 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">Vitalis Maina</h3>
                  <p className="text-sm font-light">Full-Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
