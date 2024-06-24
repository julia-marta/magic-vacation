import * as THREE from "three";
import MaterialsFactory from '../materials/materials-factory.js';
import ObjectsFactory from '../objects/objects-factory.js';
import Animation from '../../animation.js';
class SceneGroup extends THREE.Group {
  constructor(sceneObjects, sceneAnimations) {
    super();
    this.sceneObjects = sceneObjects;
    this.sceneAnimations = sceneAnimations;
    this.onCreateComplete = this.onCreateComplete.bind(this);
    this.objectsFactory = new ObjectsFactory(this.onCreateComplete);
    this.materialsFactory = new MaterialsFactory();
    this.createObjects();
    this.startAnimations();
  }

  // получает готовый объект после создания и добавляет его на сцену
  onCreateComplete(object, options) {
    if (options) {
      const {scale, position, rotation} = options;

      if (scale) {
        object.scale.set(...scale);
      }

      if (position) {
        object.position.set(...position);
      }

      if (rotation) {
        object.rotation.set(...rotation);
      }
    }

    this.add(object);
  }

  // создаёт с помощью фабрики объекты разного типа
  createObjects() {
    this.sceneObjects.forEach((object) => {
      this.objectsFactory.get(object);
    });
  }

  // запускает анимации сцены
  startAnimations() {
    if (this.sceneAnimations.length) {
      this.sceneAnimations.forEach((animationOptions) => {
        const {fps, duration, func} = animationOptions;
        const animation = new Animation({
          func: (progress) => {
            func(progress, this);
          },
          duration,
          fps,
        });
        animation.start();
      });
    }
  }
}

export default SceneGroup;
