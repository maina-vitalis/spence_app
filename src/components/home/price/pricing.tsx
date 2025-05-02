"use client";
import React from "react";
import PricingCard from "./pricingCard";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiSanity } from "react-icons/si";
import { FaWordpress } from "react-icons/fa6";
import { SiPrisma } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiNestjs } from "react-icons/si";

function Pricing() {
  const pricingTiers = [
    {
      title: "Starter",
      subtitle: "1-3 Pages Website",
      featuresArr: [
        "Up to 3 Pages",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form",
        "Social Media Integration",
        "Starting from Ksh. 15,000",
        "Starting from Ksh. 15,000",
        "*Price varies with functionality",
      ],
      technologies: [
        {
          icon: FaReact,
          name: "React",
          bgColor: "bg-blue-400/20",
          textColor: "text-blue-400",
        },
        {
          icon: SiNextdotjs,
          name: "Next.js",
          bgColor: "bg-white/20",
          textColor: "text-white",
        },
        {
          icon: RiTailwindCssFill,
          name: "Tailwind",
          bgColor: "bg-blue-500/20",
          textColor: "text-blue-400",
        },
        {
          icon: FaWordpress,
          name: "Wordpress",
          bgColor: "bg-[#207196]",
          textColor: "text-white",
        },
      ],
      shineColors: ["#60A5FA", "#3B82F6"],
    },
    {
      title: "Professional",
      subtitle: "Full Business Website",
      featuresArr: [
        "5-8 Pages",
        "Advanced SEO Optimization",
        "Content Management System",
        "Custom Animations",
        "Performance Optimization",
        "Analytics Integration",
        "Starting from Ksh. 35,000",
        "*Price varies with functionality",
      ],
      technologies: [
        {
          icon: FaReact,
          name: "React",
          bgColor: "bg-blue-400/20",
          textColor: "text-blue-400",
        },
        {
          icon: SiNextdotjs,
          name: "Next.js",
          bgColor: "bg-white/20",
          textColor: "text-white",
        },
        {
          icon: BiLogoPostgresql,
          name: "PostgreSQL",
          bgColor: "bg-blue-600/20",
          textColor: "text-blue-400",
        },
        {
          icon: SiSanity,
          name: "Sanity",
          bgColor: "bg-[#EF4434]",
          textColor: "text-white",
        },
      ],
      shineColors: ["#60A5FA", "#3B82F6"],
    },
    {
      title: "Enterprise",
      subtitle: "Custom Web Application",
      featuresArr: [
        "Unlimited Pages",
        "Custom Web Application",
        "Database Integration",
        "API Development",
        "Admin Dashboard",
        "Authentication System",
        "Starting from Ksh. 100,000",
        "*Price varies with functionality",
      ],
      technologies: [
        {
          icon: SiNextdotjs,
          name: "Next.js",
          bgColor: "bg-white/20",
          textColor: "text-white",
        },
        {
          icon: SiPrisma,
          name: "Prisma",
          bgColor: "bg-purple-500/20",
          textColor: "text-white",
        },
        {
          icon: SiExpress,
          name: "Express",
          bgColor: "bg-white",
          textColor: "text-black",
        },
        {
          icon: SiNestjs,
          name: "Nest js",
          bgColor: "bg-white",
          textColor: "text-[#E32743]",
        },
        {
          icon: BiLogoPostgresql,
          name: "PostgreSQL",
          bgColor: "bg-blue-600/20",
          textColor: "text-blue-400",
        },
      ],
      shineColors: ["#60A5FA", "#3B82F6", "#818CF8"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-2 items-center mb-1"
        >
          <div className="w-1 h-1 rounded-full bg-blue-500" />
          <p className="text-sm">pricing plans</p>
          <div className="w-1 h-1 rounded-full bg-primary" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-4xl font-semibold text-white/95 mb-4 font-space-grotesk tracking-tight leading-[1.15]"
        >
          Choose Your Plan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm font-light"
        >
          Select the perfect package that aligns with your project needs and
          budget
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 flex items-center gap-2"
        >
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
        </motion.div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
          >
            <PricingCard {...tier} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Pricing;
