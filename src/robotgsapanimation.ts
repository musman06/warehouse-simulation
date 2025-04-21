import {
  degreesToRadians,
  boundingBoxFlooring,
  rotationDurationRobot,
  rotationDurationForklift,
} from "./utils";
import gsap from "gsap";
import { Model3D } from "./model3DClass";

// Model Animation timeline
// const timeline1 = gsap.timeline({
//   repeat: -1,
//   yoyo: false,
//   repeatDelay: 2.5,
// });

// const timeline2 = gsap.timeline({
//   repeat: -1,
//   yoyo: false,
//   repeatDelay: 2.5,
// });

// const timeline3 = gsap.timeline({
//   repeat: -1,
//   yoyo: true,
//   repeatDelay: 2.5,
// });

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

// // Animation Function For Robot Model 1
// function robotCustomAnimation1(robot: Model3D, cellSize: number) {
//   timeline1
//     .to(robot.model.position, {
//       z: 5,
//       duration: 20,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
//         robot.occupiedCells.nextCell.z = boundingBoxFlooring(
//           robot.model.position.z - 5,
//           cellSize
//         );
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//         robot.isStopped = true;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//         robot.isStopped = false;
//       },
//     })
//     .to(robot.model.position, {
//       x: -4.75,
//       duration: 4,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI / 6,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//         robot.isStopped = true;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//         robot.isStopped = false;
//       },
//     })
//     .to(robot.model.position, {
//       z: -21,
//       duration: 20,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
//         robot.occupiedCells.nextCell.z = boundingBoxFlooring(
//           robot.model.position.z - 5,
//           cellSize
//         );
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//         robot.isStopped = true;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//         robot.isStopped = false;
//       },
//     })
//     .to(robot.model.position, {
//       x: 10,
//       duration: 15,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI / 4,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//         robot.isStopped = true;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//         robot.isStopped = false;
//       },
//     })
//     .to(robot.model.position, {
//       z: -4.5,
//       duration: 10,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI / 4,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//         robot.isStopped = true;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//         robot.isStopped = false;
//       },
//     })
//     .to(robot.model.position, {
//       x: 0,
//       duration: 10,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI / 4,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//         robot.isStopped = true;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//         robot.isStopped = false;
//       },
//     })
//     .to(robot.model.position, {
//       z: 21,
//       duration: 25,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI / 4,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//         robot.isStopped = true;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//         robot.isStopped = false;
//       },
//     })
//     .to(robot.model.position, {
//       x: -6,
//       duration: 8,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     });
// }

// // Animation Function For Robot Model 2
// function robotCustomAnimation2(robot: Model3D, cellSize: number) {
//   timeline2
//     .to(robot.model.position, {
//       x: -10,
//       duration: 5,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
//         robot.occupiedCells.nextCell.z = boundingBoxFlooring(
//           robot.model.position.z - 5,
//           cellSize
//         );
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       z: -21,
//       duration: 50,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       x: -4.75,
//       duration: 7,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
//         robot.occupiedCells.nextCell.z = boundingBoxFlooring(
//           robot.model.position.z + 5,
//           cellSize
//         );
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       z: -12.2,
//       duration: 12,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x - 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       x: 0,
//       duration: 4,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x - 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       z: 5,
//       duration: 15,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x - 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       x: -6,
//       duration: 7,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x - 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: Math.PI / 2,
//       duration: rotationDuration,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       z: 21,
//       duration: 20,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x - 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     });
// }

// // Animation Function For Robot Model 3
// function robotCustomAnimation3(robot: Model3D, cellSize: number) {
//   timeline3
//     .to(robot.model.position, {
//       z: -10,
//       duration: 30,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
//         robot.occupiedCells.nextCell.z = boundingBoxFlooring(
//           robot.model.position.z - 5,
//           cellSize
//         );
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI / 2,
//       duration: 5,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       x: -10,
//       duration: 30,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x - 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI,
//       duration: 5,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       z: -21,
//       duration: 15,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = robot.occupiedCells.currentCell.x;
//         robot.occupiedCells.nextCell.z = boundingBoxFlooring(
//           robot.model.position.z - 5,
//           cellSize
//         );
//       },
//     })
//     .to(robot.model.rotation, {
//       y: -Math.PI * 1.5,
//       duration: 5,
//       ease: "none",
//       onStart: () => {
//         if (robot.mixer) robot.mixer.timeScale = 0;
//       },
//       onComplete: () => {
//         if (robot.mixer) robot.mixer.timeScale = 1;
//       },
//     })
//     .to(robot.model.position, {
//       x: 10,
//       duration: 30,
//       ease: "none",
//       onUpdate: () => {
//         robot.occupiedCells.nextCell.x = boundingBoxFlooring(
//           robot.model.position.x + 5,
//           cellSize
//         );
//         robot.occupiedCells.nextCell.z = robot.occupiedCells.currentCell.z;
//       },
//     });
// }

