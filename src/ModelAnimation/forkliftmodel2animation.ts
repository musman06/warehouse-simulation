import {
  degreesToRadians,
  boundingBoxFlooring,
  rotationDurationForklift,
} from "../utils";
import gsap from "gsap";
import { Model3D } from "../model3DClass";

// Model Animation timeline
const timelineForklift2 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Fork Lift Model 2
function forkLiftCustomAnimation2(forklift: Model3D, cellSize: number) {
  timelineForklift2
    .to(forklift.model.position, {
      z: -21,
      duration: 20,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x + 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z - 5;
      },
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-120),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 0,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x - 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z - 5;
      },
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-120),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: -12.7,
      duration: 5,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x - 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z + 5;
      },
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-45),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: -4.75,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x + 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z + 5;
      },
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(135),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: 5,
      duration: 8,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x + 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z + 5;
      },
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(135),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 2.65,
      duration: 6,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x + 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z + 5;
      },
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(135),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: 21,
      duration: 10,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x + 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z + 5;
      },
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(135),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 6,
      duration: 3,
      ease: "none",
      onUpdate: () => {
        forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
          forklift.model.position.x + 5,
          cellSize
        );
        forklift.occupiedCells.nextCell.z =
          forklift.occupiedCells.currentCell.z + 5;
      },
    });
}

export { timelineForklift2, forkLiftCustomAnimation2 };
