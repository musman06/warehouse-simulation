import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import maplibregl from "maplibre-gl";
import {
  convert3DEarthTo2DMapCoordinates,
  getModelMatrix,
  getAllMeshes,
} from "./utils";
import warehouseControls from "./MapCustomControls/warehouseInsideViewControl";
import locationsControls from "./MapCustomControls/LocationControls/locationControls";
import {
  // warehouseGroupCornwall,
  warehouseModelCornwall,
  // robotModel1Cornwall,
  // robotModel2Cornwall,
  // robotModel3Cornwall,
  // forkliftModel1Cornwall,
  // forkliftModel2Cornwall,
} from "./ModelLoading/Cornwall/gltfLoader";
import {
  warehouseGroupCasa,
  warehouseModelCasa,
  robotModel1Casa,
  robotModel2Casa,
  robotModel3Casa,
  forkliftModel1Casa,
  forkliftModel2Casa,
} from "./ModelLoading/CasaGrande/gltfLoader";
import CustomThreeJSWrapper from "./CustomThreeJsWrapper/CustomThreeJsWrapper";
import { projectToWorld } from "./CustomThreeJsWrapper/utility/utility";
// import LeftSideBarRobot from "./components/LeftSideBarRobot";
// import LeftSideBarForklift from "./components/LeftSideBarForkLift";
// import LeftSideBarForklift from "./components/LeftSideBarForklift";
// import LeftSideBarStorageRack from "./components/LeftSideBarStorageRack";
import LeftSideBarWarehouse from "./components/LeftSideBarWarehouse";
import LeftSideBarSystem from "./components/LeftSideBarSystem";
import NavBar from "./components/NavBar";

