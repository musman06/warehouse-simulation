import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import maplibregl from "maplibre-gl";
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
import LeftSideBarWarehouse from "./components/LeftSideBarWarehouse";
import LeftSideBarSystem from "./components/LeftSideBarSystem";
import NavBar from "./components/NavBar/NavBar";
import { degreesToRadians } from "./utils";

const App = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const customWrapperRef = useRef<CustomThreeJSWrapper | null>(null);
  const locationControlsRef = useRef<any | null>(null);
  const clickableObjectsRef = useRef<THREE.Object3D[]>([]);
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
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
    mapRef.current.on("style.load", () => {
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
          console.log("I am in renderer");
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
      }
    );
    mapRef.current.addControl(locationControlsRef.current, "top-left");

    // Style the controls
    const mapContainer = mapRef.current.getContainer();
    const topLeftControls = mapContainer.querySelector(
      ".maplibregl-ctrl-top-left"
    );
    const topRightControls = mapContainer.querySelector(
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
    if (topRightControls) {
      (topRightControls as HTMLElement).style.top = "10.5vh";
    }
    if (bottomLeftControls) {
      (bottomLeftControls as HTMLElement).style.left = "360px";
    }
  }, []);

  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    console.log("Initializing 3D components");

    // Initialize CustomThreeJSWrapper
    customWrapperRef.current = new CustomThreeJSWrapper(mapRef.current);
    customWrapperRef.current.setEnvironment();

    // Setup 3D scene
    setIsLeftSideBarOpen(true);
    setup3DScene();

    // Cleanup 3D resources
    return () => {
      if (customWrapperRef.current) {
        // Add cleanup logic for 3D resources
        // customWrapperRef.current.dispose?.();
        customWrapperRef.current = null;
      }
    };
  }, [isMapLoaded]);

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
        warehouseModelCornwall?.model
      ) {
        // models on which raycaster works
        clickableObjectsRef.current.push(
          robotModel1Cornwall?.model!,
          robotModel2Cornwall?.model!,
          robotModel3Cornwall?.model!,
          forkliftModel1Cornwall?.model!,
          forkliftModel2Cornwall?.model!
        );

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
        warehouseGroupCasa.rotateY(degreesToRadians(90));
        warehouseGroupCornwall.rotateX(degreesToRadians(90));
        warehouseGroupCornwall.rotateY(degreesToRadians(118));

        customWrapperRef.current!.add(warehouseGroupCasa);
        customWrapperRef.current!.add(warehouseGroupCornwall);

        // Add the warehouse control to the map, passing the locationControl reference
        mapRef.current!.addControl(
          warehouseControls(
            mapRef.current!,
            locationControlsRef.current,
            warehouseModelCasa!,
            warehouseModelCornwall!
          ),
          "top-right"
        );

        setIsModelsLoaded(true);

        clearInterval(waitForModels);
      }
    }, 500);
  };

  useEffect(() => {
    // === RAYCASTER SETUP ===
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event: MouseEvent) {
      //  setIsLeftSideBarOpen(true);

      // convert mouse coords to normalized device coords (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, customWrapperRef.current!.camera!);
      console.log("raycaster: ", raycaster);
      console.log("clickableObjects: ", clickableObjectsRef.current);

      const intersects = raycaster.intersectObjects(
        customWrapperRef.current!.scene.children,
        true
      );
      console.log("Intersects: ", intersects);

      // <LeftSideBar />;
      console.log("isLeftSideBarOpen: ", isLeftSideBarOpen);

      if (intersects.length > 0) {
        const selectedModel = intersects[0].object;
        console.log(
          "You clicked on:",
          selectedModel.name,
          selectedModel.userData
        );
        // Handle selection/highlight/etc.
      }
    }

    window.addEventListener("click", onMouseClick);
  }, []);

  return (
    <div>
      <NavBar />

      {isLeftSideBarOpen && selectedLocation === "" && (
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

      {isLeftSideBarOpen && selectedLocation === "Cornwall" && (
        <LeftSideBarWarehouse
          warehouseName="Warehouse Cornwall"
          name="Warehouse Cornwall"
          ID="WCW"
          type="Distribution Center Warehouse"
          avgOrderFulfillmentTime={45}
          totalRobots={15}
          totalForklifts={8}
          totalEmployees={31}
          powerConsumptionMonths={["Jan", "Feb", "Mar", "Apr", "May"]}
          powerConsumptionAmount={[213, 196, 252, 207, 186]}
          occupiedSpcae={60}
          freeSpace={40}
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
          throughputRate={[34, 58, 26, 59, 70, 11, 41, 53, 66]}
          safetyIncidentsMonths={["Jan", "Feb", "Mar", "Apr", "May"]}
          safetyIncidentsRate={[1, 0, 3, 4, 2]}
          systemDowntimeMonths={[
            "Thunderstorms",
            "Earth Quake",
            "Windstorm",
            "Blackout",
          ]}
          systemDowntimeDuration={[8, 12, 4, 7]}
        />
      )}

      {isLeftSideBarOpen && selectedLocation === "Casa Grande" && (
        <LeftSideBarWarehouse
          warehouseName="Warehouse Cornwall"
          name="Warehouse Cornwall"
          ID="WCW"
          type="Distribution Center Warehouse"
          avgOrderFulfillmentTime={45}
          totalRobots={15}
          totalForklifts={8}
          totalEmployees={31}
          powerConsumptionMonths={["Jan", "Feb", "Mar", "Apr", "May"]}
          powerConsumptionAmount={[213, 196, 252, 207, 186]}
          occupiedSpcae={60}
          freeSpace={40}
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
          throughputRate={[34, 58, 26, 59, 70, 11, 41, 53, 66]}
          safetyIncidentsMonths={["Jan", "Feb", "Mar", "Apr", "May"]}
          safetyIncidentsRate={[1, 0, 3, 4, 2]}
          systemDowntimeMonths={[
            "Thunderstorms",
            "Earth Quake",
            "Windstorm",
            "Blackout",
          ]}
          systemDowntimeDuration={[8, 12, 4, 7]}
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
