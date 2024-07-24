import * as THREE from "three";
import MaterialsFactory from '../materials/materials-factory.js';
import ObjectsFactory from '../objects/objects-factory.js';
import AnimationsFactory from "../animations/animations-factory.js";

class SceneGroup extends THREE.Group {
  constructor(sceneObjects) {
    super();
    this.sceneObjects = sceneObjects;
    this.onCreateComplete = this.onCreateComplete.bind(this);
    this.objectsFactory = new ObjectsFactory(this.onCreateComplete);
    this.materialsFactory = new MaterialsFactory();
    this.animationsFactory = new AnimationsFactory();
    this.createObjects();
  }

  // получает готовый объект после создания, добавляет его на сцену и запускает анимации
  onCreateComplete(object, options) {
    if (options) {
      const {scale, position, rotation, animations} = options;

      if (scale) {
        object.scale.set(...scale);
      }

      if (position) {
        object.position.set(...position);
      }

      if (rotation) {
        object.rotation.set(...rotation);
      }

      if (animations) {
        this.animationsFactory.run(object, animations);
      }
    }
    object.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    this.add(object);
  }

  // создаёт с помощью фабрики объекты разного типа
  createObjects() {
    this.sceneObjects.forEach((object) => {
      this.objectsFactory.get(object);
    });
  }
}

export default SceneGroup;
