import * as THREE from
  "https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js";

/* Pantone-inspired colour bank. References are approximate visual anchors. */
const COLOUR_BANK = [
  { name: "Sky Blue", pantone: "2985 C", hex: "#5BC2E7", family: "blue", intensity: "medium", compatibleWith: ["Mint", "Lavender", "Warm Cream", "Periwinkle", "Pale Aqua"] },
  { name: "Powder Blue", pantone: "2905 C", hex: "#8ACCE5", family: "blue", intensity: "pale", compatibleWith: ["Mint", "Pale Lilac", "Warm Grey", "Soft Peach"] },
  { name: "Electric Cyan", pantone: "306 C", hex: "#00B5E2", family: "blue", intensity: "strong", compatibleWith: ["Mint", "Warm Cream", "Pale Aqua", "Coral"] },
  { name: "Clean Blue", pantone: "3005 C", hex: "#0077C8", family: "blue", intensity: "strong", compatibleWith: ["Sky Blue", "Mint", "Warm Cream", "Pale Lilac"] },
  { name: "Royal Blue", pantone: "2728 C", hex: "#0047BB", family: "blue", intensity: "strong", compatibleWith: ["Powder Blue", "Pale Lilac", "Warm Grey", "Soft Peach"] },
  { name: "Periwinkle", pantone: "2705 C", hex: "#A7A4E0", family: "violet", intensity: "medium", compatibleWith: ["Sky Blue", "Mint", "Warm Cream", "Soft Peach"] },
  { name: "Lavender", pantone: "2645 C", hex: "#AD96DC", family: "violet", intensity: "medium", compatibleWith: ["Sky Blue", "Mint", "Pale Yellow", "Blue Grey"] },
  { name: "Soft Violet", pantone: "2655 C", hex: "#9678D3", family: "violet", intensity: "strong", compatibleWith: ["Royal Blue", "Mint", "Warm Cream", "Powder Pink"] },
  { name: "Mauve", pantone: "2577 C", hex: "#A77BCA", family: "violet", intensity: "medium", compatibleWith: ["Sky Blue", "Soft Mint", "Soft Peach", "Warm Grey"] },
  { name: "Pale Lilac", pantone: "7443 C", hex: "#DDDAE8", family: "violet", intensity: "pale", compatibleWith: ["Royal Blue", "Mint", "Soft Peach", "Silver Grey"] },
  { name: "Aqua", pantone: "3255 C", hex: "#2CD5C4", family: "aqua", intensity: "strong", compatibleWith: ["Sky Blue", "Warm Cream", "Coral", "Pale Lilac"] },
  { name: "Pale Aqua", pantone: "3245 C", hex: "#7CE0D3", family: "aqua", intensity: "pale", compatibleWith: ["Powder Blue", "Mint", "Warm Grey", "Soft Peach"] },
  { name: "Mint", pantone: "3385 C", hex: "#47D7AC", family: "green", intensity: "medium", compatibleWith: ["Sky Blue", "Lavender", "Warm Cream", "Coral", "Pale Aqua"] },
  { name: "Soft Mint", pantone: "3375 C", hex: "#7AE1BF", family: "green", intensity: "pale", compatibleWith: ["Powder Blue", "Mauve", "Warm Cream", "Blue Grey"] },
  { name: "Fresh Green", pantone: "346 C", hex: "#71CC98", family: "green", intensity: "medium", compatibleWith: ["Sky Blue", "Lavender", "Warm Cream", "Dusty Peach"] },
  { name: "Grass Green", pantone: "360 C", hex: "#6CC24A", family: "green", intensity: "strong", compatibleWith: ["Electric Cyan", "Soft Violet", "Warm Cream", "Powder Pink"] },
  { name: "Moss", pantone: "5777 C", hex: "#A2A569", family: "green", intensity: "medium", compatibleWith: ["Royal Blue", "Mauve", "Warm Sand", "Dusty Peach"] },
  { name: "Warm Cream", pantone: "7499 C", hex: "#F1E6B2", family: "warm", intensity: "pale", compatibleWith: ["Sky Blue", "Mint", "Royal Blue", "Coral", "Warm Grey"] },
  { name: "Soft Butter", pantone: "7401 C", hex: "#F5E1A4", family: "warm", intensity: "pale", compatibleWith: ["Electric Cyan", "Fresh Green", "Lavender", "Blue Grey"] },
  { name: "Pale Yellow", pantone: "1205 C", hex: "#F8E08E", family: "warm", intensity: "pale", compatibleWith: ["Sky Blue", "Lavender", "Aqua", "Warm Grey"] },
  { name: "Soft Peach", pantone: "1625 C", hex: "#FF9D8A", family: "warm", intensity: "medium", compatibleWith: ["Royal Blue", "Lavender", "Moss", "Blue Grey"] },
  { name: "Coral", pantone: "170 C", hex: "#FF8674", family: "warm", intensity: "strong", compatibleWith: ["Sky Blue", "Mint", "Aqua", "Pale Lilac"] },
  { name: "Soft Pink", pantone: "1775 C", hex: "#FF8DA1", family: "warm", intensity: "medium", compatibleWith: ["Clean Blue", "Soft Violet", "Fresh Green", "Warm Grey"] },
  { name: "Powder Pink", pantone: "699 C", hex: "#F3C7D4", family: "warm", intensity: "pale", compatibleWith: ["Royal Blue", "Soft Violet", "Grass Green", "Silver Grey"] },
  { name: "Dusty Peach", pantone: "7520 C", hex: "#EABEB0", family: "warm", intensity: "pale", compatibleWith: ["Mauve", "Fresh Green", "Moss", "Blue Grey"] },
  { name: "Warm Sand", pantone: "468 C", hex: "#DDCBA4", family: "neutral", intensity: "pale", compatibleWith: ["Moss", "Royal Blue", "Soft Violet", "Coral"] },
  { name: "Warm Grey", pantone: "7527 C", hex: "#D6D2C4", family: "neutral", intensity: "pale", compatibleWith: ["Sky Blue", "Mauve", "Soft Pink", "Fresh Green"] },
  { name: "Silver Grey", pantone: "Cool Gray 2 C", hex: "#D0D0CE", family: "neutral", intensity: "pale", compatibleWith: ["Royal Blue", "Pale Lilac", "Powder Pink", "Aqua"] },
  { name: "Blue Grey", pantone: "7541 C", hex: "#D9E1E2", family: "neutral", intensity: "pale", compatibleWith: ["Lavender", "Soft Mint", "Soft Peach", "Dusty Peach"] }
];

