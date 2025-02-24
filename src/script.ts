import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import {
  warehouseModel,
  robotModel1,
  robotModel2,
  robotModel3,
  forkliftModel1,
  forkliftModel2,
} from "./GLTFLoader";
import { line1, line2, line3, line4, line5 } from "./LineAnimation";
import { handleCollisions } from "./Utils";
import { Model3D } from "./Model3DClass";
import maplibregl from "maplibre-gl";

// Initialize the map
const map = new maplibregl.Map({
  container: "map", // ID of the HTML div
  style: "https://demotiles.maplibre.org/style.json", // Open-source map style
  center: [0, 0], // Longitude, Latitude
  zoom: 16, // Zoom level
  pitch: 60, // Tilt to make it feel 3D
  bearing: 0,
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

map.on("render", () => {
  const { lng, lat } = map.getCenter();
  const altitude = 50; // Adjust altitude to fit the scene

  // Convert MapLibre lat/lon to Three.js world coordinates
  const mercator = maplibregl.MercatorCoordinate.fromLngLat(
    { lng, lat },
    altitude
  );
  camera.position.set(mercator.x, mercator.y, altitude);
  camera.lookAt(mercator.x, mercator.y, 0); // Look at the ground

  renderer.render(scene, camera);
});

// Function to check and add models once they are loaded
const checkAndAddModels = () => {
  if (warehouseModel?.model) {
    scene.add(warehouseModel.model);
  }

  if (robotModel1?.model) {
    scene.add(robotModel1!.model);
  }

  if (robotModel2?.model) {
    scene.add(robotModel2.model);
  }

  if (robotModel3?.model) {
    scene.add(robotModel3!.model);
  }

  if (forkliftModel1?.model) {
    scene.add(forkliftModel1!.model);
  }

  if (forkliftModel2?.model) {
    scene.add(forkliftModel2!.model);
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
let rows: number;
let columns: number;
const cellSize: number = 5;
const waitForModels = setInterval(() => {
  checkAndAddModels();

  if (
    warehouseModel?.model &&
    robotModel1?.model &&
    robotModel2?.model &&
    robotModel3?.model &&
    forkliftModel1?.model &&
    forkliftModel2?.model &&
    line1 &&
    line2 &&
    line3 &&
    line4 &&
    line5
  ) {
    clearInterval(waitForModels);
    startAnimationLoop();

    // Calculating Rows & Columns Based On Warehouse Floor
    const size = new THREE.Vector3();
    warehouseModel?.boundingBox.getSize(size);
    rows = Math.floor(size.x / cellSize) + 1;
    columns = Math.floor(size.z / cellSize) + 1;
    console.log(rows, columns);
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
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.set(45, 15, 45);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
scene.add(directionalLight);

// // Point Light
const pointLight1 = new THREE.PointLight("red", 400, 0);
pointLight1.position.set(0, 7, 17.25);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight("red", 400, 0);
pointLight2.position.set(0, 7, 0);
pointLight2.castShadow = true;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("red", 400, 0);
pointLight3.position.set(0, 7, -17.25);
pointLight3.castShadow = true;
scene.add(pointLight3);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 10.5, 30);

// Controls
const controls = new OrbitControls(camera, canvas!);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // Enable transparency
  antialias: true,
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
document.getElementById("map")!.appendChild(renderer.domElement);
renderer.render(scene, camera);

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
  // Update controls
  controls.update();

  const delta = clock.getDelta();

  // Compute the bounding boxes of all the models
  robotModel1!.boundingBox = new THREE.Box3().setFromObject(robotModel1!.model);
  robotModel2!.boundingBox = new THREE.Box3().setFromObject(robotModel2!.model);
  robotModel3!.boundingBox = new THREE.Box3().setFromObject(robotModel3!.model);
  forkliftModel1!.boundingBox = new THREE.Box3().setFromObject(
    forkliftModel1!.model
  );
  forkliftModel2!.boundingBox = new THREE.Box3().setFromObject(
    forkliftModel2!.model
  );

  // Calls the Function for Collision Detection
  const modelsArray: Model3D[] = [
    robotModel1!,
    robotModel2!,
    robotModel3!,
    forkliftModel1!,
    forkliftModel2!,
  ];

  handleCollisions(modelsArray, cellSize);

  // Update animation mixer (if available)
  if (robotModel1!.mixer) {
    robotModel1!.mixer.update(delta);
  }

  if (robotModel2!.mixer) {
    robotModel2!.mixer.update(delta);
  }

  if (robotModel3!.mixer) {
    robotModel3!.mixer.update(delta);
  }

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

function startAnimationLoop() {
  tick();
}

// Viewport Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});
