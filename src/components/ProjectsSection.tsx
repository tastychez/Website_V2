"use client";

import { projects } from "@/data";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-pastel/15">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl font-bold text-bordeaux mb-16 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-pastel/40 p-7 hover:border-strawberry/30 transition-all duration-300 hover:shadow-[0_4px_24px_-4px_rgba(251,75,78,0.08)]"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif font-bold text-xl text-bordeaux group-hover:text-strawberry transition-colors">
                  {project.name}
                </h3>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bordeaux/40 hover:text-strawberry transition-colors"
                      aria-label={`${project.name} GitHub`}
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bordeaux/40 hover:text-strawberry transition-colors"
                      aria-label={`${project.name} Live`}
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-bordeaux/65 text-[15px] leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-pastel/30 text-amaranth/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
