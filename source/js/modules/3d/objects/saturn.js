import * as THREE from "three";

class Saturn extends THREE.Group {
  constructor(materialsFactory, options) {
    super();
    this.materialsFactory = materialsFactory;
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
    const {radius, widthSegments, heightSegments, material} = planet;
    const planetGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const planetMaterial = this.materialsFactory.get(material);
    let planetSphere = new THREE.Mesh(
        planetGeometry,
        planetMaterial
    );

    planetSphere.position.set(0, 0, 0);
    this.add(planetSphere);
  }

  addRings() {
    const {rings} = this.options;
    const {height, radiusInner, radiusOut, segments, angle, material} = rings;
    const width = radiusOut - radiusInner;
    const points = [];

    points.push(new THREE.Vector2(radiusInner + width, 0));
    points.push(new THREE.Vector2(radiusInner + width, height));
    points.push(new THREE.Vector2(radiusInner, height));
    points.push(new THREE.Vector2(radiusInner, 0));
    points.push(new THREE.Vector2(radiusInner + width, 0));

    const ringsGeometry = new THREE.LatheGeometry(
        points,
        segments
    );
    const ringsMaterial = this.materialsFactory.get(material);

    let ringsMesh = new THREE.Mesh(
        ringsGeometry,
        ringsMaterial,
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
    const {radius, widthSegments, heightSegments, y, material} = ball;
    const ballGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const ballMaterial = this.materialsFactory.get(material);

    let ballSphere = new THREE.Mesh(
        ballGeometry,
        ballMaterial
    );

    ballSphere.position.set(0, y, 0);
    this.add(ballSphere);
  }

  addCable() {
    const {cable} = this.options;

    if (!cable) {
      return;
    }

    const {radiusTop, radiusBottom, height, radialSegments, y, material} = cable;
    const cableGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const cableMaterial = this.materialsFactory.get(material);

    let cableCylinder = new THREE.Mesh(
        cableGeometry,
        cableMaterial
    );
    cableCylinder.position.set(0, y, 0);
    this.add(cableCylinder);
  }
}

export default Saturn;
