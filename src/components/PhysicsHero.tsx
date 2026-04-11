"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

const LETTERS = "HONG YI ZHANG".split("");

const PALETTE = ["#3E000C", "#FB4B4E", "#7C0B2B", "#D10000", "#3E000C"];

function getColor(index: number) {
  return PALETTE[index % PALETTE.length];
}

export default function PhysicsHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [ready, setReady] = useState(false);

  const setup = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.2, scale: 0.001 },
    });
    engineRef.current = engine;

    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    const wallThickness = 60;
    const walls = [
      // floor
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + 200, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
      // left wall
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
      // right wall
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    const blockSize = Math.min(Math.max(width / 16, 36), 64);
    const fontSize = blockSize * 0.6;
    const cornerRadius = 8;

    const totalLetters = LETTERS.filter((l) => l !== " ").length;
    const spacing = Math.min(blockSize * 1.4, (width - 40) / totalLetters);
    const totalWidth = totalLetters * spacing;
    const startX = (width - totalWidth) / 2 + spacing / 2;

    let letterIndex = 0;
    const bodies: Matter.Body[] = [];

    LETTERS.forEach((letter) => {
      if (letter === " ") return;

      const x = startX + letterIndex * spacing;
      const y = -50 - Math.random() * 300;

      const body = Matter.Bodies.rectangle(x, y, blockSize, blockSize, {
        chamfer: { radius: cornerRadius },
        restitution: 0.4,
        friction: 0.3,
        frictionAir: 0.01,
        density: 0.002,
        render: {
          fillStyle: getColor(letterIndex),
        },
        label: letter,
      });

      bodies.push(body);
      letterIndex++;
    });

    Matter.Composite.add(engine.world, [...walls, ...bodies]);

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Fix scroll passthrough
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context as CanvasRenderingContext2D;

      bodies.forEach((body) => {
        const { x, y } = body.position;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.font = `bold ${fontSize}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#FFCBDD";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(body.label, 0, 0);
        ctx.restore();
      });
    });

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    setReady(true);
  }, []);

  useEffect(() => {
    setup();

    const handleResize = () => {
      setup();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    };
  }, [setup]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "60vh", minHeight: 400 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          cursor: "grab",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-rose-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
