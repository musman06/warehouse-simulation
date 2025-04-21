import {
  degreesToRadians,
  boundingBoxFlooring,
  rotationDurationForklift,
} from "../utils";
import gsap from "gsap";
import { Model3D } from "../model3DClass";

// Model Animation timeline
const timelineForklift1 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Fork Lift Model 1
function forkLiftCustomAnimation1(forklift: Model3D, cellSize: number) {
  timelineForklift1
    .to(forklift.model.position, {
      z: 5,
      duration: 10,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x =
          forklift.occupiedCells.currentCell.x;
        forklift.occupiedCells.nextCell.z = boundingBoxFlooring(
          forklift.model.position.z - 5,
          cellSize
        );
      },
    })
    .to(forklift.model.rotation, {
      y: -Math.PI,
      duration: rotationDurationForklift,
      ease: "none",
      onStart: () => {
        forklift.isStopped = true;
      },
      onComplete: () => {
        forklift.isStopped = false;
      },
    })
    .to(forklift.model.position, {
      x: 10,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x - 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z;
      },
    })
    .to(forklift.model.rotation, {
      y: -Math.PI * 1.5,
      duration: rotationDurationForklift,
      ease: "none",
      onStart: () => {
        forklift.isStopped = true;
      },
      onComplete: () => {
        forklift.isStopped = false;
      },
    })
    .to(forklift.model.position, {
      z: -21,
      duration: 13,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x =
          forklift.occupiedCells.currentCell.x;
        forklift.occupiedCells.nextCell.z = boundingBoxFlooring(
          forklift.model.position.z + 5,
          cellSize
        );
      },
    })
    .to(forklift.model.rotation, {
      y: -Math.PI * 2,
      duration: rotationDurationForklift,
      ease: "none",
      onStart: () => {
        forklift.isStopped = true;
      },
      onComplete: () => {
        forklift.isStopped = false;
      },
    })
    .to(forklift.model.position, {
      x: -10,
      duration: 10,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x - 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z;
      },
    })
    .to(forklift.model.rotation, {
      y: -Math.PI / 2,
      duration: rotationDurationForklift,
      ease: "none",
      onStart: () => {
        forklift.isStopped = true;
      },
      onComplete: () => {
        forklift.isStopped = false;
      },
    })
    .to(forklift.model.position, {
      z: 5,
      duration: 13,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x - 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z;
      },
    })
    .to(forklift.model.rotation, {
      y: -Math.PI / 2,
      duration: rotationDurationForklift,
      ease: "none",
      onStart: () => {
        forklift.isStopped = true;
      },
      onComplete: () => {
        forklift.isStopped = false;
      },
    })
    .to(forklift.model.position, {
      x: 6,
      duration: 8,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x - 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z;
      },
    })
    .to(forklift.model.rotation, {
      y: -Math.PI / 2,
      duration: rotationDurationForklift,
      ease: "none",
      onStart: () => {
        forklift.isStopped = true;
      },
      onComplete: () => {
        forklift.isStopped = false;
      },
    })
    .to(forklift.model.position, {
      z: 21,
      duration: 10,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x - 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z;
      },
    });
}

export { timelineForklift1, forkLiftCustomAnimation1 };
