import Link from "next/link";
import { MapPin, Mail, ArrowUpRight, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 pb-12 border-t border-border/40 pt-16">
      {/* Top CTA Banner for Portfolio */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-accent/20 to-background p-8 md:p-12 mb-16 border border-border/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Let&apos;s collaborate to build something remarkable. Open for full-stack development, technical consulting, and freelance work.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-all hover:gap-3"
            >
              Get in Touch
              <ArrowUpRight size={16} />
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 bg-muted/60 hover:bg-muted font-medium px-5 py-2.5 rounded-full text-sm border border-border/50 transition-colors"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/40">
        {/* Bio / Brand Section (No Logo) */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <h3 className="font-bold text-lg tracking-tight">{siteConfig.name}</h3>
            <p className="text-xs text-primary font-medium mt-0.5">
              Full-Stack Developer & Web Engineer
            </p>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
            Crafting high-performance web applications, modern interactive interfaces, and scalable full-stack solutions.
          </p>
          <div className="flex items-center text-xs text-muted-foreground pt-1">
            <MapPin className="text-primary mr-2 flex-shrink-0" size={14} />
            <span>{siteConfig.location}</span>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-semibold text-sm tracking-wider uppercase text-muted-foreground/80">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link
                href="/projects"
                className="hover:text-primary transition-colors inline-flex items-center gap-1 group"
              >
                <span>Projects</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="hover:text-primary transition-colors inline-flex items-center gap-1 group"
              >
                <span>About Me</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors inline-flex items-center gap-1 group"
              >
                <span>Contact</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect & Socials Section */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-semibold text-sm tracking-wider uppercase text-muted-foreground/80">
            Connect
          </h4>
          <p className="text-xs text-muted-foreground">
            Feel free to reach out via email or connect on social media.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full bg-muted/80 hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-105"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full bg-muted/80 hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-105"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="w-9 h-9 rounded-full bg-muted/80 hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-105"
            >
              <FaXTwitter size={15} />
            </a>
            <a
              href="https://wa.me/254799732696"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Contact"
              className="w-9 h-9 rounded-full bg-muted/80 hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-105"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex items-center gap-1.5">
          <Code2 size={14} className="text-primary" />
          <span>Designed & Built with Next.js & React</span>
        </div>
      </div>
    </footer>
  );
}

