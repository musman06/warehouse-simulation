import { Vector3 } from "three";
import constants from "./constants.js";
import type { Position } from "geojson";

export function projectToWorld(coords: Position) {
  var projected = [
    -constants.MERCATOR_A *
      constants.DEG2RAD *
      coords[0] *
      constants.PROJECTION_WORLD_SIZE,
    -constants.MERCATOR_A *
      Math.log(Math.tan(Math.PI * 0.25 + 0.5 * constants.DEG2RAD * coords[1])) *
      constants.PROJECTION_WORLD_SIZE,
  ];

  if (!coords[2]) projected.push(0);
  else {
    var pixelsPerMeter = projectedUnitsPerMeter(coords[1]);
    projected.push(coords[2] * pixelsPerMeter);
  }

  var result = new Vector3(projected[0], projected[1], projected[2]);

  return result;
}

function projectedUnitsPerMeter(latitude: number) {
  return Math.abs(
    constants.WORLD_SIZE /
      Math.cos(constants.DEG2RAD * latitude) /
      constants.EARTH_CIRCUMFERENCE
  );
}
