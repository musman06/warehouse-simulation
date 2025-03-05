import * as THREE from "three";

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const robotTexture = textureLoader.load(
  "/assets/robot/textures/lambert6_diffuse.jpeg"
);
robotTexture.colorSpace = THREE.SRGBColorSpace;

const forkliftTexture = textureLoader.load(
  "/assets/forkliftGLTF/textures/T_Forklift_A1_Albedo.1001.png"
);
forkliftTexture.colorSpace = THREE.SRGBColorSpace;

export { robotTexture, forkliftTexture };