// // Animation Function For Fork Lift Model 1
// function forkLiftCustomAnimation1(forklift: Model3D, cellSize: number) {
//   timeline4
//     .to(forklift.model.position, {
//       z: 5,
//       duration: 10,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x =
//           forklift.occupiedCells.currentCell.x;
//         forklift.occupiedCells.nextCell.z = boundingBoxFlooring(
//           forklift.model.position.z - 5,
//           cellSize
//         );
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: -Math.PI,
//       duration: rotationDurationForklift,
//       ease: "none",
//       onStart: () => {
//         forklift.isStopped = true;
//       },
//       onComplete: () => {
//         forklift.isStopped = false;
//       },
//     })
//     .to(forklift.model.position, {
//       x: 10,
//       duration: 3,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x - 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: -Math.PI * 1.5,
//       duration: rotationDurationForklift,
//       ease: "none",
//       onStart: () => {
//         forklift.isStopped = true;
//       },
//       onComplete: () => {
//         forklift.isStopped = false;
//       },
//     })
//     .to(forklift.model.position, {
//       z: -21,
//       duration: 13,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x =
//           forklift.occupiedCells.currentCell.x;
//         forklift.occupiedCells.nextCell.z = boundingBoxFlooring(
//           forklift.model.position.z + 5,
//           cellSize
//         );
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: -Math.PI * 2,
//       duration: rotationDurationForklift,
//       ease: "none",
//       onStart: () => {
//         forklift.isStopped = true;
//       },
//       onComplete: () => {
//         forklift.isStopped = false;
//       },
//     })
//     .to(forklift.model.position, {
//       x: -10,
//       duration: 10,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x - 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: -Math.PI / 2,
//       duration: rotationDurationForklift,
//       ease: "none",
//       onStart: () => {
//         forklift.isStopped = true;
//       },
//       onComplete: () => {
//         forklift.isStopped = false;
//       },
//     })
//     .to(forklift.model.position, {
//       z: 5,
//       duration: 13,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x - 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: -Math.PI / 2,
//       duration: rotationDurationForklift,
//       ease: "none",
//       onStart: () => {
//         forklift.isStopped = true;
//       },
//       onComplete: () => {
//         forklift.isStopped = false;
//       },
//     })
//     .to(forklift.model.position, {
//       x: 6,
//       duration: 8,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x - 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: -Math.PI / 2,
//       duration: rotationDurationForklift,
//       ease: "none",
//       onStart: () => {
//         forklift.isStopped = true;
//       },
//       onComplete: () => {
//         forklift.isStopped = false;
//       },
//     })
//     .to(forklift.model.position, {
//       z: 21,
//       duration: 10,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x - 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z;
//       },
//     });
// }

// // Animation Function For Fork Lift Model 2
// function forkLiftCustomAnimation2(forklift: Model3D, cellSize: number) {
//   timeline5
//     .to(forklift.model.position, {
//       z: -21,
//       duration: 20,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x + 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z - 5;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: degreesToRadians(-120),
//       duration: rotationDurationForklift,
//       ease: "none",
//     })
//     .to(forklift.model.position, {
//       x: 0,
//       duration: 3,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x - 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z - 5;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: degreesToRadians(-120),
//       duration: rotationDurationForklift,
//       ease: "none",
//     })
//     .to(forklift.model.position, {
//       z: -12.7,
//       duration: 5,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x - 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z + 5;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: degreesToRadians(-45),
//       duration: rotationDurationForklift,
//       ease: "none",
//     })
//     .to(forklift.model.position, {
//       x: -4.75,
//       duration: 3,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x + 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z + 5;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: degreesToRadians(135),
//       duration: rotationDurationForklift,
//       ease: "none",
//     })
//     .to(forklift.model.position, {
//       z: 5,
//       duration: 8,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x + 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z + 5;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: degreesToRadians(135),
//       duration: rotationDurationForklift,
//       ease: "none",
//     })
//     .to(forklift.model.position, {
//       x: 2.65,
//       duration: 6,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x + 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z + 5;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: degreesToRadians(135),
//       duration: rotationDurationForklift,
//       ease: "none",
//     })
//     .to(forklift.model.position, {
//       z: 21,
//       duration: 10,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x + 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z + 5;
//       },
//     })
//     .to(forklift.model.rotation, {
//       y: degreesToRadians(135),
//       duration: rotationDurationForklift,
//       ease: "none",
//     })
//     .to(forklift.model.position, {
//       x: 6,
//       duration: 3,
//       ease: "none",
//       onUpdate: () => {
//         forklift.occupiedCells.nextCell.x = boundingBoxFlooring(
//           forklift.model.position.x + 5,
//           cellSize
//         );
//         forklift.occupiedCells.nextCell.z =
//           forklift.occupiedCells.currentCell.z + 5;
//       },
//     });
// }
