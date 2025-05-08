import * as THREE from "three";
import maplibregl from "maplibre-gl";
import CustomThreeJSWrapper from "./CustomThreeJsWrapper/CustomThreeJsWrapper";
import {
  warehouseGroupCasa,
  warehouseModelCasa,
  robotModel1Casa,
  robotModel2Casa,
  robotModel3Casa,
  forkliftModel1Casa,
  forkliftModel2Casa,
  robotsStartingPointMeshCasa,
  forkliftsStartingPointMeshCasa,
} from "./ModelLoading/CasaGrande/gltfLoader";
import {
  warehouseGroupCornwall,
  warehouseModelCornwall,
  robotModel1Cornwall,
  robotModel2Cornwall,
  robotModel3Cornwall,
  forkliftModel1Cornwall,
  forkliftModel2Cornwall,
} from "./ModelLoading/Cornwall/gltfloader";
import { enforcePitchLimit } from "./MapCustomControls/pitchLimitControl";
import { locationsControls } from "./MapCustomControls/LocationControls/locationControls";
import { warehouseControls } from "./MapCustomControls/warehouseInsideViewControl";
import { convert3DEarthTo2DMapCoordinates, getModelMatrix } from "./utils";
import { projectToWorld } from "./CustomThreeJsWrapper/utility/utility";

// Converting 3D spherical earth coordinates into flat 2D map coordinates
// // Casa Grande Coordiantes
const modelRenderAsMercatorCoordinateCasa = convert3DEarthTo2DMapCoordinates(
  [-111.77060200008945, 32.86684249587934],
  0
);

// // Cornwall Coordinates
const modelRenderAsMercatorCoordinateCornwall =
  convert3DEarthTo2DMapCoordinates([-74.7077, 45.0489], 0);

// Calculating scale factor to scle our model to avoid zoom level issues
const scale =
  modelRenderAsMercatorCoordinateCasa.meterInMercatorCoordinateUnits();
const scaleCornwall =
  modelRenderAsMercatorCoordinateCornwall.meterInMercatorCoordinateUnits();

// // Keep checking every 0.5s until models are available
// let modelsLoaded: boolean = false;
// let modelsLoadedCornwall: boolean = false;
// const waitForModels = setInterval(() => {
//   if (
//     warehouseModelCasa?.model &&
//     robotModel1Casa?.model &&
//     robotModel2Casa?.model &&
//     robotModel3Casa?.model &&
//     forkliftModel1Casa?.model &&
//     forkliftModel2Casa?.model &&
//     robotsStartingPointMeshCasa &&
//     forkliftsStartingPointMeshCasa &&
//     warehouseModelCornwall?.model
//   ) {
//     // scale the models
//     warehouseGroupCasa.scale.set(5, 5, 6.45);
//     warehouseGroupCornwall.scale.set(5, 5, 6.45);

//     // scene.add(warehouseGroup);
//     // scene.add(warehouseGroupCornwall);
//     customThreewrapper.add(warehouseGroupCornwall);
//     modelsLoaded = true;
//     modelsLoadedCornwall = true;

//     // Add the warehouse control to the map, passing the locationControl reference
//     map.addControl(
//       warehouseControls(
//         map,
//         locationControl,
//         warehouseModelCasa!,
//         warehouseModelCornwall!
//       ),
//       "top-right"
//     );

//     clearInterval(waitForModels);
//   }
// }, 500);

// Viewport Sizes
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// Scene
// const scene = new THREE.Scene();

// Camera
// export const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   4000
// );

// Initialize the map
const map = new maplibregl.Map({
  container: "map", // ID of the HTML div
  style:
    "https://api.maptiler.com/maps/basic-v2/style.json?key=7dFQzHIS1xcksIlnhtW4", // Open-source map style
  // center: [-111.77060200008945, 32.86688980631886], // Longitude, Latitude of warehousemodel
  center: [-74.707, 45.04946], // Longitude, Latitude of warehousemodelCornwall
  zoom: 16,
  // zoom: 17,
  maxZoom: 22,
  minZoom: 2,
  // pitch: 30,
  // bearing: -90,
  pitch: 45, // Vertical tilting of the map
  bearing: -118, // rotating the map
  canvasContextAttributes: { antialias: true },
});

// initialising customThreeJSWrapper
const customThreewrapper = new CustomThreeJSWrapper(map);