const INITIAL_NAMES = ["Sky Blue", "Mint", "Lavender", "Warm Cream"];
const COLOUR_INTERVAL = 5 * 60 * 1000;
const TRANSITION_DURATION = 90 * 1000;
const TRANSITION_SPEED = 0.005;
const DEFAULT_PALETTE = ["#F7F9FC", "#C7D7EE", "#4E6FDA", "#E3E5E8"];

const canvas = document.getElementById("gradient-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(innerWidth, innerHeight) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uColorA: { value: new THREE.Color(DEFAULT_PALETTE[0]) },
    uColorB: { value: new THREE.Color(DEFAULT_PALETTE[1]) },
    uColorC: { value: new THREE.Color(DEFAULT_PALETTE[2]) },
    uColorD: { value: new THREE.Color(DEFAULT_PALETTE[3]) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorD;
    varying vec2 vUv;

    float organic(vec2 point, vec2 direction, float scale, float speed) {
      return sin(dot(point, direction) * scale
        + sin(point.yx * scale * 0.6).x
        + uTime * speed);
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 point = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);
      vec2 mouse = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5);
      float mouseDistance = distance(point, mouse);
      float mouseField = exp(-mouseDistance * 2.3);
      vec2 flow = normalize(vec2(0.8, 0.6));
      vec2 warped = point + flow * uTime * 0.025;
      warped += (mouse - point) * mouseField * 0.12;
      warped += vec2(
        organic(point, vec2(0.8, 0.6), 2.2, 0.025),
        organic(point, vec2(-0.6, 0.9), 2.0, 0.02)
      ) * 0.05;

      float first = organic(warped, vec2(0.8, 0.6), 2.2, 0.035);
      float second = organic(warped * 1.12, vec2(-0.6, 0.8), 2.8, 0.028);
      float third = organic(warped * 0.82, vec2(0.4, -0.9), 1.8, 0.021);
      float blendA = smoothstep(-0.7, 0.8, first * 0.7 + second * 0.3);
      float blendB = smoothstep(-0.6, 0.8, second * 0.65 + third * 0.35);
      float blendC = smoothstep(-0.8, 0.85, third * 0.7 + first * 0.3);
      vec3 colour = mix(uColorA, uColorB, mix(blendA, blendB, 0.46));
      colour = mix(colour, uColorC, blendC * 0.52);
      colour = mix(colour, uColorD, smoothstep(0.35, 0.9, blendA) * 0.45);

      colour = mix(colour, mix(colour, uColorD, 0.32), mouseField * 0.18);
      gl_FragColor = vec4(colour, 1.0);
    }
  `
});

scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
const targetMouse = new THREE.Vector2(0.5, 0.5);
const activePalette = INITIAL_NAMES.map(name => COLOUR_BANK.find(colour => colour.name === name));
const targetPalette = activePalette.map(colour => new THREE.Color(colour.hex));
let transition = null;
let lastColourChange = performance.now();

function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(Math.max(value, minimum), maximum);
}

function getCompatibleColours() {
  const activeNames = activePalette.map(colour => colour.name);
  return COLOUR_BANK.filter(candidate => {
    if (activeNames.includes(candidate.name)) return false;
    return activePalette.some(colour => colour.compatibleWith.includes(candidate.name));
  });
}

function scoreColourCombination(candidate) {
  const compatibility = activePalette.reduce((score, colour) => (
    score + (colour.compatibleWith.includes(candidate.name) ? 3 : 0)
      + (candidate.compatibleWith.includes(colour.name) ? 2 : 0)
  ), 0);
  const intensityBalance = candidate.intensity === "pale"
    ? 2
    : activePalette.filter(colour => colour.intensity === "strong").length === 0 && candidate.intensity === "strong"
      ? 1
      : 0;
  return compatibility + intensityBalance;
}

function selectNextColour() {
  const candidates = getCompatibleColours();
  if (!candidates.length) return null;
  return candidates.sort((a, b) => scoreColourCombination(b) - scoreColourCombination(a))[0];
}

function startColourTransition() {
  const slot = Math.floor(Math.random() * activePalette.length);
  const replacement = selectNextColour();
  if (!replacement) return;
  transition = {
    slot,
    replacement,
    startedAt: performance.now(),
    from: new THREE.Color(activePalette[slot].hex),
    to: new THREE.Color(replacement.hex)
  };
}

function updateColourTransition(now) {
  if (transition) {
    const progress = clamp((now - transition.startedAt) / TRANSITION_DURATION);
    targetPalette[transition.slot].copy(transition.from).lerp(transition.to, progress);
    if (progress >= 1) {
      activePalette[transition.slot] = transition.replacement;
      transition = null;
      lastColourChange = now;
    }
  }
  else if (!reducedMotion && now - lastColourChange >= COLOUR_INTERVAL) {
    startColourTransition();
  }
}

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  material.uniforms.uResolution.value.set(innerWidth, innerHeight);
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", event => {
  targetMouse.set(event.clientX / innerWidth, 1 - event.clientY / innerHeight);
});
resize();

const clock = new THREE.Clock();
let animationFrame = null;
function animate(now = performance.now()) {
  if (document.hidden) {
    animationFrame = null;
    return;
  }
  animationFrame = requestAnimationFrame(animate);
  updateColourTransition(now);
  const uniforms = material.uniforms;
  uniforms.uTime.value = reducedMotion ? 0 : clock.getElapsedTime();
  uniforms.uMouse.value.lerp(targetMouse, reducedMotion ? 0.08 : 0.025);
  ["uColorA", "uColorB", "uColorC", "uColorD"].forEach((key, index) => {
    uniforms[key].value.lerp(targetPalette[index], TRANSITION_SPEED);
  });
  renderer.render(scene, camera);
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && animationFrame === null) {
    clock.start();
    animate();
  }
});

animate();
