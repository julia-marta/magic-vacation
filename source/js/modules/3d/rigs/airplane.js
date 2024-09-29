import * as THREE from "three";
import ObjectsFactory from '../objects/objects-factory.js';

class AirplaneRig extends THREE.Group {
  constructor(options) {
    super();
    this.options = options;
    this.onCreateAirplaneObject = this.onCreateAirplaneObject.bind(this);
    this.objectsFactory = new ObjectsFactory(this.onCreateAirplaneObject);
    this._flightRadius = 50;
    this._flightRadiusChanged = true;
    this._flightHeight = -100;
    this._flightHeightChanged = true;
    this._flightYaw = -Math.PI;
    this._flightYawChanged = true;
    this._flightPitch = 0;
    this._flightPitchChanged = true;
    this._flightRoll = 0;
    this._flightRollChanged = true;

    this.objectsFactory.get(options);
  }

  get maxFlightRadius() {
    return 150;
  }

  get maxFlightHeight() {
    return 100;
  }

  get flightRadius() {
    return this._flightRadius;
  }

  set flightRadius(radius) {
    if (radius === this._flightRadius) {
      return;
    }
    this._flightRadius = radius;
    this._flightRadiusChanged = true;
  }

  get flightHeight() {
    return this._flightHeight;
  }

  set flightHeight(height) {
    if (height === this._flightHeight) {
      return;
    }
    this._flightHeight = height;
    this._flightHeightChanged = true;
  }

  get flightYaw() {
    return this._flightYaw;
  }

  set flightYaw(rotation) {
    if (rotation === this._flightYaw) {
      return;
    }
    this._flightYaw = rotation;
    this._flightYawChanged = true;
  }

  get flightPitch() {
    return this._flightPitch;
  }

  set flightPitch(rotation) {
    if (rotation === this._flightPitch) {
      return;
    }
    this._flightPitch = rotation;
    this._flightPitchChanged = true;
  }

  get flightRoll() {
    return this._flightRoll;
  }

  set flightRoll(rotation) {
    if (rotation === this._flightRoll) {
      return;
    }
    this._flightRoll = rotation;
    this._flightRollChanged = true;
  }

  invalidate() {
    if (this._flightRadiusChanged) {
      this.airplaneObject.position.z = this._flightRadius;
      this._flightRadiusChanged = false;
    }
    if (this._flightHeightChanged) {
      this.position.y = this._flightHeight;
      this._flightHeightChanged = false;
    }
    if (this._flightYawChanged) {
      this.rotation.y = this._flightYaw;
      this._flightYawChanged = false;
    }
    if (this._flightPitchChanged) {
      this.airplanePitchOuter.rotation.z = this._flightPitch;
      this._flightPitchChanged = false;
    }
    if (this._flightRollChanged) {
      this.airplaneObject.rotation.z = this._flightRoll;
      this._flightRollChanged = false;
    }
  }

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
    this.airplanePitchOuter.add(this.airplaneObject);
    this.add(this.airplanePitchOuter);
    this.invalidate();
  }
}

export default AirplaneRig;
