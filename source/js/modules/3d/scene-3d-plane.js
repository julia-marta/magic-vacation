import * as THREE from "three";
import Scene3D from "./scene-3d.js";
import SceneGroup from "./scenes/scene-group.js";
import CustomMaterial from "./materials/custom-material.js";
import Animation from "../animation.js";
import {PLANES, SVG_SHAPES} from "../../common/const.js";
import _ from "../../common/easings.js";

export default class PlaneView extends Scene3D {
  constructor() {
    super({
      canvas: `animation-screen`,
      color: new THREE.Color(0x5f458c),
      alpha: 1,
      far: 5500,
      near: 1,
      cameraPozitionZ: 1750,
    });
    this.planeRatio = 2;
    this.planePositions = {};
    this.planeEffects = {};
    this.isLightAdded = false;
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
    const {params, duration, frequency} = options;
    const plane = this.scene.children.filter((item) => {
      return item.name === name;
    });
    const material = plane[0].material;
    const animation = new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        material.uniforms.blobs.value = params.reduce((acc, item) => {
          const amplitude = item.radius / 2;
          const offsetX =
            amplitude *
            Math.pow(progressReversed, 1) *
            Math.sin(progress * Math.PI * frequency);
          const x = item.position.x * window.innerWidth + offsetX;
          const y =
            0 +
            progress *
              (window.innerHeight + item.position.y * window.innerHeight);

          const blobParams = {
            radius: item.radius,
            position: new THREE.Vector2(x, y).multiplyScalar(
                window.devicePixelRatio
            ),
            glowOffset: item.glowOffset,
            glowClippingPosition: item.glowClippingPosition,
          };
          acc.push(blobParams);
          return acc;
        }, []);
        material.needsUpdate = true;
      },
      duration,
      fps: 60,
    });
    animation.start();
  }

  createCustomMaterial(texture) {
    const material = new CustomMaterial(texture);
    return material;
  }

  createSimplePlaneObject(options) {
    const {width, height, material, position} = options;

    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMaterial = this.materialsFactory.get(material);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    if (position) {
      plane.position.set(...position);
    }
    this.scene.add(plane);
    this.render();
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

  createSphereObject(options) {
    const geometry = new THREE.SphereGeometry(options.radius, options.widthSegments, options.heightSegments);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(options.color),
      metalness: options.metalness,
      emissive: options.emissive,
      roughness: options.roughness,
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
    this.render();
  }

  createCubeObject(options) {
    const geometry = new THREE.BoxGeometry(options.width, options.height, options.depth);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(options.color),
      metalness: options.metalness,
      emissive: options.emissive,
      roughness: options.roughness,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = 4;
    cube.rotation.y = 4;
    cube.rotation.z = 7;
    this.scene.add(cube);
    this.render();
  }

  createExtrudeObjectFromSVG(paths, options, factory) {
    const {extrude, scale, position, rotation, material} = options;

    const group = new THREE.Group();
    paths.forEach((path) => {

      const materialMesh = factory.get(material);

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
    return group;
  }

  addSceneGroup(options) {
    const sceneGroup = new SceneGroup(options, this.materialsFactory);
    this.scene.add(sceneGroup);
    this.render();
  }

  addExtrudeObjectsGroup(options) {
    SVG_SHAPES.forEach((item) => {
      this.loadSVG(
          item.url,
          this.createExtrudeObjectFromSVG,
          {...item.options, extrude: {...options, ...item.options.extrude}});
    });
  }

  setLight(options) {
    this.isLightAdded = true;
    const {directional, point1, point2} = options;
    this.light = new THREE.Group();
    let lightUnit;

    // 1.1 DirectionalLight
    // направлен в сторону направления камеры вниз на 15deg
    // схема осей: https://i.stack.imgur.com/qM4IJ.jpg
    // направление света = положение камеры по оси z умноженное на тангенс угла направления света
    const radian = (directional.angle * Math.PI) / 180;

    lightUnit = new THREE.DirectionalLight(
        new THREE.Color(directional.color),
        directional.intensity
    );

    const targetObject = new THREE.Object3D();
    targetObject.position.y = this.camera.position.z * Math.tan(radian);

    this.scene.add(targetObject);
    lightUnit.target = targetObject;
    this.light.add(lightUnit);

    // 2.2 PointLight
    lightUnit = new THREE.PointLight(
        new THREE.Color(point1.color),
        point1.intensity,
        point1.distance,
        point1.decay
    );

    lightUnit.position.set(point1.x, point1.y, point1.z);
    this.light.add(lightUnit);

    // 2.3 PointLight
    lightUnit = new THREE.PointLight(
        new THREE.Color(point2.color),
        point2.intensity,
        point2.distance,
        point2.decay
    );

    lightUnit.position.set(point2.x, point2.y, point2.z);
    this.light.add(lightUnit);

    this.light.position.z = this.camera.position.z;
    this.scene.add(this.light);
  }

  setupPlaneObjects() {
    // вычисляем высоту плоскости в зависимости от угла и удаленности камеры
    // схема: https://i.stack.imgur.com/PgSn3.jpg
    // отношение половины высоты к удаленности равно тангенсу половины угла камеры
    // соответственно половина высоты = удаленность * тангенс половины угла в радианах
    // а целая высота = 2 x удаленность * тангенс половины угла в радианах
    const angle = (this.fov * Math.PI) / 180 / 2;
    const planeHeight = 2 * (Math.tan(angle) * this.far);
    const planeWidth = planeHeight * this.planeRatio;

    PLANES.forEach((item, i) => {
      this.loadTexture(item.url, this.createPlaneObject, {
        width: planeWidth,
        height: planeHeight,
        position: planeWidth * i,
        name: item.name,
      });
      this.planePositions[item.name] = planeWidth * i;

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

  setObject(options) {
    const {objects, light} = options;
    objects.forEach((object) => {
      if (object.type === `plane`) {
        this.createSimplePlaneObject(object);
      }
      if (object.type === `sphere`) {
        this.createSphereObject(object);
      }
      if (object.type === `cube`) {
        this.createCubeObject(object);
      }
      if (object.type === `scene`) {
        this.addSceneGroup(object);
      }
      if (object.type === `extrude`) {
        this.addExtrudeObjectsGroup(object.options);
      }
    });

    if (light) {
      if (this.isLightAdded) {
        return;
      }
      this.setLight(light);
    }
  }
}
