import * as THREE from "three";

class Snowman extends THREE.Group {
  constructor(materialsFactory, config) {
    super();
    this.materialsFactory = materialsFactory;
    this.options = config.options;
    this.materials = config.options.materials;
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
    const materialTop = this.materialsFactory.get(this.materials.top);

    let topBall = new THREE.Mesh(
        new THREE.SphereGeometry(top.radius, 40, 40),
        materialTop,
    );

    topBall.position.set(0, top.y, 0);
    this.topBallPositionZ = top.radius;
    this.add(topBall);
  }

  addBottomBall() {
    const {bottom} = this.options;
    const materialBottom = this.materialsFactory.get(this.materials.bottom);

    let bottomBall = new THREE.Mesh(
        new THREE.SphereGeometry(bottom.radius, 40, 40),
        materialBottom,
    );

    bottomBall.position.set(0, bottom.y, 0);
    this.add(bottomBall);
  }

  addCarrot() {
    const {carrot} = this.options;
    const materialCarrot = this.materialsFactory.get(this.materials.carrot);

    let carrotMesh = new THREE.Mesh(
        new THREE.ConeGeometry(carrot.radius, carrot.height, 40),
        materialCarrot,
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
