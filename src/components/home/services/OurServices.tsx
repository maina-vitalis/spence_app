"use client";
import React from "react";
import { CodeBlockWindow } from "./Codeblock";
import { UiDesign } from "./UiDesign";
import { Ecommerce } from "./Ecommerce";
import { motion } from "framer-motion";

function OurServices() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex justify-center flex-col items-center w-full"
      id="services"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-2 items-center mb-1"
      >
        <div className="w-1 h-1 rounded-full bg-blue-500" />
        <p className="text-sm">what we offer</p>
        <div className="w-1 h-1 rounded-full bg-primary" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl sm:text-4xl font-semibold text-white/95 mb-4 font-space-grotesk tracking-tight leading-[1.15]"
      >
        Our Services
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-sm font-light"
      >
        Comprehensive digital solutions tailored to transform your ideas into
        reality
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 flex items-center gap-2"
      >
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
      </motion.div>
      <div className="flex flex-col md:flex-row gap-10 mt-5 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full h-full"
        >
          <UiDesign />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full h-full"
        >
          <Ecommerce />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full h-full"
        >
          <CodeBlockWindow />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default OurServices;
