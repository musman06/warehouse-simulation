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
  }
}
