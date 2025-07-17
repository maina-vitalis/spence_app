"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "./../../../public/logo2.png";
import Mobile from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between p-4 mt-3 rounded-full items-center ${
        isScrolled ? "backdrop-blur-lg bg-foreground/10 sticky top-3 z-50" : ""
      }`}
    >
      <Link href={"/"}>
        <Image src={logo} alt="Spence-creation logo" width={50} height={50} />
      </Link>

      <div className="hidden md:block">
        <NavigationMenu className="p-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/#services" passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full text-xs"
                  )}
                >
                  Services
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full text-xs"
                  )}
                >
                  Contact-us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about-us" passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full text-xs"
                  )}
                >
                  About-us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/projects" passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full text-xs"
                  )}
                >
                  Projects
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog" passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full text-xs"
                  )}
                >
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:flex gap-2 items-center hidden ">
        <div className="items-center gap-2 flex">
          <Phone size={14} />
          <p className="text-xs">0799 732 696</p>
        </div>

        <ThemeToggle />
      </div>

      <div className="md:hidden">
        <Mobile />
      </div>
    </nav>
  );
}

export default NavBar;
