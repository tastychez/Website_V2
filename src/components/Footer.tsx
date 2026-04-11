import { socials } from "@/data";
import { FiGithub, FiLinkedin, FiMail, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-pastel/30">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex gap-5">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bordeaux/50 hover:text-strawberry transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bordeaux/50 hover:text-strawberry transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bordeaux/50 hover:text-strawberry transition-colors"
            aria-label="Instagram"
          >
            <FiInstagram size={20} />
          </a>
          <a
            href={socials.email}
            className="text-bordeaux/50 hover:text-strawberry transition-colors"
            aria-label="Email"
          >
            <FiMail size={20} />
          </a>
        </div>
        <p className="text-xs text-bordeaux/40">
          Built with care &middot; Hong Yi Zhang
        </p>
      </div>
    </footer>
  );
}
