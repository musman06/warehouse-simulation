import * as THREE from "three";
import {
  warehouseGroup,
  warehouseModel,
  robotModel1,
  robotModel2,
  robotModel3,
  forkliftModel1,
  forkliftModel2,
  robotsStartingPointMesh,
  forkliftsStartingPointMesh,
} from "./ModelLoading/CasaGrande/gltfLoader";
import {
  warehouseGroupCornwall,
  warehouseModelCornwall,
} from "./ModelLoading/Cornwall/gltfloader";
import maplibregl from "maplibre-gl";
import {
  removeWarehouseRoof,
  addWarehouseRoof,
  degreesToRadians,
} from "./utils";

import { line5 } from "./NavigationPathRendering/CasaGrande/lineanimation";

// Converting 3D spherical earth coordinates into flat 2D map coordinates
const modelRenderOrigin: [number, number] = [
  -111.77060200008945, 32.86684249587934,
];
const modelRenderAltitude = 0;
const modelRenderAsMercatorCoordinate =
  maplibregl.MercatorCoordinate.fromLngLat(
    modelRenderOrigin,
    modelRenderAltitude
  );

const modelRenderOriginCornwall: [number, number] = [-74.7077, 45.0489];
const modelRenderAltitudeCornwall = 0;
const modelRenderAsMercatorCoordinateCornwall =
  maplibregl.MercatorCoordinate.fromLngLat(
    modelRenderOriginCornwall,
    modelRenderAltitudeCornwall
  );

// Calculating scale factor to scle our model to avoid zoom level issues
const scale = modelRenderAsMercatorCoordinate.meterInMercatorCoordinateUnits();
const scaleCornwall =
  modelRenderAsMercatorCoordinateCornwall.meterInMercatorCoordinateUnits();

// Calculating coordinates for camera position
const cameraX = modelRenderAsMercatorCoordinate.x;
const cameraY = modelRenderAsMercatorCoordinate.y + 5;
const cameraZ = modelRenderAsMercatorCoordinate.z + 20;

// Keep checking every 0.5s until models are available
let modelsLoaded: boolean = false;
let modelsLoadedCornwall: boolean = false;
const waitForModels = setInterval(() => {
  if (
    warehouseModel?.model &&
    robotModel1?.model &&
    robotModel2?.model &&
    robotModel3?.model &&
    forkliftModel1?.model &&
    forkliftModel2?.model &&
    robotsStartingPointMesh &&
    forkliftsStartingPointMesh &&
    warehouseModelCornwall?.model &&
    line5
  ) {
    // scale the models
    warehouseGroup.scale.set(5, 5, 6.45);
    warehouseGroupCornwall.scale.set(5, 5, 6.45);

    warehouseGroup.position.set(
      modelRenderAsMercatorCoordinate.x,
      modelRenderAsMercatorCoordinate.y,
      modelRenderAsMercatorCoordinate.z
    );

    // warehouseGroupCornwall.position.set(
    //   modelRenderAsMercatorCoordinateCornwall.x,
    //   modelRenderAsMercatorCoordinateCornwall.y,
    //   modelRenderAsMercatorCoordinateCornwall.z
    // );

    // scene.add(warehouseGroup);
    scene.add(warehouseGroupCornwall);
    modelsLoaded = true;
    modelsLoadedCornwall = true;
    clearInterval(waitForModels);
  }
}, 500);

// Viewport Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);

// Lights
// // AmbientLight
const ambientLight = new THREE.AmbientLight("white", 5);
scene.add(ambientLight);

// // Directional Light
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.set(
  modelRenderAsMercatorCoordinate.x + 100,
  modelRenderAsMercatorCoordinate.y + 700,
  modelRenderAsMercatorCoordinate.z + 300
);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
scene.add(directionalLight);

// // Point Light
const pointLight1 = new THREE.PointLight("#cdeced", 500, 0);
pointLight1.position.set(0, 30, 130);
pointLight1.castShadow = true;
// scene.add(pointLight1);

