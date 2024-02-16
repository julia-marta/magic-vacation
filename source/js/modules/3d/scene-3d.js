import * as THREE from "three";
import MaterialsFactory from './materials/materials-factory';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';

export default class Scene3D {
  constructor(options) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = document.getElementById(options.canvas);
    this.color = options.color;
    this.alpha = options.alpha;
    this.far = options.far;
    this.near = options.near;
    this.cameraPozitionZ = options.cameraPozitionZ;
    this.aspectRatio = this.width / this.height;
    this.fov = 35;
    this.materialsFactory = new MaterialsFactory();
  }

  init() {
    this.setup();
    this.initEventListeners();
    this.updateSize();
    this.initHelpers();
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

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
  }

  initHelpers() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const axesHelper = new THREE.AxesHelper(1000);
    this.scene.add(axesHelper);
  }

  loadTexture(url, callback, options) {
    const manager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(manager);
    const texture = loader.load(url);

    manager.onLoad = () => {
      callback(texture, options);
    };
  }

  loadSVG(url, callback, options) {
    // instantiate a loader
    const loader = new SVGLoader();

    // load a SVG resource
    loader.load(
        url, (data) => {
          const paths = data.paths;
          const extrudeObj = callback(paths, options, this.materialsFactory);
          this.scene.add(extrudeObj);
          this.render();
        }
    );
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  updateSize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
