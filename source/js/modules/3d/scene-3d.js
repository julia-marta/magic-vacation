import * as THREE from "three";
import {GUI} from "dat.gui";
import SceneGroup from "./scenes/scene-group.js";
import PlanesGroup from "./scenes/planes-group.js";
import CameraRigDesktop from "./rigs/camera-desktop.js";
import CameraRigMobile from "./rigs/camera-mobile.js";
import Animation from "../animation.js";
import {Scenes, ScreensScenes} from "../../data/scenes.js";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {isDesktop} from "../../common/const.js";

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
    this.directionalLight = null;
    this.pointLight = null;
    this.ambientLight = null;
    this.isLightAdded = false;
    this.renderedScenes = [];
    this.childScenes = {};
    this.resizeInProgress = false;
    this.initScenes = this.initScenes.bind(this);
    this.setScenePlane = this.setScenePlane.bind(this);
    this.runCurrentAnimation = this.runCurrentAnimation.bind(this);
  }

  // инициирует глобальную сцену
  init() {
    this.setup();
    this.resize();
    this.initEventListeners();
    // this.initHelpers();
    this.startAnimations();
  }

  // устанавливает обработчик события ресайза на окно
  initEventListeners() {
    window.addEventListener(`resize`, this.onResize.bind(this));
  }

  // производит настройки отрисовщика, сцены и камеры
  setup() {
    // 1.1.1. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: window.devicePixelRatio <= 1,
      logarithmicDepthBuffer: false,
      powerPreference: `high-performance`
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.shadowMap.enabled = !isDesktop ? true : false;

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
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.domElement);
  }

  // рендер глобальной сцены
  render() {
    if (this.resizeInProgress) {
      this.resize();
    }
    // this.controls.update();
    // this.stats.update();
    this.renderer.render(this.scene, this.camera);
    this.resizeInProgress = false;
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
  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height < 1 || width < 1) {
      return;
    }
    // camera resize
    if (width > height) {
      this.camera.fov = 35;
    } else {
      this.camera.fov = (32 * height) / Math.min(width * 1.3, height);
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    // renderer resize
    this.renderer.setSize(width, height);
  }

  // обработчик ресайза окна
  // вызывает в перерендере обновление размеров глобальной сцены и переустанавливает Rig камеры
  onResize() {
    this.resizeInProgress = true;
    this.addCameraRig(this.cameraState);
  }

  // добавляет конструкции Rig для камеры
  addCameraRig(state) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;

    if (height < 1 || width < 1) {
      return;
    }

    if (isLandscape) {
      if (this.cameraRig && this.cameraRig instanceof CameraRigDesktop) {
        return;
      }
      this.scene.remove(this.cameraRig);
      this.cameraRig = new CameraRigDesktop(state.desktop);
    } else {
      if (this.cameraRig && this.cameraRig instanceof CameraRigMobile) {
        return;
      }
      this.scene.remove(this.cameraRig);
      this.cameraRig = new CameraRigMobile(state.mobile);
    }
    // камеру добавляем на внешнюю оболочку Rig конструкции
    this.cameraRig.addObjectToCameraNull(this.camera);
    if (this.directionalLight) {
      // направленный источник света добавляем на внешнюю оболочку Rig конструкции
      this.cameraRig.addObjectToCameraNull(this.directionalLight);
    }
    if (this.pointLight) {
      // точечные источники добавляем в группу вертикального вращения Rig конструкции
      this.cameraRig.addObjectToYawTrack(this.pointLight);
    }

    // добавляем Rig на глобальную сцену
    this.scene.add(this.cameraRig);
  }

  // инициирует локальные сцены, источники света, устанавливает состояние камеры
  initScenes(screen, currentScene) {
    const screenSceneData = ScreensScenes[screen];
    const currentSceneData = Scenes[currentScene];
    const {name, type, lights, scenes, objects, position, rotation, isMountedOnCameraRig} = screenSceneData;
    const {cameraState, currentAnimation} = currentSceneData;
    const isSceneRendered = this.renderedScenes.includes(name);
    // сохраняем состояние камеры для конкретной текущей сцены
    this.cameraState = cameraState;
    // сохраняем анимацию для конкретной текущей сцены
    this.currentAnimation = currentAnimation;
    // добавляем свет
    if (lights && !this.isLightAdded && !isDesktop) {
      this.setLights();
    }
    // добавляем Rig с камерой
    if (cameraState && !this.cameraRig) {
      this.addCameraRig(cameraState);
    }

    // если сцена ещё не отрисована
    if (!isSceneRendered) {
      // отрисовываем сцену, в зависимости от типа
      switch (type) {
        case `planes`:
          this.addPlanesGroup(objects);
          break;
        case `scenesGroup`:
          scenes.forEach((scene) => {
            this.addSceneGroup(scene.name, scene.objects, scene.position, scene.rotation, scene.isMountedOnCameraRig);
          });
          break;
        default:
          this.addSceneGroup(name, objects, position, rotation, isMountedOnCameraRig);
          break;
      }

      // сохраняем отрисованную сцену
      this.renderedScenes.push(name);
      // если сцена уже отрисована
    } else {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      const currentCameraState = isLandscape ? cameraState.desktop : cameraState.mobile;
      // если есть текущая анимация
      if (this.currentAnimation) {
        // добавляем в состояние камеры коллбэк для запуска анимации следующей сцены
        currentCameraState.animationCallback = this.runCurrentAnimation;
      }
      // если есть сопутствующая смене камеры анимация
      const {relatedAnimation} = currentCameraState;
      if (relatedAnimation) {
        // находим сцену, которой принадлежит анимированный объект
        const scene = this.childScenes[relatedAnimation.scene];
        // ищем дочерний объект сцены, который надо анимировать
        const object = scene.getObjectByName(relatedAnimation.object);
        // добавляем объект в сопуствующую анимацию
        currentCameraState.relatedAnimation.mesh = object;
      }

      // устанавливаем состояние камеры для конкретной сцены
      this.cameraRig.changeState(currentCameraState);
    }
  }

  // запускает анимацию только на текущей сцене
  runCurrentAnimation() {
    if (!this.currentAnimation) {
      return;
    }
    // находим сцену, которой принадлежит анимированный объект
    const scene = this.childScenes[this.currentAnimation.scene];
    if (!scene) {
      return;
    }
    // запускаем анимации нужного объекта на искомой сцене
    scene.runObjectAnimations(this.currentAnimation.object, this.currentAnimation.animations, this.currentAnimation.isPlayOnce);
  }

  // добавляет локальную сцену из группы объектов
  addSceneGroup(name, objects, position, rotation, isMountedOnCameraRig) {
    const sceneGroup = new SceneGroup(objects, this.runCurrentAnimation);

    if (sceneGroup) {
      if (name) {
        sceneGroup.name = name;
      }
      if (position) {
        sceneGroup.position.set(...position);
      }
      if (rotation) {
        sceneGroup.rotation.set(...rotation);
      }
      if (isMountedOnCameraRig && this.cameraRig) {
        // если у сцены есть флаг монтирования на Rig камеры, добавляем её на него, а не на основную сцену
        this.cameraRig.addObjectToYawTrack(sceneGroup);
      } else {
        this.scene.add(sceneGroup);
      }

      // сохраняем отрисованную локальную сцену
      this.childScenes[name] = sceneGroup;
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
    // внешние группы для света, которым задаём позиционирование
    this.directionalLight = new THREE.Group();
    this.pointLight = new THREE.Group();
    this.ambientLight = new THREE.Group();
    // внутренние группы ддля света, в которые добавляем источники света
    const directionalGroup = new THREE.Group();
    const pointGroup = new THREE.Group();
    // получаем настройки света из конфига
    const lightsOptions = this.getLightsConfig();
    lightsOptions.forEach((light) => {
      // если есть угол, значит это направленный свет, создаём таргет объект и добавляем в группу
      if (light.angle || light.angle === 0) {
        const radian = (light.angle * Math.PI) / 180;
        const targetObject = new THREE.Object3D();
        targetObject.position.set(0, -1000 * Math.tan(radian), -1000);
        directionalGroup.add(targetObject);
        light = {...light, target: targetObject};
      }
      switch (light.type) {
        case `point`: {
          const lightUnit = this.createPointLight(light);
          pointGroup.add(lightUnit);
          // if (light.controls) {
          //   this.createLightsControls(lightUnit, light.controls);
          // }
          break;
        }
        case `directional`: {
          const lightUnit = this.createDirectionalLight(light);
          directionalGroup.add(lightUnit);
          // if (light.controls) {
          //   this.createLightsControls(lightUnit, light.controls);
          // }
          break;
        }
        // рассеянный свет, только для режима разработки
        case `ambient`: {
          const lightUnit = this.createAmbientLight(light);
          this.ambientLight.add(lightUnit);
          this.scene.add(this.ambientLight);
          break;
        }
      }
    });
    // задаем позиционирование внешним группы и добавляем в них группы с источниками света
    this.directionalLight.position.z = this.camera.position.z;
    this.directionalLight.add(directionalGroup);
    this.pointLight.position.z = 2250;
    this.pointLight.add(pointGroup);
  }
}
