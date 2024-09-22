import * as THREE from "three";
import MaterialsFactory from '../materials/materials-factory.js';
import ObjectsFactory from '../objects/objects-factory.js';
import AnimationsFactory from "../animations/animations-factory.js";
import {isDesktop} from "../../../common/const.js";

class SceneGroup extends THREE.Group {
  constructor(sceneObjects, runSceneAnimation) {
    super();
    this.sceneObjects = sceneObjects;
    this.runSceneAnimation = runSceneAnimation;
    this.playedAnimations = [];
    this.onCreateComplete = this.onCreateComplete.bind(this);
    this.runObjectAnimations = this.runObjectAnimations.bind(this);
    this.objectsFactory = new ObjectsFactory(this.onCreateComplete);
    this.materialsFactory = new MaterialsFactory();
    this.animationsFactory = new AnimationsFactory();
    this.createObjects();
  }

  // получает готовый объект после создания, добавляет его на сцену и запускает анимации
  onCreateComplete(object, options, outer) {
    let isSceneAnimation;
    let hiddenMobileObjects;
    if (options) {
      const {scale, position, rotation, animations, name, isCurrentAnimation, hiddenMobile} = options;

      if (name) {
        object.name = name;
      }

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
      isSceneAnimation = isCurrentAnimation;
      hiddenMobileObjects = hiddenMobile;
    }

    object.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = isDesktop ? true : false;
        obj.receiveShadow = isDesktop ? true : false;
      }
      if (!isDesktop && hiddenMobileObjects && obj.name === hiddenMobileObjects.parent) {
        obj.children.slice().forEach((child) => {
          if (hiddenMobileObjects.children.includes(child.name)) {
            obj.remove(child);
          }
        });
      }
    });

    if (outer) {
      const {scale, position, rotation, animations, intermediate, name} = outer;

      const outerGroup = new THREE.Group();

      if (intermediate) {
        const intermediateGroup = new THREE.Group();
        intermediateGroup.add(object);
        if (intermediate.scale) {
          intermediateGroup.scale.set(...intermediate.scale);
        }

        if (intermediate.position) {
          intermediateGroup.position.set(...intermediate.position);
        }

        if (intermediate.rotation) {
          intermediateGroup.rotation.set(...intermediate.rotation);
        }

        if (intermediate.animations) {
          this.animationsFactory.run(intermediateGroup, intermediate.animations);
        }
        outerGroup.add(intermediateGroup);
      } else {
        outerGroup.add(object);
      }
      if (name) {
        outerGroup.name = name;
      }

      if (scale) {
        outerGroup.scale.set(...scale);
      }

      if (position) {
        outerGroup.position.set(...position);
      }

      if (rotation) {
        outerGroup.rotation.set(...rotation);
      }

      if (animations) {
        this.animationsFactory.run(outerGroup, animations);
      }

      this.add(outerGroup);
    } else {
      this.add(object);
    }
    // если объект имеет анимацию для конкретной сцены, запускаем анимацию сцены после его отрисовки
    if (isSceneAnimation) {
      this.runSceneAnimation();
    }
  }

  // запускает анимации у одного из дочерних объектов
  runObjectAnimations(name, animations, isPlayOnce) {

    // если анимация должна проигрываться только один раз и уже проигрывалась, ничего не делаем
    const isAnimationsHavePlayed = this.playedAnimations.includes(name);
    if (isAnimationsHavePlayed && isPlayOnce) {
      return;
    }
    // ищем дочерний объект сцены, который надо анимировать, и запускаем для него анимации
    const object = this.getObjectByName(name);
    if (!object) {
      return;
    }

    this.animationsFactory.run(object, animations);
    // добавляем анимацию в список уже проигранных анимаций
    this.playedAnimations.push(name);
  }

  // создаёт с помощью фабрики объекты разного типа
  createObjects() {
    this.sceneObjects.forEach((object) => {
      this.objectsFactory.get(object);
    });
  }
}

export default SceneGroup;
