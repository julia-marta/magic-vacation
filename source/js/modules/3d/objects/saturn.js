import * as THREE from "three";

class Saturn extends THREE.Group {
  constructor(materials, options) {
    super();
    this.materials = materials;
    this.options = options;
    this.constructChildren();
  }

  constructChildren() {
    this.addPlanet();
    this.addRings();
    this.addBall();
    this.addCable();
  }

  addPlanet() {
    const {planet} = this.options;
    const {radius, widthSegments, heightSegments} = planet;
    let planetSphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, widthSegments, heightSegments),
        this.materials.planet
    );

    planetSphere.position.set(0, 0, 0);
    this.add(planetSphere);
  }

  addRings() {
    const {rings} = this.options;
    const {height, radiusInner, radiusOut, segments, angle} = rings;
    const width = radiusOut - radiusInner;
    const points = [];

    points.push(new THREE.Vector2(radiusInner + width, 0));
    points.push(new THREE.Vector2(radiusInner + width, height));
    points.push(new THREE.Vector2(radiusInner, height));
    points.push(new THREE.Vector2(radiusInner, 0));
    points.push(new THREE.Vector2(radiusInner + width, 0));

    const geometry = new THREE.LatheGeometry(
        points,
        segments
    );

    let ringsMesh = new THREE.Mesh(
        geometry,
        this.materials.rings
    );
    const rotateAngle = angle * Math.PI / 180;

    ringsMesh.rotateZ(rotateAngle);
    ringsMesh.position.set(0, 0, 0);
    this.add(ringsMesh);
  }

  addBall() {
    const {ball} = this.options;

    if (!ball) {
      return;
    }
    const {radius, widthSegments, heightSegments, y} = ball;
    let ballSphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, widthSegments, heightSegments),
        this.materials.ball
    );

    ballSphere.position.set(0, y, 0);
    this.add(ballSphere);
  }

  addCable() {
    const {cable} = this.options;

    if (!cable) {
      return;
    }

    const {radiusTop, radiusBottom, height, radialSegments, y} = cable;

    let cableCylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments),
        this.materials.cable
    );
    cableCylinder.position.set(0, y, 0);
    this.add(cableCylinder);
  }
}

export default Saturn;
