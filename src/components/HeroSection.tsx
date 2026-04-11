"use client";

import dynamic from "next/dynamic";
import HeroSubtitle from "./HeroSubtitle";

const PhysicsHero = dynamic(() => import("./PhysicsHero"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "60vh", minHeight: 400 }}
    >
      <div className="w-8 h-8 border-2 border-rose-300 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="pt-16">
      <PhysicsHero />
      <HeroSubtitle />
    </section>
  );
}
