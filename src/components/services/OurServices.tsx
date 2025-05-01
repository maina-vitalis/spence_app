import React from "react";
import { CodeBlockWindow } from "./Codeblock";
import { UiDesign } from "./UiDesign";
import { Ecommerce } from "./Ecommerce";

function OurServices() {
  return (
    <div
      className="flex justify-center flex-col items-center w-full"
      id="services"
    >
      <div className="flex gap-2 items-center mb-1">
        <div className="w-1 h-1 rounded-full bg-blue-500" />
        <p className="text-sm">what we offer</p>
        <div className="w-1 h-1 rounded-full bg-primary" />
      </div>
      <h2 className="text-2xl sm:text-4xl font-semibold text-white/95 mb-4 font-space-grotesk tracking-tight leading-[1.15]">
        Our Services
      </h2>{" "}
      <p className="text-sm font-light">
        Comprehensive digital solutions tailored to transform your ideas into
        reality
      </p>
      <div className="mt-6 flex items-center gap-2">
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 mt-5 w-full">
        <UiDesign />
        <Ecommerce />
        <CodeBlockWindow />
      </div>
    </div>
  );
}

export default OurServices;
