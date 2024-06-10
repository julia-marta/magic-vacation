import * as THREE from "three";
import SceneGroup from './scene-group.js';
import Animation from '../../animation.js';
import _ from '../../../common/easings.js';

class Planes extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
    this.setEffect = this.setEffect.bind(this);
    this.getPositions = this.getPositions.bind(this);
  }

  // добавляет анимацию растрового смещения hue
  startHueAnimation(name, options) {
    const {shift, duration} = options;
    const plane = this.children.filter((item) => {
      return item.name === name;
    });
    const material = plane[0].material;
    const animation = new Animation({
      func: (progress) => {
        const hue = Math.cos((progress * 100) / 10) * -shift;
        material.uniforms.hueShift.value = hue;
        material.needsUpdate = true;
      },
      duration,
      easing: _.bezierEasing(0.33, 0, 0.67, 1),
    });
    animation.start();
  }

  // добавляет анимацию пузырьков
  startBlobsAnimation(name, options) {
    const {params, duration, frequency} = options;
    const plane = this.children.filter((item) => {
      return item.name === name;
    });
    const material = plane[0].material;
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
      fps: 60,
    });
    animation.start();
  }

  // устанавливает эффекты плоскости-текстуре по названию плоскости
  setEffect(name) {
    if (!this.planeEffects.hasOwnProperty(name)) {
      return;
    }

    if (this.planeEffects[name].hue) {
      this.startHueAnimation(name, this.planeEffects[name].hue);
    }

    if (this.planeEffects[name].blobs) {
      this.startBlobsAnimation(name, this.planeEffects[name].blobs);
    }
  }

  // возвращает позиции отрисованных плоскостей-текстур
  getPositions() {
    return this.planePositions;
  }
}

export default Planes;
