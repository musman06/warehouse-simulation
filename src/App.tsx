import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import maplibregl, { LngLatLike } from "maplibre-gl";
import locationsControls from "./MapCustomControls/LocationControls/locationControls";
import warehouseControls from "./MapCustomControls/warehouseInsideViewControl";
import {
  warehouseGroupCasa,
  warehouseModelCasa,
  robotModel1Casa,
  robotModel2Casa,
  robotModel3Casa,
  forkliftModel1Casa,
  forkliftModel2Casa,
} from "./ModelLoading/CasaGrande/gltfLoader";
import {
  warehouseGroupCornwall,
  warehouseModelCornwall,
  robotModel1Cornwall,
  robotModel2Cornwall,
  robotModel3Cornwall,
  forkliftModel1Cornwall,
  forkliftModel2Cornwall,
} from "./ModelLoading/Cornwall/gltfLoader";
import CustomThreeJSWrapper from "./CustomThreeJsWrapper/CustomThreeJsWrapper";
import { projectToWorld } from "./CustomThreeJsWrapper/utility/utility";
import LeftSideBarSystem from "./components/SideBars/LeftSideBarSystem";
import LeftSideBarWarehouse from "./components/SideBars/LeftSideBarWarehouse";
import LeftSideBarRobot from "./components/SideBars/LeftSideBarRobot";
import LeftSideBarForklift from "./components/SideBars/LeftSideBarForklift";
import LeftSideBarStorageRack from "./components/SideBars/LeftSideBarStorageRack";
import NavBar from "./components/NavBar/NavBar";
import { degreesToRadians } from "./utils";
import locationPins from "./components/LocationPins/locationPins";
import AlertsPanel from "./components/AlertsPanel/AlertsPanel";

