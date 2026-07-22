"use client";

import * as React from "react";
import * as THREE from "three";

import {
  energyFieldFragmentShader,
  energyFieldVertexShader,
  glowFragmentShader,
  particleVertexShader,
  particleFragmentShader,
} from "./shaders";

function createParticleSystem() {
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const randoms = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.5 + Math.random() * 2.5;
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = (Math.random() - 0.5) * 3;
    positions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 1;
    sizes[i] = 2 + Math.random() * 6;
    randoms[i] = Math.random();
    const t = Math.random();
    colors[i3] = 0.5 + t * 0.3;
    colors[i3 + 1] = 0.6 + t * 0.3;
    colors[i3 + 2] = 0.9 + t * 0.1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uScale: { value: 1 },
    },
  });

  return new THREE.Points(geometry, material);
}

export default function HeroCanvas({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 10);
    camera.position.set(0, 0, 2.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const energyMat = new THREE.ShaderMaterial({
      vertexShader: energyFieldVertexShader,
      fragmentShader: energyFieldFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uMouse: { value: [0.5, 0.5] },
        uScroll: { value: 0 },
      },
    });
    const energyMesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 3), energyMat);
    scene.add(energyMesh);

    const glowMat = new THREE.ShaderMaterial({
      vertexShader: energyFieldVertexShader,
      fragmentShader: glowFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
      },
    });
    const glowMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), glowMat);
    glowMesh.position.set(0, 0, -0.5);
    glowMesh.scale.set(2.5, 2, 1);
    scene.add(glowMesh);

    const particles = createParticleSystem();
    scene.add(particles);

    let running = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!running) return;
      const elapsed = clock.getElapsedTime();
      energyMat.uniforms.uTime.value = elapsed;
      energyMat.uniforms.uMouse.value = [mouse.current.x, mouse.current.y];
      glowMat.uniforms.uTime.value = elapsed;
      glowMat.uniforms.uMouse.value = [mouse.current.x, mouse.current.y];
      (particles.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      energyMat.uniforms.uResolution.value = [w, h];
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      particles.geometry.dispose();
      (particles.material as THREE.ShaderMaterial).dispose();
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0" />;
}
