import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { robotCustomAnimation1 } from "../../ModelAnimation/Cornwall/robotmodel1cornwallanimation";
import { robotCustomAnimation2 } from "../../ModelAnimation/Cornwall/robotmodel2cornwallanimation";
import { robotCustomAnimation3 } from "../../ModelAnimation/Cornwall/robotmodel3cornwallanimation";
import { forkLiftCustomAnimation1 } from "../../ModelAnimation/Cornwall/forkliftmodel1cornwallanimation";
import { forkLiftCustomAnimation2 } from "../../ModelAnimation/Cornwall/forkliftmodel2cornwallanimation";
import {
  degreesToRadians,
  removeWarehouseRoof,
  emptyStorageRack,
  partialStorageRack,
} from "../../utils";
import { Model3D } from "../../model3DClass";
import drawStartPointCircle from "../../NavigationPathRendering/startPointCircle";

// 3D Models Placeholder
let warehouseModelCornwall: Model3D | null = null;
let robotModel1Cornwall: Model3D | null = null;
let robotModel2Cornwall: Model3D | null = null;
let robotModel3Cornwall: Model3D | null = null;
let forkliftModel1Cornwall: Model3D | null = null;
let forkliftModel2Cornwall: Model3D | null = null;
let robotsStartingPointMesh: THREE.Mesh | null = null;
let forkliftsStartingPointMesh: THREE.Mesh | null = null;

// 3D Model Loader
const gltfLoader = new GLTFLoader();

// Group to hold all the models
const warehouseGroupCornwall = new THREE.Group();

// Warehouse Model Loading
gltfLoader.load(
  "/assets/models/warehouse2/scene.gltf",
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
  "./assets/models/storageRacks2/scene.gltf",
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
  "/assets/models/robot2/scene.gltf",
  (gltf) => {
    robotModel1Cornwall = new Model3D("Robot Model 1", gltf.scene);
    robotModel1Cornwall.model.castShadow = true;
    robotModel1Cornwall.model.receiveShadow = true;
    robotModel1Cornwall.model.scale.set(0.6, 0.6, 0.6);
    robotModel1Cornwall.model.position.set(-17, 1, 60);
    robotModel1Cornwall.model.rotateY(degreesToRadians(-25));
    warehouseGroupCornwall.add(robotModel1Cornwall.model);

    // Updating texture of all the child objects
    robotModel1Cornwall.model.traverse((child) => {
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

    if (robotModel1Cornwall.model) {
      robotCustomAnimation1(robotModel1Cornwall);
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
  "/assets/models/robot2/scene.gltf",
  (gltf) => {
    robotModel2Cornwall = new Model3D("Robot Model 2", gltf.scene);
    robotModel2Cornwall.model.castShadow = true;
    robotModel2Cornwall.model.receiveShadow = true;
    robotModel2Cornwall.model.scale.set(0.6, 0.6, 0.6);
    robotModel2Cornwall.model.position.set(-17, 1, 60);
    robotModel2Cornwall.model.rotateY(degreesToRadians(90));
    warehouseGroupCornwall.add(robotModel2Cornwall.model);

    // Updating texture of all the child objects
    robotModel2Cornwall.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (robotModel2Cornwall!.model) {
      robotCustomAnimation2(robotModel2Cornwall!);
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
  "/assets/models/robot3/scene.gltf",
  (gltf) => {
    robotModel3Cornwall = new Model3D("Robot Model 3", gltf.scene);
    robotModel3Cornwall.model.castShadow = true;
    robotModel3Cornwall.model.receiveShadow = true;
    robotModel3Cornwall.model.scale.set(0.6, 0.6, 0.6);
    robotModel3Cornwall.model.position.set(-17, 1, 60);
    robotModel3Cornwall.model.rotateY(Math.PI);
    warehouseGroupCornwall.add(robotModel3Cornwall.model);

    // Updating texture of all the child objects
    robotModel3Cornwall.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (robotModel3Cornwall!.model) {
      robotCustomAnimation3(robotModel3Cornwall!);
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
  "/assets/models/forklifts/forklift-cornwall/scene.gltf",
  (gltf) => {
    // Initializing & setting basic properties
    forkliftModel1Cornwall = new Model3D("Fork Lift Model 1", gltf.scene);
    forkliftModel1Cornwall.model.castShadow = true;
    forkliftModel1Cornwall.model.receiveShadow = true;
    forkliftModel1Cornwall.model.position.set(17.2, 0.1, 60);
    forkliftModel1Cornwall.model.scale.set(7.8, 7.8, 7.8);
    forkliftModel1Cornwall.model.rotateY(-Math.PI / 2);
    warehouseGroupCornwall.add(forkliftModel1Cornwall.model);

    // Adding shadows to child meshes of fork lift
    forkliftModel1Cornwall.model.traverse((child) => {
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

    if (forkliftModel1Cornwall.model) {
      forkLiftCustomAnimation1(forkliftModel1Cornwall);
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
  "/assets/models/forklifts/forklift-cornwall/scene.gltf",
  (gltf) => {
    forkliftModel2Cornwall = new Model3D("Fork Lift Model 2", gltf.scene);
    forkliftModel2Cornwall.model.castShadow = true;
    forkliftModel2Cornwall.model.receiveShadow = true;
    forkliftModel2Cornwall.model.position.set(17.2, 0.1, 60);
    forkliftModel2Cornwall.model.scale.set(7.8, 7.8, 7.8);
    warehouseGroupCornwall.add(forkliftModel2Cornwall.model);

    forkliftModel2Cornwall.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (forkliftModel2Cornwall!.model) {
      forkLiftCustomAnimation2(forkliftModel2Cornwall!);
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
  warehouseGroupCornwall,
  warehouseModelCornwall,
  robotModel1Cornwall,
  robotModel2Cornwall,
  robotModel3Cornwall,
  forkliftModel1Cornwall,
  forkliftModel2Cornwall,
};
