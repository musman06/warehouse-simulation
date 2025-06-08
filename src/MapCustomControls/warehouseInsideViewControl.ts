import { Model3D } from "../model3DClass";
import { removeWarehouseRoof, addWarehouseRoof } from "../utils";

// Define the interface for the location control to ensure type safety
interface LocationControl extends maplibregl.IControl {
  getSelectedLocation: () => string;
}

// Warehouse Controls
function warehouseControls(
  map: maplibregl.Map,
  locationControlRef: LocationControl,
  warehouseModelCasa: Model3D,
  warehouseModelCornwall: Model3D,
  onToggleInsideView?: (flag: boolean) => void
): maplibregl.IControl {
  // Warehouse inside view button
  const warehouseInsideViewContainer = document.createElement("div");
  warehouseInsideViewContainer.className =
    "maplibregl-ctrl maplibregl-ctrl-group";
  warehouseInsideViewContainer.style.margin = "10px";
  warehouseInsideViewContainer.style.marginTop = "90px";

  // Warehouse view button element
  const warehouseInsideViewButton = document.createElement("button");
  warehouseInsideViewButton.type = "button";
  warehouseInsideViewButton.className = "maplibregl-ctrl-icon";
  warehouseInsideViewButton.setAttribute("aria-label", "Move inside Warehouse");
  warehouseInsideViewButton.style.display = "flex";
  warehouseInsideViewButton.style.flexDirection = "column";
  warehouseInsideViewButton.style.alignItems = "center";
  warehouseInsideViewButton.style.justifyContent = "center";
  warehouseInsideViewButton.style.width = "50px";
  warehouseInsideViewButton.style.height = "50px";
  warehouseInsideViewButton.style.opacity = "0.5"; // Initially faded
  warehouseInsideViewButton.style.cursor = "not-allowed"; // Initially not accessible

  // Warehouse view button icon
  const warehouseInsideViewButtonIcon = document.createElement("span");
  warehouseInsideViewButtonIcon.textContent = "🎦";
  warehouseInsideViewButtonIcon.style.fontSize = "20px";
  warehouseInsideViewButton.appendChild(warehouseInsideViewButtonIcon);

  // Warehouse view button text
  const warehouseInsideViewButtonText1 = document.createElement("span");
  warehouseInsideViewButtonText1.textContent = "Enter";
  warehouseInsideViewButtonText1.style.fontSize = "8px";
  warehouseInsideViewButtonText1.style.fontWeight = "700";
  warehouseInsideViewButtonText1.style.marginTop = "3px";
  warehouseInsideViewButton.appendChild(warehouseInsideViewButtonText1);

  const warehouseInsideViewButtonText2 = document.createElement("span");
  warehouseInsideViewButtonText2.textContent = "Warehouse";
  warehouseInsideViewButtonText2.style.fontSize = "8px";
  warehouseInsideViewButtonText2.style.fontWeight = "700";
  warehouseInsideViewButton.appendChild(warehouseInsideViewButtonText2);

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

    // console.log("Current location selected:", locationSelected);

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
    // Notify parent (App.tsx)
    onToggleInsideView?.(warehouseInsideViewFlag);

    if (warehouseInsideViewFlag) {
      try {
        // Choose the correct warehouse model based on selected location
        const targetModel =
          locationSelected === "Casa Grande"
            ? warehouseModelCasa
            : warehouseModelCornwall;

        // call function to remove warehouse roof and roof's white rods
        console.log(
          "Target Model: ",
          warehouseModelCasa,
          warehouseModelCornwall
        );
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
        // const targetModel =
        //   locationSelected === "Casa Grande"
        //     ? warehouseModelCasa
        //     : warehouseModelCornwall;
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

export default warehouseControls;
