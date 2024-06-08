import * as THREE from "three";
import ScenesFactory from "./scenes/scenes-factory";
import LightsFactory from "./light/lights-factory";
import Animation from "../animation.js";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class Scene3D {
  constructor(options) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = document.getElementById(options.canvas);
    this.color = options.color;
    this.alpha = options.alpha;
    this.far = options.far;
    this.fov = options.fov;
    this.near = options.near;
    this.cameraPozitionZ = options.cameraPozitionZ;
    this.cameraPozitionY = options.cameraPozitionY;
    this.aspectRatio = this.width / this.height;
    this.sceneGroups = {};
    this.lights = null;
    this.isLightAdded = false;
    this.scenesFactory = new ScenesFactory();
    this.lightsFactory = new LightsFactory();
    this.addSceneGroup = this.addSceneGroup.bind(this);
    this.setScenePlane = this.setScenePlane.bind(this);
  }

  // инициирует глобальную сцену
  init() {
    this.setup();
    this.initEventListeners();
    this.updateSize();
    this.initHelpers();
    this.startAnimations();
  }

  // устанавливает обработчик события ресайза на окно
  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  // производит настройки отрисовщика, сцены и камеры
  setup() {
    // 1.1.1. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      logarithmicDepthBuffer: false,
      powerPreference: `high-performance`
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.color, this.alpha);

    // 1.1.2. Scene
    this.scene = new THREE.Scene();

    // 1.1.3. Camera
    this.camera = new THREE.PerspectiveCamera(
        this.fov,
        this.aspectRatio,
        this.near,
        this.far
    );
    this.camera.position.z = this.cameraPozitionZ;
    this.camera.position.y = this.cameraPozitionY;
  }

  // добавляет контролы и оси для управления глобальной сценой (хелперы)
  initHelpers() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const axesHelper = new THREE.AxesHelper(1000);
    this.scene.add(axesHelper);
  }

  // получает из фабрики сцен локальную сцену (группу объектов), добавляет ее на глобальную сцену и делает перерендер
  addSceneGroup(group) {
    const {name, lights, position, rotation} = group;
    this.scenesFactory.create(group);
    const sceneGroup = this.scenesFactory.get(name);
    if (sceneGroup) {
      this.sceneGroups[group.name] = sceneGroup;

      if (position) {
        sceneGroup.position.set(...position);
      }

      if (rotation) {
        sceneGroup.rotation.set(...rotation);
      }

      this.scene.add(sceneGroup);
      this.render();
    }

    if (lights) {
      if (this.isLightAdded) {
        return;
      }
      this.setLights(group.lights);
    }
  }

  // получает из фабрики света нужные типы света, добавляет их на глобальную сцену
  setLights(lights) {
    this.isLightAdded = true;
    this.lights = new THREE.Group();
    lights.forEach((light) => {
      if (light.angle || light.angle === 0) {
        const radian = (light.angle * Math.PI) / 180;
        const targetObject = new THREE.Object3D();
        targetObject.position.y = this.camera.position.z * Math.tan(radian);
        this.scene.add(targetObject);
        light = {...light, target: targetObject};
      }
      this.lightsFactory.create(light);
      const lightUnit = this.lightsFactory.get(light.name);
      this.lights.add(lightUnit);
    });
    this.lights.position.z = this.camera.position.z;
    this.scene.add(this.lights);
  }

  // устанавливает позицию плоскости со сценой и применяет эффекты к данной плоскости
  setScenePlane(name) {
    if (!this.sceneGroups.planes) {
      return;
    }
    const positions = this.sceneGroups.planes.getPositions();

    if (!positions.hasOwnProperty(name)) {
      return;
    }
    this.sceneGroups.planes.position.x = -positions[name];
    this.sceneGroups.planes.setEffect(name);
  }

  // рендер глобальной сцены
  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // запускает анимацию перерендера
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

  // обновляет размеры глобальной сцены
  updateSize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
