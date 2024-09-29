import * as THREE from "three";
import Animation from "../../animation";
import _ from "../../../common/easings";

class AnimationsFactory {
  constructor() {
    this.run = this.run.bind(this);
    this.createJiggleAnimation = this.createJiggleAnimation.bind(this);
    this.createSwingAnimation = this.createSwingAnimation.bind(this);
    this.createTailAnimation = this.createTailAnimation.bind(this);
    this.createLeafAnimation = this.createLeafAnimation.bind(this);
    this.createAirplaneAnimation = this.createAirplaneAnimation.bind(this);
    this.createCameraAnimation = this.createCameraAnimation.bind(this);
    this.createHueEffectAnimation = this.createHueEffectAnimation.bind(this);
    this.createBlobsEffectAnimation = this.createBlobsEffectAnimation.bind(this);
  }

  run(object, animations) {
    animations.forEach((animation) => {
      const {type, name, func} = animation;
      switch (type) {
        case `custom`:
          const createCustomAnimationFunction = this[`create${func}Animation`];
          createCustomAnimationFunction(object, animation);
          break;
        case `traverse`:
          object.traverse((obj) => {
            if (obj.name === name) {
              const createTraverseAnimationFunction = this[`create${func}Animation`];
              createTraverseAnimationFunction(obj, animation);
            }
          });
          break;
        case `transform`:
          this.createTransformAnimation(object, animation);
          break;
        case `horizontalrotate`:
          this.createHorizontalRotateAnimation(object, animation);
          break;
        case `verticalrotate`:
          this.createVerticalRotateAnimation(object, animation);
          break;
        case `bounce`:
          this.createBounceAnimation(object, animation);
          break;
        case `jiggle`:
          this.createJiggleAnimation(object, animation);
          break;
        default:
          break;
      }
    });
  }

