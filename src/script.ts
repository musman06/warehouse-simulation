import * as THREE from "three";
import {
  warehouseGroup,
  warehouseModel,
  warehouseModelFloor,
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
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as YUKA from "yuka";
import { createGraphHelper } from "./graphHelper";
import { createConvexRegionHelper } from "./navmeshHelper";
// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
// import { initNavigation } from "./navmesh";

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
    warehouseGroup.scale.set(5, 5, 6.45);
    // scene.add(warehouseGroup);
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

// Vehicle
const vehicleGeometry = new THREE.ConeGeometry(0.125, 0.5, 16);
vehicleGeometry.rotateX(Math.PI * 0.5);
vehicleGeometry.translate(0, 0.25, 0);

const vehicleMaterial = new THREE.MeshNormalMaterial();

const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
vehicleMesh.position.set(10, -6, 10);
vehicleMesh.matrixAutoUpdate = false;
scene.add(vehicleMesh);

function sync(entity: any, renderComponent: any) {
  renderComponent.matrix.copy(entity.worldMatrix);
}

const entityManager = new YUKA.EntityManager();
const followPathBehavior = new YUKA.FollowPathBehavior();
followPathBehavior.active = false;
followPathBehavior.nextWaypointDistance = 0.5;

const loader = new GLTFLoader();
let model: any;

loader.load("/assets/warehouseFloor/navmesh.glb", (glb) => {
  model = glb.scene;
  scene.add(model);
});

const navmeshLoader = new YUKA.NavMeshLoader();
navmeshLoader
  .load("/assets/warehouseFloor/navmesh.glb")
  .then((navigationMesh) => {
    const navMesh = navigationMesh;

    const graph = navMesh.graph;
    const graphHelper = createGraphHelper(graph, 0.2);
    scene.add(graphHelper!);

    const navMeshGroup = createConvexRegionHelper(navMesh);
    console.log("NavMesh group:", navMeshGroup);
    console.log("NavMesh children:", navMeshGroup.children.length);
    console.log("NavMesh position:", navMeshGroup.position);

    navMeshGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true; // Not necessary for raycasting, but good practice
        child.receiveShadow = true;
        child.frustumCulled = false; // Ensure it's not removed from rendering
        child.visible = true;
        navMeshGroup.scale.set(1, 1, 1);
        navMeshGroup.updateMatrixWorld(true);
      }
    });

    const testChild = navMeshGroup.children[0];
    if (testChild instanceof THREE.Mesh) {
      console.log(
        "First Child World Position:",
        testChild.getWorldPosition(new THREE.Vector3())
      );
    }

    scene.add(navMeshGroup);

    const vehicle = new YUKA.Vehicle();
    vehicle.position.set(9, 4, -40); // Set your desired position
    vehicle.scale.set(1.5, 1.5, 1.5);

    // Sync Three.js Mesh with Yuka Vehicle
    vehicleMesh.position.set(
      vehicle.position.x,
      vehicle.position.y,
      vehicle.position.z
    );
    vehicleMesh.scale.set(vehicle.scale.x, vehicle.scale.y, vehicle.scale.z);

    // Update the transformation matrix
    vehicleMesh.updateMatrix();
    vehicle.setRenderComponent(vehicleMesh, sync);
    entityManager.add(vehicle);
    vehicle.steering.add(followPathBehavior);

    const mousePosition = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    raycaster.far = 1000;

    const bbox = new THREE.BoxHelper(navMeshGroup, 0xff0000);
    scene.add(bbox);

    window.addEventListener("click", (e) => {
      console.log("I am clicked");

      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mousePosition, camera);

      // Fix: Use `intersectObjects` if navMeshGroup is a Group
      const intersects = raycaster.intersectObjects(
        navMeshGroup.children,
        true
      );

      console.log("Intersects length is:", intersects.length);
      if (intersects.length === 0) {
        const targetPosition = new THREE.Vector3(
          mousePosition.x,
          1,
          mousePosition.y
        );
        console.log("Clicked Position:", targetPosition);
        findPathTo(targetPosition);
      } else {
        console.warn("Raycast did not hit the NavMesh.");
      }
    });

    function findPathTo(target: THREE.Vector3) {
      const from = new YUKA.Vector3(
        vehicle.position.x,
        vehicle.position.y,
        vehicle.position.z
      );
      const to = new YUKA.Vector3(target.x, target.y, target.z);

      console.log("Finding Path From:", from, "To:", to);

      const path = navMesh.findPath(from, to);

      if (path.length > 0) {
        console.log("Path Found:", path);

        // Retrieve the existing behavior
        const followPathBehavior = vehicle.steering.behaviors.find(
          (behavior) => behavior instanceof YUKA.FollowPathBehavior
        ) as YUKA.FollowPathBehavior;

        if (followPathBehavior) {
          followPathBehavior.active = true;
          followPathBehavior.path.clear();

          for (let point of path) {
            followPathBehavior.path.add(point);
          }

          console.log("Path assigned to vehicle.");
        } else {
          console.warn("FollowPathBehavior not found.");
        }
      } else {
        console.warn("No path found!");
      }
    }
  });