const App = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    // Converting 3D spherical earth coordinates into flat 2D map coordinates
    // // Casa Grande Coordiantes
    const modelRenderAsMercatorCoordinateCasa =
      convert3DEarthTo2DMapCoordinates(
        [-111.77060200008945, 32.86684249587934],
        0
      );

    // // Cornwall Coordinates
    // const modelRenderAsMercatorCoordinateCornwall =
    //   convert3DEarthTo2DMapCoordinates([-74.7077, 45.0489], 0);

    // Calculating scale factor to scle our model to avoid zoom level issues
    const scaleCasa =
      modelRenderAsMercatorCoordinateCasa.meterInMercatorCoordinateUnits();
    // const scaleCornwall =
    //   modelRenderAsMercatorCoordinateCornwall.meterInMercatorCoordinateUnits();

    // Scene
    // const scene = new THREE.Scene();

    // Camera
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   4000
    // );

    // Initialize the map
    const map = new maplibregl.Map({
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

    // initialising customThreeJSWrapper
    const customThreewrapper = new CustomThreeJSWrapper(map);
    // customThreewrapper.setEnvironment();

    // Keep checking every 0.5s until models are available
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
    //     warehouseModelCornwall?.model
    //   ) {
    // scale the models
    // warehouseGroupCasa.scale.set(5, 5, 6.45);

    // let boundingBox = new THREE.Box3().setFromObject(warehouseGroupCasa);
    // const boundingBoxHelper = new THREE.Box3Helper(boundingBox, 0xff0000); // red color
    // console.log("boundingBoxHelper", boundingBox);
    // customThreewrapper.add(boundingBoxHelper);

    // scene.add(warehouseGroup);
    // scene.add(warehouseGroupCasa);
    // customThreewrapper.add(warehouseGroupCasa);
    // modelsLoaded = true;
    // modelsLoadedCornwall = true;

    // Add the warehouse control to the map, passing the locationControl reference
    // map.addControl(
    //   warehouseControls(
    //     map,
    //     locationControl,
    //     warehouseModelCasa!,
    //     warehouseModelCornwall!
    //   ),
    //   "top-right"
    // );

    // clearInterval(waitForModels);
    // }
    // }, 500);

    // Lights
    // // AmbientLight
    const ambientLight = new THREE.AmbientLight("white", 5);
    // scene.add(ambientLight);
    customThreewrapper.add(ambientLight);

    // // Directional Light
    const directionalLight = new THREE.DirectionalLight("white", 1);
    directionalLight.position.set(
      modelRenderAsMercatorCoordinateCasa.x + 100,
      modelRenderAsMercatorCoordinateCasa.y + 700,
      modelRenderAsMercatorCoordinateCasa.z + 300
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

    const geometry = new THREE.BoxGeometry(100000, 100000, 100000);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const cube = new THREE.Mesh(geometry, material);
    // Position model
    const worldPosition = projectToWorld([
      -111.77060200008945, 32.86684249587934,
    ]);
    cube.position.set(worldPosition.x, worldPosition.y, 0);
    customThreewrapper.add(cube);

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl());

    // Add a scale control
    map.addControl(new maplibregl.ScaleControl());

    // Add the control to the map and store the reference
    const locationControl = locationsControls(map, (location) => {
      setSelectedLocation(location); // reactively update on change
    });
    map.addControl(locationControl, "top-left");

    // Get the internal MapLibre control container
    const mapContainer = map.getContainer();
    const topLeftControls = mapContainer.querySelector(
      ".maplibregl-ctrl-top-left"
    );

    if (topLeftControls) {
      // Apply custom style to offset from left
      (topLeftControls as HTMLElement).style.left = "360px";
      (topLeftControls as HTMLElement).style.top = "10.3vh";
    }

    // Add custom 3D layer
    map.on("style.load", () => {
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
          // window.addEventListener("resize", () => {
          //   this.renderer!.setSize(
          //     map.getCanvas().width,
          //     map.getCanvas().height
          //   );
          //   this.renderer!.setPixelRatio(Math.min(2, window.devicePixelRatio));
          // });
        },

        render(_gl: WebGLRenderingContext, args: any) {
          // if (!this.renderer || !this.map) return;
          // const m = new THREE.Matrix4().fromArray(
          //   args.defaultProjectionData.mainMatrix
          // );
          // const l = getModelMatrix(
          //   modelRenderAsMercatorCoordinateCasa,
          //   scaleCasa,
          //   90,
          //   90
          // );
          // const lCornwall = getModelMatrix(
          //   modelRenderAsMercatorCoordinateCornwall,
          //   scaleCornwall,
          //   90,
          //   118
          // );
          // camera!.projectionMatrix = m.multiply(l);
          // this.renderer!.resetState();
          // this.renderer!.render(scene, camera!);
          // this.map!.triggerRepaint();

          customThreewrapper.update();
          map.repaint = true;
        },
      };

      map.addLayer(customLayer);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <NavBar />
      {/* Conditionally render LeftSideBar based on the state */}
      {/* {isLeftSideBarOpen && (
        <LeftSideBarRobot
          warehouseName="Warehouse Cornwall"
          name="Robot Model 1"
          ID="RM-1"
          type="AMV"
          status="Transporting"
          batteryLevel="80%"
          speed={22}
          tct={33}
          batteryEfficiency={7}
          collisions={2}
          nearMisses={7}
          isDowntime={true}
          downtimeReason="Circuit Breakdown"
          downtimeDuaration={2}
          working={88}
          idle={12}
          maintenanceDates={["16/5", "11/7", "2/8", "6/9", "1/10"]}
          maintenanceDurations={[4, 1.6, 2.2, 0.5, 0]}
        />
      )} */}

      {/* {isLeftSideBarOpen && (
        <LeftSideBarForklift
          warehouseName="Warehouse Cornwall"
          name="Forklift Model 1"
          ID="FM-1"
          type="Forklift"
          status="Idle"
          fuelLevel="55%"
          load={122}
          speed={50}
          operator="Khalil Ahmad"
          loadHours={["10", "11", "12", "13", "14", "15", "16", "17", "18"]}
          loadMovedPerHour={[856, 455, 1022, 106, 978, 566, 411, 378, 788]}
          tripHours={["10", "11", "12", "13", "14", "15", "16", "17", "18"]}
          totalTrips={[4, 2, 1, 5, 0, 6, 3, 4]}
          isDowntime={true}
          downtimeReason="Flat Tire"
          downtimeDuaration={1}
          fuelEfficiency={15.5}
        />
      )} */}

      {/* {isLeftSideBarOpen && (
        <LeftSideBarSystem
          warehouseName="Warehouse Cornwall"
          name="Storage Rack 1"
          ID="SR-1"
          type="Storage Rack"
          totalItemsStored={611}
          orderFulfillmentRate={78}
          usedCapacity={75}
          idleCapacity={25}
          stockIn={35}
          stockOut={27}
          stockoutMonths={["Jan", "Feb", "Mar", "Apr", "May"]}
          stockoutIncidents={[18, 0, 3, 7, 6]}
          inventoryAgeMonths={[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
          ]}
          inventoryAgeTime={[44, 102, 86, 59, 60, 63, 39, 84]}
        />
      )} */}

      {/* {isLeftSideBarOpen && (
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
      )} */}

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
