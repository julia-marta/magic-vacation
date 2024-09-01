import * as THREE from "three";
import AnimationsFactory from "../animations/animations-factory.js";

class CameraRig extends THREE.Group {
  constructor(state) {
    super();
    this.state = state;
    this.setState = this.setState.bind(this);
    this.animationsFactory = new AnimationsFactory();
    // глубина и флаг её изменения
    // меняет позицию по оси Z (глубину)
    this._depth = this.state.depth || 0;
    this._depthChanged = true;
    // вертикальный угол вращения и флаг его изменения
    // меняет угол вращения по оси Y
    this._yawAngle = this.state.yawAngle || 0;
    this._yawAngleChanged = true;
    // горизонтальный угол вращения и флаг его изменения
    // меняет угол вращения по оси X
    this._horizonAngle = this.state.horizonAngle || 0;
    this._horizonAngleChanged = true;

    // собираем конструкцию Rig для камеры
    this.constructRigElements();
    // устанавливаем позицию для Rig по оси Z
    this.position.z = -3270;
    // задаём изначальное положение камеры
    this.invalidate();
  }

  // собирает конструкцию Rig для камеры
  constructRigElements() {
    // группа, которой будем менять позицию по оси Z (глубину) и угол вращения по оси X (вокруг горизонтальной оси)
    const depthTrack = new THREE.Group();
    // группа, которой будем менять угол вращения по оси Y (вокруг вертикальной оси)
    const yawTrack = new THREE.Group();
    // нулевая группа, внутрь которой помещается камера, без манипуляций
    const cameraNull = new THREE.Group();
    // добавляем внуть корневого узла (сам объект Rig) группу вертикального вращения
    this.add(yawTrack);
    // внутрь группы вертикального вращения добавляем группу перемещения в глубину
    yawTrack.add(depthTrack);
    // внутрь группы перемещения в глубину добавляем нулевую группу с камерой
    depthTrack.add(cameraNull);
    // записываем все созданные группы в переменные
    this.depthTrack = depthTrack;
    this.yawTrack = yawTrack;
    this.cameraNull = cameraNull;
  }
  // обновляет текущие параметры состояния камеры
  setState(newState) {
    this.state = newState;
  }
  // получение значения глубины
  get depth() {
    return this._depth;
  }
  // установка значения глубины
  set depth(value) {
    if (value === this._depth) {
      return;
    }
    this._depth = value;
    this._depthChanged = true;
  }
  // получение значения вертикального угла вращения
  get yawAngle() {
    return this._yawAngle;
  }
  // установка значения вертикального угла вращения
  set yawAngle(value) {
    if (value === this._yawAngle) {
      return;
    }
    this._yawAngle = value;
    this._yawAngleChanged = true;
  }
  // получение значения горизонтального угла вращения
  get horizonAngle() {
    return this._horizonAngle;
  }
  // установка значения горизонтального угла вращения
  set horizonAngle(value) {
    if (value === this._horizonAngle) {
      return;
    }
    this._horizonAngle = value;
    this._horizonAngleChanged = true;
  }
  // проверка флагов изменений, смена параметров и сброс флагов
  invalidate() {
    // меняет позицию по оси z у группы глубины
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this._depthChanged = false;
    }
    // меняет угол вращения по оси X у группы глубины
    if (this._horizonAngleChanged) {
      this.depthTrack.rotation.x = this._horizonAngle;
      this._horizonAngleChanged = false;
    }
    // меняет угол вращения по оси Y у группы вертикального вращения
    if (this._yawAngleChanged) {
      this.yawTrack.rotation.y = this._yawAngle;
      this._yawAngleChanged = false;
    }
  }
  // добавляет объект в нулевую группу (камера, свет)
  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }
  // меняет положение конструкции Rig камеры
  changeState(newState) {
    // продолжительность анимации (в 2 раза дольше, если идёт переход от замочной скважины или обратно к ней)
    const changeDuration = newState.index === 0 || this.state.index === 0 ? 1500 : 700;

    // параметры анимации смены состояния камеры
    const changeStateAnimation = {
      type: `custom`,
      func: `Camera`,
      fps: 60,
      duration: changeDuration,
      easing: `easeInOutSine`,
      callback: () => this.setState(newState),
      ...newState,
    };
    this.animationsFactory.run(this, [changeStateAnimation]);
  }
}

export default CameraRig;