const time = new YUKA.Time();

// loader.load(
//   "/assets/warehouseFloor/navmesh.glb",
//   (gltf) => {
//     const navMesh = gltf.scene;
//     scene.add(navMesh); // Add to the scene for visualization

//     // Optional: Make the NavMesh semi-transparent
//     navMesh.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         child.material = new THREE.MeshBasicMaterial({
//           color: 0x00ff00, // Green for visualization
//           wireframe: true, // Wireframe for clear visualization
//           transparent: true,
//           opacity: 0.5,
//         });
//       }
//     });

//     console.log("NavMesh loaded:", navMesh);
//   },
//   undefined,
//   (error) => {
//     console.error("Error loading NavMesh:", error);
//   }
// );

// loader.load("/assets/warehouseFloor/navmesh.glb", (gltf) => {
//   const navMesh = gltf.scene;
//   navMesh.scale.set(3.8, 3, 2.5);
//   navMesh.rotateY(Math.PI / 2);
//   navMesh.position.x = 51;
//   navMesh.position.z = -110;
//   // scene.add(navMesh);

//   let yukaNavMesh;
//   navMesh.traverse((child) => {
//     if (child instanceof THREE.Mesh) {
//       // Convert Three.js geometry to Yuka NavMesh
//       const geometry = child.geometry;

//       // Create Yuka NavMesh builder
//       const navMeshBuilder = new YUKA.NavMeshBuilder();

//       // Get vertices and indices from geometry
//       const position = geometry.attributes.position;
//       const index = geometry.index;

//       // Get vertices and indices from geometry
//       // const vertices = Array.from(geometry.attributes.position.array);
//       // const indices = geometry.index ? Array.from(geometry.index.array) : [];

//       // Create Yuka NavMesh
//       yukaNavMesh = new YUKA.NavMesh();

//       // Create polygons from geometry
//       const polygons = [];

//       if (index) {
//         // For indexed geometry
//         for (let i = 0; i < index.count; i += 3) {
//           const a = index.getX(i);
//           const b = index.getX(i + 1);
//           const c = index.getX(i + 2);

//           const va = new YUKA.Vector3(
//             position.getX(a),
//             position.getY(a),
//             position.getZ(a)
//           );

//           const vb = new YUKA.Vector3(
//             position.getX(b),
//             position.getY(b),
//             position.getZ(b)
//           );

//           const vc = new YUKA.Vector3(
//             position.getX(c),
//             position.getY(c),
//             position.getZ(c)
//           );

//           // Create a polygon (triangle) for the navmesh
//           const polygon = new YUKA.Polygon();
//           polygon.addVertex(va);
//           polygon.addVertex(vb);
//           polygon.addVertex(vc);
//           polygons.push(polygon);
//         }
//       } else {
//         // For non-indexed geometry
//         for (let i = 0; i < position.count; i += 3) {
//           const va = new YUKA.Vector3(
//             position.getX(i),
//             position.getY(i),
//             position.getZ(i)
//           );

//           const vb = new YUKA.Vector3(
//             position.getX(i + 1),
//             position.getY(i + 1),
//             position.getZ(i + 1)
//           );

//           const vc = new YUKA.Vector3(
//             position.getX(i + 2),
//             position.getY(i + 2),
//             position.getZ(i + 2)
//           );

//           const polygon = new YUKA.Polygon();
//           polygon.addVertex(va);
//           polygon.addVertex(vb);
//           polygon.addVertex(vc);
//           polygons.push(polygon);
//         }
//       }

//       // Build the navmesh from polygons
//       yukaNavMesh.fromPolygons(polygons);

//       // Create spatial index with all 6 required parameters
//       const bbox = yukaNavMesh.boundingBox;
//       const spatialIndex = new YUKA.CellSpacePartitioning(
//         bbox.min,
//         bbox.max,
//         10, // cellsX
//         10, // cellsY
//         10, // cellsZ
//         yukaNavMesh.polygons // regions
//       );
//       yukaNavMesh.spatialIndex = spatialIndex;

//       console.log("Yuka NavMesh created");

//       // Create edges visualization
//       const edges = new EdgesGeometry(child.geometry);
//       const lineMaterial = new LineBasicMaterial({ color: 0xff0000 }); // Red edges
//       const wireframe = new LineSegments(edges, lineMaterial);
//       wireframe.scale.set(3.8, 3, 2.5);
//       wireframe.rotateY(Math.PI / 2);
//       wireframe.position.x = 51;
//       wireframe.position.z = -110;
//       // scene.add(wireframe);
//     }
//   });

//   console.log("NavMesh loaded and visualized");

//   console.log("NavMesh loaded and visualized");
// });

