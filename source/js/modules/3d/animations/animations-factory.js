import Animation from "../../animation";
import _ from "../../../common/easings";

class AnimationsFactory {
  constructor() {
    this.run = this.run.bind(this);
  }

  // создаёт и запускает анимации объекта
  run(object, animations) {
    animations.forEach((animation) => {
      const {type} = animation;
      switch (type) {
        case `transform`:
          this.createTransformAnimation(object, animation);
          break;
        case `bounce`:
          this.createBounceAnimation(object, animation);
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
        if (from.scale && to.scale) {
          const scaleX = from.scale.x + (to.scale.x - from.scale.x) * progress;
          const scaleY = from.scale.y + (to.scale.y - from.scale.y) * progress;
          const scaleZ = from.scale.z + (to.scale.z - from.scale.z) * progress;
          object.scale.set(scaleX, scaleY, scaleZ);
        }

        if (from.position && to.position) {
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

  // создаёт анимацю колебания
  createBounceAnimation(object, options) {
    const {fps, duration, delay, easing} = options;
    // чем больше амплитуда, тем больше колебания
    const amplitude = 0.3 + Math.random() / 1.5;
    // чем больше период, тем реже (плавнее) колебания
    const period = 700 + 300 * Math.random();
    const animation = new Animation({
      func: (_progress, {startTime, currentTime}) => {
        object.position.y = object.position.y + amplitude * Math.sin((currentTime - startTime) / period);

      },
      duration,
      fps,
      delay,
      easing: this.getEasing(easing),
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
