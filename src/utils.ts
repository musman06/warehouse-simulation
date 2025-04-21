import { Model3D } from "./model3DClass";
import { timelineRobot1 } from "./ModelAnimation/robotmodel1animation";
import { timelineRobot2 } from "./ModelAnimation/robotmodel2Animation";
import { timelineRobot3 } from "./ModelAnimation/robotmodel3animation";
import { timelineForklift1 } from "./ModelAnimation/forkliftmodel1animation";
import { timelineForklift2 } from "./ModelAnimation/forkliftmodel2animation";

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

// Handling Collions Between Models
function handleCollisions(modelsArray: Model3D[], cellSize: number) {
  for (const model of modelsArray) {
    if (model.name === "Robot Model 1") {
      // console.log(model.boundingBox);
    }
    const minX = Math.floor(model.boundingBox.min.x);
    const maxX = Math.floor(model.boundingBox.max.x);
    const minZ = Math.floor(model.boundingBox.min.z);
    const maxZ = Math.floor(model.boundingBox.max.z);

    if (model.name === "Robot Model 1") {
      // console.log(minX, maxX, minZ, maxZ);
    }

    model.occupiedCells.currentCell.x = boundingBoxFlooring(
      model.boundingBox.max.x,
      cellSize
    );
    model.occupiedCells.currentCell.z = boundingBoxFlooring(
      model.boundingBox.max.z,
      cellSize
    );

    if (model.name === "Robot Model 1") {
      // console.log(model.occupiedCells.currentCell);
    }

    if (minX !== maxX || minZ !== maxZ) {
      if (minX !== maxX && minZ !== maxZ) {
        // if (model.name === "Robot Model 1") console.log("I am here 1");
        model.occupiedCells.previousCell.x =
          model.occupiedCells.currentCell.x - 1;
        model.occupiedCells.previousCell.z =
          model.occupiedCells.currentCell.z - 1;
      } else if (minX !== maxX) {
        // if (model.name === "Robot Model 1") console.log("I am here 2");
        model.occupiedCells.previousCell.x =
          model.occupiedCells.currentCell.x - 1;
        model.occupiedCells.previousCell.z = model.occupiedCells.currentCell.z;
      } else if (minZ !== maxZ) {
        // if (model.name === "Robot Model 1") console.log("I am here 3");
        model.occupiedCells.previousCell.x = model.occupiedCells.currentCell.x;
        model.occupiedCells.previousCell.z =
          model.occupiedCells.currentCell.z - 1;
      }
    } else {
      model.occupiedCells.previousCell.x = model.occupiedCells.currentCell.x;
      model.occupiedCells.previousCell.z = model.occupiedCells.currentCell.z;
    }
    // if (model.name === "Robot Model 1")
    //   console.log(
    //     "Previous Position: ",
    //     model.occupiedCells.previousCell,
    //     "Current Position: ",
    //     model.occupiedCells.currentCell,
    //     "Next Position: ",
    //     model.occupiedCells.nextCell
    //   );
  }

  checkForCollisions(modelsArray);

  // console.log(rm1bb, rm2bb, rm3bb, flm1bb, flm2bb, rows, columns, cellSize);
  // console.log(currentCellNumberRM1BB);
}

export { degreesToRadians, handleCollisions, boundingBoxFlooring };
