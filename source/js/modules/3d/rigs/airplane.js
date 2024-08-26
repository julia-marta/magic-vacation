import * as THREE from "three";
import ObjectsFactory from '../objects/objects-factory.js';

class AirplaneRig extends THREE.Group {
  constructor(options) {
    super();
    this.options = options;
    this.onCreateAirplaneObject = this.onCreateAirplaneObject.bind(this);
    this.objectsFactory = new ObjectsFactory(this.onCreateAirplaneObject);
    // радиус полёта и флаг его изменения
    // меняет позицию по оси z у объекта самолёта
    this._flightRadius = 100;
    this._flightRadiusChanged = true;
    // высота полёта и флаг его изменения
    // меняет позицию по оси y у рига (обёртки объекта)
    this._flightHeight = -100;
    this._flightHeightChanged = true;
    // угол рыскания самолёта (поворот вокруг вертикальной оси) и флаг его изменения
    // меняет угол поворота по оси y у рига (обёртки объекта)
    // пример рыскания: https://rcsearch.ru/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Aileron_yaw.gif
    this._flightYaw = -Math.PI;
    this._flightYawChanged = true;
    // угол тангажа самолёта (поворот вокруг поперечной оси) и флаг его изменения
    // меняет угол поворота по оси z у промежуточной обёртки самолёта
    // пример тангажа: https://rcsearch.ru/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Aileron_pitch.gif
    this._flightPitch = 0;
    this._flightPitchChanged = true;
    // угол крена самолёта (поворот вокруг продольной оси) и флаг его изменения
    // меняет угол поворота по оси z у объекта самолёта
    // пример крена: https://rcsearch.ru/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Aileron_roll.gif
    this._flightRoll = 0;
    this._flightRollChanged = true;

    // создаём объект аэроплана с помощью фабрики
    this.objectsFactory.get(options);
  }
  // получение значения максимального радиуса полёта
  get maxFlightRadius() {
    return 200;
  }
  // получение значения максимальной высоты полёта
  get maxFlightHeight() {
    return 100;
  }
  // получения значения радиуса полёта
  get flightRadius() {
    return this._flightRadius;
  }
  // установка значения радиуса полёта
  set flightRadius(radius) {
    if (radius === this._flightRadius) {
      return;
    }
    this._flightRadius = radius;
    this._flightRadiusChanged = true;
  }
  // получения значения высоты полёта
  get flightHeight() {
    return this._flightHeight;
  }
  // установка значения высоты полёта
  set flightHeight(height) {
    if (height === this._flightHeight) {
      return;
    }
    this._flightHeight = height;
    this._flightHeightChanged = true;
  }
  // получения значения угла рыскания
  get flightYaw() {
    return this._flightYaw;
  }
  // установка значения угла рыскания
  set flightYaw(rotation) {
    if (rotation === this._flightYaw) {
      return;
    }
    this._flightYaw = rotation;
    this._flightYawChanged = true;
  }
  // получение значения угла тангажа
  get flightPitch() {
    return this._flightPitch;
  }
  // установка значения угла тангажа
  set flightPitch(rotation) {
    if (rotation === this._flightPitch) {
      return;
    }
    this._flightPitch = rotation;
    this._flightPitchChanged = true;
  }
  // получение значения угла крена
  get flightRoll() {
    return this._flightRoll;
  }
  // установка значения угла крена
  set flightRoll(rotation) {
    if (rotation === this._flightRoll) {
      return;
    }
    this._flightRoll = rotation;
    this._flightRollChanged = true;
  }

  // проверка флагов изменений, смена параметров и сброс флагов
  invalidate() {
    // меняет позицию по оси z у объекта самолёта
    if (this._flightRadiusChanged) {
      this.airplaneObject.position.z = this._flightRadius;
      this._flightRadiusChanged = false;
    }
    // меняет позицию по оси y у рига (обёртки объекта)
    if (this._flightHeightChanged) {
      this.position.y = this._flightHeight;
      this._flightHeightChanged = false;
    }
    // меняет угол поворота по оси y у рига (обёртки объекта)
    if (this._flightYawChanged) {
      this.rotation.y = this._flightYaw;
      this._flightYawChanged = false;
    }
    // меняет угол поворота по оси z у промежуточной обёртки самолёта
    if (this._flightPitchChanged) {
      this.airplanePitchOuter.rotation.z = this._flightPitch;
      this._flightPitchChanged = false;
    }

    // меняет угол поворота по оси z у объекта самолёта
    if (this._flightRollChanged) {
      this.airplaneObject.rotation.z = this._flightRoll;
      this._flightRollChanged = false;
    }
  }

  // получает готовый объект аэроплана после создания, добавляет внешнюю группу, помещает их внутрь Rig
  onCreateAirplaneObject(object, options) {
    const {scale, position, rotation} = options;

    if (scale) {
      object.scale.set(...scale);
    }

    if (position) {
      object.position.set(...position);
    }

    if (rotation) {
      object.rotation.set(...rotation);
    }
    this.airplaneObject = object;
    this.airplanePitchOuter = new THREE.Group();
    // добавляем обёртку, отвечающую за тангаж самолёта
    this.airplanePitchOuter.add(this.airplaneObject);
    this.add(this.airplanePitchOuter);
    // задаём изначальное положение самолёта
    this.invalidate();
  }
}

export default AirplaneRig;
