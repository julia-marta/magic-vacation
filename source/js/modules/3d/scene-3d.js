import * as THREE from "three";
import {GUI} from "dat.gui";
import SceneGroup from "./scenes/scene-group.js";
import PlanesGroup from "./scenes/planes-group.js";
import Animation from "../animation.js";
import {ScreensScenes} from "../../data/scenes.js";
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
    this.planes = {};
    this.lights = null;
    this.isLightAdded = false;
    this.initScenes = this.initScenes.bind(this);
    this.setScenePlane = this.setScenePlane.bind(this);
  }

  // инициирует глобальную сцену
  init() {
    this.setup();
    this.initEventListeners();
    this.updateSize();
    this.initHelpers();
    this.startAnimations();
    this.initScenes(ScreensScenes[`all`]);
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
    this.renderer.shadowMap.enabled = true;

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
    this.gui = new GUI();
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

  // инициирует локальные сцены и источники света
  initScenes(data) {
    const {type, lights, scenes, objects, animations, position, rotation} = data;

    switch (type) {
      case `planes`:
        this.addPlanesGroup(objects);
        break;
      case `scenesGroup`:
        scenes.forEach((scene) => {
          this.addSceneGroup(scene.objects, scene.animations, scene.position, scene.rotation);
        });
        break;
      default:
        this.addSceneGroup(objects, animations, position, rotation);
        break;
    }

    if (lights) {
      if (this.isLightAdded) {
        return;
      }
      this.setLights();
    }
  }

  // добавляет локальную сцену из группы объектов
  addSceneGroup(objects, animations = [], position, rotation) {
    const sceneGroup = new SceneGroup(objects, animations);
    if (sceneGroup) {

      if (position) {
        sceneGroup.position.set(...position);
      }

      if (rotation) {
        sceneGroup.rotation.set(...rotation);
      }

      this.scene.add(sceneGroup);
      this.render();
    }
  }

  // добавляет группу плоскостей с текстурами
  addPlanesGroup(objects) {
    const scenePlanes = new PlanesGroup(objects, this.far, this.fov);
    this.planes = scenePlanes;
    this.scene.add(scenePlanes);
    this.render();
  }

  // устанавливает позицию плоскости со сценой и применяет эффекты к данной плоскости
  setScenePlane(name) {
    if (!this.planes) {
      return;
    }

    this.planes.setPosition(name);
    this.planes.setEffect(name);
  }

  // возвращает конфиг с настройками света для проекта
  getLightsConfig(isDevelop) {
    let config = [
      {
        type: `directional`,
        angle: 15,
        color: `rgb (255,255,255)`,
        intensity: 0.84,
        controls: [
          {
            title: `D1 intensity`,
            prop: `intensity`,
            min: 0,
            max: 23,
            step: 0.1,
          },
        ]
      },
      {
        type: `point`,
        color: `rgb (246,242,255)`,
        intensity: 0.60,
        distance: 3000,
        decay: 2,
        position: [-785, -350, -710],
        shadow: {
          mapSize: 800,
          near: 0.5,
          far: 1500,
          bias: 0.0001,
        },
        controls: [
          {
            title: `P1 intensity`,
            prop: `intensity`,
            min: 0,
            max: 3,
            step: 0.1,
          },
          {
            title: `P1 shadow far`,
            props: [`shadow`, `camera`, `far`],
            min: 500,
            max: 5000,
            step: 100,
          },
        ]
      },
      {
        type: `point`,
        color: `rgb (245,254,255)`,
        intensity: 0.95,
        distance: 3000,
        decay: 2,
        position: [730, 800, -985],
        shadow: {
          mapSize: 800,
          near: 0.5,
          far: 2500,
          bias: 0.0001,
        },
        controls: [
          {
            title: `P2 intensity`,
            prop: `intensity`,
            min: 0,
            max: 3,
            step: 0.1,
          },
          {
            title: `P2 shadow far`,
            props: [`shadow`, `camera`, `far`],
            min: 500,
            max: 5000,
            step: 100,
          },
        ]
      },
    ];

    if (isDevelop) {
      config.push(
          {
            type: `ambient`,
            color: `0x404040`,
            intensity: 0.3,
          }
      );
    }

    return config;
  }
  // DirectionalLight
  // направлен в сторону направления камеры вниз на 15deg
  // схема осей: https://i.stack.imgur.com/qM4IJ.jpg
  // направление света = положение камеры по оси z умноженное на тангенс угла направления света
  createDirectionalLight(options) {
    const {color, intensity, target} = options;
    let light = new THREE.DirectionalLight(
        new THREE.Color(color),
        intensity
    );
    light.target = target;
    return light;
  }

  // PointLight
  createPointLight(options) {
    const {color, intensity, distance, decay, position, shadow} = options;
    let light = new THREE.PointLight(
        new THREE.Color(color),
        intensity,
        distance,
        decay
    );
    if (position) {
      light.position.set(...position);
    }

    if (shadow) {
      light.castShadow = true;
      light.shadow.mapSize.width = shadow.mapSize;
      light.shadow.mapSize.height = shadow.mapSize;
      light.shadow.camera.near = shadow.near;
      light.shadow.camera.far = shadow.far;
      light.shadow.bias = shadow.bias;
    }
    return light;
  }

  // Ambient Light
  createAmbientLight(options) {
    const {color, intensity} = options;
    let light = new THREE.AmbientLight(
        new THREE.Color(color),
        intensity,
    );
    return light;
  }

  // создаёт контролы GUI для отладки света и теней
  createLightsControls(light, options) {
    options.forEach((option) => {
      const controls = {
        [option.title]: option.props ? light[option.props[0]][option.props[1]][option.props[2]] : light[option.prop],
      };

      this.gui.add(controls, option.title, option.min, option.max, option.step)
      .onChange((val) => {
        if (option.props) {
          light[option.props[0]][option.props[1]][option.props[2]] = val;
        } else {
          light[option.prop] = val;
        }
      });
    });
  }

  // создаёт нужные типы света на основе конфига, добавляет их на глобальную сцену
  setLights() {
    this.isLightAdded = true;
    this.lights = new THREE.Group();
    const lightsOptions = this.getLightsConfig(true);
    lightsOptions.forEach((light) => {
      if (light.angle || light.angle === 0) {
        const radian = (light.angle * Math.PI) / 180;
        const targetObject = new THREE.Object3D();
        targetObject.position.y = -this.camera.position.z * Math.tan(radian);
        this.scene.add(targetObject);
        light = {...light, target: targetObject};
      }
      switch (light.type) {
        case `point`: {
          const lightUnit = this.createPointLight(light);
          this.lights.add(lightUnit);
          if (light.controls) {
            this.createLightsControls(lightUnit, light.controls);
          }
          break;
        }
        case `directional`: {
          const lightUnit = this.createDirectionalLight(light);
          this.lights.add(lightUnit);
          if (light.controls) {
            this.createLightsControls(lightUnit, light.controls);
          }
          break;
        }
        case `ambient`: {
          const lightUnit = this.createAmbientLight(light);
          this.lights.add(lightUnit);
          break;
        }
      }
    });
    this.lights.position.z = this.camera.position.z;
    this.scene.add(this.lights);
  }
}
