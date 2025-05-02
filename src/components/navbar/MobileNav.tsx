import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { LinkIcon, Menu } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2, // initial delay before children animate
      staggerChildren: 0.15, // delay between each child
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 50 }, // more x to slide from far right
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

function Mobile() {
  return (
    <Sheet>
      <SheetTrigger className="p-2 hover:bg-accent rounded-md transition-colors">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="rounded-l-2xl  border-primary bg-background/10 backdrop-blur-sm px-3"
      >
        <SheetHeader className="text-start">
          <p className="font-bold text-xl text-primary text-center">
            Spence creation
          </p>
        </SheetHeader>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2 flex flex-col"
        >
          <motion.div variants={item}>
            <SheetClose asChild>
              <Link
                href="/about-us"
                className="w-full p-2 px-3 rounded-2xl flex items-center justify-between bg-gradient-to-r from-primary/30 to-primary/90 "
              >
                <span>
                  <p className="text-sm font-semibold">About Us</p>
                  <p className="text-xs">Learn about our team and vision</p>
                </span>
                <LinkIcon size={15} strokeWidth={2} />
              </Link>
            </SheetClose>
          </motion.div>

          <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />

          <motion.div variants={item}>
            <SheetClose asChild>
              <Link
                href="/#services"
                className="w-full p-2 px-3 rounded-2xl flex items-center justify-between bg-gradient-to-r from-primary/30 to-primary/90 "
              >
                <span>
                  <p className="text-sm font-semibold">Services</p>
                  <p className="text-xs">Explore what we offer</p>
                </span>
                <LinkIcon size={15} />
              </Link>
            </SheetClose>
          </motion.div>

          <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />

          <motion.div variants={item}>
            <SheetClose asChild>
              <Link
                href="/projects"
                className="w-full p-2 px-3 rounded-2xl flex items-center justify-between bg-gradient-to-r from-primary/30 to-primary/90 "
              >
                <span>
                  <p className="text-sm font-semibold">Projects</p>
                  <p className="text-xs">View our latest work</p>
                </span>
                <LinkIcon size={15} />
              </Link>
            </SheetClose>
          </motion.div>

          <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />

          <motion.div variants={item}>
            <SheetClose asChild>
              <Link
                href="/contact"
                className="w-full p-2 px-3 rounded-2xl flex items-center justify-between bg-gradient-to-r from-primary/30 to-primary/90 "
              >
                <span>
                  <p className="text-sm font-semibold">Contact us</p>
                  <p className="text-xs">Talk to us</p>
                </span>
                <LinkIcon size={18} strokeWidth={2} />
              </Link>
            </SheetClose>
          </motion.div>
          <motion.div variants={item}>
            <ThemeToggle />
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}

export default Mobile;
