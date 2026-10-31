"use client";

import { useEffect, useRef } from "react";

export function HeroMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(pointer: fine)").matches;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
      camera.position.set(0, 0.12, 4.4);

      const group = new THREE.Group();
      scene.add(group);

      const solidGeometry = new THREE.IcosahedronGeometry(1.02, 1);
      const solidMaterial = new THREE.MeshStandardMaterial({
        color: 0xe6dccb,
        roughness: 0.46,
        metalness: 0.08,
      });
      const solid = new THREE.Mesh(solidGeometry, solidMaterial);
      group.add(solid);

      const wireGeometry = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.06, 1));
      const wireMaterial = new THREE.LineBasicMaterial({
        color: 0x9a3426,
        transparent: true,
        opacity: 0.9,
      });
      const wire = new THREE.LineSegments(wireGeometry, wireMaterial);
      group.add(wire);

      const ringGeometry = new THREE.TorusGeometry(1.62, 0.012, 12, 96);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xe7a090 });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.35;
      group.add(ring);

      scene.add(new THREE.AmbientLight(0xf3efe7, 0.85));
      const key = new THREE.DirectionalLight(0xfff4e8, 2.6);
      key.position.set(2.6, 3.4, 4.2);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x9a3426, 1.35);
      rim.position.set(-3.5, -1.2, -2);
      scene.add(rim);

      const pointer = { x: 0, y: 0 };
      const onPointer = (event: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
        pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      };
      if (finePointer && !reduce) wrap.addEventListener("pointermove", onPointer);

      const resize = () => {
        const { width, height } = wrap.getBoundingClientRect();
        if (width < 2 || height < 2) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(wrap);
      resize();

      let visible = true;
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? false;
      });
      visibility.observe(wrap);

      const timer = new THREE.Timer();
      timer.connect(document);
      const render = () => {
        timer.update();
        const t = timer.getElapsed();
        if (!reduce) {
          const targetY = t * 0.35 + pointer.x * 0.7;
          const targetX = Math.sin(t * 0.45) * 0.22 - pointer.y * 0.4;
          group.rotation.y += (targetY - group.rotation.y) * 0.08;
          group.rotation.x += (targetX - group.rotation.x) * 0.08;
          ring.rotation.z = t * 0.18;
        }
        renderer.render(scene, camera);
      };

      const loop = () => {
        if (disposed) return;
        frame = window.requestAnimationFrame(loop);
        if (!visible) return;
        render();
      };

      render();
      if (!reduce) loop();

      cleanup = () => {
        window.cancelAnimationFrame(frame);
        observer.disconnect();
        visibility.disconnect();
        wrap.removeEventListener("pointermove", onPointer);
        solidGeometry.dispose();
        solidMaterial.dispose();
        wireGeometry.dispose();
        wireMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        timer.disconnect();
        renderer.dispose();
      };

      if (disposed) cleanup();
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative mb-6 h-[240px] w-full overflow-hidden bg-ink sm:h-[300px] lg:h-[340px]" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <p className="pointer-events-none absolute bottom-4 left-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-mist">
        A study in motion
      </p>
    </div>
  );
}
