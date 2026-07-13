import Hero from "@/components/home/hero/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LatestBlogPosts } from "@/components/home/LatestBlogPosts";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Spence Creations | Developer Portfolio",
  description:
    "Portfolio of web projects, case studies, and tech writing by Spence Creations.",
};

function Home() {
  return (
    <div>
      <Hero />
      <div className="space-y-20 pb-12">
        <FeaturedProjects />
        <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />
        <LatestBlogPosts />
      </div>
    </div>
  );
}

export default Home;
