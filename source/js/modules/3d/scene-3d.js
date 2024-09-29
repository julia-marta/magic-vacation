import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {GUI} from "dat.gui";
import SceneGroup from "./scenes/scene-group.js";
import PlanesGroup from "./scenes/planes-group.js";
import CameraRigDesktop from "./rigs/camera-desktop.js";
import CameraRigMobile from "./rigs/camera-mobile.js";
import MaterialsFactory from './materials/materials-factory.js';
import Animation from "../animation.js";
import {Scenes, ScreensScenes} from "../../data/scenes.js";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {isDesktop} from "../../common/const.js";
import {loadingManager} from "../loading-manager.js";

export default class Scene3D {
  constructor(options) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = document.getElementById(options.canvas);
    this.preloader = document.getElementById(`preloader-screen`);
    this.preloaderProgress = document.getElementById(`preloader-progress`);
    this.color = options.color;
    this.alpha = options.alpha;
    this.far = options.far;
    this.fov = options.fov;
    this.near = options.near;
    this.cameraPozitionZ = options.cameraPozitionZ;
    this.cameraPozitionY = options.cameraPozitionY;
    this.aspectRatio = this.width / this.height;
    this.materialsFactory = new MaterialsFactory();
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
    this.runEffectAnimations = this.runEffectAnimations.bind(this);
    this.finishPreloader = this.finishPreloader.bind(this);
  }

  init() {
    this.setup();
    this.resize();
    this.initEventListeners();
    this.startAnimations();
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.onResize.bind(this));
  }

  setup() {
    // 1.1.1. Renderer
    this.devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: this.devicePixelRatio <= 1,
      logarithmicDepthBuffer: true,
      powerPreference: `high-performance`
    });
    this.renderer.setPixelRatio(this.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.shadowMap.enabled = isDesktop ? true : false;

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

    // 1.1.4. Composer
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.devicePixelRatio);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.effectMaterial = this.materialsFactory.get({
      type: `CustomPlanes`,
      options: {
        texture: undefined,
      }
    });
    const effectPass = new ShaderPass(this.effectMaterial, `map`);

    this.composer.addPass(renderPass);
    this.composer.addPass(effectPass);
  }

  initHelpers() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const axesHelper = new THREE.AxesHelper(1000);
    this.scene.add(axesHelper);
    this.gui = new GUI();
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.domElement);
  }

  render() {
    if (this.resizeInProgress) {
      this.resize();
    }
    this.composer.render();
    this.resizeInProgress = false;
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

  onResize() {
    this.resizeInProgress = true;
    this.addCameraRig(this.cameraState);
  }

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
    this.cameraRig.addObjectToCameraNull(this.camera);
    if (this.directionalLight) {
      this.cameraRig.addObjectToCameraNull(this.directionalLight);
    }
    if (this.pointLight) {
      this.cameraRig.addObjectToYawTrack(this.pointLight);
    }

    this.scene.add(this.cameraRig);
  }

  initScenes(screen, currentScene, changePage) {
    const screenSceneData = ScreensScenes[screen];
    const currentSceneData = Scenes[currentScene];
    const {name, type, lights, scenes, objects, position, rotation, isMountedOnCameraRig} = screenSceneData;
    const {cameraState, currentAnimation, effectAnimations} = currentSceneData;
    const isSceneRendered = this.renderedScenes.includes(name);
    this.cameraState = cameraState;
    this.currentAnimation = currentAnimation;
    if (lights && !this.isLightAdded && isDesktop) {
      this.setLights();
    }
    if (cameraState && !this.cameraRig) {
      this.addCameraRig(cameraState);
    }

    if (!isSceneRendered) {
      loadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
        this.preloaderProgress.textContent = Math.round(itemsLoaded / itemsTotal * 100);
      };
      loadingManager.onLoad = () => {
        this.renderedScenes.push(name);
        setTimeout(() => {
          changePage();
          Object.values(this.childScenes).forEach((scene) => {
            scene.runSceneAnimations();
          });
        }, 500);
      };

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
    } else {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      const currentCameraState = isLandscape ? cameraState.desktop : cameraState.mobile;
      changePage();
      if (this.currentAnimation) {
        currentCameraState.animationCallback = this.runCurrentAnimation;
      }
      if (effectAnimations) {
        this.effectAnimations = effectAnimations;
        currentCameraState.effectCallback = this.runEffectAnimations;
      }
      const {relatedAnimation} = currentCameraState;
      if (relatedAnimation) {
        const scene = this.childScenes[relatedAnimation.scene];
        const object = scene.getObjectByName(relatedAnimation.object);
        currentCameraState.relatedAnimation.mesh = object;
      }
      this.cameraRig.changeState(currentCameraState);
    }
  }

  runCurrentAnimation() {
    if (!this.currentAnimation) {
      return;
    }
    const scene = this.childScenes[this.currentAnimation.scene];
    if (!scene) {
      return;
    }
    scene.runObjectAnimations(this.currentAnimation.object, this.currentAnimation.animations, this.currentAnimation.isPlayOnce);
  }
  runEffectAnimations() {
    if (!this.effectAnimations) {
      return;
    }

    const scene = this.childScenes[this.effectAnimations.scene];
    if (!scene) {
      return;
    }
    scene.runEffectAnimations(this.effectMaterial, this.effectAnimations.animations);
  }

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
        this.cameraRig.addObjectToYawTrack(sceneGroup);
      } else {
        this.scene.add(sceneGroup);
      }
      this.childScenes[name] = sceneGroup;
      this.render();
    }
  }

  addPlanesGroup(objects) {
    const scenePlanes = new PlanesGroup(objects, this.far, this.fov);
    this.planes = scenePlanes;
    this.scene.add(scenePlanes);
    this.render();
  }

  setScenePlane(name) {
    if (!this.planes) {
      return;
    }

    this.planes.setPosition(name);
  }

  finishPreloader() {
    this.preloaderProgress.textContent = 100;
    setTimeout(() => {
      this.preloader.classList.add(`preloader-screen--loaded`);
    }, 100);
  }

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

  createDirectionalLight(options) {
    const {color, intensity, target} = options;
    let light = new THREE.DirectionalLight(
        new THREE.Color(color),
        intensity
    );
    light.target = target;
    return light;
  }

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

  createAmbientLight(options) {
    const {color, intensity} = options;
    let light = new THREE.AmbientLight(
        new THREE.Color(color),
        intensity,
    );
    return light;
  }

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

  setLights() {
    this.isLightAdded = true;
    this.directionalLight = new THREE.Group();
    this.pointLight = new THREE.Group();
    this.ambientLight = new THREE.Group();
    const directionalGroup = new THREE.Group();
    const pointGroup = new THREE.Group();
    const lightsOptions = this.getLightsConfig();
    lightsOptions.forEach((light) => {
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
          break;
        }
        case `directional`: {
          const lightUnit = this.createDirectionalLight(light);
          directionalGroup.add(lightUnit);
          break;
        }
        case `ambient`: {
          const lightUnit = this.createAmbientLight(light);
          this.ambientLight.add(lightUnit);
          this.scene.add(this.ambientLight);
          break;
        }
      }
    });
    this.directionalLight.position.z = this.camera.position.z;
    this.directionalLight.add(directionalGroup);
    this.pointLight.position.z = 2250;
    this.pointLight.add(pointGroup);
  }
}
