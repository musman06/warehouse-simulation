import * as THREE from "three";
import {
  boundingBoxHelper,
  warehouseGroup,
  warehouseModel,
  robotModel1,
  robotModel2,
  robotModel3,
  forkliftModel1,
  forkliftModel2,
} from "./gltfloader";
import { line1, line2, line3, line4, line5 } from "./lineanimation";
import { handleCollisions } from "./utils";
import { Model3D } from "./model3DClass";
import maplibregl from "maplibre-gl";

// Converting 3D spherical earth coordinates into flat 2D map coordinates
const modelRenderOrigin: [number, number] = [
  -111.77057205058945, 32.86684249587934,
];
const modelRenderAltitude = 0;
const modelRenderAsMercatorCoordinate =
  maplibregl.MercatorCoordinate.fromLngLat(
    modelRenderOrigin,
    modelRenderAltitude
  );

// Calculating scale factor to scle our model to avoid zoom level issues
const scale = modelRenderAsMercatorCoordinate.meterInMercatorCoordinateUnits();

// Calculating coordinates for camera position
const cameraX = modelRenderAsMercatorCoordinate.x;
const cameraY = modelRenderAsMercatorCoordinate.y + 5; // Move up by 10 meters
const cameraZ = modelRenderAsMercatorCoordinate.z + 20; // Move back by 30 meters

// Function to check and add models once they are loaded
// const checkAndAddModels = () => {
//   if (warehouseModel?.model) {
//     scene.add(warehouseModel.model);
//   }

//   if (robotModel1?.model) {
//     scene.add(robotModel1!.model);
//   }

//   if (robotModel2?.model) {
//     scene.add(robotModel2.model);
//   }

//   if (robotModel3?.model) {
//     scene.add(robotModel3!.model);
//   }

//   if (forkliftModel1?.model) {
//     scene.add(forkliftModel1!.model);
//   }

//   if (forkliftModel2?.model) {
//     scene.add(forkliftModel2!.model);
//   }

//   if (line1) {
//     scene.add(line1);
//   }
//   if (line2) {
//     scene.add(line2);
//   }

//   if (line3) {
//     scene.add(line3);
//   }

//   if (line4) {
//     scene.add(line4);
//   }

//   if (line5) {
//     scene.add(line5);
//   }
// };

// // Keep checking every 0.5s until models are available
// let rows: number;
// let columns: number;
// const cellSize: number = 5;
const waitForModels = setInterval(() => {
  // checkAndAddModels();

  if (
    warehouseModel?.model &&
    robotModel1?.model &&
    robotModel2?.model &&
    robotModel3?.model &&
    forkliftModel1?.model &&
    forkliftModel2?.model &&
    line1 &&
    line2 &&
    line3 &&
    line4 &&
    line5
  ) {
    warehouseGroup.scale.set(5, 5, 6.3);
    scene.add(warehouseGroup);
    scene.add(boundingBoxHelper);
    clearInterval(waitForModels);

    // Calculating Rows & Columns Based On Warehouse Floor
    // const size = new THREE.Vector3();
    // warehouseModel?.boundingBox.getSize(size);
    // rows = Math.floor(size.x / cellSize) + 1;
    // columns = Math.floor(size.z / cellSize) + 1;
    // console.log(rows, columns);
  }
}, 500);

// Viewport Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();
// warehouseGroup.scale.set(5, 5, 7);
// scene.add(warehouseGroup);
// scene.add(boundingBoxHelper);

// Lights
// // AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

// // Directional Light
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.set(45, 15, 45).normalize();
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
scene.add(directionalLight);

// // Point Light
const pointLight1 = new THREE.PointLight("red", 400, 0);
pointLight1.position.set(0, 7, 17.25);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight("red", 400, 0);
pointLight2.position.set(0, 7, 0);
pointLight2.castShadow = true;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("red", 400, 0);
pointLight3.position.set(0, 7, -17.25);
pointLight3.castShadow = true;
scene.add(pointLight3);

