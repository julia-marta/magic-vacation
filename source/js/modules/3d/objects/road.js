import * as THREE from "three";

class Road extends THREE.Group {
  constructor(defaultMaterial, options) {
    super();
    this.defaultMaterial = defaultMaterial;
    this.options = options;
    this.constructChildren();
  }

  constructChildren() {
    this.addRoad();
  }

  addRoad() {
    const {width, height, radius, segments, startAngle, endAngle} = this.options;
    const points = [];

    points.push(new THREE.Vector2(radius + width, 0));
    points.push(new THREE.Vector2(radius + width, height));
    points.push(new THREE.Vector2(radius, height));
    points.push(new THREE.Vector2(radius, 0));
    points.push(new THREE.Vector2(radius + width, 0));

    // переводим угол в радианы
    const phiStart = THREE.MathUtils.degToRad(startAngle);
    const phiLength = THREE.MathUtils.degToRad(endAngle - startAngle);
    const geometry = new THREE.LatheGeometry(
        points,
        segments,
        phiStart,
        phiLength
    );

    let mesh = new THREE.Mesh(
        geometry,
        this.defaultMaterial
    );

    this.add(mesh);
  }
}

export default Road;
