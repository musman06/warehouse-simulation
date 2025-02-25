import * as THREE from "three";

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const robotTexture = textureLoader.load(
  "/assets/robot/textures/lambert6_diffuse.jpeg"
);
robotTexture.colorSpace = THREE.SRGBColorSpace;

export { robotTexture };
