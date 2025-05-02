"use client";

import { MapPin, Phone, Mail, ClockIcon } from "lucide-react";
import { motion } from "framer-motion";
import ReachOut from "@/components/ReachOut";
import { Separator } from "@/components/ui/separator";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactPage() {
  return (
    <main className="space-y-16">
      {/* Top Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-6 space-y-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex gap-2 items-center mb-1">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <p className="text-sm">Get in Touch</p>
            <div className="w-1 h-1 rounded-full bg-primary" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
            Contact Us
          </h2>
          <p className="text-sm font-light">
            We&apos;re here to help you bring your digital ideas to life. Reach
            out to us today!
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex justify-center gap-5 flex-wrap"
        >
          {/* Location Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="shadow-sm p-5 rounded-3xl space-y-5 sm:w-56 min-w-56 w-full bg-orange-100/50 dark:bg-orange-900/50"
          >
            <div className="flex gap-3 items-center">
              <MapPin size={40} className="text-orange-500" />
              <div>
                <p className="text-xs">Headquarters</p>
                <p className="text-orange-500 font-medium">Visit Us</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              <p>Spence Creations</p>
              <p>Westlands, Nairobi, Kenya</p>
            </div>
          </motion.div>

          {/* Call Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="shadow-sm p-5 rounded-3xl space-y-5 sm:w-56 min-w-56 w-full bg-green-100/50 dark:bg-green-900/50"
          >
            <div className="flex gap-3 items-center">
              <Phone size={40} className="text-green-500" />
              <div>
                <p className="text-xs">Phone</p>
                <p className="text-green-500 font-medium text-sm">Talk To Us</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              <p>Call or whatsapp</p>
              <p>+254 799 732 696</p>
            </div>
          </motion.div>

          {/* Mail Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="shadow-sm p-5 rounded-3xl space-y-5 sm:w-56 min-w-56 w-full bg-blue-100/50 dark:bg-blue-900/50"
          >
            <div className="flex gap-3 items-center">
              <Mail size={40} className="text-blue-500" />
              <div>
                <p className="text-xs">Email</p>
                <p className="text-blue-500 font-medium">Write To Us</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              <p>info@spencecreations.co.ke</p>
              <p>mainavitalis65@gmail.com</p>
            </div>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="shadow-sm p-5 rounded-3xl space-y-5 sm:w-56 min-w-56 w-full bg-indigo-100/50 dark:bg-indigo-500/50"
          >
            <div className="flex gap-3 items-center">
              <ClockIcon size={40} className="text-indigo-500" />
              <div>
                <p className="text-xs">Working Hours</p>
                <p className="text-indigo-500 font-medium">Open Times</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300">
              <p>Mon - sat: 8:00am – 6:00pm</p>
              <p>Sun: 12:00pm – 6.00pm</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
      <Separator className="bg-gradient-to-r from-transparent via-primary to-transparent md:hidden" />
      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ReachOut />
      </motion.div>
    </main>
  );
}
