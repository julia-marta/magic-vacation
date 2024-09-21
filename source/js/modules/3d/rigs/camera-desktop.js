import * as THREE from "three";
import AnimationsFactory from "../animations/animations-factory.js";

class CameraRigDesktop extends THREE.Group {
  constructor(state) {
    super();
    this.state = state;
    this.setState = this.setState.bind(this);
    this.animationsFactory = new AnimationsFactory();
    // максимальный угол наклона целевой группы
    this.maxPitchAngle = 6;
    // глубина группы depthTrack и флаг её изменения
    // меняет позицию по оси Z (глубину)
    this._depth = this.state.depth || 0;
    this._depthChanged = true;
    // вертикальный угол вращения группы yawTrack и флаг его изменения
    // меняет угол вращения по оси Y
    this._yawAngle = this.state.yawAngle || 0;
    this._yawAngleChanged = true;
    // горизонтальный угол вращения группы depthTrack и флаг его изменения
    // меняет угол вращения по оси X
    this._horizonAngle = this.state.horizonAngle || 0;
    this._horizonAngleChanged = true;
    // горизонтальный угол вращения нулевой группы с камерой и флаг его изменения
    // меняет угол вращения по оси X
    this._pitchAngle = this.state.pitchAngle || 0;
    this._pitchAngleChanged = true;
    // глубина группы pitchTrack и флаг её изменения
    // меняет позицию по оси Z (глубину)
    this._pitchDepth = this.state.pitchDepth || 0;
    this._pitchDepthChanged = true;
    // запущенная анимация по движению курсора
    this.mouseMoveTick = null;

    // собираем конструкцию Rig для камеры
    this.constructRigElements();
    // устанавливаем позицию для Rig по оси Z
    this.position.z = -3270;
    // задаём изначальное положение камеры
    this.invalidate();
    // добавляем обработчик движения курсора
    this.addMouseMoveListener();
  }
  // добавляет обработчик движения курсора
  addMouseMoveListener() {
    const mouseMoveHandler = (event) => {
      if (this.mouseMoveTick) {
        window.cancelAnimationFrame(this.mouseMoveTick);
      }

      // высота окна
      const windowHeight = window.innerHeight;
      // позиция мыши на экране по вертикали (от нуля до высоты экрана)
      const mouseWindowYPosition = event.y;
      // позиция мыши по оси Y относительно оси X (в пикселях, отрицательные и положительные значения)
      const mouseAxeYPosition = windowHeight / 2 - mouseWindowYPosition;
      // позиция мыши по оси Y от 1 до -1 (для расчёта угла)
      const targetMouseAxeYPosition = 2 * mouseAxeYPosition / windowHeight;
      // целевой угол вращения нулевой группы в радианах
      const targetPitchAngle = (this.maxPitchAngle * targetMouseAxeYPosition) * Math.PI / 180;
      // текущий угол вращения нулевой группы
      let currentPitchAngle = this.pitchAngle;

      // функция, устанавливающая угол вращения нулевой группы ближе к целевому
      const setPitchAngleCloserToTarget = (isIncrease) => {
        if (
          // если угол возрастает и при этом текущий больше целевого
          (isIncrease && currentPitchAngle > targetPitchAngle) ||
          // либо угол убывает и при этом текщий меньше целевого
          (!isIncrease && currentPitchAngle < targetPitchAngle)
        ) {
          // прерываем анимацию движения курсора
          window.cancelAnimationFrame(this.mouseMoveTick);
          return;
        }
        // увеличиваем или уменьшаем текщий угол в зависимости от флага возрастания
        if (isIncrease) {
          currentPitchAngle += 0.003;
        } else {
          currentPitchAngle -= 0.003;
        }

        // устанавливаем обновленное значение угла вращения нулевой группы
        this.pitchAngle = currentPitchAngle;
        // запускаем проверку изменений параметров
        this.invalidate();

        // запускаем и сохраняем анимацию по движению курсора
        this.mouseMoveTick = requestAnimationFrame(() => {
          setPitchAngleCloserToTarget(isIncrease);
        });
      };
      // запуск изменения угла горизонтального вращения ближе к целевому
      setPitchAngleCloserToTarget(targetPitchAngle > this.pitchAngle);
    };

    window.addEventListener(`mousemove`, mouseMoveHandler);
    // cохраняем ссылку на слушателя, чтобы иметь возможность удалить его
    this.mouseMoveHandler = mouseMoveHandler;
  }
  // удаляет обработчик движения курсора
  removeMouseMoveListener() {
    if (this.mouseMoveTick) {
      window.cancelAnimationFrame(this.mouseMoveTick);
    }
    window.removeEventListener(`mousemove`, this.mouseMoveHandler);
  }
  // собирает конструкцию Rig для камеры
  constructRigElements() {
    // группа, которой будем менять угол вращения по оси Y (вокруг вертикальной оси)
    const yawTrack = new THREE.Group();
    // группа, которой будем менять позицию по оси Z (глубину) и угол вращения по оси X (вокруг горизонтальной оси)
    const depthTrack = new THREE.Group();
    // группа, которой будем менять угол вращения по оси Z (вокруг поперечной оси)
    const pitchTrack = new THREE.Group();
    // нулевая группа, внутрь которой помещается камера, без манипуляций
    const cameraNull = new THREE.Group();

    // добавляем внуть корневого узла (сам объект Rig) группу вертикального вращения
    this.add(yawTrack);
    // внутрь группы вертикального вращения добавляем группу перемещения в глубину
    yawTrack.add(depthTrack);
    // внутрь группы перемещения в глубину добавляем группу поперечного вращения
    depthTrack.add(pitchTrack);
    // внутрь группы поперечного вращения добавляем нулевую группу с камерой
    pitchTrack.add(cameraNull);
    // записываем все созданные группы в переменные
    this.yawTrack = yawTrack;
    this.depthTrack = depthTrack;
    this.pitchTrack = pitchTrack;
    this.cameraNull = cameraNull;
    // устанавливаем позицию для группы поперечного вращения по оси Z
    this.pitchTrack.position.z = this.pitchDepth;
  }
  // обновляет текущие параметры состояния камеры и устанавливаем обработчик движения курсора
  setState(newState) {
    if (newState.animationCallback) {
      // вызываем анимацию для следующей сцены
      newState.animationCallback();
      delete newState.animationCallback;
    }
    this.state = newState;
    // добавляем новый обработчик движения курсора
    this.addMouseMoveListener();
  }
  // получение значения глубины группы depthTrack
  get depth() {
    return this._depth;
  }
  // установка значения глубины группы depthTrack
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
  // получение значения горизонтального угла вращения нулевой группы с камерой
  get pitchAngle() {
    return this._pitchAngle;
  }
  // установка значения горизонтального угла вращения нулевой группы с камерой
  set pitchAngle(value) {
    if (value === this._pitchAngle) {
      return;
    }
    this._pitchAngle = value;
    this._pitchAngleChanged = true;
  }
  // получение значения глубины группы pitchTrack
  get pitchDepth() {
    return this._pitchDepth;
  }
  // установка значения глубины группы pitchTrack
  set pitchDepth(value) {
    if (value === this._pitchDepth) {
      return;
    }
    this._pitchDepth = value;
    this._pitchDepthChanged = true;
  }
  // проверка флагов изменений, смена параметров и сброс флагов
  invalidate() {
    // меняет позицию по оси z у группы глубины
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this._depthChanged = false;
    }
    // меняет угол вращения по оси X у группы глубины
    // а также позицию по оси Y у группы поперечного вращения
    if (this._horizonAngleChanged) {
      this.depthTrack.rotation.x = this._horizonAngle;
      this.pitchTrack.position.y = this._pitchDepth * Math.tan(this._horizonAngle);
      this._horizonAngleChanged = false;
    }
    // меняет угол вращения по оси Y у группы вертикального вращения
    if (this._yawAngleChanged) {
      this.yawTrack.rotation.y = this._yawAngle;
      this._yawAngleChanged = false;
    }
    // меняет угол вращения по оси X у нулевой группы с камерой
    // а также позицию по оси Y у нулевой группы
    if (this._pitchAngleChanged) {
      this.cameraNull.position.y = Math.tan(this._pitchAngle) * this._pitchDepth;
      this.cameraNull.rotation.x = -this._pitchAngle;
      this._pitchAngleChanged = false;
    }
    // меняет позицию по оси z у группы поперечного вращения
    if (this._pitchDepthChanged) {
      this.pitchTrack.position.z = this._pitchDepth;
      this._pitchDepthChanged = false;
    }
  }
  // добавляет объект в нулевую группу (камера, направленный свет)
  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }
  // добавляет объект в группу вертикального вращения (чемодан, точечный свет)
  addObjectToYawTrack(object) {
    this.yawTrack.add(object);
  }
  // меняет положение конструкции Rig камеры
  changeState(newState) {
    // удаляем предыдущий обработчик движения курсора
    this.removeMouseMoveListener();
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

export default CameraRigDesktop;
