import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { robotCustomAnimation1 } from "../../ModelAnimation/CasaGrande/robotmodel1casagrandeanimation";
import { robotCustomAnimation2 } from "../../ModelAnimation/CasaGrande/robotmodel2casagrandeanimation";
import { robotCustomAnimation3 } from "../../ModelAnimation/CasaGrande/robotmodel3casagrandeanimation";
import { forkLiftCustomAnimation1 } from "../../ModelAnimation/CasaGrande/forkliftmodel1casagrandeanimation";
import { forkLiftCustomAnimation2 } from "../../ModelAnimation/CasaGrande/forkliftmodel2casagrandeanimation";
import {
  degreesToRadians,
  // removeWarehouseRoof,
  emptyStorageRack,
  partialStorageRack,
} from "../../utils";
import { Model3D } from "../../model3DClass";
import drawStartPointCircle from "../../NavigationPathRendering/startPointCircle";

// 3D Models Placeholder
let warehouseModelCasa: Model3D | null = null;
// let clonedStorageRackModel: Model3D | null = null;
let robotModel1Casa: Model3D | null = null;
let robotModel2Casa: Model3D | null = null;
let robotModel3Casa: Model3D | null = null;
let forkliftModel1Casa: Model3D | null = null;
let forkliftModel2Casa: Model3D | null = null;
let robotsStartingPointMeshCasa: THREE.Mesh | null = null;
let forkliftsStartingPointMeshCasa: THREE.Mesh | null = null;

// 3D Model Loader
const gltfLoader = new GLTFLoader();

// Group to hold all the models
const warehouseGroupCasa = new THREE.Group();

