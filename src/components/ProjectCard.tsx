"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ShineBorder } from "./magicui/shine-border";
import { motion } from "framer-motion";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      className="relative flex flex-col justify-between gap-3 overflow-hidden border-none shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl p-3 bg-card"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <ShineBorder shineColor={["#155DFC"]} />
      <div className="relative h-52 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover rounded-xl"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
      </div>

      <div className="relative z-10 -mt-4 p-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </div>

      <div className="pb-2 p-0">
        <CardDescription className="line-clamp-3 text-sm text-muted-foreground p-0">
          {description}
        </CardDescription>
      </div>

      <CardFooter className="flex justify-between gap-2 p-0 pt-0">
        {liveUrl && (
          <Button asChild variant="default" className="flex-1">
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        )}
        {githubUrl && (
          <Button asChild variant="outline" className="flex-1">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </motion.div>
  );
}
