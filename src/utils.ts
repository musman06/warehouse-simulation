// time taken by robot to rotate
export const rotationDurationRobot = 4;

// time taken by forklift to rotate
export const rotationDurationForklift = 2.5;

// Degrees To Radians function
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Flooring Bounding Box Parameters Function
function boundingBoxFlooring(coordinate: number, cellSize: number) {
  return Math.floor(coordinate / cellSize) + 1;
}

export { degreesToRadians, boundingBoxFlooring };
