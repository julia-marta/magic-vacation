import * as THREE from "three";

class LightsFactory {
  constructor() {
    this.lights = {};
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
  }

  // создаёт свет в зависимости от типа
  create(light) {
    switch (light.type) {
      case `point`: {
        return this._getPointLight(light);
      }
      case `ambient`: {
        return this._getAmbientLight(light);
      }
      default: {
        return this._getDirectionalLight(light);
      }
    }
  }

  // возвращает свет по названию
  get(name) {
    return this.lights[name];
  }

  // DirectionalLight
  // направлен в сторону направления камеры вниз на 15deg
  // схема осей: https://i.stack.imgur.com/qM4IJ.jpg
  // направление света = положение камеры по оси z умноженное на тангенс угла направления света
  _getDirectionalLight(options) {
    const {name, color, intensity, target} = options;
    let light = new THREE.DirectionalLight(
        new THREE.Color(color),
        intensity
    );
    light.target = target;
    this.lights[name] = light;
  }

  // PointLight
  _getPointLight(options) {
    const {name, color, intensity, distance, decay, position} = options;
    let light = new THREE.PointLight(
        new THREE.Color(color),
        intensity,
        distance,
        decay
    );
    if (position) {
      light.position.set(...position);
    }
    this.lights[name] = light;
  }

  // Ambient Light
  _getAmbientLight(options) {
    const {name, color, intensity} = options;
    let light = new THREE.AmbientLight(
        new THREE.Color(color),
        intensity,
    );
    this.lights[name] = light;
  }
}

export default LightsFactory;
