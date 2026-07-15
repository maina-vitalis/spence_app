import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import logo from "./../../public/logo.png";

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-6">
          <Image
            src={logo}
            alt="spence creation logo"
            className="object-cover"
            width={80}
            height={80}
          />

          <p className="text-gray-400 text-xs">
            Developer portfolio showcasing projects and case studies in modern
            web development.
          </p>

          <div className="flex space-x-3">
            <Link
              href="https://facebook.com/spencecreation"
              className="bg-primary rounded-full p-2 flex items-center justify-center hover:opacity-90 transition-opacity text-xs"
            >
              <FaFacebook size={10} className="text-white" />
            </Link>
            <Link
              href="https://twitter.com/spencecreation"
              className="bg-primary rounded-full p-2 flex items-center justify-center hover:opacity-90 transition-opacity text-xs"
            >
              <FaXTwitter size={10} className="text-white" />
            </Link>
            <Link
              href="https://instagram.com/spencecreation"
              className="bg-primary rounded-full p-2 flex items-center justify-center hover:opacity-90 transition-opacity text-xs"
            >
              <FaInstagram size={10} className="text-white" />
            </Link>

            <Link
              href="https://wa.me/254799732696"
              target="_blank"
              className="bg-primary rounded-full p-2 flex items-center justify-center hover:opacity-90 transition-opacity text-xs"
            >
              <FaWhatsapp size={10} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-semibold text-sm">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/projects"
                className="hover:text-primary transition-colors text-xs"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="hover:text-primary transition-colors text-xs"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors text-xs"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-semibold text-sm">Contact</h3>
          <p className="text-xs">Open to collaborations and interesting work.</p>

          <ul className="space-y-4">
            <li className="flex items-center">
              <MapPin className="text-primary mr-3 flex-shrink-0" size={18} />
              <span className="text-xs">Nairobi, Kenya</span>
            </li>
            <li className="flex items-center">
              <Phone className="text-primary mr-3 flex-shrink-0" size={18} />
              <a href="tel:+254799732696" className="text-xs">
                +254 799 732 696
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="text-primary mr-3 flex-shrink-0" size={18} />
              <a href="mailto:info@spencecreations.co.ke" className="text-xs">
                info@spencecreations.co.ke
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-semibold text-sm">Availability</h3>
          <ul className="space-y-3">
            <li className="text-xs">Mon - Sat</li>
            <li className="text-xs">9:00 AM - 6:00 PM EAT</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
