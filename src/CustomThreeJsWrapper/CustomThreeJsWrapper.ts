import * as THREE from "three";
import CameraSync from "./utility/CameraSync.js";

class CustomThreeJSWrapper {
  map;
  scene;
  camera;
  renderer;
  cameraSync;
  fov;

  constructor(map: maplibregl.Map) {
    this.scene = new THREE.Scene();
    this.map = map;

    const c = map?.getCanvas() as HTMLCanvasElement;
    const gl = c?.getContext("webgl") || c?.getContext("webgl2");

    if (!gl) {
      console.error(
        map.getCanvas(),
        "WebGL 2 is not supported in this environment"
      );
      return;
    }

    // Initialize the WebGLRenderer without explicitly passing the WebGL 1 context
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      canvas: map.getCanvas(),
      context: gl,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.map.getCanvas().clientWidth,
      this.map.getCanvas().clientHeight
    );
    this.renderer.autoClear = false;
    this.fov = (Math.atan(3 / 4) * 180) / Math.PI;
    // this.fov = 75;

    const h = this.map.getCanvas().clientHeight;
    const w = this.map.getCanvas().clientWidth;

    this.camera = new THREE.PerspectiveCamera(this.fov, w / h, 0.1, 4000);

    this.cameraSync = new CameraSync(map, this.camera, this.scene);
  }

  repaint() {
    this.map.repaint = true;
  }

  add(object: any) {
    // console.log("I am here");
    this.scene.add(object);
  }

  setEnvironment() {
    // Sherrif's lighting setup
    const dirLight = new THREE.DirectionalLight(0xffd7b5, 2);
    dirLight.position.set(20, 30, 20);
    dirLight.castShadow = false;
    const hemiLight = new THREE.HemisphereLight("white", "#f88", 1.5);
    const ambientLight = new THREE.AmbientLight("white", 1);
    this.scene.add(dirLight);
    this.scene.add(hemiLight);
    this.scene.add(ambientLight);
  }

  dispose(target: any) {
    if (target instanceof THREE.Mesh) {
      // If the target is a Mesh
      // Dispose materials and geometry of the mesh
      if (target.material) {
        if (
          typeof target.material.dispose === "function" &&
          !target.material._isDisposed
        ) {
          target.material.dispose();
          target.material._isDisposed = true;
        }
        target.material = null;
      }
      if (target.geometry) {
        if (
          typeof target.geometry.dispose === "function" &&
          !target.geometry._isDisposed
        ) {
          target.geometry.dispose();
          target.geometry._isDisposed = true;
        }
        target.geometry = null;
      }
    } else if (target instanceof THREE.Object3D) {
      // If the target is an Object3D
      target.removeFromParent();
      this.disposeObject(target);
    }
  }

  disposeObject(object: any) {
    object.traverse((child: any) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            this.disposeMaterial(material);
          });
        } else {
          this.disposeMaterial(child.material);
        }
      }
      if (child instanceof THREE.Mesh && child.geometry) {
        this.disposeGeometry(child.geometry);
      }
      if (child instanceof THREE.Mesh && child.material && child.material.map) {
        this.disposeTexture(child.material.map);
      }
      requestAnimationFrame(() => (child.children.length = 0));
    });

    if (object.parent) {
      object.parent.remove(object);
    }
  }

  disposeMaterial(material: any) {
    if (material.dispose) {
      material.dispose();
    }
  }

  //  to dispose of a texture
  disposeTexture(texture: any) {
    if (texture.dispose) {
      texture.dispose();
    }
  }

  //  to dispose of a geometry
  disposeGeometry(geometry: any) {
    if (geometry.dispose) {
      geometry.dispose();
    }
  }

  remove(object: any) {
    this.scene.remove(object);
    object = null;
  }

  resize() {
    if (!this.camera || !this.renderer || !this.map) return;

    const canvas = this.map.getCanvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  update() {
    if (this.map.repaint) this.map.repaint = false;
    // console.log("I am here");
    this.scene.updateMatrixWorld(true);

    // Render the scene and repaint the map
    // console.log("I am here");
    this.renderer!.resetState(); //update threejs r126
    // console.log("I am here");
    this.renderer!.render(this.scene, this.camera!);
    // console.log("I am here");
  }
}

export default CustomThreeJSWrapper;
