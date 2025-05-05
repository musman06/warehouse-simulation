import * as THREE from "three";
import maplibregl from "maplibre-gl";
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
  updateRaycaster,
} from "./ModelLoading/Cornwall/gltfloader";
import { enforcePitchLimit } from "./MapCustomControls/pitchLimitControl";
import { locationsControls } from "./MapCustomControls/LocationControls/locationControls";
import {
  removeWarehouseRoof,
  addWarehouseRoof,
  degreesToRadians,
  convert3DEarthTo2DMapCoordinates,
} from "./utils";

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

// Keep checking every 0.5s until models are available
let modelsLoaded: boolean = false;
let modelsLoadedCornwall: boolean = false;
const waitForModels = setInterval(() => {
  if (
    warehouseModelCasa?.model &&
    robotModel1Casa?.model &&
    robotModel2Casa?.model &&
    robotModel3Casa?.model &&
    forkliftModel1Casa?.model &&
    forkliftModel2Casa?.model &&
    robotsStartingPointMeshCasa &&
    forkliftsStartingPointMeshCasa &&
    warehouseModelCornwall?.model
  ) {
    // scale the models
    warehouseGroupCasa.scale.set(5, 5, 6.45);
    warehouseGroupCornwall.scale.set(5, 5, 6.45);

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
export const camera = new THREE.PerspectiveCamera(
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
  modelRenderAsMercatorCoordinateCornwall.x + 100,
  modelRenderAsMercatorCoordinateCornwall.y + 700,
  modelRenderAsMercatorCoordinateCornwall.z + 300
);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
scene.add(directionalLight);

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

// Add event listeners
// map.on("load", () => enforcePitchLimit(map)); // Apply on initial load too
// map.on("zoomend", () => enforcePitchLimit(map));

// // Also limit pitch when it's directly changed
// map.on("pitch", () => enforcePitchLimit(map));

// Add navigation controls
map.addControl(new maplibregl.NavigationControl());

// Add a scale control
map.addControl(new maplibregl.ScaleControl());

// Define the interface for the location control to ensure type safety
interface LocationControl extends maplibregl.IControl {
  getSelectedLocation: () => string;
}

// Add the control to the map and store the reference
const locationControl = locationsControls(map);
map.addControl(locationControl, "top-left");

// Warehouse Controls
function warehouseControls(
  map: maplibregl.Map,
  locationControlRef: LocationControl
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
  warehouseInsideViewButton.style.opacity = "0.5"; // Initially faded
  warehouseInsideViewButton.style.cursor = "not-allowed"; // Initially not accessible

  // Warehouse view button icon
  const warehouseInsideViewButtonIcon = document.createElement("span");
  warehouseInsideViewButtonIcon.textContent = "🎦";
  warehouseInsideViewButton.appendChild(warehouseInsideViewButtonIcon);

  // Define Casa Grande warehouse settings
  const warehouseCenterLngCasa = -111.77060200008945;
  const warehouseCenterLatCasa = 32.86684249587934;
  const insideViewZoomCasa = 21;
  const insideViewPitchCasa = 80;
  const insideViewBearingCasa = -90;

  // Define Cornwall warehouse settings
  const warehouseCenterLngCornwall = -74.7077;
  const warehouseCenterLatCornwall = 45.0489;
  const insideViewZoomCornwall = 21;
  const insideViewPitchCornwall = 80;
  const insideViewBearingCornwall = -118;

  // Warehouse center variables - will be set based on selected location
  let warehouseCenterLng = warehouseCenterLngCasa; // default
  let warehouseCenterLat = warehouseCenterLatCasa; // default
  let insideViewZoom = insideViewZoomCasa; // default
  let insideViewPitch = insideViewPitchCasa; // default
  let insideViewBearing = insideViewBearingCasa; // default

  let warehouseInsideViewFlag = false;

  // Function to update button state based on location selection
  const updateButtonState = () => {
    // Use the passed locationControlRef instead of trying to access a global variable
    const locationSelected = locationControlRef.getSelectedLocation();

    console.log("Current location selected:", locationSelected);

    if (locationSelected === "") {
      // Disable button if no location is selected
      warehouseInsideViewButton.style.opacity = "0.5";
      warehouseInsideViewButton.style.cursor = "not-allowed";
    } else {
      // Enable button if a location is selected
      warehouseInsideViewButton.style.opacity = "1";
      warehouseInsideViewButton.style.cursor = "pointer";

      // Set the appropriate warehouse parameters based on selected location
      if (locationSelected === "Casa Grande") {
        warehouseCenterLng = warehouseCenterLngCasa;
        warehouseCenterLat = warehouseCenterLatCasa;
        insideViewZoom = insideViewZoomCasa;
        insideViewPitch = insideViewPitchCasa;
        insideViewBearing = insideViewBearingCasa;
      } else if (locationSelected === "Cornwall") {
        warehouseCenterLng = warehouseCenterLngCornwall;
        warehouseCenterLat = warehouseCenterLatCornwall;
        insideViewZoom = insideViewZoomCornwall;
        insideViewPitch = insideViewPitchCornwall;
        insideViewBearing = insideViewBearingCornwall;
      }
    }
  };

  // Initial state setup
  updateButtonState();

  // Check for location change every second
  const locationCheckInterval = setInterval(updateButtonState, 1000);

  warehouseInsideViewButton.addEventListener("click", (e) => {
    e.stopPropagation();

    // Get current selected location using the reference
    const locationSelected = locationControlRef.getSelectedLocation();

    // Only proceed if a location is selected
    if (locationSelected === "") {
      console.log("Please select a location first");
      return;
    }

    warehouseInsideViewFlag = !warehouseInsideViewFlag;

    if (warehouseInsideViewFlag) {
      try {
        // Choose the correct warehouse model based on selected location
        const targetModel =
          locationSelected === "Casa Grande"
            ? warehouseModelCasa
            : warehouseModelCornwall;

        // call function to remove warehouse roof and roof's white rods
        removeWarehouseRoof(targetModel!);

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
        // Choose the correct warehouse model based on selected location
        const targetModel =
          locationSelected === "Casa Grande"
            ? warehouseModelCasa
            : warehouseModelCornwall;
        addWarehouseRoof();
      } catch (error) {
        console.error("Error handling roof addition:", error);
      }

      // Still move the camera regardless of roof handling
      map.flyTo({
        center: [warehouseCenterLng, warehouseCenterLat],
        zoom: locationSelected === "Casa Grande" ? 17 : 16,
        pitch: locationSelected === "Casa Grande" ? 30 : 45,
        bearing: locationSelected === "Casa Grande" ? -90 : -118, // Different bearing for each location
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
      // Clean up listeners and intervals when control is removed
      clearInterval(locationCheckInterval);
      warehouseInsideViewContainer.remove();
    },
  };
}

// Add the warehouse control to the map, passing the locationControl reference
map.addControl(warehouseControls(map, locationControl), "top-right");

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

    const l = getModelMatrix(
      modelRenderAsMercatorCoordinateCasa,
      scale,
      90,
      90
    );
    const lCornwall = getModelMatrix(
      modelRenderAsMercatorCoordinateCornwall,
      scaleCornwall,
      90,
      118
    );

    const delta = clock.getDelta();

    if (modelsLoaded) {
      // Update animation mixer (if available)
      if (robotModel1Casa!.mixer) {
        robotModel1Casa!.mixer.update(delta);
      }

      if (robotModel2Casa!.mixer) {
        robotModel2Casa!.mixer.update(delta);
      }

      if (robotModel3Casa!.mixer) {
        robotModel3Casa!.mixer.update(delta);
      }

      if (warehouseModelCornwall!.model) {
        updateRaycaster();
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
