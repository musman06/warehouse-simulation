import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import maplibregl from "maplibre-gl";
import { convert3DEarthTo2DMapCoordinates } from "./utils";
import locationsControls from "./MapCustomControls/LocationControls/locationControls";
import CustomThreeJSWrapper from "./CustomThreeJsWrapper/CustomThreeJsWrapper";
import { projectToWorld } from "./CustomThreeJsWrapper/utility/utility";
import LeftSideBarWarehouse from "./components/LeftSideBarWarehouse";
import LeftSideBarSystem from "./components/LeftSideBarSystem";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const customWrapperRef = useRef<any | null>(null);
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Initialize the map
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current!, // ID of the HTML div
      style:
        "https://api.maptiler.com/maps/basic-v2/style.json?key=7dFQzHIS1xcksIlnhtW4", // Open-source map style
      center: [-20.7077, 45.0489], // Longitude, Latitude of warehousemodelCornwall
      zoom: 1,
      maxZoom: 22,
      minZoom: 2,
      pitch: 0, // Vertical tilting of the map
      bearing: 0, // rotating the map
      canvasContextAttributes: { antialias: true }, //TODO
    });

    // Add basic map controls
    mapRef.current.addControl(new maplibregl.NavigationControl());
    mapRef.current.addControl(new maplibregl.ScaleControl());

    // Set up map load event
    mapRef.current.on("load", () => {
      console.log("Map loaded");
      setIsMapLoaded(true);
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

    const locationControl = locationsControls(mapRef.current, (location) => {
      setSelectedLocation(location);
    });
    mapRef.current.addControl(locationControl, "top-left");

    // Style the controls
    const mapContainer = mapRef.current.getContainer();
    const topLeftControls = mapContainer.querySelector(
      ".maplibregl-ctrl-top-left"
    );
    const bottomLeftControls = mapContainer.querySelector(
      ".maplibregl-ctrl-bottom-left"
    );

    if (topLeftControls) {
      (topLeftControls as HTMLElement).style.left = "400px";
      (topLeftControls as HTMLElement).style.top = "1.75vh";
      (topLeftControls as HTMLElement).style.zIndex = "10000000000000";
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
    setup3DScene();
    setIsLeftSideBarOpen(true);

    // Add custom layer
    const customLayer = {
      id: "3D-models-loading",
      type: "custom" as "custom",
      renderingMode: "3d" as "3d",

      onAdd() {
        console.log("Custom 3D layer added");
      },

      render(gl: WebGLRenderingContext) {
        if (customWrapperRef.current) {
          customWrapperRef.current.update();
        }
      },
    };

    mapRef.current.addLayer(customLayer);
    mapRef.current.triggerRepaint();

    // Cleanup 3D resources
    return () => {
      if (customWrapperRef.current) {
        // Add cleanup logic for 3D resources
        customWrapperRef.current.dispose?.();
        customWrapperRef.current = null;
      }
    };
  }, [isMapLoaded]);

  // Helper function to setup 3D scene
  const setup3DScene = () => {
    if (!customWrapperRef.current) return;

    // Convert coordinates
    const casaGrandeCoords = [-111.77060200008945, 32.86684249587934];
    const worldPosition = projectToWorld(casaGrandeCoords);

    console.log("World position:", worldPosition);

    // Create test cube
    const geometry = new THREE.BoxGeometry(1000, 1000, 1000); // Smaller size
    const material = new THREE.MeshStandardMaterial({
      color: "red",
    });
    const cube = new THREE.Mesh(geometry, material);

    // Position the cube
    cube.position.set(worldPosition.x, worldPosition.y, 500); // Above ground
    console.log("Cube position:", cube.position);

    customWrapperRef.current.add(cube);
  };

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
