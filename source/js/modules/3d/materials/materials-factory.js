import * as THREE from "three";
import CustomShaderMaterial from "./custom-shader-material";
import CustomPlanesMaterial from "./custom-planes-material";

class MaterialsFactory {
  constructor() {
    this.get = this.get.bind(this);
  }

  // берёт готовый конфиг для данного типа материала и на его основе создаёт материал
  get(material) {
    const {type, color, doubleSide, options} = material;
    const materialConfig = this.getMaterialConfig(type);
    if (color) {
      if (typeof color === `object`) {
        materialConfig.options.colors = [];
        Object.entries(color).forEach(([key, value]) => {
          materialConfig.options.colors.push(
              {
                name: key,
                value,
              },
          );
        });
      } else {
        materialConfig.options.color = color;
      }
    }

    if (doubleSide) {
      materialConfig.options.side = THREE.DoubleSide;
    }

    if (options) {
      materialConfig.options = {...materialConfig.options, ...options};
    }

    return this.create(materialConfig);
  }

  // создаёт материал в зависимости от типа
  create(materialConfig) {
    const {type, reflection, options} = materialConfig;
    switch (type) {
      case `basic`: {
        return this._getBasicMaterial(options);
      }
      case `phong`: {
        return this._getPhongMaterial(options, reflection);
      }
      case `custom`: {
        return this._getCustomMaterial(options, reflection);
      }
      case `customPlanes`: {
        return this._getCustomPlanesMaterial(options);
      }
      default: {
        return this._getStandardMaterial(options, reflection);
      }
    }
  }

  // возвращает цвет материала из библиотеки цветов
  getMaterialColor(name) {
    return MaterialsFactory.Colors[name];
  }

  // возвращает конфиг материала из библиотеки конфигов
  getMaterialConfig(type) {
    return {...MaterialsFactory.Configs[type]};
  }

  // возвращает свойства шероховатости и металличности в зависимости от типа отражения
  getMaterialReflectionOptions(reflection) {
    switch (reflection) {
      // среднее отражение
      case `basic`: {
        return {
          roughness: 0.6,
          metalness: 0.6,
        };
      }
      // сильное отражение
      case `strong`: {
        return {
          shininess: 0,
          specular: 0xffffff,
        };
      }
      // по дефолту значения soft (слабое отражение)
      default: {
        return {
          roughness: 0.95,
          metalness: 0.0,
        };
      }
    }
  }
  // возвращает uniform переменные для кастомного материала
  getCustomMaterialUniforms(reflection, colors, additionalUniforms) {
    const reflectionOptions = this.getMaterialReflectionOptions(reflection);
    const colorUniforms = colors.reduce((acc, color) => {
      const materialColor = this.getMaterialColor(color.value);
      acc[color.name] = {value: new THREE.Color(materialColor)};

      return acc;
    }, {});

    return {
      roughness: {value: reflectionOptions.roughness},
      metalness: {value: reflectionOptions.metalness},
      ...colorUniforms,
      ...additionalUniforms
    };
  }

  // заливает фигуру однородным цветом, не обрабатывая информацию об освещении
  _getBasicMaterial(options) {
    options = {...options, color: this.getMaterialColor(options.color)};
    return new THREE.MeshBasicMaterial(options);
  }
  // моделирует физически реалистичные модели отражения, использует параметры roughness (шероховатость) и metalness (металличность)
  _getStandardMaterial(options, reflection) {
    if (reflection) {
      options = {...options, ...this.getMaterialReflectionOptions(reflection)};
    }
    options = {...options, color: this.getMaterialColor(options.color)};
    return new THREE.MeshStandardMaterial(options);
  }

  // вычисляет освещение в каждом пикселе и генерирует выраженное отражение от поверхности (блик)
  _getPhongMaterial(options, reflection) {
    if (reflection) {
      options = {...options, ...this.getMaterialReflectionOptions(reflection)};
    }
    options = {...options, color: this.getMaterialColor(options.color)};
    return new THREE.MeshPhongMaterial(options);
  }

  _getCustomMaterial(options, reflection) {
    const {name, colors, shaders, additional} = options;
    const uniforms = this.getCustomMaterialUniforms(reflection, colors, additional);
    return new CustomShaderMaterial(name, shaders, uniforms);
  }

  _getCustomPlanesMaterial(options) {
    const {texture} = options;
    return new CustomPlanesMaterial(texture);
  }
}

MaterialsFactory.Configs = {
  StandardSoft: {
    type: `standard`,
    reflection: `soft`,
    options: {},
  },
  StandardBasic: {
    type: `standard`,
    reflection: `basic`,
    options: {},
  },
  PhongStrong: {
    type: `phong`,
    reflection: `strong`,
    options: {},
  },
  CustomPlanes: {
    type: `customPlanes`,
    options: {},
  },
  CustomSoftCarpet: {
    type: `custom`,
    reflection: `soft`,
    options: {
      name: `standard`,
      shaders: `carpet`,
      additional: {
        stripesCount: new THREE.Uniform(7)
      }
    },
  },
  CustomSoftRoad: {
    type: `custom`,
    reflection: `soft`,
    options: {
      name: `standard`,
      shaders: `road`,
      additional: {
        stripesCount: new THREE.Uniform(9),
        stripesSize: new THREE.Uniform(20),
      }
    },
  },
};

MaterialsFactory.Colors = {
  Blue: `rgb(51, 113, 235)`,
  BrightBlue: `rgb(47, 58, 201)`,
  LightBlue: `rgb(150, 176, 243)`,
  DarkBlue:	`rgb(12, 49, 112)`,
  SkyLightBlue:	`rgb(161, 200, 240)`,
  MountainBlue:	`rgb(101, 152, 219)`,
  DominantRed: `rgb(255, 32, 66)`,
  LightDominantRed: `rgb(255, 105, 120)`,
  ShadowedDominantRed: `rgb(124, 26, 48)`,
  Purple: `rgb(163, 118, 235)`,
  BrightPurple:	`rgb(118, 76, 225)`,
  LightPurple: `rgb(194, 153, 225)`,
  AdditionalPurple: `rgb(119, 85, 189)`,
  DarkPurple:	`rgb(76, 49, 121)`,
  ShadowedPurple:	`rgb(75, 50, 116)`,
  ShadowedBrightPurple:	`rgb(56, 37, 108)`,
  ShadowedLightPurple:	`rgb(77, 53, 106)`,
  ShadowedAdditionalPurple:	`rgb(55, 38, 89)`,
  ShadowedDarkPurple:	`rgb(49, 42, 71)`,
  Grey:	`rgb(118, 125, 143)`,
  MetalGrey:	`rgb(126, 141, 164)`,
  Orange:	`rgb(230, 80, 0)`,
  Green:	`rgb(0, 210, 134)`,
  White:	`rgb(255, 255, 255)`,
  SnowColor:	`rgb(182, 206, 240)`,
};

export default MaterialsFactory;
