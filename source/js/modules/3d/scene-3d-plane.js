import * as THREE from "three";
import Scene3D from "./scene-3d.js";
import CustomMaterial from "./materials/custom-material.js";
import Animation from "../animation.js";
import {PLANES} from "../../common/const.js";
import _ from "../../common/easings.js";

export default class PlaneView extends Scene3D {
  constructor() {
    super({
      canvas: `animation-screen`,
      color: new THREE.Color(0x5f458c),
      alpha: 1,
      far: 1600,
      near: 1,
    });
    this.planeWidth = 2048;
    this.planeHeight = 1024;
    this.planePositions = {};
    this.planeEffects = {};
    this.createPlaneObject = this.createPlaneObject.bind(this);
    this.setPlane = this.setPlane.bind(this);
  }

  init() {
    super.init();
    this.setupPlaneObjects();
    this.startAnimations();
  }

  startAnimations() {
    const animation = new Animation({
      func: () => {
        this.render();
      },
      duration: `infinite`,
      fps: 60,
    });
    animation.start();
  }

  startHueAnimation(name, options) {
    const {shift, duration} = options;
    const plane = this.scene.children.filter((item) => {
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

  startBlobsAnimation(name, options) {
    const plane = this.scene.children.filter((item) => {
      return item.name === name;
    });
    const material = plane[0].material;
    const animation = new Animation({
      func: () => {
        material.uniforms.blobs.value = this.getBlobsUniforms(options);
        material.needsUpdate = true;
      },
      duration: `infinite`,
      fps: 60,
    });
    animation.start();
  }

  getBlobsUniforms(params) {
    return params.reduce((acc, item) => {
      const blobParams = {
        radius: item.radius,
        position: new THREE.Vector2(
            item.position.x * window.innerWidth,
            item.position.y * window.innerHeight
        ).multiplyScalar(window.devicePixelRatio),
        glowOffset: item.glowOffset,
        glowClippingPosition: item.glowClippingPosition,
      };
      acc.push(blobParams);
      return acc;
    }, []);
  }

  updateBlobs(material, params) {
    material.uniforms.blobs.value = this.getBlobsUniforms(params);
    material.needsUpdate = true;
  }

  createCustomMaterial(texture) {
    const material = new CustomMaterial(texture);
    return material;
  }

  createPlaneObject(texture, options) {
    const {width, height, position, name} = options;
    const geometry = new THREE.PlaneBufferGeometry(width, height);
    const material = this.createCustomMaterial(texture);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = position;
    plane.name = name;

    this.scene.add(plane);
    this.render();
  }

  setupPlaneObjects() {
    PLANES.forEach((item, i) => {
      this.loadTexture(item.url, this.createPlaneObject, {
        width: this.planeWidth,
        height: this.planeHeight,
        position: this.planeWidth * i,
        name: item.name,
      });
      this.planePositions[item.name] = this.planeWidth * i;

      this.planeEffects[item.name] = item.effects;
    });
  }

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

  setPlane(name) {
    if (!this.planePositions.hasOwnProperty(name)) {
      return;
    }
    this.camera.position.x = this.planePositions[name];
  }
}