const pointLight2 = new THREE.PointLight("#cdeced", 500, 0);
pointLight2.position.set(0, 30, 0);
pointLight2.castShadow = true;
// scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("#cdeced", 500, 0);
pointLight3.position.set(0, 30, -130);
pointLight3.castShadow = true;
// scene.add(pointLight3);

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

// Function to calculate max pitch based on zoom level
// function getMaxPitchForZoom(zoom: number) {
//   if (zoom >= 18) return 90;
//   if (zoom >= 15) return 80;
//   if (zoom >= 12) return 70;
//   if (zoom >= 10) return 60;
//   if (zoom >= 8) return 50;
//   if (zoom >= 6) return 40;
//   return 0; // For zoom levels 2-5
// }

// Function to enforce pitch limit
// function enforcePitchLimit() {
//   const currentZoom = map.getZoom();
//   const currentPitch = map.getPitch();
//   const maxPitch = getMaxPitchForZoom(currentZoom);

//   if (currentPitch > maxPitch) {
//     map.setPitch(maxPitch);
//   }
// }

// Add event listeners
// map.on("zoomend", enforcePitchLimit);
// map.on("load", enforcePitchLimit); // Apply on initial load too

// // Also limit pitch when it's directly changed
// map.on("pitch", enforcePitchLimit);

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

// Add a scale control
map.addControl(new maplibregl.ScaleControl());

// Map custom controls
// // Locations Control
function locationsControls(map: maplibregl.Map): maplibregl.IControl {
  let locationSelected: string = "";

  // Current position button
  const currentPositionContainer = document.createElement("div");
  currentPositionContainer.className = "maplibregl-ctrl maplibregl-ctrl-group";
  currentPositionContainer.style.margin = "10px";
  currentPositionContainer.style.width = "auto"; // Auto width to fit content
  currentPositionContainer.style.minWidth = "80px"; // Minimum width
  currentPositionContainer.style.position = "relative"; // For dropdown positioning

  // Current position button element
  const currentPositionButton = document.createElement("button");
  currentPositionButton.type = "button";
  currentPositionButton.className = "maplibregl-ctrl-icon";
  currentPositionButton.setAttribute("aria-label", "Fly to Warehouse");
  currentPositionButton.style.display = "flex";
  currentPositionButton.style.alignItems = "center";
  currentPositionButton.style.justifyContent = "space-between";
  currentPositionButton.style.width = "100%";
  currentPositionButton.style.height = "40px"; // Increased height
  currentPositionButton.style.padding = "0 10px";
  currentPositionButton.style.cursor = "pointer";

  // Text element
  const currentPositionButtonText = document.createElement("span");
  currentPositionButtonText.textContent = "Locations";
  currentPositionButtonText.style.marginRight = "5px";

  // Icon element
  const currentPositionButtonIcon = document.createElement("span");
  currentPositionButtonIcon.textContent = "📍";
  currentPositionButtonIcon.style.fontSize = "16px";

  // Add text and icon to button
  currentPositionButton.appendChild(currentPositionButtonText);
  currentPositionButton.appendChild(currentPositionButtonIcon);

  // Create dropdown container (initially hidden)
  const dropdown = document.createElement("div");
  dropdown.className = "warehouse-locations-dropdown";
  dropdown.style.display = "none";
  dropdown.style.position = "absolute";
  dropdown.style.top = "100%";
  dropdown.style.left = "0";
  dropdown.style.backgroundColor = "white";
  dropdown.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  dropdown.style.zIndex = "1";
  dropdown.style.width = "100%";
  dropdown.style.borderRadius = "3px";
  dropdown.style.marginTop = "5px";

  // Add Casa Grande location
  const casaGrandeItem = document.createElement("div");
  casaGrandeItem.textContent = "Casa Grande";
  casaGrandeItem.style.padding = "10px";
  casaGrandeItem.style.cursor = "pointer";
  casaGrandeItem.style.borderBottom = "1px solid #e0e0e0";
  casaGrandeItem.addEventListener("mouseenter", () => {
    casaGrandeItem.style.backgroundColor = "#f0f0f0";
  });
  casaGrandeItem.addEventListener("mouseleave", () => {
    casaGrandeItem.style.backgroundColor = "white";
  });
  casaGrandeItem.addEventListener("click", (e) => {
    e.stopPropagation();
    locationSelected = "Casa Grande";
    console.log("locationSelected: ", locationSelected);
    map.flyTo({
      center: [-111.77060200008945, 32.86688980631886],
      zoom: 17,
      speed: 2,
      pitch: 30,
      bearing: -90,
      curve: 1,
      easing: (t: any) => t,
    });
    dropdown.style.display = "none"; // Hide dropdown after selection
  });
  dropdown.appendChild(casaGrandeItem);

  // Add Cornwall location
  const cornwallItem = document.createElement("div");
  cornwallItem.textContent = "Cornwall";
  cornwallItem.style.padding = "10px";
  cornwallItem.style.cursor = "pointer";
  cornwallItem.style.borderBottom = "1px solid #e0e0e0";
  cornwallItem.addEventListener("mouseenter", () => {
    cornwallItem.style.backgroundColor = "#f0f0f0";
  });
  cornwallItem.addEventListener("mouseleave", () => {
    cornwallItem.style.backgroundColor = "white";
  });
  cornwallItem.addEventListener("click", (e) => {
    e.stopPropagation();
    locationSelected = "Cornwall";
    console.log("locationSelected: ", locationSelected);
    map.flyTo({
      center: [-74.707, 45.04946],
      zoom: 16,
      speed: 2,
      pitch: 45,
      bearing: -118,
      curve: 1,
      easing: (t: any) => t,
    });
    dropdown.style.display = "none"; // Hide dropdown after selection
  });
  dropdown.appendChild(cornwallItem);

  // Toggle dropdown display on button click
  currentPositionButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  });

  // Close dropdown when clicking elsewhere
  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });

  // Prevent map clicks from closing dropdown
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Add button and dropdown to container
  currentPositionContainer.appendChild(currentPositionButton);
  currentPositionContainer.appendChild(dropdown);

  return {
    onAdd: function (): HTMLElement {
      return currentPositionContainer;
    },
    onRemove: function () {
      currentPositionContainer.remove();
    },
    getSelectedLocation: () => locationSelected,
  } as any;
}

