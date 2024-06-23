import * as THREE from "three";

class Pyramid extends THREE.Group {
  constructor(materialsFactory, config) {
    super();
    this.materialsFactory = materialsFactory;
    this.options = config.options;
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const {base, height, radialSegments, material} = this.options;
    // радиус описанной кружности, вписанной в квадрат равен половине стороны квадрата
    // основание правильной пирамиды - это квадрат
    // радиус окружности, описанной около квадрата, равняется длине его стороны, умноженной на квадратный корень из двух и деленной на два
    const radius = base * Math.sqrt(2) / 2;
    const pyramidMaterial = this.materialsFactory.get(material);
    let mesh = new THREE.Mesh(
        new THREE.ConeGeometry(radius, height, radialSegments),
        pyramidMaterial
    );

    this.add(mesh);
  }
}

export default Pyramid;
