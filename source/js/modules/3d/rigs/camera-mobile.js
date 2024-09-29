import * as THREE from "three";
import AnimationsFactory from "../animations/animations-factory.js";

class CameraRigMobile extends THREE.Group {
  constructor(state) {
    super();
    this.state = state;
    this.setState = this.setState.bind(this);
    this.animationsFactory = new AnimationsFactory();
    this.maxPitchAngle = 10;
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
    this._verticalAngle = this.state.verticalAngle || 0;
    this._verticalAngleChanged = true;
    this.touchMoveTick = null;
    this.constructRigElements();
    this.position.z = -3270;
    this.invalidate();
    this.addTouchMoveListener();
  }

  addTouchMoveListener() {
    const touchMoveHandler = (event) => {
      if (this.touchMoveTick) {
        window.cancelAnimationFrame(this.touchMoveTick);
      }
      const windowHeight = window.innerHeight;
      const touchWindowYPosition = event.targetTouches[0].clientY;
      const touchAxeYPosition = windowHeight / 2 - touchWindowYPosition;
      const targetTouchAxeYPosition = 2 * touchAxeYPosition / windowHeight;
      const targetPitchAngle = (this.maxPitchAngle * targetTouchAxeYPosition) * Math.PI / 180;
      let currentPitchAngle = this.pitchAngle;

      const setPitchAngleCloserToTarget = (isIncrease) => {
        if (
          (isIncrease && currentPitchAngle > targetPitchAngle) ||
          (!isIncrease && currentPitchAngle < targetPitchAngle)
        ) {
          window.cancelAnimationFrame(this.touchMoveTick);
          return;
        }

        if (isIncrease) {
          currentPitchAngle += 0.003;
        } else {
          currentPitchAngle -= 0.003;
        }

        this.pitchAngle = currentPitchAngle;
        this.invalidate();

        this.touchMoveTick = requestAnimationFrame(() => {
          setPitchAngleCloserToTarget(isIncrease);
        });
      };

      setPitchAngleCloserToTarget(targetPitchAngle > this.pitchAngle);
    };

    window.addEventListener(`touchmove`, touchMoveHandler);
    this.touchMoveHandler = touchMoveHandler;
  }

  removeTouchMoveListener() {
    if (this.touchMoveTick) {
      window.cancelAnimationFrame(this.touchMoveTick);
    }
    window.removeEventListener(`touchmove`, this.touchMoveHandler);
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
    this.cameraNull.rotation.y = 3 * Math.PI / 180;
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
    this.addTouchMoveListener();
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

  get verticalAngle() {
    return this._verticalAngle;
  }

  set verticalAngle(value) {
    if (value === this._verticalAngle) {
      return;
    }
    this._verticalAngle = value;
    this._verticalAngleChanged = true;
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

    if (this._verticalAngleChanged) {
      this.cameraNull.rotation.y = this._verticalAngle;
      this._verticalAngleChanged = false;
    }
  }

  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }

  addObjectToYawTrack(object) {
    this.yawTrack.add(object);
  }

  changeState(newState) {
    this.removeTouchMoveListener();
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

export default CameraRigMobile;
