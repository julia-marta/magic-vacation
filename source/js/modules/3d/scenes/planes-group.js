import * as THREE from "three";
import MaterialsFactory from '../materials/materials-factory.js';
import Animation from '../../animation.js';
import _ from '../../../common/easings.js';

class PlanesGroup extends THREE.Group {
  constructor(planesObjects, far, fov) {
    super();
    this.planesObjects = planesObjects;
    this.planeRatio = 2;
    this.planePositions = {};
    this.planeEffects = {};
    this.far = far;
    this.fov = fov;
    this.materialsFactory = new MaterialsFactory();
    this.createPlaneObject = this.createPlaneObject.bind(this);
    this.setEffect = this.setEffect.bind(this);
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
      this.planeEffects[plane.name] = plane.effects;
    });
  }

  // добавляет анимацию растрового смещения hue
  startHueAnimation(name, options) {
    const {shift, duration} = options;
    const plane = this.children.filter((item) => {
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

  // добавляет анимацию пузырьков
  startBlobsAnimation(name, options) {
    const {params, duration, frequency} = options;
    const plane = this.children.filter((item) => {
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

  // устанавливает эффекты плоскости-текстуре по названию плоскости
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

  // устанавливает позицию плоскости-текстуре по названию плоскости
  setPosition(name) {
    if (!this.planePositions.hasOwnProperty(name)) {
      return;
    }
    this.position.x = -this.planePositions[name];
  }
}

export default PlanesGroup;
