import * as THREE from "three";
import { Model3D } from "./model3DClass";
import maplibregl from "maplibre-gl";

// Time taken by robot to rotate
export const rotationDurationRobot = 4;

// Time taken by forklift to rotate
export const rotationDurationForklift = 2.5;

// Degrees To Radians function
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Flooring Bounding Box Parameters Function
function boundingBoxFlooring(coordinate: number, cellSize: number) {
  return Math.floor(coordinate / cellSize) + 1;
}

// Array holding removed roof meshes
const removedRoofMeshes: { mesh: THREE.Mesh; parent: THREE.Object3D }[] = [];

// Remove Warehouse roof
function removeWarehouseRoof(warehouseModel: Model3D) {
  console.log("i am called");
  const meshesToRemove: { mesh: THREE.Mesh; parent: THREE.Object3D }[] = []; // meshes of warehouse model to remove

  warehouseModel.model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (
        child.userData.name === "NurbsPath.005_Metal_0" ||
        child.userData.name === "NurbsPath.005_Emissive_0"
      ) {
        if (child.parent) {
          meshesToRemove.push({ mesh: child, parent: child.parent });
        }
      }
    }
  });

  // Now outside traversal, safely remove
  for (const { mesh, parent } of meshesToRemove) {
    console.log("meshesToRemove: ", meshesToRemove);
    removedRoofMeshes.push({ mesh, parent });
    parent.remove(mesh);
  }
}

// Add Warehouse roof
function addWarehouseRoof() {
  for (const { mesh, parent } of removedRoofMeshes) {
    parent.add(mesh); // Re-attach to its original parent
  }
  removedRoofMeshes.length = 0;
}

// Make a storage rack empty
function emptyStorageRack(rack: THREE.Group) {
  const meshesToRemove: THREE.Object3D[] = []; // Store meshes to remove

  rack.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name === "Material2" || child.name === "Material2_1") {
        meshesToRemove.push(child); // mark for removal
      }
    }
  });

  // Remove after traversal
  meshesToRemove.forEach((mesh) => {
    if (mesh.parent) {
      mesh.parent.remove(mesh);
    }
  });

  return rack;
}

// Make a storage rack partially empty
function partialStorageRack(rack: THREE.Group) {
  const meshesToRemove: THREE.Object3D[] = []; // Store meshes to remove

  rack.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name === "Material2_1") {
        meshesToRemove.push(child); // mark for removal
      }
    }
  });

  // Remove after traversal
  meshesToRemove.forEach((mesh) => {
    if (mesh.parent) {
      mesh.parent.remove(mesh);
    }
  });

  return rack;
}

// 3D earth to 2D map coordinates
function convert3DEarthTo2DMapCoordinates(
  modelRenderOrigin: [number, number],
  modelRenderAltitude: number
): maplibregl.MercatorCoordinate {
  const modelRenderAsMercatorCoordinate =
    maplibregl.MercatorCoordinate.fromLngLat(
      { lng: modelRenderOrigin[0], lat: modelRenderOrigin[1] },
      modelRenderAltitude
    );

  return modelRenderAsMercatorCoordinate;
}

// Warehouse Model Transformation
function getModelMatrix(
  coord: maplibregl.MercatorCoordinate,
  scale: number,
  rotateX: number,
  rotateY: number
) {
  const translation = new THREE.Matrix4().makeTranslation(
    coord.x,
    coord.y,
    coord.z
  );
  const scaling = new THREE.Matrix4().makeScale(scale, -scale, scale);
  const rotationX = new THREE.Matrix4().makeRotationX(
    degreesToRadians(rotateX)
  );
  const rotationY = new THREE.Matrix4().makeRotationY(
    degreesToRadians(rotateY)
  );

  return translation.multiply(scaling).multiply(rotationX).multiply(rotationY);
}

// all meshes for raycaster to work on
function getAllMeshes(object: THREE.Object3D): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = [];
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry && child.material) {
        meshes.push(child);
      }
    }
  });
  return meshes;
}

export {
  degreesToRadians,
  boundingBoxFlooring,
  removeWarehouseRoof,
  addWarehouseRoof,
  emptyStorageRack,
  partialStorageRack,
  convert3DEarthTo2DMapCoordinates,
  getModelMatrix,
  getAllMeshes,
};
