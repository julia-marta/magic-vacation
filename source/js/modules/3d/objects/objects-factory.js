import * as THREE from "three";
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import MaterialsFactory from '../materials/materials-factory.js';
import Pyramid from "./pyramid.js";
import Lantern from "./lantern.js";
import Snowman from "./snowman.js";
import Carpet from "./carpet.js";
import Road from "./road.js";
import Saturn from "./saturn.js";
import Fence from "./fence.js";
class ObjectsFactory {
  constructor(onCreate) {
    this.materialsFactory = new MaterialsFactory();
    this.get = this.get.bind(this);
    this.onCreate = onCreate.bind(this);
  }

  // загрузчик SVG форм
  loadSVG(config) {
    const {url, extrude, options} = config;

    const loader = new SVGLoader();

    loader.load(
        url, (data) => {
          const paths = data.paths;
          const {material} = options;
          const materialMesh = this.materialsFactory.get(material);
          const group = new THREE.Group();

          paths.forEach((path) => {
            const shapes = path.toShapes();

            shapes.forEach((shape) => {
              const geometry = new THREE.ExtrudeGeometry(shape, extrude);
              const mesh = new THREE.Mesh(geometry, materialMesh);

              group.add(mesh);
            });
          });

          this.onCreate(group, options, options.outer);
        }
    );
  }

  // загрузчик моделей OBJ
  loadOBJ(config) {
    const {url, material} = config;
    const loader = new OBJLoader();

    loader.load(
        url, (obj) => {
          const objMaterial = this.materialsFactory.get(material);
          obj.traverse((child) => {
            if (child.isMesh) {
              child.material = objMaterial;
            }
          });
          this.onCreate(obj, config);
        }
    );
  }

  // загрузчик моделей gLTF
  loadGLTF(config) {
    const {url} = config;
    const loader = new GLTFLoader();

    loader.load(
        url, (gltf) => {
          const {scene} = gltf;
          this.onCreate(scene, config);
        }
    );
  }

  // создаёт объект сферы
  createSphereObject(options) {
    const {radius, widthSegments, heightSegments, material} = options;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const sphereMaterial = this.materialsFactory.get(material);
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.onCreate(sphere, options);
  }

  // создаёт объект куба
  createCubeObject(options) {
    const {width, height, depth, material} = options;
    const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    const cubeMaterial = this.materialsFactory.get(material);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.onCreate(cube, options);
  }

