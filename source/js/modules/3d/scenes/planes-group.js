import * as THREE from "three";
import MaterialsFactory from '../materials/materials-factory.js';

class PlanesGroup extends THREE.Group {
  constructor(planesObjects, far, fov) {
    super();
    this.planesObjects = planesObjects;
    this.planeRatio = 2;
    this.planePositions = {};
    this.far = far;
    this.fov = fov;
    this.materialsFactory = new MaterialsFactory();
    this.createPlaneObject = this.createPlaneObject.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.createPlanesGroup();
  }

  loadTexture(url, callback, options) {
    const manager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(manager);
    const texture = loader.load(url);

    manager.onLoad = () => {
      callback({
        ...options,
        material: {
          type: `CustomPlanes`,
          options: {
            texture,
          }
        }});
    };
  }

  createPlaneObject(options) {
    const {width, height, position, name, material} = options;
    const planeGeometry = new THREE.PlaneBufferGeometry(width, height);
    const planeMaterial = this.materialsFactory.get(material);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.x = position;
    plane.name = name;
    this.add(plane);
  }

  createPlanesGroup() {
    const angle = (this.fov * Math.PI) / 180 / 2;
    const planeHeight = 2 * (Math.tan(angle) * this.far);
    const planeWidth = planeHeight * this.planeRatio;

    this.planesObjects.forEach((plane, i) => {
      this.loadTexture(plane.url, this.createPlaneObject, {
        width: planeWidth,
        height: planeHeight,
        position: planeWidth * i,
        name: plane.name,
      });
      this.planePositions[plane.name] = planeWidth * i;
    });
  }

  setPosition(name) {
    if (!this.planePositions.hasOwnProperty(name)) {
      return;
    }
    this.position.x = -this.planePositions[name];
  }
}

export default PlanesGroup;
