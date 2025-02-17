import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

// Animation Mixer
let mixer: THREE.AnimationMixer;

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

// Add a directional light (acts like sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 15); // Color: White, Intensity: 4
directionalLight.position.set(0, 5, 0); // Position above the scene
scene.add(directionalLight);

// Add a point light (acts like a lamp)
const pointLight = new THREE.PointLight("red", 200, 0); // Color: White, Intensity: 10, Distance: 50
pointLight.position.set(0, -2.25, 0); // Adjust position as needed
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointLightHelper);

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "blue" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-8, -2, 23);
// scene.add(mesh);

// Geometry Animation
const timeline = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 2.5,
});

// if (mesh) {
//   timeline
//     .to(mesh.position, { z: 0, duration: 4, ease: "power2.inOut" })
//     .to(mesh.position, { x: 0, duration: 2, ease: "power2.inOut" })
//     .to(mesh.position, { z: -23, duration: 4, ease: "power2.inOut" })
//     .to(mesh.position, { x: 8, duration: 2, ease: "power2.inOut" });
// }

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.set(0, 10, 10);

// Controls
const controls = new OrbitControls(camera, canvas!);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.render(scene, camera);

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
  // Update controls
  controls.update();

  // Update animation mixer (if available)
  if (mixer) {
    const delta = clock.getDelta(); // Get time elapsed since last frame
    mixer.update(delta); // Update animation
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

// 3D Model Loader
const loader = new GLTFLoader();

// Warehouse Model Loading
loader.load(
  "/src/assets/warehouse/scene.gltf",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Compute the bounding box
    const boundingBox = new THREE.Box3().setFromObject(model);

    // Get size (width, height, depth)
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    // console.log(`Width: ${size.x}, Height: ${size.y}, Depth: ${size.z}`);

    // Get center position
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    // console.log(`Center: (${center.x}, ${center.y}, ${center.z})`);

    // Reposition the model so that it's centered at (0, 0, 0)
    model.position.sub(center);

    // Move the model slightly above the ground
    // model.position.y += size.y / 2;

    // Adjust camera position to fit model
    camera.position.set(0, 8, 30);
    // camera.lookAt(0, 0, 0);
  },
  (xhr) => {
    console.log(`Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`);
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);

// Robot Model Loading
loader.load(
  "/src/assets/robot/scene.gltf",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Initialize Animation Mixer
    mixer = new THREE.AnimationMixer(model);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play(); // Start playing the animation
    });
    console.log(gltf);
    model.position.set(-7, -2, 22);
    model.scale.set(0.06, 0.06, 0.06);

    if (model) {
      timeline
        .to(model.position, { z: 0, duration: 10, ease: "power2.inOut" })
        .to(model.rotation, {
          y: Math.PI / 2,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(model.position, { x: 0, duration: 5, ease: "power2.inOut" })
        .to(model.rotation, {
          y: Math.PI,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(model.position, { z: -22, duration: 10, ease: "power2.inOut" })
        .to(model.rotation, {
          y: Math.PI / 2,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(model.position, { x: 7, duration: 5, ease: "power2.inOut" });
    }
  },
  (xhr) => {
    console.log(`Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`);
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);