map.addControl(locationsControls(map), "top-left");

function warehouseControls(
  map: maplibregl.Map,
  getSelectedLocation: () => string
): maplibregl.IControl {
  // Warehouse inside view button
  const warehouseInsideViewContainer = document.createElement("div");
  warehouseInsideViewContainer.className =
    "maplibregl-ctrl maplibregl-ctrl-group";
  warehouseInsideViewContainer.style.margin = "10px";

  // Warehouse view button element
  const warehouseInsideViewButton = document.createElement("button");
  warehouseInsideViewButton.type = "button";
  warehouseInsideViewButton.className = "maplibregl-ctrl-icon";
  warehouseInsideViewButton.setAttribute("aria-label", "Move inside Warehouse");
  warehouseInsideViewButton.style.display = "flex";
  warehouseInsideViewButton.style.alignItems = "center";
  warehouseInsideViewButton.style.justifyContent = "center";
  warehouseInsideViewButton.style.width = "30px";
  warehouseInsideViewButton.style.height = "30px";

  // Warehouse view button icon
  const warehouseInsideViewButtonIcon = document.createElement("span");
  warehouseInsideViewButtonIcon.textContent = "🎦";
  warehouseInsideViewButton.appendChild(warehouseInsideViewButtonIcon);

  let warehouseInsideViewFlag = false;

  warehouseInsideViewButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const selected = getSelectedLocation();
    console.log("selected: ", selected);
    if (!selected) return;

    warehouseInsideViewFlag = !warehouseInsideViewFlag;

    let warehouseCenterLng: number,
      warehouseCenterLat: number,
      insideViewZoom: number,
      insideViewPitch: number,
      insideViewBearing: number;

    if (selected === "Casa Grande") {
      warehouseCenterLng = -111.77060200008945;
      warehouseCenterLat = 32.86684249587934;
      insideViewZoom = 21;
      insideViewPitch = 80;
      insideViewBearing = -90;
    } else if (selected === "Cornwall") {
      warehouseCenterLng = -74.7077;
      warehouseCenterLat = 45.0489;
      insideViewZoom = 21;
      insideViewPitch = 80;
      insideViewBearing = -118;
    } else {
      return; // unknown location
    }

    if (warehouseInsideViewFlag) {
      try {
        // call function to remove warehouse roof and roof's white rods
        removeWarehouseRoof(warehouseModel!);

        // move inside the warehouse
        map.flyTo({
          center: [warehouseCenterLng, warehouseCenterLat],
          zoom: insideViewZoom,
          pitch: insideViewPitch,
          bearing: insideViewBearing,
          duration: 2000,
        });
      } catch (error) {
        console.error("Error handling roof removal:", error);
        // Still try to move the camera even if roof removal fails
        map.flyTo({
          center: [warehouseCenterLng, warehouseCenterLat],
          zoom: insideViewZoom,
          pitch: insideViewPitch,
          bearing: insideViewBearing,
          duration: 2000,
        });
      }
    } else {
      // Similar error handling for adding the roof back
      try {
        addWarehouseRoof();
      } catch (error) {
        console.error("Error handling roof addition:", error);
      }

      // Still move the camera regardless of roof handling
      map.flyTo({
        center: [warehouseCenterLng, warehouseCenterLat],
        zoom: 17,
        pitch: 30,
        bearing: -90,
        duration: 1000,
      });
    }
  });

  // Add the button to the container
  warehouseInsideViewContainer.appendChild(warehouseInsideViewButton);

  return {
    onAdd: function (): HTMLElement {
      return warehouseInsideViewContainer;
    },
    onRemove: function () {
      // Clean up listeners when control is removed
      warehouseInsideViewContainer.remove();
    },
  };
}

