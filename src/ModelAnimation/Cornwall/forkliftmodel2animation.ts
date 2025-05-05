import { degreesToRadians, rotationDurationForklift } from "../../utils";
import gsap from "gsap";
import { Model3D } from "../../model3DClass";

// Model Animation timeline
const timelineForklift2 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Fork Lift Model 1
function forkLiftCustomAnimation2(forklift: Model3D) {
  timelineForklift2
    .to(forklift.model.position, {
      x: 6.075,
      duration: 3,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-90),
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
      z: -3,
      duration: 10,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(0),
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
      x: -5.2,
      duration: 3,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-90),
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
      z: -51,
      duration: 10,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-180),
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
      x: 11.85,
      duration: 5,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-270),
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
      z: 9,
      duration: 8.5,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-180),
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
      x: 17.2,
      duration: 1,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(-270),
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
      z: 60,
      duration: 8,
      ease: "none",
    });
}

export { timelineForklift2, forkLiftCustomAnimation2 };
