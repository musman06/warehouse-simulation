import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { robotTexture, forkliftTexture } from "./textureloader";
import { robotCustomAnimation1 } from "./ModelAnimation/robotmodel1animation";
import { robotCustomAnimation2 } from "./ModelAnimation/robotmodel2Animation";
import { robotCustomAnimation3 } from "./ModelAnimation/robotmodel3animation";
import { forkLiftCustomAnimation1 } from "./ModelAnimation/forkliftmodel1animation";
import { forkLiftCustomAnimation2 } from "./ModelAnimation/forkliftmodel2animation";
import { degreesToRadians } from "./utils";
import { Model3D } from "./model3DClass";
import drawStartPointCircle from "./NavigationPathRendering/startpointcircle";

// 3D Models Placeholder
let warehouseModel: Model3D | null = null;
// let clonedStorageRackModel: Model3D | null = null;
let robotModel1: Model3D | null = null;
let robotModel2: Model3D | null = null;
let robotModel3: Model3D | null = null;
let forkliftModel1: Model3D | null = null;
let forkliftModel2: Model3D | null = null;
let robotsStartingPointMesh: THREE.Mesh | null = null;
let forkliftsStartingPointMesh: THREE.Mesh | null = null;

// 3D Model Loader
const gltfLoader = new GLTFLoader();

// Group to hold all the models
const warehouseGroup = new THREE.Group();

// Warehouse Model Loading
gltfLoader.load(
  "/assets/warehouse/scene.gltf",
  (gltf) => {
    warehouseModel = new Model3D("Warehouse Model", gltf.scene);
    warehouseModel.model.castShadow = true;
    warehouseModel.model.receiveShadow = true;
    warehouseModel.model.scale.set(1.6, 1.5, 1);
    warehouseGroup.add(warehouseModel.model);

    // Compute the bounding box
    let boundingBox = new THREE.Box3().setFromObject(warehouseModel.model);

    // Get size (width, height, depth)
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    // console.log("boundingBox: ", boundingBox);

    // Get center position
    const center: any = new THREE.Vector3();
    boundingBox.getCenter(center);
    // console.log("Center: ", center);

    // Reposition the model so that it's centered at (0, 0, 0)
    warehouseModel.model.position.sub(center);

    // Move the model slightly above the ground
    warehouseModel.model.position.y += size.y / 2;

    boundingBox = new THREE.Box3().setFromObject(warehouseModel.model);

    warehouseModel.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        if (child.userData.name !== "NurbsPath.005_WetConcrete_0") {
          // Remove the unwanted mesh from its parent
          if (child.parent) {
            child.parent.remove(child);
          }
        }
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
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

// Storage Racks Model loading
gltfLoader.load(
  "./assets/storageRacks/scene.gltf",
  (gltf) => {
    // rack to be cloned
    const originalStorageRackModel = gltf.scene;
    originalStorageRackModel.scale.set(0.024, 0.03, 0.03);
    originalStorageRackModel.rotateY(Math.PI / 2);
    originalStorageRackModel.castShadow = true;
    originalStorageRackModel.receiveShadow = true;

    const boundingBox = new THREE.Box3().setFromObject(
      originalStorageRackModel
    );
    // console.log("boundingBox 111: ", boundingBox);

    // enabling shadows in child meshes
    originalStorageRackModel.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              // console.log("hahaha 1");
              material.needsUpdate = true;
            }
          });
        } else {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            // console.log("hahaha 2");
            child.material.needsUpdate = true;
          }
        }
      }
    });

    // multiple clones of original rack at different positions
    const rackPositions = [
      [-8, 0, -16.4], // row 1
      [-2.55, 0, -16.4],
      [2.85, 0, -16.4],
      [8.2, 0, -16.4],
      [-8, 0, -7.6], // row 2
      [-2.55, 0, -7.6],
      [2.85, 0, -7.6],
      [8.2, 0, -7.6],
      [-8, 0, 1.2], // row 3
      [-2.55, 0, 1.2],
      [2.85, 0, 1.2],
      [8.2, 0, 1.2],
    ];

    for (let i = 0; i < rackPositions.length; i++) {
      const [x, y, z] = rackPositions[i];

      // cloning original rack to place on different positions
      const clonedStorageRackModel = originalStorageRackModel.clone(true); // deep clone
      clonedStorageRackModel.position.set(x, y, z);

      //  wrap this clone into your Model3D class
      const rackModel = new Model3D(
        `Storage Rack ${i}`,
        clonedStorageRackModel
      );

      // add the cloned rack in the warehouseGroup
      // warehouseGroup.add(rackModel.model);
    }
  },
  (xhr) => {
    console.log(
      `Storage Rack ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`
    );
  },
  (error) => {
    console.error("Error loading Storage Rack:", error);
  }
);

