import { Model3D } from "./model3DClass";
import { timelineRobot1 } from "./ModelAnimation/robotmodel1animation";
import { timelineRobot2 } from "./ModelAnimation/robotmodel2Animation";
import { timelineRobot3 } from "./ModelAnimation/robotmodel3animation";
import { timelineForklift1 } from "./ModelAnimation/forkliftmodel1animation";
import { timelineForklift2 } from "./ModelAnimation/forkliftmodel2animation";
import { gridCells, startX, startZ, rows, columns } from "./script";

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

// Function to stop model animation for 2.5 seconds
function stopModelAnimation(model: Model3D, collisionState: { flag: boolean }) {
  // console.log("I am called: ", model.name);
  if (model.mixer) {
    model.mixer.timeScale = 0;
    model.name === "Robot Model 1"
      ? timelineRobot1.pause()
      : model.name === "Robot Model 2"
      ? timelineRobot2.pause()
      : model.name === "Robot Model 3"
      ? timelineRobot3.pause()
      : model.name === "Fork Lift Model 1"
      ? timelineForklift1.pause()
      : model.name === "Fork Lift Model 2"
      ? timelineForklift2.pause()
      : null;
    // timeline1.pause();
    // console.log(`${model.name} animation paused for 2.5 seconds`);

    // Resume animation after 2.5 seconds
    setTimeout(() => {
      model.mixer.timeScale = 1;
      // timeline1.resume();
      !timelineRobot1.isActive() ? timelineRobot1.resume() : null;
      !timelineRobot2.isActive() ? timelineRobot2.resume() : null;
      !timelineRobot3.isActive() ? timelineRobot3.resume() : null;
      !timelineForklift1.isActive() ? timelineForklift1.resume() : null;
      !timelineForklift2.isActive() ? timelineForklift2.resume() : null;
      collisionState.flag = false;
      // console.log(`${model.name} animation resumed`);
    }, 5000);
  }
}

// Resolving Collions Between Two Models
function resolveCollision(
  model1: Model3D,
  model2: Model3D,
  collisionState: { flag: boolean }
) {
  model1.isStopped
    ? stopModelAnimation(model2, collisionState)
    : model2.isStopped
    ? stopModelAnimation(model1, collisionState)
    : stopModelAnimation(model2, collisionState);

  // Checking Priorities
  // if (model1.modelTypePriority < model2.modelPriority) {
  //   console.log("Called from here 1", model1, model2);
  //   stopModelAnimation(model2, collisionState);
  // } else if (model2.modelTypePriority < model1.modelPriority) {
  //   console.log("Called from here 2", model1, model2);
  //   stopModelAnimation(model1, collisionState);
  // } else if (model1.modelTypePriority === model2.modelTypePriority) {
  //   if (model1.modelPriority < model2.modelPriority) {
  //     console.log("Called from here 3", model1, model2);
  //     stopModelAnimation(model2, collisionState);
  //   } else {
  //     console.log("Called from here 4", model1, model2);
  //     stopModelAnimation(model1, collisionState);
  //   }
  // }
}

// Checking For Collions Between Models
function checkForCollisions(modelsArray: Model3D[]) {
  for (const model of modelsArray) {
    let collisionState = { flag: false };
    for (let i = 0; i < modelsArray.length; i++) {
      collisionState.flag = false;
      if (model.name === modelsArray[i].name) continue;
      if (
        (model.occupiedCells.nextCell.x ===
          modelsArray[i].occupiedCells.previousCell.x &&
          model.occupiedCells.nextCell.z ===
            modelsArray[i].occupiedCells.previousCell.z) ||
        (model.occupiedCells.nextCell.x ===
          modelsArray[i].occupiedCells.currentCell.x &&
          model.occupiedCells.nextCell.z ===
            modelsArray[i].occupiedCells.currentCell.z) ||
        (model.occupiedCells.nextCell.x ===
          modelsArray[i].occupiedCells.nextCell.x &&
          model.occupiedCells.nextCell.z ===
            modelsArray[i].occupiedCells.nextCell.z)
      ) {
        // console.log("I have been called");
        collisionState.flag = false;

        resolveCollision(model, modelsArray[i], collisionState);
      }
    }
  }
}