const App = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const customWrapperRef = useRef<CustomThreeJSWrapper | null>(null);
  const locationControlsRef = useRef<any | null>(null);
  const topRightControlsRef = useRef<any | null>(null);
  const locationPinsRef = useRef<any>(null);
  const [raycastedObject, setRaycastedObject] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isLocationSelected, setIsLocationSelected] = useState<boolean>(false);
  const [isModelsLoaded, setIsModelsLoaded] = useState<boolean>(false);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Initialize the map
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current!, // ID of the HTML div
      style:
        "https://api.maptiler.com/maps/basic-v2/style.json?key=7dFQzHIS1xcksIlnhtW4", // Open-source map style
      center: [-20.7077, 45.0489],
      zoom: 1,
      maxZoom: 22,
      minZoom: 2,
      pitch: 0, // Vertical tilting of the map
      bearing: 0, // rotating the map
    });

    // Add basic map controls
    mapRef.current.addControl(new maplibregl.NavigationControl());
    mapRef.current.addControl(new maplibregl.ScaleControl({}));

    // Set up map load event
    mapRef.current.on("load", () => {
      console.log("Map loaded");
      setIsMapLoaded(true);
      const customLayer = {
        id: "3D-models-loading",
        type: "custom" as const,
        renderingMode: "3d" as const,

        onAdd() {
          console.log("Custom 3D layer added");
        },

        render() {
          if (customWrapperRef.current) {
            customWrapperRef.current!.update();
            mapRef.current!.repaint = true;
          }
        },
      };

      mapRef.current?.addLayer(customLayer);
      mapRef.current?.triggerRepaint();
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Add location controls after map is initialized
  useEffect(() => {
    if (!mapRef.current) return;

    locationControlsRef.current = locationsControls(
      mapRef.current,
      (location) => {
        setSelectedLocation(location);
      },
      setRaycastedObject,
      setIsLocationSelected
    );
    mapRef.current.addControl(locationControlsRef.current, "top-left");

    // Style the controls
    const mapContainer = mapRef.current.getContainer();
    const topLeftControls = mapContainer.querySelector(
      ".maplibregl-ctrl-top-left"
    );
    topRightControlsRef.current = mapContainer.querySelector(
      ".maplibregl-ctrl-top-right"
    );
    const bottomLeftControls = mapContainer.querySelector(
      ".maplibregl-ctrl-bottom-left"
    );

    if (topLeftControls) {
      (topLeftControls as HTMLElement).style.left = "360px";
      (topLeftControls as HTMLElement).style.top = "1.75vh";
      (topLeftControls as HTMLElement).style.zIndex = "10000000000000";
    }
    if (topRightControlsRef.current) {
      (topRightControlsRef.current as HTMLElement).style.top = "10.5vh";
    }
    if (bottomLeftControls) {
      (bottomLeftControls as HTMLElement).style.left = "360px";
    }
  }, []);

  // 3. Adding Location Pins On Map
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;
    console.log("Adding location pins");

    const coordinates: LngLatLike[] = [
      [-111.77060200008945, 32.86684249587934],
      [-74.7077, 45.0489],
    ];
    const locationNames: string[] = ["Casa Grande", "Cornwall"];

    // Store the returned controller
    locationPinsRef.current = locationPins(
      coordinates,
      mapRef.current,
      locationNames,
      (location) => {
        setSelectedLocation(location);
        // Update the location control display
        if (locationControlsRef.current) {
          locationControlsRef.current.setSelectedLocation(location);
        }
      }
    );
  }, [isMapLoaded]);

  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    console.log("Initializing 3D components");

    // Initialize CustomThreeJSWrapper
    customWrapperRef.current = new CustomThreeJSWrapper(mapRef.current);
    customWrapperRef.current.setEnvironment();

    mapRef.current.on("resize", () => {
      customWrapperRef.current!.resize();
    });

    // Setup 3D scene
    setup3DScene();

    // Cleanup 3D resources
    return () => {
      if (customWrapperRef.current) {
        customWrapperRef.current = null;
      }
    };
  }, [isMapLoaded]);

  // Adding warehouse inside view button and adjusting top-right controls position when location selected
  useEffect(() => {
    // Add the warehouse control to the map, passing the locationControl reference
    isLocationSelected &&
      mapRef.current!.addControl(
        warehouseControls(
          mapRef.current!,
          locationControlsRef.current,
          warehouseModelCasa!,
          warehouseModelCornwall!,
          (flag: boolean) => {
            // Handle inside view toggle
            if (locationPinsRef.current) {
              if (flag) {
                locationPinsRef.current.hideMarkers();
              } else {
                locationPinsRef.current.showMarkers();
              }
            }
          }
        ),
        "top-left"
      );

    if (isLocationSelected) {
      if (topRightControlsRef.current) {
        (topRightControlsRef.current as HTMLElement).style.right = "284px";
      }
    }
  }, [isLocationSelected]);

  // Helper function to setup 3D scene
  const setup3DScene = () => {
    if (!customWrapperRef.current) return;

    // Keep checking every 0.5s until models are available
    const waitForModels = setInterval(() => {
      if (
        warehouseModelCasa?.model &&
        robotModel1Casa?.model &&
        robotModel2Casa?.model &&
        robotModel3Casa?.model &&
        forkliftModel1Casa?.model &&
        forkliftModel2Casa?.model &&
        warehouseModelCornwall?.model &&
        robotModel1Cornwall?.model &&
        robotModel2Cornwall?.model &&
        robotModel3Cornwall?.model &&
        forkliftModel1Cornwall?.model &&
        forkliftModel2Cornwall?.model
      ) {
        // scale the models
        warehouseGroupCasa.scale.set(0.165, 0.2, 0.21);
        warehouseGroupCornwall.scale.set(0.2, 0.2, 0.2);

        // Convert coordinates
        const casaGrandeCoords = [-111.77060200008945, 32.86684249587934];
        const cornwallCoords = [-74.7077, 45.0489];

        const worldPositionCasa = projectToWorld(casaGrandeCoords);
        const worldPositionCornwall = projectToWorld(cornwallCoords);

        warehouseGroupCasa.position.set(
          worldPositionCasa.x,
          worldPositionCasa.y,
          0
        );
        warehouseGroupCornwall.position.set(
          worldPositionCornwall.x,
          worldPositionCornwall.y,
          0
        );

        warehouseGroupCasa.rotateX(degreesToRadians(90));
        warehouseGroupCasa.rotateY(degreesToRadians(-90));
        warehouseGroupCornwall.rotateX(degreesToRadians(90));
        warehouseGroupCornwall.rotateY(degreesToRadians(-62.5));

        customWrapperRef.current!.add(warehouseGroupCasa);
        customWrapperRef.current!.add(warehouseGroupCornwall);

        setIsModelsLoaded(true);
        clearInterval(waitForModels);
      }
    }, 500);
  };

  useEffect(() => {
    if (isModelsLoaded) {
      // === RAYCASTER SETUP ===
      const raycaster = new THREE.Raycaster();

      const camera = customWrapperRef.current!.camera!;

      // Temporarily move camera to model coordinates
      camera.position.set(317925, -99081, 1);

      // Create arrow helper for visualization (initially hidden)
      let arrowHelper: any = null;

      function onMouseClick(event: MouseEvent) {
        // Normalize mouse coordinates
        const mouse = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );

        // CRITICAL: Update camera matrices before raycasting
        const camera = customWrapperRef.current!.camera!;
        camera.updateMatrixWorld();
        camera.updateProjectionMatrix();

        // Set raycaster from camera
        raycaster.setFromCamera(mouse, camera);

        // Remove previous arrow helper if it exists
        if (arrowHelper) {
          customWrapperRef.current!.scene.remove(arrowHelper);
          arrowHelper.dispose?.(); // Clean up geometry and material
          arrowHelper = null;
        }

        // Create arrow helper to visualize the ray
        const rayOrigin = raycaster.ray.origin.clone();
        const rayOffset = new THREE.Vector3(
          317925.26791136555,
          -99081.83693118006,
          10
        );
        const correctedRayOrigin = rayOrigin.clone().add(rayOffset);
        const rayDirection = raycaster.ray.direction.clone();

        // Calculate appropriate length based on scene bounds
        const arrowLength = 10000; // Increased length for better visibility

        arrowHelper = new THREE.ArrowHelper(
          rayDirection,
          correctedRayOrigin,
          arrowLength,
          0xff0000, // Red color
          arrowLength * 0.1,
          arrowLength * 0.05
        );
        // Add to scene
        customWrapperRef.current!.scene.add(arrowHelper);

        // Test intersections with all meshes
        const intersects = raycaster.intersectObjects(
          customWrapperRef.current!.scene.children,
          true
        );

        if (intersects.length > 0) {
          const intersection = intersects[0];
          const raycastedObjectName = intersection.object.userData.modelName;
          setRaycastedObject(raycastedObjectName);
        }
        // Force a render update
        customWrapperRef.current!.update();
        mapRef.current!.triggerRepaint();
      }

      // IMPORTANT: Add event listener to the map canvas, not container
      const mapCanvas = mapRef.current!.getCanvas();
      mapCanvas.addEventListener("click", onMouseClick);

      // Cleanup function
      return () => {
        mapCanvas.removeEventListener("click", onMouseClick);
        if (arrowHelper) {
          customWrapperRef.current?.scene.remove(arrowHelper);
          arrowHelper.dispose?.();
        }
      };
    }
  }, [isModelsLoaded]);

  return (
    <div>
      <NavBar />

      {/* Warehouse Twinware System SidebBar */}
      {selectedLocation === "" && raycastedObject === "" && (
        <LeftSideBarSystem
          systemName="Warehouse Management System"
          name="JDI Distributors"
          ID="JDI-D"
          type="Distribution Centers Chain"
          topPerformingWH="Cornwall WCW"
          leastPerformingWH="CasaGrande WCG"
          trainingHoursPerEmployee={120}
          totalEnergyConsumption={4.2}
          totalCarbonEmission={52}
          totalRobots={31}
          totalForklifts={15}
          totalEmployees={67}
          cornwallVolumePercentage={55}
          casaGrandeVolumePercentage={45}
          throughputMonths={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          throughputRate={[68, 116, 52.8, 108, 140, 23.3]}
          avgOrderCycleMonths={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          avgOrderCycleValue={[53, 96, 67.8, 128, 125, 23.3]}
          backOrderRateMonths={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          backOrderRatePercent={[4.1, 3.96, 7.88, 1.28, 1.25, 2.3]}
          globalInventoryAccuracyMonths={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
          ]}
          globalInventoryAccuracyPercent={[
            94.1, 93.96, 97.88, 98.28, 99.25, 96.3,
          ]}
          costPerOrderMonths={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          costPerOrderCasaGrande={[14.1, 13.96, 17.88, 11.28, 11.25, 22.3]}
          costPerOrderCornwall={[24.1, 13.96, 27.88, 15.28, 10.25, 21.3]}
        />
      )}

      {/* Alerts Panel */}
      {selectedLocation && <AlertsPanel />}

      {/* Warehouse SideBar */}
      {selectedLocation &&
        (raycastedObject === "" ||
          raycastedObject === "Warehouse Model Casa Grande" ||
          raycastedObject === "Warehouse Model Cornwall") && (
          <LeftSideBarWarehouse
            warehouseName={
              selectedLocation.includes("Casa") ? "Casa Grande" : "Cornwall"
            }
            name={
              selectedLocation.includes("Casa")
                ? "Warehouse Casa Grande"
                : "Warehouse Cornwall"
            }
            ID={selectedLocation.includes("Casa") ? "WCG" : "WCW"}
            type="Distribution Center Warehouse"
            avgOrderFulfillmentTime={
              selectedLocation.includes("Casa") ? 55 : 45
            }
            totalRobots={selectedLocation.includes("Casa") ? 17 : 15}
            totalForklifts={selectedLocation.includes("Casa") ? 9 : 8}
            totalEmployees={selectedLocation.includes("Casa") ? 31 : 35}
            powerConsumptionMonths={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            powerConsumptionAmount={
              selectedLocation.includes("Casa")
                ? [243, 186, 222, 277, 166]
                : [213, 196, 252, 207, 186]
            }
            occupiedSpcae={selectedLocation.includes("Casa") ? 69 : 60}
            freeSpace={selectedLocation.includes("Casa") ? 31 : 40}
            throughputMonths={[
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
            ]}
            throughputRate={
              selectedLocation.includes("Casa")
                ? [31, 57, 29, 53, 80, 19, 35, 63, 76]
                : [34, 58, 26, 59, 70, 11, 41, 53, 66]
            }
            safetyIncidentsMonths={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            safetyIncidentsRate={
              selectedLocation.includes("Casa")
                ? [0, 1, 4, 3, 2, 2]
                : [1, 0, 3, 4, 2, 3]
            }
            systemDowntimeMonths={[
              "Thunderstorms",
              "Earth Quake",
              "Windstorm",
              "Blackout",
            ]}
            systemDowntimeDuration={
              selectedLocation.includes("Casa") ? [11, 7, 6, 3] : [8, 12, 4, 7]
            }
          />
        )}

      {/* Robot SideBar */}
      {raycastedObject.includes("Robot Model") && (
        <LeftSideBarRobot
          breadcrumbValue={
            selectedLocation.includes("Casa")
              ? `Casa Grande -> RM-${raycastedObject.slice(-1)}`
              : `Cornwall -> RM-${raycastedObject.slice(-1)}`
          }
          name={raycastedObject}
          ID={`RM-${raycastedObject.slice(-1)}`}
          type="AMV"
          status="Transporting"
          batteryLevel={
            raycastedObject.includes("1")
              ? "80%"
              : raycastedObject.includes("2")
              ? "60%"
              : "40%"
          }
          speed={
            raycastedObject.includes("1")
              ? 22
              : raycastedObject.includes("2")
              ? 20
              : 17
          }
          tct={
            raycastedObject.includes("1")
              ? 33
              : raycastedObject.includes("2")
              ? 31
              : 35
          }
          batteryEfficiency={
            raycastedObject.includes("1")
              ? 7
              : raycastedObject.includes("2")
              ? 7.2
              : 6.9
          }
          collisions={
            raycastedObject.includes("1")
              ? 2
              : raycastedObject.includes("2")
              ? 1
              : 1
          }
          nearMisses={
            raycastedObject.includes("1")
              ? 7
              : raycastedObject.includes("2")
              ? 10
              : 4
          }
          isDowntime={
            raycastedObject.includes("1")
              ? true
              : raycastedObject.includes("2")
              ? false
              : true
          }
          downtimeReason={
            raycastedObject.includes("1")
              ? "Circuit Breakdown"
              : raycastedObject.includes("2")
              ? ""
              : "Wheel Ruptured"
          }
          downtimeDuaration={
            raycastedObject.includes("1")
              ? 2
              : raycastedObject.includes("2")
              ? 0
              : 1
          }
          working={
            raycastedObject.includes("1")
              ? 88
              : raycastedObject.includes("2")
              ? 90
              : 94
          }
          idle={
            raycastedObject.includes("1")
              ? 12
              : raycastedObject.includes("2")
              ? 10
              : 6
          }
          maintenanceDates={
            raycastedObject.includes("1")
              ? ["16/5", "11/7", "2/8", "6/9", "1/10"]
              : raycastedObject.includes("2")
              ? ["17/5", "9/7", "12/9", "6/10", "11/11"]
              : ["18/5", "6/6", "22/7", "16/8", "1/9"]
          }
          maintenanceDurations={
            raycastedObject.includes("1")
              ? [4, 1.6, 2.2, 0.5, 1.4]
              : raycastedObject.includes("2")
              ? [3.4, 1.33, 2.12, 1.5, 0.4]
              : [0.6, 1.9, 1.2, 3.5, 2.4]
          }
        />
      )}

      {/* Forklift SideBar */}
      {raycastedObject.includes("Fork Lift Model") && (
        <LeftSideBarForklift
          breadcrumbValue={
            selectedLocation.includes("Casa")
              ? `Casa Grande -> FM-${raycastedObject.slice(-1)}`
              : `Cornwall -> FM-${raycastedObject.slice(-1)}`
          }
          name={raycastedObject}
          ID={`FM-${raycastedObject.slice(-1)}`}
          type="Forklift"
          status="Transporting"
          fuelLevel={raycastedObject.includes("1") ? "80%" : "40%"}
          load={raycastedObject.includes("1") ? 122 : 140}
          speed={raycastedObject.includes("1") ? 50 : 71}
          operator={
            raycastedObject.includes("1") ? "Khalil Ahmad" : "Rehan Amjad"
          }
          loadHours={["10", "11", "12", "13", "14", "15", "16", "17", "18"]}
          loadMovedPerHour={[856, 455, 1022, 106, 978, 566, 411, 378, 788]}
          tripHours={["10", "11", "12", "13", "14", "15", "16", "17", "18"]}
          totalTrips={[4, 2, 1, 5, 0, 6, 3, 4]}
          isDowntime={raycastedObject.includes("1") ? true : false}
          downtimeReason={raycastedObject.includes("1") ? "Flat Tire" : ""}
          downtimeDuaration={raycastedObject.includes("1") ? 1 : 0}
          fuelEfficiency={raycastedObject.includes("1") ? 15.5 : 14.2}
        />
      )}

      {/* Storage Rack SideBar */}
      {raycastedObject.includes("Storage Rack") && (
        <LeftSideBarStorageRack
          breadcrumbValue={
            selectedLocation.includes("Casa")
              ? `Casa Grande -> SR-${raycastedObject.slice(-1)}`
              : `Cornwall -> SR-${raycastedObject.slice(-1)}`
          }
          name={raycastedObject}
          ID={`SR-${raycastedObject.slice(-1)}`}
          type="Storage Rack"
          totalItemsStored={550}
          orderFulfillmentRate={19}
          usedCapacity={81}
          idleCapacity={19}
          stockIn={45}
          stockOut={55}
          stockoutMonths={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          stockoutIncidents={[6, 11, 5, 1, 4, 2]}
          inventoryAgeMonths={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          inventoryAgeTime={[53, 96, 67.8, 128, 125, 233.3]}
        />
      )}

      <div
        ref={mapContainerRef}
        id="map"
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
};

export default App;
