import * as THREE from "three";
import MaterialsFactory from '../materials/materials-factory.js';
import {Scene3DSettings} from '../../../common/const.js';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

class SceneGroup extends THREE.Group {
  constructor(sceneObjects) {
    super();
    this.sceneObjects = sceneObjects;
    this.planeRatio = 2;
    this.planePositions = {};
    this.planeEffects = {};
    this.far = Scene3DSettings.far;
    this.fov = Scene3DSettings.fov;
    this.materialsFactory = new MaterialsFactory();
    this.createPlaneObject = this.createPlaneObject.bind(this);
    this.createExtrudeObjectFromSVG = this.createExtrudeObjectFromSVG.bind(this);
    this.create3DObjectObjectFromOBJ = this.create3DObjectObjectFromOBJ.bind(this);
    this.create3DObjectObjectFromGLTF = this.create3DObjectObjectFromGLTF.bind(this);
    this.createSceneGroup();
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
          type: `customPlanes`,
          options: {
            texture,
          }
        }});
    };
  }

  // загрузчик SVG форм
  loadSVG(url, callback, options) {
    // instantiate a loader
    const loader = new SVGLoader();

    // load a SVG resource
    loader.load(
        url, (data) => {
          const paths = data.paths;
          callback(paths, options);
        }
    );
  }

  // загрузчик готовой модели OBJ
  loadOBJ(url, callback, options) {
    // instantiate a loader
    const loader = new OBJLoader();

    // load a resource
    loader.load(
        url, (data) => {
          callback(data, options);
        }
    );
  }

  // загрузчик готовой модели gLTF
  loadGLTF(url, callback, options) {
    // instantiate a loader
    const loader = new GLTFLoader();

    // load a resource
    loader.load(
        url, (gltf) => {
          callback(gltf.scene, options);
        }
    );
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

  // создание обьёмного объекта из SVG формы (коллбэк для загрузчика SVG)
  createExtrudeObjectFromSVG(paths, options) {
    const {extrude, scale, position, rotation, material} = options;
    const materialMesh = this.materialsFactory.get(material);
    const group = new THREE.Group();
    paths.forEach((path) => {
      const shapes = path.toShapes();
      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, extrude);

        const mesh = new THREE.Mesh(geometry, materialMesh);

        if (position) {
          mesh.position.set(...position);
        }
        if (scale) {
          mesh.scale.set(...scale);
        }
        if (rotation) {
          mesh.rotation.set(...rotation);
        }

        group.add(mesh);
      });

    });
    this.add(group);
  }

  // создание 3D объекта из готовой модели OBJ (коллбэк для загрузчика OBJ)
  create3DObjectObjectFromOBJ(obj, options) {
    const {scale, position, rotation, material} = options;
    const objMaterial = this.materialsFactory.get(material);

    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = objMaterial;
      }
    });

    if (position) {
      obj.position.set(...position);
    }
    if (scale) {
      obj.scale.set(...scale);
    }
    if (rotation) {
      obj.rotation.set(...rotation);
    }

    this.add(obj);
  }

  // создание 3D объекта из готовой модели GLTF (коллбэк для загрузчика GLTF)
  create3DObjectObjectFromGLTF(obj, options) {
    const {scale, position, rotation} = options;

    if (position) {
      obj.position.set(...position);
    }
    if (scale) {
      obj.scale.set(...scale);
    }
    if (rotation) {
      obj.rotation.set(...rotation);
    }

    this.add(obj);
  }

  // добавляет плоскости с текстурами
  addPlaneObjects(data) {
    // вычисляем высоту плоскости в зависимости от угла и удаленности камеры
    // схема: https://i.stack.imgur.com/PgSn3.jpg
    // отношение половины высоты к удаленности равно тангенсу половины угла камеры
    // соответственно половина высоты = удаленность * тангенс половины угла в радианах
    // а целая высота = 2 x удаленность * тангенс половины угла в радианах
    const angle = (this.fov * Math.PI) / 180 / 2;
    const planeHeight = 2 * (Math.tan(angle) * this.far);
    const planeWidth = planeHeight * this.planeRatio;

    data.forEach((plane, i) => {
      this.loadTexture(plane.url, this.createPlaneObject, {
        width: planeWidth,
        height: planeHeight,
        position: planeWidth * i,
        name: plane.name,
      });
      this.planePositions[plane.name] = planeWidth * i;
      this.planeEffects[plane.name] = plane.effects;
    });
  }

  // добавляет объект с обычной плоскостью
  addSimplePlaneObject(data) {
    const {width, height, material, position} = data;
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMaterial = this.materialsFactory.get(material);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    if (position) {
      plane.position.set(...position);
    }
    this.add(plane);
  }

  // добавляет объект сферы
  addSphereObject(data) {
    const {radius, widthSegments, heightSegments, material, position} = data;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const sphereMaterial = this.materialsFactory.get(material);
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    if (position) {
      sphere.position.set(...position);
    }

    this.add(sphere);
  }

  // добавляет объект куба
  addCubeObject(data) {
    const {width, height, depth, material, position, rotation} = data;
    const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    const cubeMaterial = this.materialsFactory.get(material);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    if (position) {
      cube.position.set(...position);
    }

    if (rotation) {
      cube.rotation.set(...rotation);
    }

    this.add(cube);
  }

  // добавляет объект круга
  addCircleObject(data) {
    const {radius, segments, thetaStart, thetaLength, material, position, rotation} = data;
    const circleGeometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength);
    const circleMaterial = this.materialsFactory.get(material);
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);

    if (position) {
      circle.position.set(...position);
    }

    if (rotation) {
      circle.rotation.set(...rotation);
    }

    this.add(circle);
  }

  // добавляет группу объектов (уникальную для каждой сцены)
  addObjectsGroup() {
    // eslint-disable-next-line no-console
    console.warn(`Класс SceneGroup требует расширения.
          Метод addObjectsGroup необходимо переопределить в дочернем классе.`);
  }

  // добавляет группу объёмных объектов на основе SVG форм
  addExtrudeObjectsGroup(data) {
    const {options, shapes} = data;
    shapes.forEach((item) => {
      this.loadSVG(
          item.url,
          this.createExtrudeObjectFromSVG,
          {...item.options, extrude: {...options, ...item.options.extrude}});
    });
  }

  // добавляет 3D объект типа OBJ
  add3DObjectOBJ(data) {
    const {url, options} = data;
    this.loadOBJ(
        url,
        this.create3DObjectObjectFromOBJ,
        options,
    );
  }

  // добавляет 3D объект типа GLTF
  add3DObjectGLTF(data) {
    const {url, options} = data;
    this.loadGLTF(
        url,
        this.create3DObjectObjectFromGLTF,
        options,
    );
  }

  // создаёт локальную сцену с объектами разного типа
  createSceneGroup() {
    this.sceneObjects.forEach((object) => {
      switch (object.type) {
        case `planes`:
          this.addPlaneObjects(object.planes);
          break;
        case `plane`:
          this.addSimplePlaneObject(object);
          break;
        case `sphere`:
          this.addSphereObject(object);
          break;
        case `cube`:
          this.addCubeObject(object);
          break;
        case `circle`:
          this.addCircleObject(object);
          break;
        case `group`:
          this.addObjectsGroup(object);
          break;
        case `extrude`:
          this.addExtrudeObjectsGroup(object);
          break;
        case `OBJ`:
          this.add3DObjectOBJ(object);
          break;
        case `glTF`:
          this.add3DObjectGLTF(object);
          break;
        default:
          break;
      }
    });
  }
}

export default SceneGroup;
