export const energyFieldVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const energyFieldFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  varying vec2 vUv;
  varying vec3 vPosition;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * smoothNoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.15;

    vec2 p = uv * 3.0;
    float noise1 = fbm(p + time * 0.3);
    float noise2 = fbm(p * 2.0 - time * 0.2);

    vec3 color1 = vec3(0.85, 0.92, 1.0);
    vec3 color2 = vec3(0.6, 0.75, 1.0);
    vec3 color3 = vec3(0.4, 0.5, 0.9);

    float mix1 = smoothNoise(uv * 1.5 + time * 0.1);
    float mix2 = smoothNoise(uv * 2.0 - time * 0.08);

    vec3 color = mix(color1, color2, mix1);
    color = mix(color, color3, mix2 * 0.4);

    float alpha = 0.15 + 0.35 * (1.0 - abs(uv.y - 0.5) * 1.2);
    alpha *= 0.6 + 0.4 * (0.5 + 0.5 * sin(uv.x * 4.0 + time));

    gl_FragColor = vec4(color, alpha);
  }
`;

export const glowFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float dist = distance(uv, vec2(0.5));
    float glow = 1.0 - smoothstep(0.0, 0.8, dist);
    glow *= glow;

    float pulse = 0.6 + 0.4 * sin(uTime * 0.5 + dist * 3.0);
    float mouseInfluence = 0.8 + 0.2 * (1.0 - distance(uv, uMouse * 0.5 + 0.5));

    vec3 color = mix(
      vec3(0.4, 0.6, 1.0),
      vec3(0.6, 0.8, 1.0),
      pulse
    );

    float alpha = glow * 0.3 * pulse * mouseInfluence;
    gl_FragColor = vec4(color, alpha);
  }
`;

export const particleVertexShader = `
  attribute float aSize;
  attribute float aRandom;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uScale;

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;
    float t = uTime * 0.2 + aRandom * 6.28;
    pos.x += sin(t + position.y * 0.5) * 0.3;
    pos.y += cos(t * 0.7 + position.x * 0.3) * 0.2;
    pos.z += sin(t * 0.5 + position.x * 0.4) * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uScale * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * sin(t * 2.0 + aRandom * 10.0));
    vColor = aColor;
  }
`;

export const particleFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, dist);
    alpha *= vAlpha;
    gl_FragColor = vec4(vColor, alpha * 0.6);
  }
`;
