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
      z: 4.3,
      duration: 14,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(90),
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
      x: -4.65,
      duration: 4,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(0),
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
      z: -19.9,
      duration: 20,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(90),
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
      x: 9.7,
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
      z: -4.3,
      duration: 15,
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
      x: 0.7,
      duration: 10,
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
      z: 19.8,
      duration: 25,
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
      x: -8.3,
      duration: 8,
      ease: "none",
    });
}

export { timelineRobot1, robotCustomAnimation1 };
