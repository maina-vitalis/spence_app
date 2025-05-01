import Hero from "@/components/hero/Hero";
import Pricing from "@/components/price/pricing";
import OurServices from "@/components/services/OurServices";
import { Separator } from "@/components/ui/separator";
import React from "react";

function Home() {
  return (
    <div>
      <Hero />
      <div className="space-y-20">
        <OurServices />
        <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />
        <Pricing />
      </div>
    </div>
  );
}

export default Home;