  createTransformAnimation(object, options) {
    const {fps, duration, delay, easing, from, to} = options;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = width < height;

    const animation = new Animation({
      func: (progress) => {
        if (from && to && from.scale && to.scale) {
          const scaleX = from.scale.x + (to.scale.x - from.scale.x) * progress;
          const scaleY = from.scale.y + (to.scale.y - from.scale.y) * progress;
          const scaleZ = from.scale.z + (to.scale.z - from.scale.z) * progress;
          object.scale.set(scaleX, scaleY, scaleZ);
        }

        if (from && to && from.position && to.position) {
          const targetPosition = isPortrait && to.position.portrait ? to.position.portrait : to.position.landscape;
          const positionX = from.position.x + (targetPosition.x - from.position.x) * progress;
          const positionY = from.position.y + (targetPosition.y - from.position.y) * progress;
          const positionZ = from.position.z + (targetPosition.z - from.position.z) * progress;
          object.position.set(positionX, positionY, positionZ);
        }
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createHorizontalRotateAnimation(object, options) {
    const {fps, duration, delay, easing, rotation, coeff, order} = options;
    const animation = new Animation({
      func: (progress) => {
        const {x, y, z} = rotation;
        const rotationX = x - coeff * progress;
        object.rotation.set(rotationX, y, z, order);
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createVerticalRotateAnimation(object, options) {
    const {fps, duration, delay, easing, rotation, order} = options;
    const animation = new Animation({
      func: (progress) => {
        const {x, y, z} = rotation;
        const rotationY = y - progress;
        const rotationZ = z * (1 - progress);
        object.rotation.set(x, rotationY, rotationZ, order);
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createBounceAnimation(object, options) {
    const {fps, duration, delay, easing, amplitude, period} = options;
    let amp = amplitude ? amplitude : 0.3 + Math.random() / 1.5;
    let per = period ? period : 700 + 300 * Math.random();

    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        object.position.y = object.position.y + amp * Math.sin((currentTime - startTime) / per);

      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createSwingAnimation(object, options) {
    const {fps, duration, delay, easing, startRotationAngle, rotationAngle, coeff, period} = options;
    const angleYstart = startRotationAngle * Math.PI / 180;
    const angleY = rotationAngle * Math.PI / 180;

    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        object.rotation.y = angleYstart + angleY * Math.cos(coeff + (currentTime - startTime) / period);
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createJiggleAnimation(object, options) {
    const {fps, duration, delay, easing, rotationAngles, periodCoeff} = options;
    const {x, y, z} = rotationAngles;
    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        const period = Math.sin((currentTime - startTime) / periodCoeff);
        let angleX; let angleY; let angleZ;
        if (x) {
          angleX = x * Math.PI / 180;
        }
        if (y) {
          angleY = y * Math.PI / 180;
        }
        if (z) {
          angleZ = z * Math.PI / 180;
        }

        if (angleX) {
          object.rotation.x = angleX * period;
        }
        if (angleY) {
          object.rotation.y = angleY * period;
        }
        if (angleZ) {
          object.rotation.z = angleZ * period;
        }
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createTailAnimation(object, options) {
    const {fps, duration, delay, easing, rotationAngle} = options;
    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        const amplitude = 6.5;
        const coeff = 70;
        const period = ((currentTime - startTime) / coeff) % (Math.PI * amplitude);
        const angle = rotationAngle * Math.PI / 180;

        if (period > 0 && period < Math.PI) {
          object.rotation.x = (angle * period) / Math.PI;
        } else {
          object.rotation.x = -angle * Math.cos(period);
        }
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createLeafAnimation(object, options) {
    const {fps, duration, delay, easing, amplitude, coeff, delayCoeff = 1} = options;
    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        const time = ((currentTime - startTime) / coeff) % 16;

        object.rotation.x = amplitude * Math.exp(-0.2 * time) * Math.cos(delayCoeff * time + Math.PI / 2);
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createAirplaneAnimation(object, options) {
    const {fps, duration, delay, easing} = options;
    const initialFightRadius = object.flightRadius;
    const initialFightHeight = object.flightHeight;
    const initialFlightYaw = object.flightYaw;
    const initialFlightPitch = object.flightPitch;
    const initialFlightRoll = object.flightRoll;

    const animation = new Animation({
      func: (progress) => {
        object.flightRadius = initialFightRadius + (object.maxFlightRadius - initialFightRadius) * progress;
        object.flightHeight = initialFightHeight + (object.maxFlightHeight - initialFightHeight) * progress;
        object.flightYaw = initialFlightYaw + (progress * 5 * Math.PI) / 4;
        object.flightPitch = initialFlightPitch + (progress * Math.PI) / 5;
        object.flightRoll = progress < 0.5 ? initialFlightRoll - progress * Math.PI : initialFlightRoll - 0.5 * Math.PI + (progress - 0.5) * Math.PI;
        object.invalidate();
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createCameraAnimation(object, options) {
    const {depth, yawAngle, horizonAngle, pitchAngle, pitchDepth, verticalAngle, fps, duration, delay, easing, callback, relatedAnimation} = options;
    const initialDepth = object.depth;
    const initialYawAngle = object.yawAngle;
    const initialHorizonAngle = object.horizonAngle;
    const initialPitchAngle = object.pitchAngle;
    const initialPitchDepth = object.pitchDepth;
    const initialVerticalAngle = object.verticalAngle;

    const animation = new Animation({
      func: (progress) => {
        const currentDepth = initialDepth + (depth - initialDepth) * progress;
        object.depth = currentDepth;
        if (relatedAnimation) {
          const {mesh, breakpoints} = relatedAnimation;
          if (currentDepth < breakpoints.to) {
            mesh.material.opacity = 1;
          } else if (currentDepth > breakpoints.from) {
            mesh.material.opacity = 0;
          } else {
            mesh.material.opacity = (currentDepth - breakpoints.from) / (breakpoints.to - breakpoints.from);
          }
        }
        object.horizonAngle = initialHorizonAngle + (horizonAngle - initialHorizonAngle) * progress;
        object.yawAngle = initialYawAngle + (yawAngle - initialYawAngle) * progress;
        object.pitchAngle = initialPitchAngle + (pitchAngle - initialPitchAngle) * progress;
        object.pitchDepth = initialPitchDepth + (pitchDepth - initialPitchDepth) * progress;
        object.verticalAngle = initialVerticalAngle + (verticalAngle - initialVerticalAngle) * progress;
        object.invalidate();
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
      callback,
    });
    animation.start();
  }

  createHueEffectAnimation(material, options) {
    const {shift, duration, easing, fps} = options;

    const animation = new Animation({
      func: (progress) => {
        const hue = Math.cos((progress * 100) / 10) * -shift;
        material.uniforms.hueShift.value = hue;
        material.needsUpdate = true;
      },
      duration,
      fps,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  createBlobsEffectAnimation(material, options) {
    const {params, duration, frequency, fps} = options;

    const animation = new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        material.uniforms.blobs.value = params.reduce((acc, item) => {
          const amplitude = item.radius / 2;
          const offsetX =
              amplitude *
              Math.pow(progressReversed, 1) *
              Math.sin(progress * Math.PI * frequency);
          const x = item.position.x * window.innerWidth + offsetX;
          const y =
              0 +
              progress *
                (window.innerHeight + item.position.y * window.innerHeight);

          const blobParams = {
            radius: item.radius,
            position: new THREE.Vector2(x, y).multiplyScalar(
                window.devicePixelRatio
            ),
            glowOffset: item.glowOffset,
            glowClippingPosition: item.glowClippingPosition,
          };
          acc.push(blobParams);
          return acc;
        }, []);
        material.needsUpdate = true;
      },
      duration,
      fps,
    });
    animation.start();
  }

  getEasing(name) {
    return _[name];
  }
}

export default AnimationsFactory;
