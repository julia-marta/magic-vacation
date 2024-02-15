import * as THREE from "three";

class MaterialsFactory {
  constructor() {
    this.get = this.get.bind(this);
  }

  // возвращает материал в зависимости от типа
  get(type, options) {
    switch (type) {
      case `basic`: {
        return this._getBasicMaterial(options);
      }
      case `phong`: {
        return this._getPhongMaterial(options);
      }
      default: {
        return this._getStandardMaterial(options);
      }
    }

  }

  // возвращает цвет материала из библиотеки цветов
  getMaterialColor(name) {
    return MaterialsFactory.Colors[name];
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
      // по дефолту значения soft (слабое отражение)
      default: {
        return {
          roughness: 0.95,
          metalness: 0.0,
        };
      }
    }
  }

  // заливает фигуру однородным цветом, не обрабатывая информацию об освещении
  _getBasicMaterial() {

  }
  // моделирует физически реалистичные модели отражения, использует параметры roughness (шероховатость) и metalness (металличность)
  _getStandardMaterial(options) {
    if (options.reflection) {
      options = {...options, ...this.getMaterialReflectionOptions(options.reflection)};
    }
    options = {...options, color: this.getMaterialColor(options.color)};
    return new THREE.MeshStandardMaterial(options);
  }

  // вычисляет освещение в каждом пикселе и генерирует выраженное отражение от поверхности (блик)
  _getPhongMaterial() {

  }

}

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
