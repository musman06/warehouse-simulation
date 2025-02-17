import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

// Animation Mixer
let mixer: THREE.AnimationMixer;

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const robotTexture = textureLoader.load(
  "/assets/robot/textures/lambert6_diffuse.jpeg"
);

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
const directionalLight = new THREE.DirectionalLight("white", 12);
directionalLight.position.set(0, 7.5, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Add a point light (acts like a lamp)
const pointLight = new THREE.PointLight("red", 200, 0);
pointLight.position.set(0, 4, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
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
    model.castShadow = true;
    model.receiveShadow = true;
    scene.add(model);
    console.log("Model: ", model);

    // Compute the bounding box
    const boundingBox = new THREE.Box3().setFromObject(model);
    // console.log("Bounding Box: ", boundingBox);

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
    model.position.y += size.y / 2;

    // Adjust camera position to fit model
    camera.position.set(0, 10.5, 30);
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
    model.castShadow = true;
    model.receiveShadow = true;
    scene.add(model);
    // console.log("Model: ", model);

    // Initialize Animation Mixer
    mixer = new THREE.AnimationMixer(model);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play(); // Start playing the animation
    });
    // console.log(gltf);
    model.position.set(-7, 0.52, 22);
    model.scale.set(0.06, 0.06, 0.06);

    // Updating texture of all the child objects
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.map = robotTexture;
              material.needsUpdate = true;
              material.roughness = 0.5;
              material.metalness = 0.5;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = robotTexture;
            child.material.needsUpdate = true;
            child.material.roughness = 0.5;
            child.material.metalness = 0.5;
          }
        }
      }
    });

    if (model) {
      timeline
        .to(model.position, { z: 0, duration: 30, ease: "none" })
        .to(model.rotation, {
          y: Math.PI / 2,
          duration: 5,
          ease: "none",
          onStart: () => {
            if (mixer) mixer.timeScale = 0;
          },
          onComplete: () => {
            if (mixer) mixer.timeScale = 1;
          },
        })
        .to(model.position, { x: 0, duration: 15, ease: "none" })
        .to(model.rotation, {
          y: Math.PI,
          duration: 5,
          ease: "none",
          onStart: () => {
            if (mixer) mixer.timeScale = 0;
          },
          onComplete: () => {
            if (mixer) mixer.timeScale = 1;
          },
        })
        .to(model.position, { z: -22, duration: 30, ease: "none" })
        .to(model.rotation, {
          y: Math.PI / 2,
          duration: 5,
          ease: "none",
          onStart: () => {
            if (mixer) mixer.timeScale = 0;
          },
          onComplete: () => {
            if (mixer) mixer.timeScale = 1;
          },
        })
        .to(model.position, { x: 7, duration: 15, ease: "none" });
    }
  },
  (xhr) => {
    console.log(`Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`);
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);
