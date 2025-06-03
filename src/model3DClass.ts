import * as THREE from "three";

export class Model3D {
  name: string;
  model: THREE.Group;
  mixer: THREE.AnimationMixer;
  isStopped: boolean;

  constructor(name: string, model: THREE.Group) {
    this.name = name;
    this.model = model;
    this.mixer = new THREE.AnimationMixer(model);
    this.isStopped = false;

    // Set model name on the root and all children
    this.setModelNameRecursively(this.model, name);
  }

  private setModelNameRecursively(object: THREE.Object3D, modelName: string) {
    object.userData.modelName = modelName;
    object.children.forEach((child) => {
      this.setModelNameRecursively(child, modelName);
    });
  }
}
