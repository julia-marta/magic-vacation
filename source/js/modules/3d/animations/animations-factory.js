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
  }

  // создаёт и запускает анимации объекта
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

  // создаёт анимации трансформаций (масштаб, положение)
  createTransformAnimation(object, options) {
    const {fps, duration, delay, easing, from, to} = options;
    const animation = new Animation({
      func: (progress) => {
        if (from && to && from.scale && to.scale) {
          const scaleX = from.scale.x + (to.scale.x - from.scale.x) * progress;
          const scaleY = from.scale.y + (to.scale.y - from.scale.y) * progress;
          const scaleZ = from.scale.z + (to.scale.z - from.scale.z) * progress;
          object.scale.set(scaleX, scaleY, scaleZ);
        }

        if (from && to && from.position && to.position) {
          const positionX = from.position.x + (to.position.x - from.position.x) * progress;
          const positionY = from.position.y + (to.position.y - from.position.y) * progress;
          const positionZ = from.position.z + (to.position.z - from.position.z) * progress;
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

  // создаёт анимацию поворота по горизонтали
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

  // создаёт анимацию поворота по вертикали
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

  // создаёт анимацию колебания
  createBounceAnimation(object, options) {
    const {fps, duration, delay, easing, amplitude, period} = options;
    // чем больше амплитуда, тем больше колебания
    let amp = amplitude ? amplitude : 0.3 + Math.random() / 1.5;
    // чем больше период, тем реже (плавнее) колебания
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

  // создаёт анимацию колебания c покачиванием
  createSwingAnimation(object, options) {
    const {fps, duration, delay, easing, startRotationAngle, rotationAngle, coeff, period} = options;

    // углы вращения в радианах
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

  // создаёт анимацию равномерного покачивания
  createJiggleAnimation(object, options) {
    const {fps, duration, delay, easing, rotationAngles, periodCoeff} = options;
    const {x, y, z} = rotationAngles;
    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        const period = Math.sin((currentTime - startTime) / periodCoeff);
        // углы вращения в радианах
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

  // создаёт анимацию виляния хвостом
  createTailAnimation(object, options) {
    const {fps, duration, delay, easing, rotationAngle} = options;
    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        // период движений - остаток от деления прошедшего времени на амплитуду умноженную на пи
        // чем больше амплитуда, тем больше возрастает и реже меняется период и более размашистые движения
        const amplitude = 6.5;
        // чем больше коэффицент, на который мы делим прошедшее время, тем плавнее и медленнее движения
        const coeff = 70;
        const period = ((currentTime - startTime) / coeff) % (Math.PI * amplitude);

        // угол вращения в радианах
        const angle = rotationAngle * Math.PI / 180;
        // вся амплитуда времени вращения - это круг
        // если время больше 0 и меньше половины круга
        if (period > 0 && period < Math.PI) {
          // вращаем горизонтально хвост, угол умноженный на период делим на половину круга
          object.rotation.x = (angle * period) / Math.PI;
        } else {
          // если время меньше нуля либо больше половины круга
          // вращаем горизонтально хвост, отрицательный угол умножаем на косинус периода
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

  // создаёт анимацию покачивания листьев
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

  // создаёт анимацию вылета самолёта из замочной скважины по спирали (с использованием техники Rigging)
  createAirplaneAnimation(object, options) {
    const {fps, duration, delay, easing} = options;
    // получим изначальные значения всех параметров из Rig
    const initialFightRadius = object.flightRadius;
    const initialFightHeight = object.flightHeight;
    const initialFlightYaw = object.flightYaw;
    const initialFlightPitch = object.flightPitch;
    const initialFlightRoll = object.flightRoll;

    const animation = new Animation({
      func: (progress) => {
        // изменяем радиус полёта
        object.flightRadius = initialFightRadius + (object.maxFlightRadius - initialFightRadius) * progress;
        // изменяем высоту полёта
        object.flightHeight = initialFightHeight + (object.maxFlightHeight - initialFightHeight) * progress;
        // изменяем угол рыскания
        object.flightYaw = initialFlightYaw + (progress * 5 * Math.PI) / 4;
        // изменяем угол тангажа
        object.flightPitch = initialFlightPitch + (progress * Math.PI) / 5;
        // изменяем угол крена
        object.flightRoll = progress < 0.5 ? initialFlightRoll - progress * Math.PI : initialFlightRoll - 0.5 * Math.PI + (progress - 0.5) * Math.PI;
        // запускаем в риге проверку изменений параметров
        object.invalidate();
      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
    });
    animation.start();
  }

  // создаёт анимацию смены состояния камеры (с использованием техники Rigging)
  createCameraAnimation(object, options) {
    const {depth, yawAngle, horizonAngle, pitchAngle, pitchDepth, fps, duration, delay, easing, callback, relatedAnimation} = options;
    // получим изначальные значения всех параметров из Rig
    const initialDepth = object.depth;
    const initialYawAngle = object.yawAngle;
    const initialHorizonAngle = object.horizonAngle;
    const initialPitchAngle = object.pitchAngle;
    const initialPitchDepth = object.pitchDepth;

    const animation = new Animation({
      func: (progress) => {
        // изменяем глубину
        const currentDepth = initialDepth + (depth - initialDepth) * progress;
        object.depth = currentDepth;
        // если есть сопутствующая смене состоянию камеры анимация
        if (relatedAnimation) {
          const {mesh, breakpoints} = relatedAnimation;
          // устанавливаем прозрачность плоскости в зависимости от значения позиции камеры в глубину
          if (currentDepth < breakpoints.to) {
            mesh.material.opacity = 1;
          } else if (currentDepth > breakpoints.from) {
            mesh.material.opacity = 0;
          } else {
            mesh.material.opacity = (currentDepth - breakpoints.from) / (breakpoints.to - breakpoints.from);
          }
        }
        // изменяем горизонтальный угол вращения
        object.horizonAngle = initialHorizonAngle + (horizonAngle - initialHorizonAngle) * progress;
        // изменяем вертикальный угол вращения
        object.yawAngle = initialYawAngle + (yawAngle - initialYawAngle) * progress;
        // изменяем горизонтальный угол вращения нулевой группы
        object.pitchAngle = initialPitchAngle + (pitchAngle - initialPitchAngle) * progress;
        // изменяем глубину группы поперечного вращения
        object.pitchDepth = initialPitchDepth + (pitchDepth - initialPitchDepth) * progress;
        // запускаем в риге проверку изменений параметров
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

  getEasing(name) {
    return _[name];
  }
}

// если какие-то анимации будут повторяться, имеет смысл создать библиотеку их конфигов и получать по имени, подставляя изменяемые параметры
// AnimationsFactory.Configs = {};

export default AnimationsFactory;
