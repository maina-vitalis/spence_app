import { motion } from "framer-motion";
import { LinkIcon, Menu } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const links = [
  {
    href: "/projects",
    title: "Work",
    description: "Project case studies",
  },
  {
    href: "/about-us",
    title: "About",
    description: "Who I am and what I do",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Get in touch",
  },
];

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
            Spence Creations
          </p>
        </SheetHeader>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2 flex flex-col"
        >
          {links.map((link, index) => (
            <div key={link.href}>
              {index > 0 && (
                <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
              <motion.div variants={item}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="w-full p-2 px-3 rounded-2xl flex items-center justify-between bg-gradient-to-r from-primary/30 to-primary/90 "
                  >
                    <span>
                      <p className="text-sm font-semibold">{link.title}</p>
                      <p className="text-xs">{link.description}</p>
                    </span>
                    <LinkIcon size={15} strokeWidth={2} />
                  </Link>
                </SheetClose>
              </motion.div>
            </div>
          ))}
          <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent" />
          <motion.div variants={item}>
            <ThemeToggle />
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}

export default Mobile;
