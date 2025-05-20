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
      z: 5.05,
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
      x: 10.2,
      duration: 1.5,
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
      z: -19.8,
      duration: 13,
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
      x: -10.3,
      duration: 10,
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
      z: 4.6,
      duration: 13,
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
      x: 7.9,
      duration: 8,
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
      z: 20.4,
      duration: 10,
      ease: "none",
    });
}

export { timelineForklift1, forkLiftCustomAnimation1 };