// Keep checking every 0.5s until models are available
let modelsLoaded: boolean = false;
let modelsLoadedCornwall: boolean = false;
const waitForModels = setInterval(() => {
  if (
    warehouseModelCornwall?.model &&
    robotModel1Cornwall?.model &&
    robotModel2Cornwall?.model &&
    robotModel3Cornwall?.model &&
    forkliftModel1Cornwall?.model &&
    forkliftModel2Cornwall?.model &&
    robotsStartingPointMeshCasa &&
    forkliftsStartingPointMeshCasa
  ) {
    // scale the models
    // warehouseGroupCasa.scale.set(5, 5, 6.45);
    warehouseGroupCornwall.scale.set(5000, 5000, 6000.45);

    let boundingBox = new THREE.Box3().setFromObject(warehouseGroupCornwall);
    const boundingBoxHelper = new THREE.Box3Helper(boundingBox, 0xff0000); // red color
    console.log("boundingBoxHelper", boundingBox);
    customThreewrapper.add(boundingBoxHelper);

    // Position model
    const worldPosition = projectToWorld([-74.7077, 45.0489]);
    warehouseGroupCornwall.position.set(worldPosition.x, worldPosition.y, 0);

    // scene.add(warehouseGroup);
    // scene.add(warehouseGroupCornwall);
    customThreewrapper.add(warehouseGroupCornwall);
    modelsLoaded = true;
    modelsLoadedCornwall = true;

    // Add the warehouse control to the map, passing the locationControl reference
    map.addControl(
      warehouseControls(
        map,
        locationControl,
        warehouseModelCasa!,
        warehouseModelCornwall!
      ),
      "top-right"
    );

    clearInterval(waitForModels);
  }
}, 500);

// Lights
// // AmbientLight
const ambientLight = new THREE.AmbientLight("white", 5);
// scene.add(ambientLight);
customThreewrapper.add(ambientLight);

console.log(
  "modelRenderAsMercatorCoordinateCornwall: ",
  modelRenderAsMercatorCoordinateCornwall,
  modelRenderAsMercatorCoordinateCasa
);
// // Directional Light
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.set(
  modelRenderAsMercatorCoordinateCornwall.x + 100,
  modelRenderAsMercatorCoordinateCornwall.y + 700,
  modelRenderAsMercatorCoordinateCornwall.z + 300
);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
// scene.add(directionalLight);
customThreewrapper.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  200
);
customThreewrapper.add(directionalLightHelper);

// Add event listeners
// map.on("load", () => enforcePitchLimit(map)); // Apply on initial load too
// map.on("zoomend", () => enforcePitchLimit(map));

// // Also limit pitch when it's directly changed
// map.on("pitch", () => enforcePitchLimit(map));

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

// Add a scale control
map.addControl(new maplibregl.ScaleControl());

// Add the control to the map and store the reference
const locationControl = locationsControls(map);
map.addControl(locationControl, "top-left");

// Custom MapLibre 3D Layer
const customLayer = {
  id: "3D-models-loading",
  type: "custom" as "custom",
  renderingMode: "3d" as "3d",
  // map: null as maplibregl.Map | null,
  // renderer: null as THREE.WebGLRenderer | null,
  // camera: null as THREE.Camera | null,

  onAdd(map: maplibregl.Map, gl: WebGLRenderingContext) {
    // this.map = map;
    // this.renderer = new THREE.WebGLRenderer({
    //   canvas: map.getCanvas(),
    //   context: gl,
    //   antialias: true,
    // });
    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.renderer.setSize(map.getCanvas().width, map.getCanvas().height);
    // this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    // this.renderer.autoClear = false;
    // Handle window resize
    // window.addEventListener("resize", () => {
    //   if (this.renderer) {
    //     const width = map.getCanvas().width;
    //     const height = map.getCanvas().height;
    //     this.renderer.setSize(width, height);
    //     this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    //   }
    // });
    console.log("onAdd _initThreebox");
  },
  render(_gl: WebGLRenderingContext, args: any) {
    // if (!this.renderer || !this.map) return;

    // const m = new THREE.Matrix4().fromArray(
    //   args.defaultProjectionData.mainMatrix
    // );

    // const l = getModelMatrix(
    //   modelRenderAsMercatorCoordinateCasa,
    //   scale,
    //   90,
    //   90
    // );
    // const lCornwall = getModelMatrix(
    //   modelRenderAsMercatorCoordinateCornwall,
    //   scaleCornwall,
    //   90,
    //   118
    // );

    customThreewrapper.update();
    // customThreewrapper.camera!.projectionMatrix = m.multiply(lCornwall);
    map.repaint = true;
    // console.log("I am being called: ", customThreewrapper);

    // camera!.projectionMatrix = m.multiply(lCornwall);
    // this.renderer!.resetState();
    // this.renderer!.render(scene, camera!);
    // this.map!.triggerRepaint();
  },
};

// Add custom layer to the map
map.on("style.load", () => {
  map.addLayer(customLayer);
});
