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

  // загрузчик текстур
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

  // создание объекта плоскости с текстурой (коллбэк для загрузчика текстур)
  createPlaneObject(options) {
    const {width, height, position, name, material} = options;
    const planeGeometry = new THREE.PlaneBufferGeometry(width, height);
    const planeMaterial = this.materialsFactory.get(material);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.x = position;
    plane.name = name;
    this.add(plane);
  }

  // добавляет плоскости с текстурами
  createPlanesGroup() {
    // вычисляем высоту плоскости в зависимости от угла и удаленности камеры
    // схема: https://i.stack.imgur.com/PgSn3.jpg
    // отношение половины высоты к удаленности равно тангенсу половины угла камеры
    // соответственно половина высоты = удаленность * тангенс половины угла в радианах
    // а целая высота = 2 x удаленность * тангенс половины угла в радианах
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

  // устанавливает позицию плоскости-текстуре по названию плоскости
  setPosition(name) {
    if (!this.planePositions.hasOwnProperty(name)) {
      return;
    }
    this.position.x = -this.planePositions[name];
  }
}

export default PlanesGroup;
