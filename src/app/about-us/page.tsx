import { ShineBorder } from "@/components/magicui/shine-border";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdOutlineDesignServices } from "react-icons/md";
import vitalis from "./../../../public/vitalis.png";

export const metadata = {
  title: "About | Spence Creations",
  description:
    "About Spence Creations — a developer portfolio focused on building modern web products and sharing the process behind them.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      {/* Introduction Section */}
      <section className="py-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-2 items-center mb-1">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <p className="text-sm">About us</p>
            <div className="w-1 h-1 rounded-full bg-primary" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
            About me & the work I build
          </h2>{" "}
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

        {/* Feature Cards */}
        <div className="flex justify-between flex-col md:flex-row gap-6 mt-16">
          <div className="p-4 rounded-4xl flex items-center gap-5 relative">
            <ShineBorder shineColor={["#22c55e"]} />
            <div className="p-4 bg-green-500 rounded-full flex items-center justify-center">
              <FaHandshakeSimple size={30} className="text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-sm font-semibold text-green-500">
                Client Partnership
              </h1>
              <p className="text-xs">
                We build long-term relationships with our clients through
                transparent communication and dedicated support throughout the
                project lifecycle.
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
                Custom Solutions
              </h1>
              <p className="text-xs">
                Tailored digital solutions designed specifically for your
                business needs, ensuring maximum efficiency and user
                satisfaction.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-4xl flex items-center gap-5 relative">
            <ShineBorder shineColor={["#F54A00"]} />
            <div className="p-4 bg-orange-600 rounded-full flex items-center justify-center">
              <BiSupport size={30} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-orange-500">
                24/7 Support
              </h1>
              <p className="text-xs">
                Round-the-clock technical support and maintenance to ensure your
                digital solutions run smoothly at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* about founder Section */}
      <section className="py-16">
        <div className="mx-auto space-y-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-2 items-center mb-1">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <p className="text-sm">Founder</p>
              <div className="w-1 h-1 rounded-full bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
              Introduction To Best Digital Agency!
            </h2>
            <p className="text-sm font-light">
              Comprehensive digital solutions tailored to transform your ideas
              into reality
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
                <span className="ml-2 text-xs">spence.tsx</span>
              </div>

              <pre className="text-gray-300">
                <code>
                  <span className="text-gray-500">{`// Founder of Spence Creations`}</span>
                  {"\n\n"}
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">founder</span> ={" "}
                  <span className="text-yellow-300">{"{"}</span>
                  {"\n  "}
                  <span className="text-pink-400">name</span>:{" "}
                  <span className="text-green-400">{`{"Vitalis Maina"}`}</span>,
                  {"\n  "}
                  <span className="text-pink-400">role</span>:{" "}
                  <span className="text-green-400">{`{"Founder & CEO"}`}</span>,
                  {"\n  "}
                  <span className="text-pink-400">location</span>:{" "}
                  <span className="text-green-400">{`{"Nairobi, Kenya"}`}</span>
                  {"\n"}
                  <span className="text-yellow-300">{"}"};</span>
                  {"\n\n"}
                  <span className="text-gray-500">{"// Services offered"}</span>
                  {"\n"}
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">services</span> ={" "}
                  <span className="text-yellow-300">[</span>
                  {"\n  "}
                  <span className="text-green-400">{`"Web Development"`}</span>,
                  {"\n  "}
                  <span className="text-green-400">{`"Mobile Applications"`}</span>
                  ,{"\n  "}
                  <span className="text-green-400">{`"UI/UX Design"`}</span>,
                  {"\n  "}
                  <span className="text-yellow-300">];</span>
                  {"\n\n"}
                  <span className="text-gray-500">
                    {"// Digital future powered by creativity"}{" "}
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
                  Our story
                </div>
                <h2 className="text-lg md:text-2xl font-bold">
                  Built by a Passionate Technologist
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Spence Creations was founded by Vitalis Maina, a dedicated
                  developer and innovator passionate about building exceptional
                  digital experiences. His vision is to create solutions that
                  are as impactful as they are elegant.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-primary text-sm font-medium tracking-wider">
                  What drives us
                </div>
                <h2 className="text-lg md:text-2xl font-bold">Our Mission</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  At Spence Creations, we&apos;re focused on crafting top-tier
                  digital solutions from websites to custom software that
                  empower brands and communities. Our goal is to elevate digital
                  presence across Africa and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-2 items-center mb-1">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <p className="text-sm uppercase text-gray-600">Our Team</p>
              <div className="w-1 h-1 rounded-full bg-primary" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
              Meet the Visionary Behind Spence Creations
            </h2>
            <p className="text-sm font-light text-center max-w-xl">
              At the heart of Spence Creations is a passion for digital
              transformation. Discover the founder who brings ideas to life with
              creativity, code, and purpose.
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

              <Image src={vitalis} alt="vitalis maina" />
              <div className="absolute inset-0 bg-primary bg-opacity-30 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">Vitalis Maina</h3>
                  <p className="text-sm font-light">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
