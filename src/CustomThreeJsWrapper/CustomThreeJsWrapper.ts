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
    // this.fov = (Math.atan(3 / 4) * 180) / Math.PI;
    this.fov = 75;

    const h = this.map.getCanvas().clientHeight;
    const w = this.map.getCanvas().clientWidth;

    this.camera = new THREE.PerspectiveCamera(this.fov, w / h, 0.1, 4000);

    this.cameraSync = new CameraSync(map, this.camera, this.scene);
  }

  repaint() {
    this.map.repaint = true;
  }

  add(object: any) {
    console.log("I am here");
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
