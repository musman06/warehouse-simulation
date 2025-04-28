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
} from "./gltfloader";
import { Model3D } from "./model3DClass";
import maplibregl from "maplibre-gl";
import { removeWarehouseRoof, addWarehouseRoof } from "./utils";

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

// Calculating scale factor to scle our model to avoid zoom level issues
const scale = modelRenderAsMercatorCoordinate.meterInMercatorCoordinateUnits();

// Calculating coordinates for camera position
const cameraX = modelRenderAsMercatorCoordinate.x;
const cameraY = modelRenderAsMercatorCoordinate.y + 5;
const cameraZ = modelRenderAsMercatorCoordinate.z + 20;

// Keep checking every 0.5s until models are available
let modelsLoaded: boolean = false;
const waitForModels = setInterval(() => {
  if (
    warehouseModel?.model &&
    robotModel1?.model &&
    robotModel2?.model &&
    robotModel3?.model &&
    forkliftModel1?.model &&
    forkliftModel2?.model &&
    robotsStartingPointMesh &&
    forkliftsStartingPointMesh
  ) {
    warehouseGroup.scale.set(5, 5, 6.45);
    scene.add(warehouseGroup);
    modelsLoaded = true;
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
directionalLight.position.set(45, 15, 45).normalize();
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
scene.add(directionalLight);

// // Point Light
const pointLight1 = new THREE.PointLight("red", 8000, 0);
pointLight1.position.set(0, 35, 130);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight("red", 8000, 0);
pointLight2.position.set(0, 35, 0);
pointLight2.castShadow = true;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("red", 8000, 0);
pointLight3.position.set(0, 35, -130);
pointLight3.castShadow = true;
scene.add(pointLight3);

// Initialize the map
const map = new maplibregl.Map({
  container: "map", // ID of the HTML div
  style:
    "https://api.maptiler.com/maps/basic-v2/style.json?key=7dFQzHIS1xcksIlnhtW4", // Open-source map style
  center: [-111.77060200008945, 32.86688980631886], // Longitude, Latitude
  zoom: 17,
  maxZoom: 22,
  minZoom: 2,
  pitch: 30, // Vertical tilting of the map
  bearing: -90, // rotating the map
  canvasContextAttributes: { antialias: true },
});

// Function to calculate max pitch based on zoom level
function getMaxPitchForZoom(zoom: number) {
  if (zoom >= 18) return 90;
  if (zoom >= 15) return 80;
  if (zoom >= 12) return 70;
  if (zoom >= 10) return 60;
  if (zoom >= 8) return 50;
  if (zoom >= 6) return 40;
  return 0; // For zoom levels 2-5
}

// Function to enforce pitch limit
function enforcePitchLimit() {
  const currentZoom = map.getZoom();
  const currentPitch = map.getPitch();
  const maxPitch = getMaxPitchForZoom(currentZoom);

  if (currentPitch > maxPitch) {
    map.setPitch(maxPitch);
  }
}

// Add event listeners
map.on("zoomend", enforcePitchLimit);
map.on("load", enforcePitchLimit); // Apply on initial load too

// Also limit pitch when it's directly changed
map.on("pitch", enforcePitchLimit);

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

// Add a scale control
map.addControl(new maplibregl.ScaleControl());

// Map custom controls
// // Locations Control
function locationsControls(map: maplibregl.Map): maplibregl.IControl {
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
  };
}

map.addControl(locationsControls(map), "top-left");

function warehouseControls(map: maplibregl.Map): maplibregl.IControl {
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

  // Define warehouse settings
  const warehouseCenterLng = -111.77060200008945;
  const warehouseCenterLat = 32.86684249587934;
  const insideViewZoom = 21;
  const insideViewPitch = 80;
  const insideViewBearing = -90;

  let warehouseInsideViewFlag = false;
  const removedRoofMeshes: { mesh: THREE.Mesh; parent: THREE.Object3D }[] = [];

  warehouseInsideViewButton.addEventListener("click", (e) => {
    e.stopPropagation();
    warehouseInsideViewFlag = !warehouseInsideViewFlag;

    if (warehouseInsideViewFlag) {
      // Remove warehouse roof mesh
      // console.log("warehouseModel is:", warehouseModel);
      // console.log("warehouseModel.model is:", warehouseModel?.model);

      try {
        removeWarehouseRoof(warehouseModel!);

        // Now that the roof removal is successful, move the camera
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
        addWarehouseRoof(warehouseModel!);
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

map.addControl(warehouseControls(map), "top-right");

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

    const l = new THREE.Matrix4()
      .makeTranslation(
        modelRenderAsMercatorCoordinate.x,
        modelRenderAsMercatorCoordinate.y,
        modelRenderAsMercatorCoordinate.z
      )
      .scale(new THREE.Vector3(scale, -scale, scale))
      .multiply(rotationX)
      .multiply(rotationY);

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

    camera!.projectionMatrix = m.multiply(l);
    this.renderer!.resetState();
    this.renderer!.render(scene, camera!);
    this.map!.triggerRepaint();
  },
};

// Add custom layer to the map
map.on("style.load", () => {
  map.addLayer(customLayer);
});