  // создаёт объект круга
  createCircleObject(options) {
    const {radius, segments, thetaStart, thetaLength, material} = options;
    const circleGeometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength);
    const circleMaterial = this.materialsFactory.get(material);
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    this.onCreate(circle, options);
  }

  // создаёт объект плоскости
  createPlaneObject(options) {
    const {width, height, material} = options;
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMaterial = this.materialsFactory.get(material);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.onCreate(plane, options);
  }

  // создаёт группу объектов
  createObjectsGroup(options) {
    const {children} = options;

    children.forEach((child) => {
      const {name, position, scale, rotation, outer} = child;
      // получаем конструктор дочернего объекта группы
      const GroupChild = this.getGroupChild(name);
      // получаем конфиг для дочернего объекта группы
      const childConfig = this.getGroupChildConfig(name);
      if (child.options) {
        childConfig.options = {...childConfig.options, ...child.options};
      }

      if (GroupChild) {
        const object = new GroupChild(this.materialsFactory, childConfig);
        if (position) {
          object.position.set(...position);
        }
        if (scale) {
          object.scale.set(...scale);
        }

        if (rotation) {
          object.rotation.set(...rotation);
        }

        this.onCreate(object, childConfig.options, outer);
      }
    });
  }

  // создаёт группу объёмных объектов на основе SVG форм
  createExtrudeObjectsGroup(options) {
    const {shapes} = options;

    shapes.forEach((shape) => {
      const {name, type} = shape;
      // получаем стандартный конфиг формы и конфиг конкретной SVG
      const shapeConfig = this.getObjectConfig(type);
      const SVGConfig = this.getSVGConfig(name);
      // если изменяются какие-то параметры выдавленной формы, добавляем их в стандартный конфиг
      if (shape.extrude) {
        shapeConfig.extrude = {...shapeConfig.extrude, ...shape.extrude};
      }
      // если меняются другие свойства, добавляем их в конфиг конкретной SVG
      if (shape.options) {
        SVGConfig.options = {...SVGConfig.options, ...shape.options};
      }
      // сливаем вместе оба конфига со всеми добавленными свойствами
      const finalConfig = {...SVGConfig, ...shapeConfig};
      // отправляем финальный конфиг в лоадер
      this.loadSVG(finalConfig);
    });
  }

  // создаёт 3D объект типа OBJ
  create3DOBJ(config) {
    const {name} = config;
    // получаем конфиг конкретного объекта OBJ
    const OBJconfig = this.getOBJConfig(name);
    // сливаем вместе общий конфиг и конфиг объекта со всеми добавленными свойствами
    const finalConfig = {...OBJconfig, ...config};
    // отправляем финальный конфиг в лоадер
    this.loadOBJ(finalConfig);
  }

  // создаёт 3D объект типа glTF
  create3DglTF(config) {
    const {name} = config;
    // получаем конфиг конкретного объекта glTF
    const glTFconfig = this.getGLTFConfig(name);
    // сливаем вместе общий конфиг и конфиг объекта со всеми добавленными свойствами
    const finalConfig = {...glTFconfig, ...config};
    // отправляем финальный конфиг в лоадер
    this.loadGLTF(finalConfig);
  }

  // берёт готовый конфиг для данного типа объекта и на его основе создаёт модель
  get(object) {
    const {type, options} = object;
    const objectConfig = this.getObjectConfig(type);
    if (options) {
      objectConfig.options = {...objectConfig.options, ...options};
    }
    this.create(objectConfig);
  }


  // создаёт модель в зависимости от типа на основе конфига
  create(objectConfig) {
    const {type, options} = objectConfig;
    switch (type) {
      case `sphere`:
        this.createSphereObject(options);
        break;
      case `cube`:
        this.createCubeObject(options);
        break;
      case `circle`:
        this.createCircleObject(options);
        break;
      case `plane`:
        this.createPlaneObject(options);
        break;
      case `group`:
        this.createObjectsGroup(options);
        break;
      case `extrude`:
        this.createExtrudeObjectsGroup(options);
        break;
      case `OBJ`:
        this.create3DOBJ(options);
        break;
      case `glTF`:
        this.create3DglTF(options);
        break;
      default:
        break;
    }
  }

  // возвращает модель дочернего объекта для группы из библиотеки объектов
  getGroupChild(name) {
    return ObjectsFactory.GroupChilds[name];
  }

  // возвращает конфиг объекта из библиотеки конфигов
  getObjectConfig(type) {
    return {...ObjectsFactory.Configs[type]};
  }

  // возвращает конфиг дочернего объекта для группы из библиотеки конфигов
  getGroupChildConfig(name) {
    return {...ObjectsFactory.GroupChildsConfigs[name]};
  }

  // возвращает конфиг SVG-формы из библиотеки конфигов
  getSVGConfig(name) {
    return {...ObjectsFactory.SVGConfigs[name]};
  }

  // возвращает конфиг 3D объекта типа OBJ из библиотеки конфигов
  getOBJConfig(name) {
    return {...ObjectsFactory.OBJConfigs[name]};
  }

  // возвращает конфиг 3D объекта типа glTF из библиотеки конфигов
  getGLTFConfig(name) {
    return {...ObjectsFactory.glTFConfigs[name]};
  }

