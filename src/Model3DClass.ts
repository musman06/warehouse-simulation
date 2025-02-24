import * as THREE from "three";

export class Model3D {
  name: string;
  model: THREE.Group;
  modelTypePriority: number;
  modelPriority: number;
  mixer: THREE.AnimationMixer;
  boundingBox: THREE.Box3;
  occupiedCells: {
    previousCell: {
      x: number;
      z: number;
    };
    currentCell: {
      x: number;
      z: number;
    };
    nextCell: {
      x: number;
      z: number;
    };
  };

  constructor(
    name: string,
    model: THREE.Group,
    modelTypePriority: number,
    modelPriority: number
  ) {
    this.name = name;
    this.model = model;
    this.modelTypePriority = modelTypePriority;
    this.modelPriority = modelPriority;
    this.mixer = new THREE.AnimationMixer(model);
    this.boundingBox = new THREE.Box3();
    this.occupiedCells = {
      previousCell: { x: -1, z: -1 },
      currentCell: { x: -1, z: -1 },
      nextCell: { x: -1, z: -1 },
    };
  }
}
