import maplibregl from "maplibre-gl";

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
function enforcePitchLimit(map: maplibregl.Map) {
  const currentZoom = map.getZoom();
  const currentPitch = map.getPitch();
  const maxPitch = getMaxPitchForZoom(currentZoom);

  if (currentPitch > maxPitch) {
    map.setPitch(maxPitch);
  }
}

export { enforcePitchLimit };
