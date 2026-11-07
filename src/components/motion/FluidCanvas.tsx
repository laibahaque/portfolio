"use client";

import { useEffect, useRef } from "react";
import { fluidFragmentShader, fluidVertexShader } from "@/lib/motion/fluidShader";
import { shouldUseFluidCanvas } from "@/lib/motion/preferences";

export function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!shouldUseFluidCanvas()) return;

    let raf = 0;
    let disposed = false;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const start = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

      const uniforms = {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uClick: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
        uClickPulse: { value: 0 },
        uHover: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: fluidVertexShader,
        fragmentShader: fluidFragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));

      const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(w, h);
      };
      resize();
      window.addEventListener("resize", resize);

      let hoverStrength = 0;
      const onMove = (event: MouseEvent) => {
        uniforms.uMouse.value.set(event.clientX, window.innerHeight - event.clientY);
        const targets = document.querySelectorAll<HTMLElement>("[data-fluid-target]");
        let nextHover = 0;
        targets.forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          ) {
            nextHover = 1;
          }
        });
        hoverStrength += (nextHover - hoverStrength) * 0.12;
        uniforms.uHover.value = hoverStrength;
      };

      let pulseDecay = 0;
      const onClick = (event: MouseEvent) => {
        uniforms.uClick.value.set(event.clientX, window.innerHeight - event.clientY);
        pulseDecay = 1;
        uniforms.uClickPulse.value = 1;
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("click", onClick, { passive: true });

      const tick = (time: number) => {
        if (disposed) return;
        uniforms.uTime.value = time * 0.001;
        if (pulseDecay > 0) {
          pulseDecay = Math.max(0, pulseDecay - 0.035);
          uniforms.uClickPulse.value = pulseDecay;
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("click", onClick);
        cancelAnimationFrame(raf);
        material.dispose();
        geometry.dispose();
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    void start().then((fn) => {
      cleanup = fn;
      if (disposed) cleanup?.();
    });

    const onDowngrade = () => {
      if (!shouldUseFluidCanvas()) {
        disposed = true;
        cleanup?.();
        canvas.style.display = "none";
      }
    };
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    mq.addEventListener("change", onDowngrade);

    return () => {
      disposed = true;
      cleanup?.();
      mq.removeEventListener("change", onDowngrade);
    };
  }, []);

  if (typeof window !== "undefined" && !shouldUseFluidCanvas()) return null;

  return (
    <canvas
      ref={canvasRef}
      className="motion-canvas pointer-events-none fixed inset-0 z-[25]"
      aria-hidden="true"
    />
  );
}
