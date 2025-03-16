import { Scene, Engine, SceneLoader, AbstractMesh } from "@babylonjs/core";
import { RecastJSPlugin } from "@babylonjs/core/Navigation";
import Recast from "recast-detour";
import { Mesh } from "@babylonjs/core";

const storedData = localStorage.getItem("floorMeshData");
if (storedData) {
  console.log("📥 Retrieved data from localStorage!");
  loadFloorInBabylon(JSON.parse(storedData));
}

console.log("🌍 Babylon.js script is running in:", window.location.href);
window.addEventListener("message", (event) => {
  console.log("Received message:", event.data);
  const storedData = localStorage.getItem("floorMeshData");
  if (storedData) {
    console.log("📥 Retrieved data from localStorage!");
    loadFloorInBabylon(JSON.parse(storedData));
  }

  if (event.data.type === "warehouseFloorMesh") {
    console.log("🌍 Babylon.js script is running in:", window.location.href);
    console.log("Processing warehouse floor mesh...");
    loadFloorInBabylon(event.data.data);
  }
});

const engine = new Engine(null, true);
const babylonScene = new Scene(engine);
const navigationPlugin = new RecastJSPlugin(Recast);

window.addEventListener("message", (event) => {
  console.log("Message received from origin:", event.origin);
  if (event.origin !== window.location.origin) {
    console.warn("Ignoring message from different origin:", event.origin);
    return;
  }
  console.log("Processing warehouse floor mesh...");
  loadFloorInBabylon(event.data.data);
});

function loadFloorInBabylon(gltfData: any) {
  SceneLoader.ImportMesh(
    "",
    "",
    "data:," + gltfData,
    babylonScene,
    (meshes) => {
      const floorMesh = meshes[0];
      createNavMesh(floorMesh);
    }
  );
}

function createNavMesh(floorMesh: AbstractMesh) {
  const mesh = floorMesh as Mesh;
  if (!mesh.geometry) {
    console.error("Mesh has no geometry data.");
    return;
  }

  const navMeshParams = {
    cs: 0.2,
    ch: 0.2,
    walkableSlopeAngle: 30,
    walkableHeight: 1.0,
    walkableClimb: 0.5,
    walkableRadius: 0.3,
    maxEdgeLen: 12.0,
    maxSimplificationError: 1.3,
    minRegionArea: 8.0,
    mergeRegionArea: 20.0,
    maxVertsPerPoly: 6,
    detailSampleDist: 6.0,
    detailSampleMaxError: 1.0,
  };

  navigationPlugin.createNavMesh([mesh], navMeshParams);

  console.log(" Navigation mesh created!");
}

engine.runRenderLoop(() => {
  babylonScene.render();
});

// import { Scene, Engine, Mesh } from "@babylonjs/core";
// import "@babylonjs/loaders/glTF";
// import { SceneLoader } from "@babylonjs/core";
// import { RecastJSPlugin, INavMeshParameters } from "@babylonjs/core/Navigation";
// import Recast from "recast-detour";
// console.log("I am here");

// // testing babylon
// console.log("Receiver script loaded");
// window.addEventListener("message", (event) => {
//   console.log("Any message received:", event.data);
//   if (event.data.type === "testMessage") {
//     console.log("Test message received!");
//   }
// });

// const engine = new Engine(null, true); // Headless mode
// const babylonScene = new Scene(engine);
// let navigationPlugin: RecastJSPlugin;

// // Initialize the navigation plugin
// export const initNavigation = () => {
//   // Create the plugin with the Recast library
//   navigationPlugin = new RecastJSPlugin(Recast);

//   window.addEventListener("message", (event) => {
//     if (event.data.type === "warehouseFloorMesh") {
//       loadFloorInBabylon(event.data.data);
//       console.log("I am here1");
//     }
//   });
// };

// async function loadFloorInBabylon(gltfData: any) {
//   try {
//     // Initialize navigation if not already done
//     if (!navigationPlugin) {
//       initNavigation();
//     }

//     // For inline GLTF data, you'll need to use a Blob and URL.createObjectURL
//     const blob = new Blob([gltfData], { type: "application/octet-stream" });
//     const url = URL.createObjectURL(blob);

//     // Use the SceneLoader directly to avoid casing issues
//     const result = await SceneLoader.ImportMeshAsync("", url, "");

//     // Clean up the object URL
//     URL.revokeObjectURL(url);

//     // Filter for actual Mesh objects (not just AbstractMesh)
//     const meshes = result.meshes.filter(
//       (mesh): mesh is Mesh => mesh instanceof Mesh
//     );

//     if (meshes.length > 0) {
//       const floorMesh = meshes[0];
//       console.log("Floor mesh loaded successfully!");
//       createNavMesh(floorMesh);
//     } else {
//       console.error("Failed to find suitable mesh for navigation!");
//     }
//   } catch (error) {
//     console.error("Error loading floor mesh:", error);
//   }
// }

// function createNavMesh(floorMesh: Mesh) {
//   const navMeshParams: INavMeshParameters = {
//     cs: 0.2, // Cell size
//     ch: 0.2, // Cell height
//     walkableSlopeAngle: 30,
//     walkableHeight: 1.0,
//     walkableClimb: 0.5,
//     walkableRadius: 0.3,
//     maxEdgeLen: 12.0,
//     maxSimplificationError: 1.3,
//     minRegionArea: 8,
//     mergeRegionArea: 20,
//     maxVertsPerPoly: 6,
//     detailSampleDist: 6.0,
//     detailSampleMaxError: 1.0,
//   };

//   navigationPlugin.createNavMesh([floorMesh], navMeshParams);
//   console.log("Navigation mesh created!");

//   // Export the navmesh data to send back to Three.js
//   const navmeshData = navigationPlugin.getNavmeshData();

//   // Send the navmesh data back to the main thread/Three.js
//   window.postMessage(
//     {
//       type: "navmeshData",
//       data: navmeshData,
//     },
//     "*"
//   );
// }
