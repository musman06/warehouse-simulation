import { degreesToRadians, rotationDurationRobot } from "../../utils";
import gsap from "gsap";
import { Model3D } from "../../model3DClass";

// Model Animation timeline
const timelineRobot3 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Robot Model 3
function robotCustomAnimation3(robot: Model3D) {
  timelineRobot3
    .to(robot.model.position, {
      z: 4.3,
      duration: 18,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(90),
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
      x: 9.7,
      duration: 20,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(0),
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
      z: -13.2,
      duration: 15,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-90),
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
      x: 6.15,
      duration: 5,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(0),
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
      z: -19.9,
      duration: 7.5,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-90),
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
      x: 0.7,
      duration: 5,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-180),
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
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-90),
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
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-180),
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
      z: 19.8,
      duration: 25,
      ease: "none",
    })
    .to(robot.model.rotation, {
      y: degreesToRadians(-270),
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
      x: -8.2,
      duration: 3,
      ease: "none",
    });
}

export { timelineRobot3, robotCustomAnimation3 };
