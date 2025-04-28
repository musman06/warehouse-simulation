import * as THREE from "three";
import { Model3D } from "./model3DClass";
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

const removedRoofMeshes: { mesh: THREE.Mesh; parent: THREE.Object3D }[] = [];

// Remove Warehouse roof
function removeWarehouseRoof(warehouseModel: Model3D) {
  const meshesToRemove: { mesh: THREE.Mesh; parent: THREE.Object3D }[] = [];

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
    removedRoofMeshes.push({ mesh, parent });
    parent.remove(mesh);
  }
}

// Add Warehouse roof
function addWarehouseRoof(warehouseModel: Model3D) {
  for (const { mesh, parent } of removedRoofMeshes) {
    parent.add(mesh); // Re-attach to its original parent
  }
  removedRoofMeshes.length = 0;
}

export {
  degreesToRadians,
  boundingBoxFlooring,
  removeWarehouseRoof,
  addWarehouseRoof,
};
