import { degreesToRadians, rotationDurationForklift } from "../../utils";
import gsap from "gsap";
import { Model3D } from "../../model3DClass";

// Model Animation timeline
const timelineForklift1 = gsap.timeline({
  repeat: -1,
  yoyo: false,
  repeatDelay: 2.5,
});

// Animation Function For Fork Lift Model 1
function forkLiftCustomAnimation1(forklift: Model3D) {
  timelineForklift1
    .to(forklift.model.position, {
      z: -51,
      duration: 18,
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
      x: -11.25,
      duration: 6,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(90),
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
      duration: 8,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(180),
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
      y: degreesToRadians(90),
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
      z: 18,
      duration: 2,
      ease: "none",
    })
    .to(forklift.model.rotation, {
      y: degreesToRadians(180),
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
      y: degreesToRadians(90),
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

export { timelineForklift1, forkLiftCustomAnimation1 };
