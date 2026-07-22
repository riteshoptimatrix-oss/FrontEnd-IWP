"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { particleVertexShader, particleFragmentShader } from "./shaders";

const PARTICLE_COUNT = 2000;

function createParticleGeometry() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const randoms = new Float32Array(PARTICLE_COUNT);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
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

  return geometry;
}

export function ParticleSystem({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = React.useRef<THREE.Points>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial>(null);
  const [geometry] = React.useState(() => createParticleGeometry());

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uScale: { value: 1 },
        }}
      />
    </points>
  );
}
