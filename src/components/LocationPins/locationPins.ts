import maplibregl, { LngLatLike } from "maplibre-gl";
import "./locationPins.css";

function locationPins(
  coords: LngLatLike[],
  map: maplibregl.Map,
  locationNames: string[],
  onLocationSelect?: (location: string) => void
) {
  const markers: maplibregl.Marker[] = []; // Store marker references

  coords.forEach((coord, index) => {
    // Create the popup HTML with the explore button
    const popupHTML = `
      <div>
        <p>Location Name: ${locationNames[index]}</p>
        <button 
          id="explore-btn-${index}" 
          style="
            background-color:rgb(252, 231, 211);
            color: #da5817;
            border: 1px solid #da5817;
            padding: 3px 6px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            margin-top: 8px;
            outline: none;
            transition: all 0.2s ease;
            transform-origin: center;
          "
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 2px 4px rgba(54, 162, 235, 0.2)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'"
          onfocus="this.style.border='1px solid #da5817'"
        >
          Explore
        </button>
      </div>
    `;

    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: false,
    }).setHTML(popupHTML);

    // Add event listener after popup is added to DOM
    popup.on("open", () => {
      const exploreBtn = document.getElementById(`explore-btn-${index}`);
      if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
          // Get the location name to determine map properties
          const locationName = locationNames[index];
          let bearing = -90; // default bearing

          // Set specific bearing based on location
          if (locationName === "Cornwall") {
            bearing = -118;
          }

          // Close the popup
          popup.remove();

          // Update selected location if callback provided
          if (onLocationSelect) {
            onLocationSelect(locationName);
          }

          map.flyTo({
            center: coord,
            zoom: 16,
            speed: 2,
            pitch: 45,
            bearing: bearing,
            curve: 1,
            easing: (t: any) => t,
          });
        });
      }
    });

    const marker = new maplibregl.Marker({ color: "#da5817" })
      .setLngLat(coord)
      .setPopup(popup)
      .addTo(map);

    markers.push(marker); // Store marker reference
  });

  // Return an object with markers and control methods
  return {
    markers,
    hideMarkers: () => {
      markers.forEach((marker) => {
        // Close any open popups
        const popup = marker.getPopup();
        if (popup && popup.isOpen()) {
          popup.remove();
        }
        // Hide the marker
        marker.getElement().style.display = "none";
      });
    },
    showMarkers: () => {
      markers.forEach((marker) => {
        marker.getElement().style.display = "block";
      });
    },
    removeMarkers: () => {
      markers.forEach((marker) => marker.remove());
      markers.length = 0;
    },
  };
}

export default locationPins;
