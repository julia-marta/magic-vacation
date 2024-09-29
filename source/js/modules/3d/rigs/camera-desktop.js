import * as THREE from "three";
import AnimationsFactory from "../animations/animations-factory.js";

class CameraRigDesktop extends THREE.Group {
  constructor(state) {
    super();
    this.state = state;
    this.setState = this.setState.bind(this);
    this.animationsFactory = new AnimationsFactory();
    this.maxPitchAngle = 6;
    this._depth = this.state.depth || 0;
    this._depthChanged = true;
    this._yawAngle = this.state.yawAngle || 0;
    this._yawAngleChanged = true;
    this._horizonAngle = this.state.horizonAngle || 0;
    this._horizonAngleChanged = true;
    this._pitchAngle = this.state.pitchAngle || 0;
    this._pitchAngleChanged = true;
    this._pitchDepth = this.state.pitchDepth || 0;
    this._pitchDepthChanged = true;
    this.mouseMoveTick = null;
    this.constructRigElements();
    this.position.z = -3270;
    this.invalidate();
    this.addMouseMoveListener();
  }

  addMouseMoveListener() {
    const mouseMoveHandler = (event) => {
      if (this.mouseMoveTick) {
        window.cancelAnimationFrame(this.mouseMoveTick);
      }
      const windowHeight = window.innerHeight;
      const mouseWindowYPosition = event.y;
      const mouseAxeYPosition = windowHeight / 2 - mouseWindowYPosition;
      const targetMouseAxeYPosition = 2 * mouseAxeYPosition / windowHeight;
      const targetPitchAngle = (this.maxPitchAngle * targetMouseAxeYPosition) * Math.PI / 180;
      let currentPitchAngle = this.pitchAngle;

      const setPitchAngleCloserToTarget = (isIncrease) => {
        if (
          (isIncrease && currentPitchAngle > targetPitchAngle) ||
          (!isIncrease && currentPitchAngle < targetPitchAngle)
        ) {
          window.cancelAnimationFrame(this.mouseMoveTick);
          return;
        }
        if (isIncrease) {
          currentPitchAngle += 0.003;
        } else {
          currentPitchAngle -= 0.003;
        }

        this.pitchAngle = currentPitchAngle;
        this.invalidate();

        this.mouseMoveTick = requestAnimationFrame(() => {
          setPitchAngleCloserToTarget(isIncrease);
        });
      };
      setPitchAngleCloserToTarget(targetPitchAngle > this.pitchAngle);
    };

    window.addEventListener(`mousemove`, mouseMoveHandler);
    this.mouseMoveHandler = mouseMoveHandler;
  }

  removeMouseMoveListener() {
    if (this.mouseMoveTick) {
      window.cancelAnimationFrame(this.mouseMoveTick);
    }
    window.removeEventListener(`mousemove`, this.mouseMoveHandler);
  }

  constructRigElements() {
    const yawTrack = new THREE.Group();
    const depthTrack = new THREE.Group();
    const pitchTrack = new THREE.Group();
    const cameraNull = new THREE.Group();

    this.add(yawTrack);
    yawTrack.add(depthTrack);
    depthTrack.add(pitchTrack);
    pitchTrack.add(cameraNull);

    this.yawTrack = yawTrack;
    this.depthTrack = depthTrack;
    this.pitchTrack = pitchTrack;
    this.cameraNull = cameraNull;
    this.pitchTrack.position.z = this.pitchDepth;
  }

  setState(newState) {
    if (newState.animationCallback) {
      newState.animationCallback();
      delete newState.animationCallback;
    }
    if (newState.effectCallback) {
      newState.effectCallback();
      delete newState.effectCallback;
    }
    this.state = newState;
    this.addMouseMoveListener();
  }

  get depth() {
    return this._depth;
  }

  set depth(value) {
    if (value === this._depth) {
      return;
    }
    this._depth = value;
    this._depthChanged = true;
  }

  get yawAngle() {
    return this._yawAngle;
  }

  set yawAngle(value) {
    if (value === this._yawAngle) {
      return;
    }
    this._yawAngle = value;
    this._yawAngleChanged = true;
  }

  get horizonAngle() {
    return this._horizonAngle;
  }

  set horizonAngle(value) {
    if (value === this._horizonAngle) {
      return;
    }
    this._horizonAngle = value;
    this._horizonAngleChanged = true;
  }

  get pitchAngle() {
    return this._pitchAngle;
  }

  set pitchAngle(value) {
    if (value === this._pitchAngle) {
      return;
    }
    this._pitchAngle = value;
    this._pitchAngleChanged = true;
  }

  get pitchDepth() {
    return this._pitchDepth;
  }

  set pitchDepth(value) {
    if (value === this._pitchDepth) {
      return;
    }
    this._pitchDepth = value;
    this._pitchDepthChanged = true;
  }

  invalidate() {
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this._depthChanged = false;
    }
    if (this._horizonAngleChanged) {
      this.depthTrack.rotation.x = this._horizonAngle;
      this.pitchTrack.position.y = this._pitchDepth * Math.tan(this._horizonAngle);
      this._horizonAngleChanged = false;
    }
    if (this._yawAngleChanged) {
      this.yawTrack.rotation.y = this._yawAngle;
      this._yawAngleChanged = false;
    }
    if (this._pitchAngleChanged) {
      this.cameraNull.position.y = Math.tan(this._pitchAngle) * this._pitchDepth;
      this.cameraNull.rotation.x = -this._pitchAngle;
      this._pitchAngleChanged = false;
    }
    if (this._pitchDepthChanged) {
      this.pitchTrack.position.z = this._pitchDepth;
      this._pitchDepthChanged = false;
    }
  }

  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }

  addObjectToYawTrack(object) {
    this.yawTrack.add(object);
  }

  changeState(newState) {
    this.removeMouseMoveListener();
    const changeDuration = newState.index === 0 || this.state.index === 0 ? 1500 : 700;

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