// библиотека расширяемых конфигов для всех типов объектов, включая дочерние
}
ObjectsFactory.Configs = {
  sphere: {
    type: `sphere`,
    options: {
      radius: 100,
      widthSegments: 32,
      heightSegments: 32,
      material: {}
    }
  },
  cube: {
    type: `cube`,
    options: {
      width: 100,
      height: 100,
      depth: 100,
      material: {}
    }
  },
  circle: {
    type: `circle`,
    options: {
      radius: 1350,
      segments: 32,
      thetaStart: 0,
      thetaLength: Math.PI / 2,
      material: {}
    }
  },
  plane: {
    type: `plane`,
    options: {
      width: 2000,
      height: 1995,
      material: {}
    }
  },
  group: {
    type: `group`,
    options: {
      children: [],
    }
  },
  extrude: {
    type: `extrude`,
    options: {
      shapes: [],
    }
  },
  shape: {
    type: `shape`,
    extrude: {
      steps: 2,
      depth: 8,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10
    }
  },
  OBJ: {
    type: `OBJ`,
    options: {},
  },
  glTF: {
    type: `glTF`,
    options: {},
  },
};

// библиотека конструкторов для дочерних объектов / групповых объектов
ObjectsFactory.GroupChilds = {
  pyramid: Pyramid,
  lantern: Lantern,
  snowman: Snowman,
  carpet: Carpet,
  road: Road,
  saturn: Saturn,
  fence: Fence,
};

