import * as THREE from "three";

class Snowman extends THREE.Group {
  constructor(materials, options) {
    super();
    this.materials = materials;
    this.options = options;
    this.topBallPositionZ = null;
    this.constructChildren();
  }

  constructChildren() {
    this.addTopBall();
    this.addBottomBall();
    this.addCarrot();
  }

  addTopBall() {
    const {top} = this.options;

    let topBall = new THREE.Mesh(
        new THREE.SphereGeometry(top.radius, 40, 40),
        this.materials.top
    );

    topBall.position.set(0, top.y, 0);
    this.topBallPositionZ = top.radius;
    this.add(topBall);
  }

  addBottomBall() {
    const {bottom} = this.options;

    let bottomBall = new THREE.Mesh(
        new THREE.SphereGeometry(bottom.radius, 40, 40),
        this.materials.bottom
    );

    bottomBall.position.set(0, bottom.y, 0);
    this.add(bottomBall);
  }

  addCarrot() {
    const {carrot} = this.options;

    let carrotMesh = new THREE.Mesh(
        new THREE.ConeGeometry(carrot.radius, carrot.height, 40),

        this.materials.carrot
    );

    // сначала морковь помещаем по оси z на положение верхнего шара:
    // выдвигаем ее вперед на его радиус и наполовину сдвигаем назад (так как нулевая координата посередине объекта)
    // затем выдвигаем вперед на 32 (на столько торчит морковь по условиям ТЗ)
    carrotMesh.position.set(
        0,
        carrot.y,
        this.topBallPositionZ - carrot.height / 2 + carrot.z
    );
    carrotMesh.rotation.x = Math.PI / 2;
    this.add(carrotMesh);
  }
}

export default Snowman;
