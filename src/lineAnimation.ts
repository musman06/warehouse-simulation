import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

// Lines
// // Line 1
const lineMaterial1 = new LineMaterial({
  color: 0x00ff00,
  linewidth: 5,
  worldUnits: false,
});

let points1: number[] = [
  -7, 0.03, 22, -7, 0.03, 0, 0, 0.03, 0, 0, 0.03, -19, 7, 0.03, -19,
];
const lineGeometry1 = new LineGeometry();
lineGeometry1.setPositions(points1);

const line1 = new Line2(lineGeometry1, lineMaterial1);

// // Line 2
const lineMaterial2 = new LineMaterial({
  color: "yellow",
  linewidth: 5,
  worldUnits: false,
});

let points2: number[] = [
  -11, 0.03, 22, -11, 0.03, -22, 11, 0.03, -22, 11, 0.03, 22, -11, 0.03, 22,
];
const lineGeometry2 = new LineGeometry();
lineGeometry2.setPositions(points2);

const line2 = new Line2(lineGeometry2, lineMaterial2);

// // Line 3
const lineMaterial3 = new LineMaterial({
  color: "purple",
  linewidth: 5,
  worldUnits: false,
});

let points3: number[] = [
  10, 0.03, 22, 10, 0.03, -10, -10, 0.03, -10, -10, 0.03, -21, 10, 0.03, -21,
];
const lineGeometry3 = new LineGeometry();
lineGeometry3.setPositions(points3);

const line3 = new Line2(lineGeometry3, lineMaterial3);

// // Line 4
const lineMaterial4 = new LineMaterial({
  color: "blue",
  linewidth: 5,
  worldUnits: false,
});

let points4: number[] = [
  0, 0.03, 20, 0, 0.03, 0, 9, 0.03, 0, 9, 0.03, 20, 0, 0.03, 20,
];
const lineGeometry4 = new LineGeometry();
lineGeometry4.setPositions(points4);

const line4 = new Line2(lineGeometry4, lineMaterial4);

// // Line 5
const lineMaterial5 = new LineMaterial({
  color: "red",
  linewidth: 5,
  worldUnits: false,
});

let points5: number[] = [
  0, 0.03, 20, 11, 0.03, 0, 0, 0.03, -20, -11, 0.03, 0, 0, 0.03, 20,
];
const lineGeometry5 = new LineGeometry();
lineGeometry5.setPositions(points5);

const line5 = new Line2(lineGeometry5, lineMaterial5);

export { line1, line2, line3, line4, line5 };
