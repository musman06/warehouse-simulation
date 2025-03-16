import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { robotTexture, forkliftTexture } from "./textureloader";
import {
  robotCustomAnimation1,
  robotCustomAnimation2,
  robotCustomAnimation3,
  forkLiftCustomAnimation1,
  forkLiftCustomAnimation2,
} from "./robotgsapanimation";
import { degreesToRadians } from "./utils";
import { Model3D } from "./model3DClass";

// 3D Models Placeholder
let warehouseModel: Model3D | null = null;
let warehouseModelFloor: THREE.Mesh | null = null;
let robotModel1: Model3D | null = null;
let robotModel2: Model3D | null = null;
let robotModel3: Model3D | null = null;
let forkliftModel1: Model3D | null = null;
let forkliftModel2: Model3D | null = null;

// 3D Model Loader
const gltfLoader = new GLTFLoader();

// Group to hold all the models
const warehouseGroup = new THREE.Group();

// Warehouse Model Loading
gltfLoader.load(
  "/assets/warehouse/scene.gltf",
  (gltf) => {
    warehouseModel = new Model3D("Warehouse Model", gltf.scene, 0, 0);
    warehouseModel.model.castShadow = true;
    warehouseModel.model.receiveShadow = true;
    warehouseModel.model.scale.set(1.5, 1.5, 1);
    warehouseGroup.add(warehouseModel.model);
    // console.log(warehouseModel);

    // Compute the bounding box
    const boundingBox = new THREE.Box3().setFromObject(warehouseModel.model);
    warehouseModel.boundingBox = boundingBox;

    // Get size (width, height, depth)
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    // console.log(size);

    // Get center position
    const center: any = new THREE.Vector3();
    boundingBox.getCenter(center);
    // console.log("Center: ", center);

    // Reposition the model so that it's centered at (0, 0, 0)
    warehouseModel.model.position.sub(center);

    // Move the model slightly above the ground
    warehouseModel.model.position.y += size.y / 2;

    warehouseModel.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.userData.name === "NurbsPath.005_WetConcrete_0") {
          warehouseModelFloor = child;
        }
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              if (child.name === "NurbsPath005_Metal_0")
                material.color = new THREE.Color("blue");
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            if (child.name === "NurbsPath005_Metal_0")
              child.material.color = new THREE.Color("beige");

            child.material.needsUpdate = true;
          }
        }
      }
    });
  },
  (xhr) => {
    console
      .log
      // `Warehouse Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
      ();
  },
  (error) => {
    // console.error("Error loading model:", error);
  }
);

// Robot Model 1 Loading
gltfLoader.load(
  "/assets/robot/scene.gltf",
  (gltf) => {
    robotModel1 = new Model3D("Robot Model 1", gltf.scene, 2, 3);
    robotModel1.model.castShadow = true;
    robotModel1.model.receiveShadow = true;
    robotModel1.model.position.set(-7, 0.5, 22);
    robotModel1.model.scale.set(0.06, 0.06, 0.06);
    warehouseGroup.add(robotModel1.model);

    // Compute the bounding box
    robotModel1.boundingBox = new THREE.Box3().setFromObject(robotModel1.model);
    // console.log(robotModel1.boundingBox);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = robotModel1?.mixer.clipAction(clip);
      action!.play();
    });

    // Updating texture of all the child objects
    robotModel1.model.traverse((child) => {
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

    if (robotModel1.model) {
      robotCustomAnimation1(robotModel1, 5);
    }
  },
  (xhr) => {
    console
      .log
      // `Robot1 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
      ();
  },
  (error) => {
    // console.error("Error loading model:", error);
  }
);

// Robot Model 2 Loading
gltfLoader.load(
  "/assets/robot/scene.gltf",
  (gltf) => {
    robotModel2 = new Model3D("Robot Model 2", gltf.scene, 2, 4);
    robotModel2.model.castShadow = true;
    robotModel2.model.receiveShadow = true;
    robotModel2.model.position.set(-11, 0.5, 22);
    robotModel2.model.scale.set(0.06, 0.06, 0.06);
    warehouseGroup.add(robotModel2.model);

    // Compute the bounding box
    robotModel2.boundingBox = new THREE.Box3().setFromObject(robotModel2.model);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = robotModel2?.mixer.clipAction(clip);
      action!.play();
    });

    // Updating texture of all the child objects
    robotModel2.model.traverse((child) => {
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

    if (robotModel2.model) {
      robotCustomAnimation2(robotModel2, 5);
    }
  },
  (xhr) => {
    console
      .log
      // `Robot2 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
      ();
  },
  (error) => {
    // console.error("Error loading model:", error);
  }
);

