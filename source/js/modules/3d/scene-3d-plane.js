import * as THREE from 'three';
import Scene3D from './scene-3d.js';
import CustomMaterial from './materials/custom-material.js';
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

  createCustomMaterial(texture) {
    const material = new CustomMaterial(texture);
    return material;
  }

  createPlaneObject(texture, width, height, position) {
    const geometry = new THREE.PlaneBufferGeometry(width, height);
    const material = this.createCustomMaterial(texture);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = position;

    this.scene.add(plane);
    this.render();
  }

  setupPlaneObjects() {
    PLANES.forEach((item, i) => {
      this.loadTexture({
        url: item.url,
        width: this.planeWidth,
        height: this.planeHeight,
        position: this.planeWidth * i,
      },
      this.createPlaneObject);
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