const locationControl = locationsControls(map);
map.addControl(
  warehouseControls(map, () => (locationControl as any).getSelectedLocation()),
  "top-right"
);

const clock = new THREE.Clock();
// Custom MapLibre 3D Layer
const customLayer = {
  id: "3D-models-loading",
  type: "custom" as "custom",
  renderingMode: "3d" as "3d",
  map: null as maplibregl.Map | null,
  renderer: null as THREE.WebGLRenderer | null,
  camera: null as THREE.Camera | null,

  onAdd(map: maplibregl.Map, gl: WebGLRenderingContext) {
    camera.position.set(cameraX, cameraY, cameraZ);

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

    const l = getModelMatrix(modelRenderAsMercatorCoordinate, scale, 90, 90);
    const lCornwall = getModelMatrix(
      modelRenderAsMercatorCoordinateCornwall,
      scaleCornwall,
      90,
      118
    );

    const delta = clock.getDelta();

    if (modelsLoaded) {
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
    }

    camera!.projectionMatrix = m.multiply(lCornwall);
    this.renderer!.resetState();
    this.renderer!.render(scene, camera!);
    this.map!.triggerRepaint();
  },
};

// Add custom layer to the map
map.on("style.load", () => {
  map.addLayer(customLayer);
});

function getModelMatrix(
  coord: maplibregl.MercatorCoordinate,
  scale: number,
  rotateX: number,
  rotateY: number
) {
  const translation = new THREE.Matrix4().makeTranslation(
    coord.x,
    coord.y,
    coord.z
  );
  const scaling = new THREE.Matrix4().makeScale(scale, -scale, scale);
  const rotationX = new THREE.Matrix4().makeRotationX(
    degreesToRadians(rotateX)
  );
  const rotationY = new THREE.Matrix4().makeRotationY(
    degreesToRadians(rotateY)
  );

  return translation.multiply(scaling).multiply(rotationX).multiply(rotationY);
}
