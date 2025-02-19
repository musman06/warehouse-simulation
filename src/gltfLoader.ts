import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { robotTexture } from "./textureLoader";
import {
  robotCustomAnimation1,
  robotCustomAnimation2,
  robotCustomAnimation3,
  forkLiftCustomAnimation1,
  forkLiftCustomAnimation2,
} from "./robotGSAPAnimation";
import { degreesToRadians } from "./utils";

// Animation Mixer
let mixer1: THREE.AnimationMixer;
let mixer2: THREE.AnimationMixer;
let mixer3: THREE.AnimationMixer;

// 3D Models Placeholder
let warehouseModel: THREE.Group | null = null;
let robotModel1: THREE.Group | null = null;
let robotModel2: THREE.Group | null = null;
let robotModel3: THREE.Group | null = null;
let forkliftModel1: THREE.Group | null = null;
let forkliftModel2: THREE.Group | null = null;

// 3D Model Loader
const gltfLoader = new GLTFLoader();

// Warehouse Model Loading
gltfLoader.load(
  "/assets/warehouse/scene.gltf",
  (gltf) => {
    warehouseModel = gltf.scene;
    warehouseModel.castShadow = true;
    warehouseModel.receiveShadow = true;
    warehouseModel.scale.set(1.5, 1.5, 1);
    console.log(warehouseModel);

    // Compute the bounding box
    const boundingBox = new THREE.Box3().setFromObject(warehouseModel);
    // console.log(boundingBox);

    // Get size (width, height, depth)
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    // console.log(size);

    // Get center position
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    // console.log(center);

    // Reposition the model so that it's centered at (0, 0, 0)
    warehouseModel.position.sub(center);

    // Move the model slightly above the ground
    warehouseModel.position.y += size.y / 2;

    warehouseModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.map = robotTexture;
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = robotTexture;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  },
  (xhr) => {
    console.log(
      `Warehouse Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
    );
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);

// Robot Model 1 Loading
gltfLoader.load(
  "/assets/robot/scene.gltf",
  (gltf) => {
    robotModel1 = gltf.scene;
    robotModel1.castShadow = true;
    robotModel1.receiveShadow = true;
    robotModel1.position.set(-7, 0.5, 22);
    robotModel1.scale.set(0.06, 0.06, 0.06);

    // Initialize Animation Mixer
    mixer1 = new THREE.AnimationMixer(robotModel1);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = mixer1.clipAction(clip);
      action.play();
    });

    // Updating texture of all the child objects
    robotModel1.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.map = robotTexture;
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = robotTexture;
            child.material.needsUpdate = true;
          }
        }
      }
    });

    if (robotModel1) {
      robotCustomAnimation1(robotModel1, mixer1);
    }
  },
  (xhr) => {
    console.log(
      `Robot1 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
    );
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);

// Robot Model 2 Loading
gltfLoader.load(
  "/assets/robot/scene.gltf",
  (gltf) => {
    robotModel2 = gltf.scene;
    robotModel2.castShadow = true;
    robotModel2.receiveShadow = true;
    robotModel2.position.set(-11, 0.5, 22);
    robotModel2.scale.set(0.06, 0.06, 0.06);

    // Initialize Animation Mixer
    mixer2 = new THREE.AnimationMixer(robotModel2);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = mixer2.clipAction(clip);
      action.play();
    });

    // Updating texture of all the child objects
    robotModel2.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.map = robotTexture;
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = robotTexture;
            child.material.needsUpdate = true;
          }
        }
      }
    });

    if (robotModel2) {
      robotCustomAnimation2(robotModel2, mixer2);
    }
  },
  (xhr) => {
    console.log(
      `Robot2 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
    );
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);

// Robot Model 3 Loading
gltfLoader.load(
  "/assets/robot/scene.gltf",
  (gltf) => {
    robotModel3 = gltf.scene;
    robotModel3.castShadow = true;
    robotModel3.receiveShadow = true;
    robotModel3.position.set(10, 0.52, 22);
    robotModel3.scale.set(0.06, 0.06, 0.06);

    // Initialize Animation Mixer
    mixer3 = new THREE.AnimationMixer(robotModel3);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = mixer3.clipAction(clip);
      action.play();
    });

    // Updating texture of all the child objects
    robotModel3.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.map = robotTexture;
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = robotTexture;
            child.material.needsUpdate = true;
          }
        }
      }
    });

    if (robotModel3) {
      robotCustomAnimation3(robotModel3, mixer3);
    }
  },
  (xhr) => {
    console.log(
      `Robot3 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
    );
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);

gltfLoader.load(
  "/assets/forklift/scene.gltf",
  (gltf) => {
    forkliftModel1 = gltf.scene;
    forkliftModel1.castShadow = true;
    forkliftModel1.receiveShadow = true;
    forkliftModel1.position.set(0, 0.1, 20);
    forkliftModel1.scale.set(9, 9, 9);
    forkliftModel1.rotateY(-Math.PI / 2);

    forkliftModel1.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (forkliftModel1) {
      forkLiftCustomAnimation1(forkliftModel1);
    }
  },
  (xhr) => {
    console.log(
      `Forklift1 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
    );
  },
  (error) => {
    console.error("Error loading model:", error);
  }
);

setTimeout(() => {
  gltfLoader.load(
    "/assets/forklift/scene.gltf",
    (gltf) => {
      forkliftModel2 = gltf.scene;
      forkliftModel2.castShadow = true;
      forkliftModel2.receiveShadow = true;
      forkliftModel2.position.set(0, 0.1, 20);
      forkliftModel2.scale.set(9, 9, 9);
      forkliftModel2.rotateY(degreesToRadians(-120));

      forkliftModel2.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      if (forkliftModel2) {
        forkLiftCustomAnimation2(forkliftModel2);
      }
    },
    (xhr) => {
      console.log(
        `Forklift2 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
      );
    },
    (error) => {
      console.error("Error loading model:", error);
    }
  );
}, 5000);

export {
  warehouseModel,
  robotModel1,
  robotModel2,
  robotModel3,
  forkliftModel1,
  forkliftModel2,
  mixer1,
  mixer2,
  mixer3,
};
