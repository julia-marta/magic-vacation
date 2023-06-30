import * as THREE from "three";
import Scene3D from "./scene-3d.js";
import CustomMaterial from "./materials/custom-material.js";
import {PLANES} from "../../common/const.js";

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
    this.createPlaneObject = this.createPlaneObject.bind(this);
    this.setPlane = this.setPlane.bind(this);
  }

  init() {
    super.init();
    this.setupPlaneObjects();
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

  createCustomMaterial(texture, effects) {
    const material = new CustomMaterial(texture);
    if (effects.hueShift) {
      material.uniforms.hueShift.value = effects.hueShift;
    }
    if (effects.blobs) {
      let update = () => {
        this.updateBlobs(material, effects.blobs);
        requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    }
    return material;
  }

  createPlaneObject(texture, options) {
    const {width, height, position, effects} = options;
    const geometry = new THREE.PlaneBufferGeometry(width, height);
    const material = this.createCustomMaterial(texture, effects);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = position;

    this.scene.add(plane);
    this.render();
  }

  setupPlaneObjects() {
    PLANES.forEach((item, i) => {
      this.loadTexture(item.url, this.createPlaneObject, {
        width: this.planeWidth,
        height: this.planeHeight,
        position: this.planeWidth * i,
        effects: item.effects,
      });
      this.planePositions[item.name] = this.planeWidth * i;
    });
  }

  setPlane(name) {
    if (!this.planePositions.hasOwnProperty(name)) {
      return;
    }
    this.camera.position.x = this.planePositions[name];
    this.render();
  }
}
