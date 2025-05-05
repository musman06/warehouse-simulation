import { degreesToRadians, rotationDurationRobot } from "../../utils";
import gsap from "gsap";
import { Model3D } from "../../model3DClass";

// Model Animation timeline
const timelineRobot3 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Robot Model 1

function robotCustomAnimation3(robot: Model3D) {
  timelineRobot3
    .to(robot.model.position, {
      z: 18,
      duration: 15,
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
      x: 11.85,
      duration: 10,
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
      z: -3,
      duration: 10,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-90),
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
      x: -11.25,
      duration: 10,
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
      z: -61,
      duration: 15,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-90),
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
      x: -18,
      duration: 2.5,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-180),
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
      duration: 28,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-270),
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
      duration: 1,
      ease: "none",
    });
}

export { timelineRobot3, robotCustomAnimation3 };