// Initialize the map
const map = new maplibregl.Map({
  container: "map", // ID of the HTML div
  style:
    "https://api.maptiler.com/maps/basic-v2/style.json?key=7dFQzHIS1xcksIlnhtW4", // Open-source map style
  center: [-111.77060960151154, 32.86688980631886], // Longitude, Latitude
  zoom: 17, // Zoom level
  maxZoom: 24,
  pitch: 30, // Vertical tilting of the map
  bearing: -90,
  canvasContextAttributes: { antialias: true },
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

// Add a scale control
map.addControl(new maplibregl.ScaleControl());

// Custom MapLibre 3D Layer
const customLayer = {
  id: "3D-models-loading",
  type: "custom" as "custom",
  renderingMode: "3d" as "3d",
  map: null as maplibregl.Map | null,
  renderer: null as THREE.WebGLRenderer | null,
  camera: null as THREE.Camera | null,

  onAdd(map: maplibregl.Map, gl: WebGLRenderingContext) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      4000
    );
    this.camera.position.set(cameraX, cameraY, cameraZ);

    this.map = map;
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(map.getCanvas().width, map.getCanvas().height);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.renderer.autoClear = false;

    const clock = new THREE.Clock();

    // Handle window resize
    window.addEventListener("resize", () => {
      if (this.renderer) {
        const width = map.getCanvas().width;
        const height = map.getCanvas().height;
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
      }
    });
  },
  render(_gl: WebGLRenderingContext, args: any) {
    if (!this.renderer || !this.map) return;

    const m = new THREE.Matrix4().fromArray(
      args.defaultProjectionData.mainMatrix
    );
    const rotationX = new THREE.Matrix4().makeRotationX(Math.PI / 2);
    const rotationY = new THREE.Matrix4().makeRotationY(Math.PI / 2);

    const l = new THREE.Matrix4()
      .makeTranslation(
        modelRenderAsMercatorCoordinate.x,
        modelRenderAsMercatorCoordinate.y,
        modelRenderAsMercatorCoordinate.z
      )
      .scale(new THREE.Vector3(scale, -scale, scale))
      .multiply(rotationX)
      .multiply(rotationY);

    // const delta = clock.getDelta();

    // // Compute the bounding boxes of all the models
    // robotModel1!.boundingBox = new THREE.Box3().setFromObject(
    //   robotModel1!.model
    // );
    // robotModel2!.boundingBox = new THREE.Box3().setFromObject(
    //   robotModel2!.model
    // );
    // robotModel3!.boundingBox = new THREE.Box3().setFromObject(
    //   robotModel3!.model
    // );
    // forkliftModel1!.boundingBox = new THREE.Box3().setFromObject(
    //   forkliftModel1!.model
    // );
    // forkliftModel2!.boundingBox = new THREE.Box3().setFromObject(
    //   forkliftModel2!.model
    // );

    // // Calls the Function for Collision Detection
    // const modelsArray: Model3D[] = [
    //   robotModel1!,
    //   robotModel2!,
    //   robotModel3!,
    //   forkliftModel1!,
    //   forkliftModel2!,
    // ];

    // handleCollisions(modelsArray, cellSize);

    // // Update animation mixer (if available)
    // if (robotModel1!.mixer) {
    //   robotModel1!.mixer.update(delta);
    // }

    // if (robotModel2!.mixer) {
    //   robotModel2!.mixer.update(delta);
    // }

    // if (robotModel3!.mixer) {
    //   robotModel3!.mixer.update(delta);
    // }

    this.camera!.projectionMatrix = m.multiply(l);
    this.renderer!.resetState();
    this.renderer!.render(scene, this.camera!);
    this.map!.triggerRepaint();
  },
};

// Add custom layer to the map
map.on("style.load", () => {
  map.addLayer(customLayer);
});

// Animation Loop
const clock = new THREE.Clock();

const tick = () => {
  const delta = clock.getDelta();

  // Compute the bounding boxes of all the models
  robotModel1!.boundingBox = new THREE.Box3().setFromObject(robotModel1!.model);
  robotModel2!.boundingBox = new THREE.Box3().setFromObject(robotModel2!.model);
  robotModel3!.boundingBox = new THREE.Box3().setFromObject(robotModel3!.model);
  forkliftModel1!.boundingBox = new THREE.Box3().setFromObject(
    forkliftModel1!.model
  );
  forkliftModel2!.boundingBox = new THREE.Box3().setFromObject(
    forkliftModel2!.model
  );

  // Calls the Function for Collision Detection
  const modelsArray: Model3D[] = [
    robotModel1!,
    robotModel2!,
    robotModel3!,
    forkliftModel1!,
    forkliftModel2!,
  ];

  // handleCollisions(modelsArray, cellSize);

  // Update animation mixer (if available)
  if (robotModel1!.mixer) {
    robotModel1!.mixer.update(delta);
  }

  if (robotModel2!.mixer) {
    robotModel2!.mixer.update(delta);
  }

  if (robotModel3!.mixer) {
    robotModel3!.mixer.update(delta);
  }

  // renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
