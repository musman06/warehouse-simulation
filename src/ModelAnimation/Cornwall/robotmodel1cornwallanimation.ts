import { degreesToRadians, rotationDurationRobot } from "../../utils";
import gsap from "gsap";
import { Model3D } from "../../model3DClass";

// Model Animation timeline
const timelineRobot1 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Robot Model 1

function robotCustomAnimation1(robot: Model3D) {
  timelineRobot1
    .to(robot.model.position, {
      z: -61,
      duration: 28,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(65),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
        robot.isStopped = true;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
        robot.isStopped = false;
      },
    })
    .to(robot.model.position, {
      x: 17,
      duration: 4,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(180),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
        robot.isStopped = true;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
        robot.isStopped = false;
      },
    })
    .to(robot.model.position, {
      z: 19,
      duration: 24,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(270),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
        robot.isStopped = true;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
        robot.isStopped = false;
      },
    })
    .to(robot.model.position, {
      x: -17,
      duration: 15,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(180),
      duration: rotationDurationRobot,
      ease: "none",
      onStart: () => {
        if (robot.mixer) robot.mixer.timeScale = 0;
        robot.isStopped = true;
      },
      onComplete: () => {
        if (robot.mixer) robot.mixer.timeScale = 1;
        robot.isStopped = false;
      },
    })
    .to(robot.model.position, {
      z: 60,
      duration: 15,
      ease: "none",
    });
}

export { timelineRobot1, robotCustomAnimation1 };
