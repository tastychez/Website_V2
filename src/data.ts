export interface Experience {
  company: string;
  role: string;
  date: string;
  bullets: string[];
  logo?: string;
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    company: "Amazon Web Services (AWS)",
    role: "Incoming Software Development Engineer Intern",
    date: "May 2026 — Aug 2026",
    bullets: [],
  },
  {
    company: "CG Creative Studios",
    role: "Technical Consultant & Project Manager",
    date: "Jan 2026 — Present",
    bullets: [
      "Directed a 4-person engineering team to architect an automated Scope of Work (SOW) generation pipeline, replacing manual documentation workflows with a scalable, AI-assisted system.",
      "Engineered a standardized SOW library with integrated pricing data, reducing drafting time and version errors.",
    ],
  },
  {
    company: "Town of Wellesley, MA",
    role: "Strategy Consultant",
    date: "Jan 2026 — Present",
    bullets: [
      "Advised city leadership on optimizing municipal waste logistics, evaluating financial, environmental, and operational tradeoffs between centralized drop-off and modernized curbside collection models.",
      "Conducted stakeholder analysis and lifecycle modeling to measure greenhouse gas emissions and costs, presenting data-driven recommendations in weekly client briefings.",
    ],
  },
  {
    company: "Amazon — Seattle, WA",
    role: "Software Development Engineer Intern",
    date: "May 2025 — Aug 2025",
    bullets: [
      "Designed and deployed an AI-powered Jira root cause analyzer using Amazon Q (LLM), adopted organization-wide, reducing bug triage time by an estimated 50% across teams.",
      "Processed over 1,000 real-world Jira tickets through a multi-stage ML pipeline (parsing, retrieval, root cause prediction) with 90–95% fix prediction accuracy.",
      "Implemented secure authentication via AWS Secrets Manager, replacing legacy token methods and improving security across multiple teams.",
      "Identified and resolved a critical MCP bug that prevented proper Jira tool visibility, directly enabling broader usage across the org.",
      "Extended MCP server capabilities by building a Jira attachments integration, unlocking AI-powered log and media analysis for faster debugging.",
    ],
  },
  {
    company: "Olin Public Interest Technology (PInT) — Needham, MA",
    role: "AI/ML Researcher",
    date: "Aug 2024 — Feb 2025",
    bullets: [
      "Fine-tuned ASR models on 10,000+ audio samples to mitigate bias against non-standard speech, leveraging Hugging Face models to advance to the AAAS Science Competition.",
      "Reduced Word Error Rate (WER) from 20.4% to 6.2% for stuttered English and Character Error Rate (CER) from 66.4% to 19.0% for stuttered Mandarin.",
      "Demonstrated model robustness across various stutter types, addressing challenges like word and sound repetition.",
    ],
  },
  {
    company: "Olin Rocketry — Needham, MA",
    role: "Avionics Engineer",
    date: "Aug 2024 — Feb 2025",
    bullets: [
      "Developed a custom radio PCB in KiCad and programmed avionics in Arduino IDE, enabling real-time telemetry over a 10,000+ ft range with zero packet loss, improving data logging by 40%.",
      "Integrated antenna interfaces and wireless data transmission for competition-grade rocket systems.",
      "Assisted in CAD modeling and 3D printing of radio box components to enhance durability and functionality.",
    ],
  },
  {
    company: "Tone Tutoring — New York, NY",
    role: "Founder",
    date: "Dec 2022 — May 2024",
    bullets: [
      "Established a volunteer tutoring organization dedicated to supporting low-income elementary and middle school students across NYC.",
      "Developed personalized learning plans tailored to individual strengths, challenges, and goals to enhance academic performance.",
      "Partnered with 12+ schools citywide to expand access to educational resources and ongoing support.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Canary — Digital Mine Safety System",
    description:
      "Real-time hazard detection system for mines. Won 3rd in Social Impact and 4th in Hardware at Yale's YHack against 700+ participants. Features a live data pipeline integrating gas sensors and depth cameras via Raspberry Pi, plus a simulation to map tunnel geometry and model gas diffusion.",
    techStack: ["Python", "Raspberry Pi", "Sensors", "Simulation"],
    github: "https://github.com/tastychez/Canary",
  },
  {
    name: "AI.gamo — Agri-Tech Robot",
    description:
      "Bio-inspired, weed-uprooting robot for rice fields. Won 1st Place and $5,000 in seed funding at the Babson College Buildathon out of 500+ participants. Uses a trained Computer Vision model to differentiate invasive weeds from crops, with Arduino-driven motor control for targeted uprooting.",
    techStack: ["Computer Vision", "Python", "Arduino", "C++", "Motor Control"],
  },
  {
    name: "Balloon Tower Defense",
    description:
      "A fully playable tower defense game built from scratch in Python using Pygame. Features multiple tower and balloon types with strategic gameplay mechanics.",
    techStack: ["Python", "Pygame", "OOP"],
    link: "https://olincollege.github.io/BalloonTD0/",
    github: "https://github.com/olincollege/BalloonTD0",
  },
  {
    name: "Hand Gesture Recognition",
    description:
      "A desktop application that maps real-time hand gestures from webcam input to emojis using computer vision and machine learning.",
    techStack: ["Python", "OpenCV", "MediaPipe", "PyQt6"],
    github: "https://github.com/tastychez/hand_gesture_detector",
  },
  {
    name: "Arduino Line-Following Robot",
    description:
      "Designed and built an autonomous robot to navigate a taped track using closed-loop feedback control with sensor integration.",
    techStack: ["C++", "Arduino", "Python", "Robotics"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "C", "C++", "Java", "MATLAB", "HTML/CSS"],
  },
  {
    category: "AI & ML",
    skills: ["Machine Learning", "Computer Vision", "LLM Orchestration", "Agentic Workflows"],
  },
  {
    category: "Web & Frameworks",
    skills: ["React", "Next.js", "Git", "KiCad", "Arduino"],
  },
  {
    category: "Hardware & Systems",
    skills: ["Embedded Systems", "Raspberry Pi", "SolidWorks", "Robotics"],
  },
  {
    category: "Other",
    skills: ["Cybersecurity", "Photography", "Digital Editing"],
  },
];

export const socials = {
  github: "https://github.com/tastychez",
  linkedin: "https://www.linkedin.com/in/hong-yi-zhang/",
  instagram: "https://www.instagram.com/hoongg_/",
  email: "mailto:hongyizhang143@gmail.com",
};
