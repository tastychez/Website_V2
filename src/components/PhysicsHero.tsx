"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const LETTERS = "HONG YI ZHANG".split("");

const PALETTE = ["#3E000C", "#FB4B4E", "#7C0B2B", "#D10000", "#3E000C"];

function getColor(index: number) {
  return PALETTE[index % PALETTE.length];
}

interface PhysicsState {
  engine: Matter.Engine;
  render: Matter.Render;
  runner: Matter.Runner;
  mouse: any;
}

function teardown(state: PhysicsState | null) {
  if (!state) return;
  const { engine, render, runner, mouse } = state;

  Matter.Render.stop(render);
  Matter.Runner.stop(runner);
  Matter.Engine.clear(engine);

  const el = mouse.element as HTMLElement;
  el.removeEventListener("mousemove", mouse.mousemove);
  el.removeEventListener("mousedown", mouse.mousedown);
  el.removeEventListener("mouseup", mouse.mouseup);
  el.removeEventListener("wheel", mouse.mousewheel);
  el.removeEventListener("touchmove", mouse.mousemove);
  el.removeEventListener("touchstart", mouse.mousedown);
  el.removeEventListener("touchend", mouse.mouseup);
}

function createScene(
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
): PhysicsState {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const engine = Matter.Engine.create({
    gravity: { x: 0, y: 1.2, scale: 0.001 },
  });

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

  const wallThickness = 60;
  const walls = [
    Matter.Bodies.rectangle(
      width / 2, height + wallThickness / 2, width + 200, wallThickness,
      { isStatic: true, render: { visible: false } },
    ),
    Matter.Bodies.rectangle(
      -wallThickness / 2, height / 2, wallThickness, height * 2,
      { isStatic: true, render: { visible: false } },
    ),
    Matter.Bodies.rectangle(
      width + wallThickness / 2, height / 2, wallThickness, height * 2,
      { isStatic: true, render: { visible: false } },
    ),
  ];

  const blockSize = Math.min(Math.max(width / 16, 36), 64);
  const fontSize = blockSize * 0.6;
  const cornerRadius = 8;

  const spaceCount = LETTERS.filter((l) => l === " ").length;
  const totalLetters = LETTERS.filter((l) => l !== " ").length;
  const spaceGap = blockSize * 0.6;
  const spacing = Math.min(
    blockSize * 1.4,
    (width - 40 - spaceCount * spaceGap) / totalLetters,
  );
  const totalWidth = totalLetters * spacing + spaceCount * spaceGap;
  const startX = (width - totalWidth) / 2 + spacing / 2;

  let cursorX = startX;
  let colorIndex = 0;
  const bodies: Matter.Body[] = [];

  LETTERS.forEach((letter) => {
    if (letter === " ") {
      cursorX += spaceGap;
      return;
    }

    const body = Matter.Bodies.rectangle(
      cursorX,
      -50 - Math.random() * 300,
      blockSize,
      blockSize,
      {
        chamfer: { radius: cornerRadius },
        restitution: 0.4,
        friction: 0.3,
        frictionAir: 0.01,
        density: 0.002,
        render: { fillStyle: getColor(colorIndex) },
        label: letter,
      },
    );

    bodies.push(body);
    cursorX += spacing;
    colorIndex++;
  });

  Matter.Composite.add(engine.world, [...walls, ...bodies]);

  const mouse = Matter.Mouse.create(render.canvas);
  // Fix Matter.js parseInt() truncation of fractional devicePixelRatio (e.g. Chrome zoom)
  (mouse as any).pixelRatio = window.devicePixelRatio || 1;
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } },
  });

  // Remove wheel + touch handlers that call preventDefault() and block scrolling.
  // Mouse click/move handlers stay so blocks remain draggable on desktop.
  const el = mouse.element as HTMLElement;
  el.removeEventListener("wheel", (mouse as any).mousewheel);
  el.removeEventListener("touchmove", (mouse as any).mousemove);
  el.removeEventListener("touchstart", (mouse as any).mousedown);
  el.removeEventListener("touchend", (mouse as any).mouseup);

  Matter.Composite.add(engine.world, mouseConstraint);

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

  Matter.Render.run(render);
  Matter.Runner.run(runner, engine);

  return { engine, render, runner, mouse };
}

export default function PhysicsHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<PhysicsState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    teardown(stateRef.current);
    stateRef.current = createScene(canvas, container);
    setReady(true);

    const handleResize = () => {
      teardown(stateRef.current);
      stateRef.current = createScene(canvas, container);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      teardown(stateRef.current);
      stateRef.current = null;
    };
  }, []);

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
          touchAction: "auto",
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