// Warehouse Model Loading
gltfLoader.load(
  "/assets/models/warehouse/scene.gltf",
  (gltf) => {
    warehouseModelCasa = new Model3D("Warehouse Model Casa Grande", gltf.scene);
    warehouseModelCasa.model.castShadow = true;
    warehouseModelCasa.model.receiveShadow = true;
    warehouseModelCasa.model.scale.set(1.6, 1.5, 1);
    warehouseGroupCasa.add(warehouseModelCasa.model);

    // Compute the bounding box
    let boundingBox = new THREE.Box3().setFromObject(warehouseModelCasa.model);

    // Get size (width, height, depth)
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    // console.log("boundingBox: ", boundingBox);

    // Get center position
    const center: any = new THREE.Vector3();
    boundingBox.getCenter(center);
    // console.log("Center: ", center);

    // Reposition the model so that it's centered at (0, 0, 0)
    warehouseModelCasa.model.position.sub(center);

    // Move the model slightly above the ground
    warehouseModelCasa.model.position.y += size.y / 2;

    boundingBox = new THREE.Box3().setFromObject(warehouseModelCasa.model);

    warehouseModelCasa.model.traverse((child) => {
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

    // removeWarehouseRoof(warehouseModelCasa);
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
  "./assets/models/storageRacks/scene.gltf",
  (gltf) => {
    // rack to be cloned
    const originalStorageRackModel = gltf.scene;
    originalStorageRackModel.scale.set(0.024, 0.03, 0.03);
    originalStorageRackModel.rotateY(Math.PI / 2);
    originalStorageRackModel.castShadow = true;
    originalStorageRackModel.receiveShadow = true;

    console.log(typeof originalStorageRackModel);

    // Store meshes to remove
    const meshesToRemove: THREE.Object3D[] = [];

    originalStorageRackModel.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Mesh) {
        if (child.name === "Material3") {
          meshesToRemove.push(child); // ✅ Just mark for removal
        }

        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.needsUpdate = true;
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.needsUpdate = true;
        }
      }
    });

    // Remove after traversal
    meshesToRemove.forEach((mesh) => {
      if (mesh.parent) {
        mesh.parent.remove(mesh);
        console.log("Removed mesh:", mesh.name);
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
      let clonedStorageRackModel = originalStorageRackModel.clone(true); // deep clone
      clonedStorageRackModel.position.set(x, y, z);

      // empty and partial empty racks
      if (i === 2 || i === rackPositions.length - 1) {
        emptyStorageRack(clonedStorageRackModel);
      } else if (i === 5 || i === 8) {
        partialStorageRack(clonedStorageRackModel);
      }

      //  wrap this clone into your Model3D class
      const rackModel = new Model3D(
        `Storage Rack ${i}`,
        clonedStorageRackModel
      );

      // add the cloned rack in the warehouseGroup
      warehouseGroupCasa.add(rackModel.model);
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
  "/assets/models/robot_1_2/scene.gltf",
  (gltf) => {
    robotModel1Casa = new Model3D("Robot Model 1", gltf.scene);
    robotModel1Casa.model.castShadow = true;
    robotModel1Casa.model.receiveShadow = true;
    robotModel1Casa.model.scale.set(0.6, 0.6, 0.6);
    robotModel1Casa.model.position.set(-8.3, 1, 19.8);
    robotModel1Casa.model.rotateY(Math.PI);
    warehouseGroupCasa.add(robotModel1Casa.model);

    // Updating texture of all the child objects
    robotModel1Casa.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    robotsStartingPointMeshCasa = drawStartPointCircle(
      0.8,
      32,
      "white",
      -8.3,
      0.05,
      19.8
    );
    warehouseGroupCasa.add(robotsStartingPointMeshCasa);

    if (robotModel1Casa.model) {
      robotCustomAnimation1(robotModel1Casa);
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
  "/assets/models/robot_1_2/scene.gltf",
  (gltf) => {
    robotModel2Casa = new Model3D("Robot Model 2", gltf.scene);
    robotModel2Casa.model.castShadow = true;
    robotModel2Casa.model.receiveShadow = true;
    robotModel2Casa.model.scale.set(0.6, 0.6, 0.6);
    robotModel2Casa.model.position.set(-8.3, 1, 19.8);
    robotModel2Casa.model.rotateY(-Math.PI / 2);
    warehouseGroupCasa.add(robotModel2Casa.model);

    // Updating texture of all the child objects
    robotModel2Casa.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (robotModel2Casa!.model) {
      robotCustomAnimation2(robotModel2Casa!);
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
  "/assets/models/robot_2_2/scene.gltf",
  (gltf) => {
    robotModel3Casa = new Model3D("Robot Model 3", gltf.scene);
    robotModel3Casa.model.castShadow = true;
    robotModel3Casa.model.receiveShadow = true;
    robotModel3Casa.model.scale.set(0.6, 0.6, 0.6);
    robotModel3Casa.model.position.set(-8.3, 0.15, 19.8);
    robotModel3Casa.model.rotateY(Math.PI);
    warehouseGroupCasa.add(robotModel3Casa.model);

    // Updating texture of all the child objects
    robotModel3Casa.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (robotModel3Casa!.model) {
      robotCustomAnimation3(robotModel3Casa!);
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

// Fork Lift Model 1
gltfLoader.load(
  "/assets/models/forklifts/forklift-casagrande/scene.gltf",
  (gltf) => {
    // Initializing & setting basic properties
    forkliftModel1Casa = new Model3D("Fork Lift Model 1", gltf.scene);
    forkliftModel1Casa.model.castShadow = true;
    forkliftModel1Casa.model.receiveShadow = true;
    forkliftModel1Casa.model.position.set(7.9, 0.1, 20.4);
    forkliftModel1Casa.model.scale.set(7.8, 7.8, 7.8);
    forkliftModel1Casa.model.rotateY(degreesToRadians(-90));
    warehouseGroupCasa.add(forkliftModel1Casa.model);

    // Adding shadows to child meshes of fork lift
    forkliftModel1Casa.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    forkliftsStartingPointMeshCasa = drawStartPointCircle(
      0.8,
      32,
      "yellow",
      7.9,
      0.05,
      19.8
    );
    warehouseGroupCasa.add(forkliftsStartingPointMeshCasa);

    if (forkliftModel1Casa.model) {
      forkLiftCustomAnimation1(forkliftModel1Casa);
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
  "/assets/models/forklifts/forklift-casagrande/scene.gltf",
  (gltf) => {
    forkliftModel2Casa = new Model3D("Fork Lift Model 2", gltf.scene);
    forkliftModel2Casa.model.castShadow = true;
    forkliftModel2Casa.model.receiveShadow = true;
    forkliftModel2Casa.model.position.set(7.9, 0.1, 20.4);
    forkliftModel2Casa.model.scale.set(7.8, 7.8, 7.8);
    forkliftModel2Casa.model.rotateY(degreesToRadians(-90));
    warehouseGroupCasa.add(forkliftModel2Casa.model);

    forkliftModel2Casa.model.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (forkliftModel2Casa!.model) {
      forkLiftCustomAnimation2(forkliftModel2Casa!);
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
  warehouseGroupCasa,
  warehouseModelCasa,
  robotModel1Casa,
  robotModel2Casa,
  robotModel3Casa,
  forkliftModel1Casa,
  forkliftModel2Casa,
};
