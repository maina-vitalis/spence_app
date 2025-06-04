import Hero from "@/components/home/hero/Hero";
import Pricing from "@/components/home/price/pricing";
import { Reviews } from "@/components/home/Reviews/Reviews";
import OurServices from "@/components/home/services/OurServices";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Spence Creations | Your Partner in Digital Innovation",
  description: "Transform your online presence with expert web development, e-commerce solutions, and UI/UX design services. Get a free quote today!",
};

function Home() {
  return (
    <div>
      <Hero />
      <div className="space-y-20">
        <OurServices />
        <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />
        <Pricing />
        <Reviews />
      </div>
    </div>
  );
}

export default Home;