// Robot Model 1 Loading
gltfLoader.load(
  "/assets/robot/scene.gltf",
  (gltf) => {
    robotModel1 = new Model3D("Robot Model 1", gltf.scene);
    robotModel1.model.castShadow = true;
    robotModel1.model.receiveShadow = true;
    robotModel1.model.scale.set(0.06, 0.06, 0.06);
    robotModel1.model.position.set(-8.3, 0.55, 19.8);
    robotModel1.model.rotateY(Math.PI);
    warehouseGroup.add(robotModel1.model);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = robotModel1?.mixer.clipAction(clip);
      action!.play();
    });

    // Updating texture of all the child objects
    robotModel1.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
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

    robotsStartingPointMesh = drawStartPointCircle(
      0.8,
      32,
      "white",
      -8.3,
      0.05,
      19.8
    );
    warehouseGroup.add(robotsStartingPointMesh);

    if (robotModel1.model) {
      robotCustomAnimation1(robotModel1);
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
    robotModel2 = new Model3D("Robot Model 2", gltf.scene);
    robotModel2.model.castShadow = true;
    robotModel2.model.receiveShadow = true;
    robotModel2.model.position.set(-8.3, 0.55, 19.8);
    robotModel2.model.scale.set(0.06, 0.06, 0.06);
    robotModel2.model.rotateY(-Math.PI / 2);
    // warehouseGroup.add(robotModel2.model);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = robotModel2?.mixer.clipAction(clip);
      action!.play();
    });

    // Updating texture of all the child objects
    robotModel2.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
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

    if (robotModel2!.model) {
      // robotCustomAnimation2(robotModel2!);
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
    robotModel3 = new Model3D("Robot Model 3", gltf.scene);
    robotModel3.model.castShadow = true;
    robotModel3.model.receiveShadow = true;
    robotModel3.model.position.set(-8.3, 0.55, 24.8);
    robotModel3.model.scale.set(0.06, 0.06, 0.06);
    robotModel3.model.rotateY(Math.PI);
    warehouseGroup.add(robotModel3.model);

    // Play all available animations
    gltf.animations.forEach((clip) => {
      const action = robotModel3?.mixer.clipAction(clip);
      action!.play();
    });

    // Updating texture of all the child objects
    robotModel3.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
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

    // setTimeout(() => {
    if (robotModel3!.model) {
      robotCustomAnimation3(robotModel3!);
    }
    // }, 6000);
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

// Fork Lift Model 1
gltfLoader.load(
  "/assets/forkliftGLTF/Forklift_A01_PR_V_NVD_01.gltf",
  (gltf) => {
    // Initializing & setting basic properties
    forkliftModel1 = new Model3D("Fork Lift Model 1", gltf.scene);
    forkliftModel1.model.castShadow = true;
    forkliftModel1.model.receiveShadow = true;
    forkliftModel1.model.position.set(7.9, 0.1, 20.4);
    forkliftModel1.model.scale.set(0.01, 0.01, 0.01);
    forkliftModel1.model.rotateY(Math.PI);
    // warehouseGroup.add(forkliftModel1.model);

    // Adding shadows to child meshes of fork lift
    forkliftModel1.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
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

    forkliftsStartingPointMesh = drawStartPointCircle(
      0.8,
      32,
      "yellow",
      7.9,
      0.05,
      19.8
    );
    warehouseGroup.add(forkliftsStartingPointMesh);

    if (forkliftModel1.model) {
      // forkLiftCustomAnimation1(forkliftModel1);
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

// Fork Lift Model 2
gltfLoader.load(
  "/assets/forkliftGLTF/Forklift_A01_PR_V_NVD_01.gltf",
  (gltf) => {
    forkliftModel2 = new Model3D("Fork Lift Model 2", gltf.scene);
    forkliftModel2.model.castShadow = true;
    forkliftModel2.model.receiveShadow = true;
    forkliftModel2.model.position.set(7.9, 0.1, 20.4);
    forkliftModel2.model.scale.set(0.01, 0.01, 0.01);
    forkliftModel2.model.rotateY(degreesToRadians(180));
    // warehouseGroup.add(forkliftModel2.model);

    forkliftModel2.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
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

    if (forkliftModel2!.model) {
      // forkLiftCustomAnimation2(forkliftModel2!);
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

export {
  warehouseGroup,
  warehouseModel,
  robotModel1,
  robotModel2,
  robotModel3,
  forkliftModel1,
  forkliftModel2,
  robotsStartingPointMesh,
  forkliftsStartingPointMesh,
};
