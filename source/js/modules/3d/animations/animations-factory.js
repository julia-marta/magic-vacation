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
        case `appear`:
          this.createAppearAnimation(object, animation);
          break;
        case `bounce`:
          this.createBounceAnimation(object, animation);
          break;
        default:
          break;
      }
    });
  }

  // создаёт анимацию вылета (появления)
  createAppearAnimation(object, options) {
    const {fps, duration, delay, easing, from, to} = options;
    const animation = new Animation({
      func: (progress) => {
        const scale = from.scale + (to.scale - from.scale) * progress;
        const x = from.x + (to.x - from.x) * progress;
        const y = from.y + (to.y - from.y) * progress;
        const z = from.z + (to.z - from.z) * progress;

        object.position.set(x, y, z);
        object.scale.set(scale, scale, scale);
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

// если какие-то анимации будут повторяться, имеет создать библиотеку их конфигов и получать по имени, подставляя изменяемые параметры
// AnimationsFactory.Configs = {};

export default AnimationsFactory;
