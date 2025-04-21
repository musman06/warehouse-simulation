import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { warehouseGroup } from "../gltfloader";

// Lines
// // Line 1
const lineMaterial1 = new LineMaterial({
  color: 0x00ff00, // green
  linewidth: 1,
  worldUnits: false,
});

let points1: number[] = [
  -5.9, 0.1, 21, -5.9, 0.1, 4.9, -4.65, 0.1, 4.9, -4.65, 0.1, -20.9, 10, 0.1,
  -20.9, 10, 0.1, -4.5, 0.1, 0.1, -4.5, 0.1, 0.1, 21, -6, 0.1, 21,
];
const lineGeometry1 = new LineGeometry();
lineGeometry1.setPositions(points1);

const line1 = new Line2(lineGeometry1, lineMaterial1);
warehouseGroup.add(line1);

// // Line 2
const lineMaterial2 = new LineMaterial({
  color: "yellow",
  linewidth: 1,
  worldUnits: false,
});

let points2: number[] = [
  -6, 0.1, 21, -10, 0.1, 21, -10, 0.1, -21, -4.75, 0.1, -21, -4.75, 0.1, -12.7,
  0, 0.1, -12.7, 0, 0.1, 5, -6, 0.1, 5, -6, 0.1, 21,
];
const lineGeometry2 = new LineGeometry();
lineGeometry2.setPositions(points2);

const line2 = new Line2(lineGeometry2, lineMaterial2);
warehouseGroup.add(line2);

// // Line 3
const lineMaterial3 = new LineMaterial({
  color: "purple",
  linewidth: 1,
  worldUnits: false,
});

let points3: number[] = [
  -6.1, 0.1, 21.1, -6.1, 0.1, 5.1, 10.1, 0.1, 5.1, 10.1, 0.1, -12.7, 5.25, 0.1,
  -12.7, 5.25, 0.1, -21.1, 0.2, 0.1, -21.1, 0.2, 0.1, -4.4, -10.1, 0.1, -4.4,
  -10.1, 0.1, 21.1, -6.1, 0.1, 21.1,
];
const lineGeometry3 = new LineGeometry();
lineGeometry3.setPositions(points3);

const line3 = new Line2(lineGeometry3, lineMaterial3);
warehouseGroup.add(line3);

// // Line 4
const lineMaterial4 = new LineMaterial({
  color: "blue",
  linewidth: 1,
  worldUnits: false,
});

let points4: number[] = [
  6, 0.1, 21, 6, 0.1, 5.2, 9.9, 0.1, 5.2, 9.9, 0.1, -21.2, -9.9, 0.1, -21.2,
  -9.9, 0.1, 5.2, 6, 0.1, 5.2,
];
const lineGeometry4 = new LineGeometry();
lineGeometry4.setPositions(points4);

const line4 = new Line2(lineGeometry4, lineMaterial4);
warehouseGroup.add(line4);

// // Line 5
const lineMaterial5 = new LineMaterial({
  color: "red",
  linewidth: 1,
  worldUnits: false,
});

let points5: number[] = [
  5.9, 0.1, 21, 5.9, 0.1, -21.3, -0.1, 0.1, -21.3, -0.1, 0.1, -12.6, -4.55, 0.1,
  -12.6, -4.55, 0.1, 4.8, 2.65, 0.1, 4.8, 2.65, 0.1, 21, 5.9, 0.1, 21,
];
const lineGeometry5 = new LineGeometry();
lineGeometry5.setPositions(points5);

const line5 = new Line2(lineGeometry5, lineMaterial5);
warehouseGroup.add(line5);

// circleMesh.position.set(-6, 0.3, 21);

export { line1, line2, line3, line4, line5 };
