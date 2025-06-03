import addCasaGrandeLocation from "./casagrandeLocation";
import addCornwallLocation from "./cornwallLocation";

// Define the interface for the location control to ensure type safety
interface LocationControl extends maplibregl.IControl {
  getSelectedLocation: () => string;
  setSelectedLocation: (location: string) => void;
}

// Locations Control
function locationsControls(
  map: maplibregl.Map,
  onLocationChange: (location: string) => void,
  setRaycastedObject: (value: string) => void
): LocationControl {
  // Create locationSelected variable - initially empty string
  let locationSelected: string = "";

  // Current position button
  const currentPositionContainer = document.createElement("div");
  currentPositionContainer.className = "maplibregl-ctrl maplibregl-ctrl-group";
  currentPositionContainer.style.margin = "10px";
  currentPositionContainer.style.width = "auto"; // Auto width to fit content
  currentPositionContainer.style.minWidth = "80px"; // Minimum width
  currentPositionContainer.style.position = "relative"; // For dropdown positioning
  currentPositionContainer.style.border = "2px solid #eb841b";
  currentPositionContainer.style.borderRadius = "5px";
  currentPositionContainer.style.boxShadow = "0 0 0 0 ";

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
  currentPositionButton.style.padding = "0px 4px 0px 10px";
  currentPositionButton.style.cursor = "pointer";

  // Text element
  const currentPositionButtonText = document.createElement("span");
  currentPositionButtonText.textContent = "Locations";
  currentPositionButtonText.style.setProperty(
    "font-family",
    "'Exo 2', sans-serif",
    "important"
  );

  // Icon element
  const currentPositionButtonIcon = document.createElement("span");
  currentPositionButtonIcon.textContent = "📍";
  currentPositionButtonIcon.style.fontSize = "16px";
  currentPositionButtonIcon.style.setProperty(
    "font-family",
    "'Exo 2', sans-serif",
    "important"
  );

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
  dropdown.style.borderRadius = "5px";
  dropdown.style.marginTop = "5px";

  // Create a setter function to update locationSelected
  const setSelectedLocation = (location: string) => {
    locationSelected = location;
    currentPositionButtonText.textContent = location || "Locations";
    setRaycastedObject("");
    onLocationChange(location);
  };

  // Add Casa Grande location
  addCasaGrandeLocation(map, dropdown, setSelectedLocation);

  // Add Cornwall location
  addCornwallLocation(map, dropdown, setSelectedLocation);

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

  // Create and return the control with the getSelectedLocation method
  const control: LocationControl = {
    onAdd: function (): HTMLElement {
      return currentPositionContainer;
    },
    onRemove: function () {
      currentPositionContainer.remove();
    },
    getSelectedLocation: function () {
      return locationSelected;
    },
    setSelectedLocation: function (location: string) {
      setSelectedLocation(location);
    },
  };

  return control;
}

export default locationsControls;
