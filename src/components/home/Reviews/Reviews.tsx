"use client";
import { Marquee } from "@/components/magicui/marquee";
import { ShineBorder } from "@/components/magicui/shine-border";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Tumaini Fitness Centre",
    username: "@tumainifitness",
    body: "Outstanding website and poster designs that perfectly capture our fitness center's energy. Great work!",
    img: "/tumaini.png",
  },
  {
    name: "Selah Safaris",
    username: "@selahsafaris",
    body: "The website beautifully showcases our safari experiences. Bookings have increased significantly!",
    img: "/selah.png",
  },
  {
    name: "EzzFreedom and Hope",
    username: "@ezzfreedomhope",
    body: "Professional website that perfectly communicates our mental health services and mission.",
    img: "/ezz freedom.png",
  },
  {
    name: "Rithord Travel",
    username: "@rithordtravel",
    body: "Excellent website design that helped us reach more adventure seekers globally.",
    img: "/rithord.png",
  },
  {
    name: "Kings and Queens Gym",
    username: "@kingsqueensgym",
    body: "Outstanding graphic design work that perfectly represents our brand's premium quality.",
    img: "/logo.png",
  },
  {
    name: "Tumaini Fitness Events",
    username: "@tumainifitnessgym",
    body: "Eye-catching event posters that consistently draw large crowds to our fitness events.",
    img: "/tumaini.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <motion.figure
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <ShineBorder shineColor={["#2B7FFF"]} />
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-xs">{body}</blockquote>
    </motion.figure>
  );
};

export function Reviews() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden"
    >
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </motion.div>
  );
}