function isSameCell(a: any, b: any): boolean {
  return a.x === b.x && a.z === b.z;
}

function isBehind(modelA: Model3D, modelB: Model3D): boolean {
  return (
    modelA.direction.x === modelB.direction.x &&
    modelA.direction.z === modelB.direction.z &&
    ((modelA.direction.x !== 0 &&
      Math.sign(modelB.model.position.x - modelA.model.position.x) ===
        modelA.direction.x) ||
      (modelA.direction.z !== 0 &&
        Math.sign(modelB.model.position.z - modelA.model.position.z) ===
          modelA.direction.z))
  );
}

function detectCollision(modelA: Model3D, modelB: Model3D): boolean {
  const aNext = modelA.occupiedCells.nextCell;
  const bCurrent = modelB.occupiedCells.currentCell;
  const bPrevious = modelB.occupiedCells.previousCell;

  return isSameCell(aNext, bCurrent) || isSameCell(aNext, bPrevious);
}

// converting real-world coordinates into warehouse floor mesh indices
function worldToGridIndex(
  worldPos: number,
  start: number,
  cellSize: number
): number {
  return Math.floor((worldPos - start) / cellSize);
}

function updateModelCell(
  model: Model3D,
  gridCells: any,
  cellSizeX: number,
  cellSizeZ: number,
  startX: number,
  startZ: number,
  rows: number,
  columns: number
) {
  const newX = worldToGridIndex(model.boundingBox.max.x, startX, cellSizeX);
  const newZ = worldToGridIndex(model.boundingBox.max.z, startZ, cellSizeZ);

  // Stay inside grid bounds
  if (newX < 0 || newX >= rows || newZ < 0 || newZ >= columns) return;

  const prevX = model.occupiedCells.currentCell.x;
  const prevZ = model.occupiedCells.currentCell.z;

  // Only update if cell has changed
  if (newX !== prevX || newZ !== prevZ) {
    // Mark previous cell as free
    if (prevX >= 0 && prevX < rows && prevZ >= 0 && prevZ < columns) {
      // console.log("I am here");
      // console.log("newX: ", newX, "newZ: ", newZ);
      // console.log("prevX: ", prevX, "prevZ: ", prevZ);
      gridCells[prevX][prevZ].isOccupied = false;
      gridCells[prevX][prevZ].changeCellColor();
    }

    // Update model's current cell
    model.occupiedCells.previousCell.x = prevX;
    model.occupiedCells.previousCell.z = prevZ;
    model.occupiedCells.currentCell.x = newX;
    model.occupiedCells.currentCell.z = newZ;

    // Mark new cell as occupied
    gridCells[newX][newZ].isOccupied = true;
    gridCells[newX][newZ].changeCellColor();
  }
}

// Handling Collions Between Models
function handleCollisions(
  modelsArray: Model3D[],
  cellSizeX: number,
  cellSizeZ: number
) {
  for (const model of modelsArray) {
    console.log("Model Name: ", model.name);
    console.log("Model Cells: ", model.occupiedCells);
    updateModelCell(
      model,
      gridCells,
      cellSizeX,
      cellSizeZ,
      startX,
      startZ,
      rows,
      columns
    );

    // Update next cell based on direction
    model.occupiedCells.nextCell = {
      x: model.occupiedCells.currentCell.x + model.direction.x,
      z: model.occupiedCells.currentCell.z + model.direction.z,
    };
  }

  // Check collisions between all pairs
  for (let i = 0; i < modelsArray.length; i++) {
    for (let j = 0; j < modelsArray.length; j++) {
      if (i === j) continue;

      const modelA = modelsArray[i]; // the faster one coming from behind
      const modelB = modelsArray[j]; // the slower one ahead

      if (detectCollision(modelA, modelB) && isBehind(modelA, modelB)) {
        // Pause modelA's timeline (the one coming from behind)
        if (timelineRobot3.isActive()) {
          timelineRobot3.pause();

          setTimeout(() => {
            timelineRobot3.resume();
          }, 3000);
        }
      }
    }
  }
}

export { degreesToRadians, handleCollisions, boundingBoxFlooring };
