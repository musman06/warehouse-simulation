import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { robotTexture, forkliftTexture } from "./textureLoader";
import { robotCustomAnimation1 } from "../../ModelAnimation/Cornwall/robotmodel1cornwallanimation";
import { robotCustomAnimation2 } from "../../ModelAnimation/Cornwall/robotmodel2cornwallanimation";
import { robotCustomAnimation3 } from "../../ModelAnimation/Cornwall/robotmodel3cornwallanimation";
import { forkLiftCustomAnimation1 } from "../../ModelAnimation/Cornwall/forkliftmodel1animation";
import { forkLiftCustomAnimation2 } from "../../ModelAnimation/Cornwall/forkliftmodel2animation";
import {
  degreesToRadians,
  removeWarehouseRoof,
  emptyStorageRack,
  partialStorageRack,
} from "../../utils";
import { Model3D } from "../../model3DClass";
import drawStartPointCircle from "../../NavigationPathRendering/CasaGrande/startpointcircle";
import { camera } from "../../script";

// 3D Models Placeholder
let warehouseModelCornwall: Model3D | null = null;
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
const warehouseGroupCornwall = new THREE.Group();

// Warehouse Model Loading
gltfLoader.load(
  "/assets/warehouse2/scene.gltf",
  (gltf) => {
    warehouseModelCornwall = new Model3D(
      "Warehouse Model Cornwall",
      gltf.scene
    );
    warehouseModelCornwall.model.castShadow = true;
    warehouseModelCornwall.model.receiveShadow = true;
    warehouseModelCornwall.model.scale.set(2.5, 1.5, 2.78);

    warehouseGroupCornwall.add(warehouseModelCornwall.model);

    // Compute the bounding box
    let boundingBox = new THREE.Box3().setFromObject(
      warehouseModelCornwall.model
    );

    // Get size (width, height, depth)
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    // console.log("boundingBox: ", boundingBox);

    // Get center position
    const center: any = new THREE.Vector3();
    boundingBox.getCenter(center);
    // console.log("Center: ", center);

    // Reposition the model so that it's centered at (0, 0, 0)
    warehouseModelCornwall.model.position.sub(center);

    // Move the model slightly above the ground
    warehouseModelCornwall.model.position.y += size.y / 2;

    boundingBox = new THREE.Box3().setFromObject(warehouseModelCornwall.model);

    warehouseModelCornwall.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
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
    removeWarehouseRoof(warehouseModelCornwall);
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
  "./assets/storageRacks2/scene.gltf",
  (gltf) => {
    // rack to be cloned
    const originalStorageRackModel = gltf.scene;
    originalStorageRackModel.scale.set(0.024, 0.03, 0.03);
    originalStorageRackModel.rotateY(Math.PI / 2);
    originalStorageRackModel.castShadow = true;
    originalStorageRackModel.receiveShadow = true;

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

    // multiple clones of original rack at different positions
    const rackPositions = [
      [-14, 0, -57], // row 1
      [-8.225, 0, -57],
      [-2.45, 0, -57],
      [3.325, 0, -57],
      [9.1, 0, -57],
      [14.6, 0, -57],
      [-14, 0, -45], // row 2
      [-8.225, 0, -45],
      [-2.45, 0, -45],
      [3.325, 0, -45],
      [9.1, 0, -45],
      [14.6, 0, -45],
      [-14, 0, -33], // row 3
      [-8.225, 0, -33],
      [-2.45, 0, -33],
      [3.325, 0, -33],
      [9.1, 0, -33],
      [14.6, 0, -33],
      [-14, 0, -21], // row 4
      [-8.225, 0, -21],
      [-2.45, 0, -21],
      [3.325, 0, -21],
      [9.1, 0, -21],
      [14.6, 0, -21],
      [-14, 0, -9], // row 5
      [-8.225, 0, -9],
      [-2.45, 0, -9],
      [3.325, 0, -9],
      [9.1, 0, -9],
      [14.6, 0, -9],
      [-14, 0, 3], // row 6
      [-8.225, 0, 3],
      [-2.45, 0, 3],
      [3.325, 0, 3],
      [9.1, 0, 3],
      [14.6, 0, 3],
      [-14, 0, 15], // row 7
      [-8.225, 0, 15],
      [-2.45, 0, 15],
      [3.325, 0, 15],
      [9.1, 0, 15],
      [14.6, 0, 15],
    ];

    for (let i = 0; i < rackPositions.length; i++) {
      const [x, y, z] = rackPositions[i];

      // cloning original rack to place on different positions
      const clonedStorageRackModel = originalStorageRackModel.clone(true); // deep clone
      clonedStorageRackModel.position.set(x, y, z);

      // empty and partial empty racks
      if (i === 4 || i === 7 || i === 26 || i === 29 || i === 36) {
        emptyStorageRack(clonedStorageRackModel);
      } else if (i === 0 || i === 18 || i === 23) {
        partialStorageRack(clonedStorageRackModel);
      }

      //  wrap this clone into your Model3D class
      const rackModel = new Model3D(
        `Storage Rack ${i}`,
        clonedStorageRackModel
      );

      // add the cloned rack in the warehouseGroup
      warehouseGroupCornwall.add(rackModel.model);
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

// // Robot Model 1 Loading
gltfLoader.load(
  "/assets/robot2/scene.gltf",
  (gltf) => {
    robotModel1 = new Model3D("Robot Model 1", gltf.scene);
    robotModel1.model.castShadow = true;
    robotModel1.model.receiveShadow = true;
    robotModel1.model.scale.set(0.6, 0.6, 0.6);
    robotModel1.model.position.set(-17, 1, 60);
    robotModel1.model.rotateY(degreesToRadians(-25));
    warehouseGroupCornwall.add(robotModel1.model);

    // Updating texture of all the child objects
    robotModel1.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    robotsStartingPointMesh = drawStartPointCircle(
      0.8,
      32,
      "white",
      -17,
      0.05,
      60
    );
    warehouseGroupCornwall.add(robotsStartingPointMesh);

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

// // Robot Model 2 Loading
gltfLoader.load(
  "/assets/robot2/scene.gltf",
  (gltf) => {
    robotModel2 = new Model3D("Robot Model 2", gltf.scene);
    robotModel2.model.castShadow = true;
    robotModel2.model.receiveShadow = true;
    robotModel2.model.scale.set(0.6, 0.6, 0.6);
    robotModel2.model.position.set(-17, 1, 60);
    robotModel2.model.rotateY(degreesToRadians(90));
    warehouseGroupCornwall.add(robotModel2.model);

    // Updating texture of all the child objects
    robotModel2.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (robotModel2!.model) {
      robotCustomAnimation2(robotModel2!);
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

// // Robot Model 3 Loading
gltfLoader.load(
  "/assets/robot3/scene.gltf",
  (gltf) => {
    robotModel3 = new Model3D("Robot Model 3", gltf.scene);
    robotModel3.model.castShadow = true;
    robotModel3.model.receiveShadow = true;
    robotModel3.model.scale.set(0.6, 0.6, 0.6);
    robotModel3.model.position.set(-17, 1, 60);
    robotModel3.model.rotateY(Math.PI);
    warehouseGroupCornwall.add(robotModel3.model);

    // Updating texture of all the child objects
    robotModel3.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (robotModel3!.model) {
      robotCustomAnimation3(robotModel3!);
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

// // Fork Lift Model 1
gltfLoader.load(
  "/assets/forklifts/forklift-cornwall/scene.gltf",
  (gltf) => {
    // Initializing & setting basic properties
    forkliftModel1 = new Model3D("Fork Lift Model 1", gltf.scene);
    forkliftModel1.model.castShadow = true;
    forkliftModel1.model.receiveShadow = true;
    forkliftModel1.model.position.set(17.2, 0.1, 60);
    forkliftModel1.model.scale.set(7.8, 7.8, 7.8);
    forkliftModel1.model.rotateY(-Math.PI / 2);
    warehouseGroupCornwall.add(forkliftModel1.model);

    // Adding shadows to child meshes of fork lift
    forkliftModel1.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    forkliftsStartingPointMesh = drawStartPointCircle(
      0.8,
      32,
      "yellow",
      17.2,
      0.05,
      60
    );
    warehouseGroupCornwall.add(forkliftsStartingPointMesh);

    if (forkliftModel1.model) {
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

// // Fork Lift Model 2
gltfLoader.load(
  "/assets/forklifts/forklift-cornwall/scene.gltf",
  (gltf) => {
    forkliftModel2 = new Model3D("Fork Lift Model 2", gltf.scene);
    forkliftModel2.model.castShadow = true;
    forkliftModel2.model.receiveShadow = true;
    forkliftModel2.model.position.set(17.2, 0.1, 60);
    forkliftModel2.model.scale.set(7.8, 7.8, 7.8);
    warehouseGroupCornwall.add(forkliftModel2.model);

    forkliftModel2.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (forkliftModel2!.model) {
      forkLiftCustomAnimation2(forkliftModel2!);
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

export { warehouseGroupCornwall, warehouseModelCornwall };

// export {
//   warehouseGroup,
//   warehouseModel,
//   robotModel1,
//   robotModel2,
//   robotModel3,
//   forkliftModel1,
//   forkliftModel2,
//   robotsStartingPointMesh,
//   forkliftsStartingPointMesh,
// };
