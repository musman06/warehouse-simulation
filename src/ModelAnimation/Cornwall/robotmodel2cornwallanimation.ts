import { degreesToRadians, rotationDurationRobot } from "../../utils";
import gsap from "gsap";
import { Model3D } from "../../model3DClass";

// Model Animation timeline
const timelineRobot2 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Robot Model 1

function robotCustomAnimation2(robot: Model3D) {
  timelineRobot2
    .to(robot.model.position, {
      x: 0.4375,
      duration: 8,
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
      z: 9,
      duration: 12,
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
      duration: 3,
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
      z: -15,
      duration: 6,
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
      duration: 6,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(360),
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
      z: 9,
      duration: 6,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(450),
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
      duration: 2.5,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(360),
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
      duration: 12,
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
      duration: 2.5,
      ease: "none",
    });
}

export { timelineRobot2, robotCustomAnimation2 };
