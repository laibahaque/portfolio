export const fluidVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fluidFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uClick;
  uniform float uTime;
  uniform float uClickPulse;
  uniform float uHover;

  varying vec2 vUv;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 mouse = uMouse / uResolution;

    float pointer = distance(uv, mouse);
    float hoverWave = sin(pointer * 42.0 - uTime * 1.6) * 0.018 * uHover;
    hoverWave *= smoothstep(0.35, 0.0, pointer);

    float clickDist = distance(uv, uClick);
    float ripple = sin(clickDist * 55.0 - uTime * 6.0) * uClickPulse;
    ripple *= exp(-clickDist * 3.5);

    float energy = abs(hoverWave) + abs(ripple) * 0.85;
    vec3 tint = vec3(0.58, 0.2, 0.16);
    gl_FragColor = vec4(tint, energy * 0.42);
  }
`;
