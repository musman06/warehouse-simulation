import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import {
  warehouseModel,
  robotModel1,
  robotModel2,
  robotModel3,
  forkliftModel1,
  forkliftModel2,
  mixer1,
  mixer2,
  mixer3,
} from "./gltfLoader";
import { line1, line2, line3, line4, line5 } from "./lineAnimation";

// Function to check and add models once they are loaded
const checkAndAddModels = () => {
  if (warehouseModel) {
    scene.add(warehouseModel);
  }

  if (robotModel1) {
    scene.add(robotModel1);
  }

  if (robotModel2) {
    scene.add(robotModel2);
  }

  if (robotModel3) {
    scene.add(robotModel3);
  }

  if (forkliftModel1) {
    scene.add(forkliftModel1);
  }

  if (forkliftModel2) {
    scene.add(forkliftModel2);
  }

  if (line1) {
    scene.add(line1);
  }
  if (line2) {
    scene.add(line2);
  }

  if (line3) {
    scene.add(line3);
  }

  if (line4) {
    scene.add(line4);
  }

  if (line5) {
    scene.add(line5);
  }
};

// Keep checking every 0.5s until models are available
const waitForModels = setInterval(() => {
  checkAndAddModels();

  if (
    warehouseModel &&
    robotModel1 &&
    robotModel2 &&
    robotModel3 &&
    forkliftModel1 &&
    forkliftModel2 &&
    line1 &&
    line2 &&
    line3 &&
    line4 &&
    line5
  ) {
    clearInterval(waitForModels);
  }
}, 500);

// Viewport Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();

// Lights
// // AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

// // Directional Light
const directionalLight = new THREE.DirectionalLight("white", 12);
directionalLight.position.set(15, 12, 30);
directionalLight.castShadow = true;
scene.add(directionalLight);

// // Point Light
const pointLight1 = new THREE.PointLight("red", 100, 0);
pointLight1.position.set(0, 7, 17.25);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight("red", 400, 0);
pointLight2.position.set(0, 7, 0);
pointLight2.castShadow = true;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("red", 100, 0);
pointLight3.position.set(0, 7, -17.25);
pointLight3.castShadow = true;
scene.add(pointLight3);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.set(0, 10.5, 30);

// Controls
const controls = new OrbitControls(camera, canvas!);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.shadowMap.enabled = true;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.render(scene, camera);

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
  // Update controls
  controls.update();

  // Update animation mixer (if available)
  if (mixer1) {
    const delta = clock.getDelta();
    mixer1.update(delta);
  }

  if (mixer2) {
    const delta = clock.getDelta();
    mixer2.update(delta);
  }

  if (mixer3) {
    const delta = clock.getDelta();
    mixer3.update(delta);
  }

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

// Viewport Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});
