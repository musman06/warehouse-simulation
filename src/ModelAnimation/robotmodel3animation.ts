import {
  degreesToRadians,
  boundingBoxFlooring,
  rotationDurationRobot,
} from "../utils";
import gsap from "gsap";
import { Model3D } from "../model3DClass";

// Model Animation timeline
const timelineRobot3 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Robot Model 3
function robotCustomAnimation3(robot: Model3D, cellSize: number) {
  console.log("I am called");

  timelineRobot3
    .to(robot.model.position, {
      z: 5,
      duration: 20,
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
      y: -Math.PI / 2,
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
      x: 10.1,
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
      y: -Math.PI / 2,
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
      z: -12.7,
      duration: 12,
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
      y: -Math.PI * 1.5,
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
      x: 5.25,
      duration: 5,
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
      y: -Math.PI * 1.5,
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
      z: -21,
      duration: 7.5,
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
      y: -Math.PI * 1.5,
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
      x: 0,
      duration: 5,
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
      y: -Math.PI * 1.5,
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
      z: -4.4,
      duration: 10,
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
      y: -Math.PI * 1.5,
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
      x: -10,
      duration: 12,
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
      y: -Math.PI * 1.5,
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
      z: 21,
      duration: 25,
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
      y: -Math.PI * 1.5,
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
      x: -6,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        robot.occupiedCells.nextCell.x = boundingBoxFlooring(
          robot.model.position.x + 5,
          cellSize
        );
        robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
      },
    });
}

export { timelineRobot3, robotCustomAnimation3 };
