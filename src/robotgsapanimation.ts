import * as THREE from "three";
import { degreesToRadians, boundingBoxFlooring } from "./utils";
import gsap from "gsap";
import { Model3D } from "./model3DClass";

// Geometry Animation
const timeline1 = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 2.5,
});

const timeline2 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

const timeline3 = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 2.5,
});

const timeline4 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

const timeline5 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Robot Model 1
function robotCustomAnimation1(robot: Model3D, cellSize: number) {
  timeline1
    .to(robot.model.position, {
      z: 0,
      duration: 30,
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
      y: Math.PI / 2,
      duration: 5,
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
      duration: 15,
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
      y: Math.PI,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      z: -19,
      duration: 30,
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
      y: Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: 7,
      duration: 15,
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

// Animation Function For Robot Model 2
function robotCustomAnimation2(robot: Model3D, cellSize: number) {
  timeline2
    .to(robot.model.position, {
      z: -22,
      duration: 60,
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
      y: Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: 11,
      duration: 30,
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
      y: 0,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      z: 22,
      duration: 60,
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
      y: Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: -11,
      duration: 30,
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
      y: Math.PI,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    });
}

// Animation Function For Robot Model 3
function robotCustomAnimation3(robot: Model3D, cellSize: number) {
  timeline3
    .to(robot.model.position, {
      z: -10,
      duration: 30,
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
      duration: 5,
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
      duration: 30,
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
      y: -Math.PI,
      duration: 5,
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
      duration: 15,
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
      duration: 5,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
      },
    })
    .to(robot.model.position, {
      x: 10,
      duration: 30,
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

// Animation Function For Fork Lift Model 1
function forkLiftCustomAnimation1(forklift: Model3D, cellSize: number) {
  timeline4
    .to(forklift.model.position, {
      z: 0,
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
      duration: 2.5,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 9,
      duration: 5,
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
      duration: 5,
      ease: "none",
    })
    .to(forklift.model.position, {
      z: 20,
      duration: 10,
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
      duration: 2.5,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 0,
      duration: 5,
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
      duration: 2.5,
      ease: "none",
    });
}

// Animation Function For Fork Lift Model 2
function forkLiftCustomAnimation2(forklift: Model3D, cellSize: number) {
  timeline5
    .to(forklift.model.position, {
      x: 11,
      z: 0,
      duration: 10,
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
      duration: 2.5,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 0,
      z: -20,
      duration: 10,
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
      duration: 2.5,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: -11,
      z: 0,
      duration: 10,
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
      duration: 2.5,
      ease: "none",
    })
    .to(forklift.model.position, {
      x: 0,
      z: 20,
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
      duration: 2.5,
      ease: "none",
    });
}

export {
  robotCustomAnimation1,
  robotCustomAnimation2,
  robotCustomAnimation3,
  forkLiftCustomAnimation1,
  forkLiftCustomAnimation2,
  timeline1,
  timeline2,
  timeline3,
  timeline4,
  timeline5,
};
