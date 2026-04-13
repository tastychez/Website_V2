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

  // Dynamic cursor: default → grab on hover → grabbing while dragging
  let dragging = false;
  Matter.Events.on(mouseConstraint, "startdrag", () => {
    dragging = true;
    canvas.style.cursor = "grabbing";
  });
  Matter.Events.on(mouseConstraint, "enddrag", () => {
    dragging = false;
  });
  Matter.Events.on(engine, "afterUpdate", () => {
    if (dragging) return;
    const hovering = Matter.Query.point(bodies, mouse.position).length > 0;
    canvas.style.cursor = hovering ? "grab" : "default";
  });

  // "move us!" bubble attached to a specific block
  let bubbleBody: Matter.Body | null = null;
  let bubbleOpacity = 0;
  let bubbleFadeStart = 0;
  const BUBBLE_VISIBLE = 3500;
  const BUBBLE_FADE = 600;

  Matter.Events.on(mouseConstraint, "startdrag", () => {
    bubbleOpacity = 0;
  });

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

    if (bubbleBody && bubbleOpacity > 0) {
      if (bubbleFadeStart > 0) {
        const elapsed = Date.now() - bubbleFadeStart;
        bubbleOpacity = Math.max(0, 1 - elapsed / BUBBLE_FADE);
      }

      const bx = bubbleBody.position.x;
      const by = bubbleBody.position.y - blockSize - 18;
      const text = "move us!";
      const pad = 14;
      const bubbleFontSize = Math.round(blockSize * 0.42);

      ctx.save();
      ctx.globalAlpha = bubbleOpacity;
      ctx.font = `bold ${bubbleFontSize}px 'Nunito', sans-serif`;
      const tw = ctx.measureText(text).width;
      const bw = tw + pad * 2;
      const bh = bubbleFontSize + pad;
      const r = 10;
      const left = bx - bw / 2;
      const top = by - bh / 2;

      ctx.fillStyle = "#3E000C";
      ctx.beginPath();
      ctx.moveTo(left + r, top);
      ctx.lineTo(left + bw - r, top);
      ctx.quadraticCurveTo(left + bw, top, left + bw, top + r);
      ctx.lineTo(left + bw, top + bh - r);
      ctx.quadraticCurveTo(left + bw, top + bh, left + bw - r, top + bh);
      ctx.lineTo(bx + 6, top + bh);
      ctx.lineTo(bx, top + bh + 8);
      ctx.lineTo(bx - 6, top + bh);
      ctx.lineTo(left + r, top + bh);
      ctx.quadraticCurveTo(left, top + bh, left, top + bh - r);
      ctx.lineTo(left, top + r);
      ctx.quadraticCurveTo(left, top, left + r, top);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#FFCBDD";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, bx, by);
      ctx.restore();
    }
  });

  const runner = Matter.Runner.create();

  Matter.Render.run(render);
  Matter.Runner.run(runner, engine);

  // Wave bounce once all blocks have settled from the initial drop
  let waveTriggered = false;
  const STAGGER = 80;
  const force = height * 0.00035;

  Matter.Events.on(engine, "afterUpdate", () => {
    if (waveTriggered) return;
    const allSettled = bodies.every((b) => {
      const speed = Matter.Body.getSpeed(b);
      return speed < 0.3 && b.position.y > 0;
    });
    if (!allSettled) return;
    waveTriggered = true;

    const lastIndex = bodies.length - 1;
    bubbleBody = bodies[lastIndex];
    bubbleOpacity = 1;

    bodies.forEach((body, i) => {
      setTimeout(() => {
        Matter.Body.applyForce(body, body.position, { x: 0, y: -force });
      }, i * STAGGER);
    });

    const waveEnd = lastIndex * STAGGER;
    setTimeout(() => { bubbleFadeStart = Date.now(); }, waveEnd + BUBBLE_VISIBLE);
  });

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
          cursor: "default",
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
