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
      z: 4.85,
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
      y: degreesToRadians(-90),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 6.25,
      duration: 1.5,
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
      y: degreesToRadians(0),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: -19.8,
      duration: 15,
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
      y: degreesToRadians(-90),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 1,
      duration: 4,
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
      y: degreesToRadians(-180),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: -13.3,
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
      y: degreesToRadians(-90),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: -4.65,
      duration: 4,
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
      y: degreesToRadians(-180),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: 4.5,
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
      y: degreesToRadians(-270),
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
      y: degreesToRadians(-180),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: 19.9,
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
      y: degreesToRadians(-270),
      duration: rotationDurationForklift,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 8,
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
