import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

// Lines
// // Line 1
const lineMaterial1 = new LineMaterial({
  color: "orange", // green
  linewidth: 1,
  worldUnits: false,
});

let points1: number[] = [
  -8.3, 0.1, 19.9, -8.3, 0.1, 4.3, -4.75, 0.1, 4.3, -4.75, 0.1, -20, 9.7, 0.1,
  -20, 9.7, 0.1, -4.3, 0.7, 0.1, -4.3, 0.7, 0.1, 19.9, -8.3, 0.1, 19.9,
];
const lineGeometry1 = new LineGeometry();
lineGeometry1.setPositions(points1);

const line1 = new Line2(lineGeometry1, lineMaterial1);
// warehouseGroup.add(line1);

// // Line 2
const lineMaterial2 = new LineMaterial({
  color: "yellow",
  linewidth: 1,
  worldUnits: false,
});

let points2: number[] = [
  -8.3, 0.1, 19.8, -10.1, 0.1, 19.8, -10.1, 0.1, -19.9, -4.65, 0.1, -19.9,
  -4.65, 0.1, -13.1, 0.8, 0.1, -13.1, 0.8, 0.1, 4.5, -4.7, 0.1, 4.5, -4.7, 0.1,
  19.8, -8.3, 0.1, 19.8,
];
const lineGeometry2 = new LineGeometry();
lineGeometry2.setPositions(points2);

const line2 = new Line2(lineGeometry2, lineMaterial2);
// warehouseGroup.add(line2);

// // Line 3
const lineMaterial3 = new LineMaterial({
  color: "purple",
  linewidth: 1,
  worldUnits: false,
});

let points3: number[] = [
  -8.2, 0.1, 19.7, -8.2, 0.1, 4.4, 9.6, 0.1, 4.4, 9.6, 0.1, -13.2, 6.15, 0.1,
  -13.2, 6.15, 0.1, -19.8, 0.9, 0.1, -19.8, 0.9, 0.1, -4.4, -10, 0.1, -4.4, -10,
  0.1, 19.7, -8.2, 0.1, 19.7,
];
const lineGeometry3 = new LineGeometry();
lineGeometry3.setPositions(points3);

const line3 = new Line2(lineGeometry3, lineMaterial3);
// warehouseGroup.add(line3);

// // Line 4
const lineMaterial4 = new LineMaterial({
  color: "blue",
  linewidth: 1,
  worldUnits: false,
});

let points4: number[] = [
  7.9, 0.1, 19.9, 7.9, 0.1, 4.6, 9.8, 0.1, 4.6, 9.8, 0.1, -20.2, -9.9, 0.1,
  -20.2, -9.9, 0.1, 4.6, 7.9, 0.1, 4.6,
];
const lineGeometry4 = new LineGeometry();
lineGeometry4.setPositions(points4);

const line4 = new Line2(lineGeometry4, lineMaterial4);
// warehouseGroup.add(line4);

// // Line 5
const lineMaterial5 = new LineMaterial({
  color: "white",
  linewidth: 1,
  worldUnits: false,
});

let points5: number[] = [
  8, 0.1, 19.9, 8, 0.1, 4.5, 6.25, 0.1, 4.5, 6.25, 0.1, -20.3, 1, 0.1, -20.3, 1,
  0.1, -13.3, -4.55, 0.1, -13.3, -4.55, 0.1, 4.8, 2.65, 0.1, 4.8, 2.65, 0.1,
  19.9, 8, 0.1, 19.9,
];
const lineGeometry5 = new LineGeometry();
lineGeometry5.setPositions(points5);

const line5 = new Line2(lineGeometry5, lineMaterial5);
// warehouseGroup.add(line5);

export { line1, line2, line3, line4, line5 };