// const exporter = new GLTFExporter();
setTimeout(() => {}, 5000);

// function exportToGLB(mesh: THREE.Mesh) {
//   const exporter = new GLTFExporter();

//   // Export as a GLB (binary format)
//   exporter.parse(
//     mesh,
//     (result) => {
//       console.log("Export result:", result);

//       if (result instanceof ArrayBuffer) {
//         console.log("I am called");
//         const blob = new Blob([result], { type: "model/gltf-binary" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = "model.glb";
//         document.body.appendChild(link);
//         console.log("Link clicked");
//         link.click();
//         document.body.removeChild(link);
//       } else if (typeof result === "object") {
//         console.log("Converting JSON to GLB...");
//         const json = JSON.stringify(result);
//         const blob = new Blob([json], { type: "application/json" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = "model.gltf";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         console.error("Export failed: Expected GLB but got JSON.");
//       }
//     },
//     { binary: true } as any
//   );
// }

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);

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
  center: [-111.77060200008945, 32.86688980631886], // Longitude, Latitude
  zoom: 17,
  maxZoom: 22,
  minZoom: 2,
  pitch: 30, // Vertical tilting of the map
  bearing: -90, // rotatiting the map
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
    // console.log("Locations button clicked");
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
    onAdd: function (map: maplibregl.Map): HTMLElement {
      return currentPositionContainer;
    },
    onRemove: function (map: maplibregl.Map) {
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
  const longitudeRange = 0.00095; // Adjust for desired longitude constraint
  const latitudeRange = 0.0001; // Small latitude range as requested
  const insideViewZoom = 21;
  const insideViewPitch = 80;
  const insideViewBearing = -90;

  let warehouseInsideViewFlag = false;
  let moveListener: any = null;
  let zoomListener: any = null;

  warehouseInsideViewButton.addEventListener("click", (e) => {
    e.stopPropagation();
    warehouseInsideViewFlag = !warehouseInsideViewFlag;
    // console.log(
    //   "Warehouse view button clicked, inside view:",
    //   warehouseInsideViewFlag
    // );

    if (warehouseInsideViewFlag) {
      // Set camera to inside view
      map.flyTo({
        center: [warehouseCenterLng, warehouseCenterLat],
        zoom: insideViewZoom,
        pitch: insideViewPitch,
        bearing: insideViewBearing,
        duration: 2000,
      });

      // Add constraints after the flyTo animation completes
      setTimeout(() => {
        // Remove any existing listeners first
        if (moveListener) {
          map.off("move", moveListener);
        }
        if (zoomListener) {
          map.off("zoom", zoomListener);
        }

        // Add move listener to constrain position
        moveListener = function () {
          const currentCenter = map.getCenter();
          const currentLng = currentCenter.lng;
          const currentLat = currentCenter.lat;
          let needsUpdate = false;
          let newLng = currentLng;
          let newLat = currentLat;

          // Check longitude bounds
          if (
            currentLng < warehouseCenterLng - longitudeRange ||
            currentLng > warehouseCenterLng + longitudeRange
          ) {
            newLng = Math.max(
              warehouseCenterLng - longitudeRange,
              Math.min(warehouseCenterLng + longitudeRange, currentLng)
            );
            needsUpdate = true;
          }

          // Check latitude bounds
          if (
            currentLat < warehouseCenterLat - latitudeRange ||
            currentLat > warehouseCenterLat + latitudeRange
          ) {
            newLat = Math.max(
              warehouseCenterLat - latitudeRange,
              Math.min(warehouseCenterLat + latitudeRange, currentLat)
            );
            needsUpdate = true;
          }

          // Update center if needed
          if (needsUpdate) {
            map.setCenter([newLng, newLat]);
          }
        };

        // Add zoom listener to maintain fixed zoom level
        zoomListener = function () {
          const currentZoom = map.getZoom();
          if (currentZoom !== insideViewZoom) {
            map.setZoom(insideViewZoom);
          }
        };

        map.on("move", moveListener);
        map.on("zoom", zoomListener);
      }, 2000); // Wait for flyTo animation to complete
    } else {
      // Remove constraints when exiting inside view
      if (moveListener) {
        map.off("move", moveListener);
        moveListener = null;
      }
      if (zoomListener) {
        map.off("zoom", zoomListener);
        zoomListener = null;
      }

      // Set camera to outside view
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
    onAdd: function (map: maplibregl.Map): HTMLElement {
      return warehouseInsideViewContainer;
    },
    onRemove: function (map: maplibregl.Map) {
      // Clean up listeners when control is removed
      if (moveListener) {
        map.off("move", moveListener);
      }
      if (zoomListener) {
        map.off("zoom", zoomListener);
      }
      warehouseInsideViewContainer.remove();
    },
  };
}

map.addControl(warehouseControls(map), "top-right");

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

    // Update AI behavior (Yuka.js)
    const delta = time.update().getDelta();
    entityManager.update(delta);

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
