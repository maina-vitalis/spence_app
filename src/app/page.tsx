import Hero from "@/components/home/hero/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Developer Portfolio",
  description: siteConfig.description,
};

function Home() {
  return (
    <div>
      <Hero />
      <div className="pb-12">
        <FeaturedProjects />
      </div>
    </div>
  );
}

export default Home;