// библиотека расширяемых конфигов дочерних объектов / групповых объектов
ObjectsFactory.GroupChildsConfigs = {
  pyramid: {
    name: `pyramid`,
    options: {
      base: 250,
      height: 280,
      radialSegments: 4,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
  },
  lantern: {
    name: `lantern`,
    options: {
      lamp: {
        top: {
          widthTop: 45,
          widthBottom: 57,
          height: 6,
          radialSegments: 4,
        },
        plafon: {
          widthTop: 42,
          widthBottom: 34,
          height: 70,
          radialSegments: 4,
        },
        base: {
          widthTop: 37,
          widthBottom: 37,
          height: 4,
        }
      },
      post: {
        radius: 7,
        height: 230,
      },
      base: {
        top: {
          radius: 16,
          height: 16,
        },
        bottom: {
          radius: 16,
          height: 120,
        },
      },
      materials: {
        lamp: {
          top: {
            type: `StandardSoft`,
            color: `Blue`,
          },
          plafon: {
            type: `StandardSoft`,
            color: `LightBlue`,
          },
          base: {
            type: `StandardSoft`,
            color: `Blue`,
          },
        },
        post: {
          type: `StandardSoft`,
          color: `Blue`,
        },
        base: {
          top: {
            type: `StandardSoft`,
            color: `Blue`,
          },
          bottom: {
            type: `StandardSoft`,
            color: `Blue`,
          },
        }
      }
    },
  },
  snowman: {
    name: `snowman`,
    options: {
      top: {
        radius: 44,
        height: 44,
        y: 173,
      },
      bottom: {
        radius: 75,
        height: 75,
        y: 65,
      },
      carrot: {
        radius: 18,
        height: 75,
        y: 173,
        z: 32,
      },
      materials: {
        top: {
          type: `PhongStrong`,
          color: `SnowColor`,
        },
        bottom: {
          type: `PhongStrong`,
          color: `SnowColor`,
        },
        carrot: {
          type: `StandardSoft`,
          color: `Orange`,
        },
      }
    }
  },
  carpet: {
    name: `carpet`,
    options: {
      width: 180,
      height: 3,
      radius: 763,
      startAngle: 16,
      endAngle: 74,
      segments: 30,
      material: {
        type: `CustomSoftCarpet`,
        color: {
          mainColor: `LightPurple`,
          stripesColor: `AdditionalPurple`,
        },
      }
    },
  },
  road: {
    name: `road`,
    options: {
      width: 160,
      height: 3,
      radius: 732,
      startAngle: 0,
      endAngle: 90,
      segments: 30,
      material: {
        type: `CustomSoftRoad`,
        color: {
          mainColor: `Grey`,
          stripesColor: `White`,
        },
      }
    }
  },
  saturn: {
    name: `saturn`,
    options: {
      planet: {
        name: `Planet`,
        radius: 60,
        height: 60,
        widthSegments: 32,
        heightSegments: 32,
      },
      rings: {
        name: `Rings`,
        height: 2,
        radiusInner: 80,
        radiusOut: 120,
        angle: 18,
        segments: 30,
      },
      ball: {
        name: `Ball`,
        radius: 10,
        height: 10,
        widthSegments: 16,
        heightSegments: 16,
        y: 120,
      },
      cable: {
        name: `Cable`,
        radiusTop: 1,
        radiusBottom: 1,
        height: 1000,
        radialSegments: 30,
        y: 500,
      },
      materials: {
        planet: {
          type: `StandardSoft`,
          color: `DominantRed`,
        },
        rings: {
          type: `StandardSoft`,
          color: `BrightPurple`,
        },
        ball: {
          type: `StandardSoft`,
          color: `BrightPurple`,
        },
        cable: {
          type: `StandardSoft`,
          color: `MetalGrey`,
        }
      }
    }
  },
  fence: {
    name: `fence`,
    options: {
      radius: 700,
      startAngle: -30,
      columnsBeetweenAngle: 15,
      columnsCount: 5,
      column: {
        radiusTop: 12,
        radiusBottom: 12,
        height: 80,
        radialSegments: 32,
        material: {
          type: `StandardSoft`,
          color: `Grey`,
        }
      },
    },
  },
};

// библиотека расширяемых конфигов SVG форм
ObjectsFactory.SVGConfigs = {
  flamingo: {
    name: `flamingo`,
    url: `img/svg-forms/flamingo.svg`,
    options: {
      material: {
        type: `StandardSoft`,
        color: `LightDominantRed`,
        doubleSide: true,
      }
    },
  },
  snowflake: {
    name: `snowflake`,
    url: `img/svg-forms/snowflake.svg`,
    options: {
      material: {
        type: `StandardBasic`,
        color: `Blue`,
        doubleSide: true,
      }
    },
  },
  question: {
    name: `question`,
    url: `img/svg-forms/question.svg`,
    options: {
      material: {
        type: `StandardBasic`,
        color: `Blue`,
        doubleSide: true,
      }
    },
  },
  leaf: {
    name: `leaf`,
    url: `img/svg-forms/leaf.svg`,
    options: {
      material: {
        type: `StandardBasic`,
        color: `Green`,
        doubleSide: true,
      }
    },
  },
  keyhole: {
    name: `keyhole`,
    url: `img/svg-forms/keyhole.svg`,
    options: {
      material: {
        type: `StandardSoft`,
        color: `DarkPurple`,
        doubleSide: true,
      }
    },
  },
  flower: {
    name: `flower`,
    url: `img/svg-forms/flower.svg`,
    options: {
      material: {
        type: `StandardBasic`,
        color: `Green`,
        doubleSide: true,
      }
    },
  },
};

// библиотека расширяемых конфигов 3D объектов типа OBJ
ObjectsFactory.OBJConfigs = {
  airplane: {
    name: `airplane`,
    url: `./3d/module-6/scene-0-objects/airplane.obj`,
    material: {
      type: `StandardBasic`,
      color: `White`,
      doubleSide: true,
    },
  },
  wallCornerUnit: {
    name: `wallCornerUnit`,
    url: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
    material: {}
  },
};

// библиотека расширяемых конфигов 3D объектов типа glTF
ObjectsFactory.glTFConfigs = {
  suitcase: {
    name: `suitcase`,
    url: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  watermelon: {
    name: `watermelon`,
    url: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  },
  staticGroupRoom1: {
    name: `staticGroupRoom1`,
    url: `./3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
  },
  staticGroupRoom2: {
    name: `staticGroupRoom2`,
    url: `./3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
  },
  staticGroupRoom3: {
    name: `staticGroupRoom3`,
    url: `./3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
  },
  staticGroupRoom4: {
    name: `staticGroupRoom4`,
    url: `./3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
  },
  dog: {
    name: `dog`,
    url: `./3d/module-6/rooms-scenes/objects/dog.gltf`,
  },
  compass: {
    name: `compass`,
    url: `./3d/module-6/rooms-scenes/objects/compass.gltf`,
  },
  sonya: {
    name: `sonya`,
    url: `./3d/module-6/rooms-scenes/objects/sonya.gltf`,
  },
};

export default ObjectsFactory;
