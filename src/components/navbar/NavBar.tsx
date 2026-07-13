"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
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
              <NavigationMenuLink
                href="/projects"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-full text-xs"
                )}
              >
                Work
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about-us"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-full text-xs"
                )}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/blog"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-full text-xs"
                )}
              >
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-full text-xs"
                )}
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:flex gap-2 items-center hidden ">
        <ThemeToggle />
      </div>

      <div className="md:hidden">
        <Mobile />
      </div>
    </nav>
  );
}

export default NavBar;
