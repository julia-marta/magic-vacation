import * as THREE from "three";
import ObjectsFactory from '../objects/objects-factory.js';
import AnimationsFactory from "../animations/animations-factory.js";
import {isDesktop} from "../../../common/const.js";

class SceneGroup extends THREE.Group {
  constructor(sceneObjects, runCurrentSceneAnimation) {
    super();
    this.sceneObjects = sceneObjects;
    this.runCurrentSceneAnimation = runCurrentSceneAnimation;
    this.sceneAnimations = [];
    this.playedAnimations = [];
    this.onCreateComplete = this.onCreateComplete.bind(this);
    this.runSceneAnimations = this.runSceneAnimations.bind(this);
    this.runObjectAnimations = this.runObjectAnimations.bind(this);
    this.runEffectAnimations = this.runEffectAnimations.bind(this);
    this.objectsFactory = new ObjectsFactory(this.onCreateComplete);
    this.animationsFactory = new AnimationsFactory();
    this.createObjects();
  }

  onCreateComplete(object, options, outer) {
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
        this.sceneAnimations.push({
          object, animations, isCurrentAnimation
        });
      }

      if (!animations && isCurrentAnimation) {
        this.sceneAnimations.push({
          object, animations: [], isCurrentAnimation
        });
      }
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
          this.sceneAnimations.push({
            object: intermediateGroup,
            animations: intermediate.animations,
          });
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
        this.sceneAnimations.push({
          object: outerGroup,
          animations,
        });
      }

      this.add(outerGroup);
    } else {
      this.add(object);
    }
  }
  runSceneAnimations() {
    this.sceneAnimations.forEach((sceneAnimation) => {
      const {object, animations, isCurrentAnimation} = sceneAnimation;
      if (isCurrentAnimation) {
        this.runCurrentSceneAnimation();
      }
      this.animationsFactory.run(object, animations);
    });
  }

  runObjectAnimations(name, animations, isPlayOnce) {
    const isAnimationsHavePlayed = this.playedAnimations.includes(name);
    if (isAnimationsHavePlayed && isPlayOnce) {
      return;
    }
    const object = this.getObjectByName(name);
    if (!object) {
      return;
    }

    this.animationsFactory.run(object, animations);
    this.playedAnimations.push(name);
  }

  runEffectAnimations(material, animations) {
    this.animationsFactory.run(material, animations);
  }

  createObjects() {
    this.sceneObjects.forEach((object) => {
      this.objectsFactory.get(object);
    });
  }
}

export default SceneGroup;