// Robot Model 3 Loading
setTimeout(() => {
  gltfLoader.load(
    "/assets/robot/scene.gltf",
    (gltf) => {
      robotModel3 = new Model3D("Robot Model 3", gltf.scene, 2, 5);
      robotModel3.model.castShadow = true;
      robotModel3.model.receiveShadow = true;
      robotModel3.model.position.set(10, 0.52, 22);
      robotModel3.model.scale.set(0.06, 0.06, 0.06);
      warehouseGroup.add(robotModel3.model);

      // Compute the bounding box
      robotModel3.boundingBox = new THREE.Box3().setFromObject(
        robotModel3.model
      );

      // Play all available animations
      gltf.animations.forEach((clip) => {
        const action = robotModel3?.mixer.clipAction(clip);
        action!.play();
      });

      // Updating texture of all the child objects
      robotModel3.model.traverse((child) => {
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
        robotCustomAnimation3(robotModel3, 5);
      }
    },
    (xhr) => {
      console
        .log
        // `Robot3 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
        ();
    },
    (error) => {
      // console.error("Error loading model:", error);
    }
  );
}, 2000);

// Fork Lift Model 1
gltfLoader.load(
  "/assets/forkliftGLTF/Forklift_A01_PR_V_NVD_01.gltf",
  (gltf) => {
    // Initializing & setting basic properties
    forkliftModel1 = new Model3D("Fork Lift Model 1", gltf.scene, 1, 1);
    forkliftModel1.model.castShadow = true;
    forkliftModel1.model.receiveShadow = true;
    forkliftModel1.model.position.set(0, 0.1, 20);
    forkliftModel1.model.scale.set(0.01, 0.01, 0.01);
    // forkliftModel1.model.rotateY(-Math.PI / 2);
    warehouseGroup.add(forkliftModel1.model);

    // Computing the bounding box
    forkliftModel1.boundingBox = new THREE.Box3().setFromObject(
      forkliftModel1.model
    );
    // console.log(forkliftModel1.boundingBox);

    // Adding shadows to child meshes of fork lift
    forkliftModel1.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.map = forkliftTexture;
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = forkliftTexture;
            child.material.needsUpdate = true;
          }
        }
      }
    });

    if (forkliftModel1.model) {
      forkLiftCustomAnimation1(forkliftModel1, 5);
    }
  },
  (xhr) => {
    console
      .log
      // `Forklift1 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
      ();
  },
  (error) => {
    // console.error("Error loading model:", error);
  }
);

// Fork Lift Model 2
setTimeout(() => {
  gltfLoader.load(
    "/assets/forkliftGLTF/Forklift_A01_PR_V_NVD_01.gltf",
    (gltf) => {
      forkliftModel2 = new Model3D("Fork Lift Model 2", gltf.scene, 1, 2);
      forkliftModel2.model.castShadow = true;
      forkliftModel2.model.receiveShadow = true;
      forkliftModel2.model.position.set(0, 0.1, 20);
      forkliftModel2.model.scale.set(0.01, 0.01, 0.01);
      forkliftModel2.model.rotateY(degreesToRadians(-120));
      warehouseGroup.add(forkliftModel2.model);

      // Compute the bounding box
      forkliftModel2.boundingBox = new THREE.Box3().setFromObject(
        forkliftModel2.model
      );

      forkliftModel2.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial) {
                material.map = forkliftTexture;
                material.needsUpdate = true;
              }
            });
          } else {
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.map = forkliftTexture;
              child.material.needsUpdate = true;
            }
          }
        }
      });

      if (forkliftModel2.model) {
        forkLiftCustomAnimation2(forkliftModel2, 5);
      }
    },
    (xhr) => {
      console
        .log
        // `Forklift2 Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
        ();
    },
    (error) => {
      // console.error("Error loading model:", error);
    }
  );
}, 1000);

export {
  warehouseGroup,
  warehouseModel,
  warehouseModelFloor,
  robotModel1,
  robotModel2,
  robotModel3,
  forkliftModel1,
  forkliftModel2,
};
