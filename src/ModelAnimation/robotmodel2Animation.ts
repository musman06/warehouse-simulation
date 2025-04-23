import {
  degreesToRadians,
  boundingBoxFlooring,
  rotationDurationRobot,
} from "../utils";
import gsap from "gsap";
import { Model3D } from "../model3DClass";

// Model Animation timeline
const timelineRobot2 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Robot Model 2
function robotCustomAnimation2(robot: Model3D, cellSize: number) {
  timelineRobot2
    .to(robot.model.position, {
      x: -10.1,
      duration: 5,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
        robot.occupiedCells.nextCell.z = boundingBoxFlooring(
          robot.model.position.z - 5,
          cellSize
        );
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-180),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      z: -19.9,
      duration: 50,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x + 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-270),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: -4.65,
      duration: 7,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
        robot.occupiedCells.nextCell.z = boundingBoxFlooring(
          robot.model.position.z + 5,
          cellSize
        );
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-360),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      z: -13.1,
      duration: 12,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x - 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-270),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: 0.8,
      duration: 4,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x - 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-360),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      z: 4.5,
      duration: 15,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x - 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-450),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: -4.7,
      duration: 7,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x - 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-360),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      z: 19.8,
      duration: 20,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x - 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-450),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: -8.3,
      duration: 20,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x - 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    });
}

export { timelineRobot2, robotCustomAnimation2 };
