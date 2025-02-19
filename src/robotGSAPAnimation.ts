import * as THREE from "three";
import { degreesToRadians } from "./utils";
import gsap from "gsap";

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

// Animation function
function robotCustomAnimation1(
  robotModel: THREE.Group,
  mixer: THREE.AnimationMixer
) {
  timeline1
    .to(robotModel.position, { z: 0, duration: 30, ease: "none" })
    .to(robotModel.rotation, {
      y: Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { x: 0, duration: 15, ease: "none" })
    .to(robotModel.rotation, {
      y: Math.PI,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { z: -19, duration: 30, ease: "none" })
    .to(robotModel.rotation, {
      y: Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { x: 7, duration: 15, ease: "none" });
}

function robotCustomAnimation2(
  robotModel: THREE.Group,
  mixer: THREE.AnimationMixer
) {
  timeline2
    .to(robotModel.position, { z: -22, duration: 60, ease: "none" })
    .to(robotModel.rotation, {
      y: Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { x: 11, duration: 30, ease: "none" })
    .to(robotModel.rotation, {
      y: 0,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { z: 22, duration: 60, ease: "none" })
    .to(robotModel.rotation, {
      y: Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { x: -11, duration: 30, ease: "none" })
    .to(robotModel.rotation, {
      y: Math.PI,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    });
}

function robotCustomAnimation3(
  robotModel: THREE.Group,
  mixer: THREE.AnimationMixer
) {
  timeline3
    .to(robotModel.position, { z: -10, duration: 30, ease: "none" })
    .to(robotModel.rotation, {
      y: -Math.PI / 2,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { x: -10, duration: 30, ease: "none" })
    .to(robotModel.rotation, {
      y: -Math.PI,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { z: -21, duration: 15, ease: "none" })
    .to(robotModel.rotation, {
      y: -Math.PI * 1.5,
      duration: 5,
      ease: "none",
      onStart: () => {
        if (mixer) mixer.timeScale = 0;
      },
      onComplete: () => {
        if (mixer) mixer.timeScale = 1;
      },
    })
    .to(robotModel.position, { x: 10, duration: 30, ease: "none" });
}

function forkLiftCustomAnimation1(forkliftModel: THREE.Group) {
  timeline4
    .to(forkliftModel.position, { z: 0, duration: 10, ease: "none" })
    .to(forkliftModel.rotation, {
      y: -Math.PI,
      duration: 2.5,
      ease: "none",
    })
    .to(forkliftModel.position, { x: 9, duration: 5, ease: "none" })
    .to(forkliftModel.rotation, {
      y: -Math.PI * 1.5,
      duration: 5,
      ease: "none",
    })
    .to(forkliftModel.position, { z: 20, duration: 10, ease: "none" })
    .to(forkliftModel.rotation, {
      y: -Math.PI * 2,
      duration: 2.5,
      ease: "none",
    })
    .to(forkliftModel.position, { x: 0, duration: 5, ease: "none" })
    .to(forkliftModel.rotation, {
      y: -Math.PI / 2,
      duration: 2.5,
      ease: "none",
    });
}

function forkLiftCustomAnimation2(forkliftModel: THREE.Group) {
  timeline5
    .to(forkliftModel.position, { x: 11, z: 0, duration: 10, ease: "none" })
    .to(forkliftModel.rotation, {
      y: degreesToRadians(-120),
      duration: 2.5,
      ease: "none",
    })
    .to(forkliftModel.position, { x: 0, z: -20, duration: 10, ease: "none" })
    .to(forkliftModel.rotation, {
      y: degreesToRadians(-120),
      duration: 2.5,
      ease: "none",
    })
    .to(forkliftModel.position, { x: -11, z: 0, duration: 10, ease: "none" })
    .to(forkliftModel.rotation, {
      y: degreesToRadians(-45),
      duration: 2.5,
      ease: "none",
    })
    .to(forkliftModel.position, { x: 0, z: 20, duration: 10, ease: "none" })
    .to(forkliftModel.rotation, {
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
};
