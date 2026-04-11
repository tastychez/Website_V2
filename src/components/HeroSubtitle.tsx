"use client";

import { socials } from "@/data";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiInstagram } from "react-icons/fi";

export default function HeroSubtitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2 }}
      className="text-center py-8 px-6"
    >
      <p className="text-lg md:text-xl text-bordeaux/70 font-medium tracking-wide mb-6">
        Software Development Engineer
      </p>

      <div className="flex justify-center gap-6">
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bordeaux/45 hover:text-strawberry transition-colors duration-200"
          aria-label="GitHub"
        >
          <FiGithub size={22} />
        </a>
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bordeaux/45 hover:text-strawberry transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <FiLinkedin size={22} />
        </a>
        <a
          href={socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bordeaux/45 hover:text-strawberry transition-colors duration-200"
          aria-label="Instagram"
        >
          <FiInstagram size={22} />
        </a>
        <a
          href={socials.email}
          className="text-bordeaux/45 hover:text-strawberry transition-colors duration-200"
          aria-label="Email"
        >
          <FiMail size={22} />
        </a>
      </div>
    </motion.div>
  );
}
