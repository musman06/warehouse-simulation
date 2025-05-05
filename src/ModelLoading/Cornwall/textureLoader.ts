import * as THREE from "three";

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const robotTexture = textureLoader.load(
  "/assets/robot/textures/lambert6_diffuse.jpeg"
);
robotTexture.colorSpace = THREE.SRGBColorSpace;

const forkliftTexture = textureLoader.load(
  "/assets/forkliftGLTF/textures/Forklift_A01_PR_V_NVD_01.usd.png"
);
forkliftTexture.colorSpace = THREE.SRGBColorSpace;

export { robotTexture, forkliftTexture };
