"use client";

import { experiences } from "@/data";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl font-bold text-bordeaux mb-16 text-center"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-48 top-0 bottom-0 w-px bg-pastel/60 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col md:flex-row md:gap-12"
              >
                {/* Left: Date + Company */}
                <div className="md:w-48 flex-shrink-0 mb-3 md:mb-0 md:text-right md:pr-8">
                  <p className="text-sm font-medium text-amaranth/80">
                    {exp.date}
                  </p>
                  <p className="font-serif font-semibold text-bordeaux text-lg">
                    {exp.company}
                  </p>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex items-start pt-2">
                  <div className="w-3 h-3 rounded-full bg-strawberry border-2 border-white shadow-sm -ml-1.5" />
                </div>

                {/* Right: Role + Bullets */}
                <div className="flex-1 md:pl-4">
                  <h3 className="font-semibold text-bordeaux text-lg mb-2">
                    {exp.role}
                  </h3>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-bordeaux/70 leading-relaxed text-[15px] flex items-start gap-2"
                      >
                        <span className="text-strawberry mt-1.5 text-xs">●</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
