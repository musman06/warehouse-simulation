import maplibregl, { LngLatLike } from "maplibre-gl";
import "./locationPins.css";

function locationPins(
  coords: LngLatLike[],
  map: maplibregl.Map,
  locationNames: string[]
) {
  return coords.forEach((coord, index) => {
    return new maplibregl.Marker({ color: "#da5817" })
      .setLngLat(coord)
      .setPopup(
        new maplibregl.Popup({
          offset: 25,
          closeButton: false,
        }).setHTML(`<p>Location Name: ${locationNames[index]}</p>`)
      )
      .addTo(map);
  });
}

export default locationPins;
