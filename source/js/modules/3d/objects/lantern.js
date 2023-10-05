import * as THREE from "three";

class Lantern extends THREE.Group {
  constructor(materials, options) {
    super();
    this.materials = materials;
    this.options = options;
    this.lampBottomPosition = null;
    this.postBottomPosition = null;
    this.constructChildren();
  }

  constructChildren() {
    this.addLamp();
    this.addPost();
    this.addBase();
  }

  // добавление фонаря (лампы)
  addLamp() {
    const {lamp} = this.options;

    // верхняя часть лампы представляет собой усеченную пирамиду
    // для создания такой фигуры берем геометрию цилиндра и задаем ему 4 стороны и основания с разными радиусами
    // нижнее и верхнее основание пирамиды - это квадраты
    // радиус окружности, описанной около квадрата, равняется длине его стороны, умноженной на квадратный корень из двух и деленной на два
    const radiusLampTop = (lamp.top.widthTop * Math.sqrt(2)) / 2;
    const radiusLampBottom = (lamp.top.widthBottom * Math.sqrt(2)) / 2;

    let top = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radiusLampTop,
            radiusLampBottom,
            lamp.top.height,
            lamp.top.radialSegments
        ),
        this.materials.lamp.top
    );

    top.position.set(0, -lamp.top.height / 2, 0);
    top.rotation.y = Math.PI / 4;

    // плафон лампы представляет собой усеченную пирамиду
    // аналогично берем геометрию цилиндра и задаем ему 4 стороны, рассчитываем радиусы оснований
    const radiusPlafonTop = (lamp.plafon.widthTop * Math.sqrt(2)) / 2;
    const radiusPlafonBottom = (lamp.plafon.widthBottom * Math.sqrt(2)) / 2;

    let plafon = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radiusPlafonTop,
            radiusPlafonBottom,
            lamp.plafon.height,
            lamp.plafon.radialSegments
        ),
        this.materials.lamp.plafon
    );

    plafon.position.set(0, -(lamp.top.height / 2 + lamp.plafon.height / 2), 0);
    plafon.rotation.y = Math.PI / 4;

    // основание лампы представляет собой параллелепипед
    let base = new THREE.Mesh(
        new THREE.BoxGeometry(
            lamp.base.widthTop,
            lamp.base.height,
            lamp.base.widthTop
        ),
        this.materials.lamp.base
    );

    base.position.set(
        0,
        -(lamp.top.height / 2 + lamp.plafon.height + lamp.base.height / 2),
        0
    );
    this.lampBottomPosition =
      lamp.top.height / 2 + lamp.plafon.height + lamp.base.height;

    this.add(top);
    this.add(plafon);
    this.add(base);
  }

  // добавление столба
  addPost() {
    const {post} = this.options;
    let postMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(post.radius, post.radius, post.height),
        this.materials.post
    );

    postMesh.position.set(0, -(this.lampBottomPosition + post.height / 2), 0);
    this.postBottomPosition = this.lampBottomPosition + post.height;
    this.add(postMesh);
  }

  // добавление основания фонаря
  addBase() {
    const {base} = this.options;
    let baseTop = new THREE.Mesh(
        new THREE.SphereGeometry(base.top.radius),
        this.materials.base.top
    );

    baseTop.position.set(
        0,
        -(this.postBottomPosition + base.top.height / 2),
        0
    );

    let baseBottom = new THREE.Mesh(
        new THREE.CylinderGeometry(
            base.bottom.radius,
            base.bottom.radius,
            base.bottom.height
        ),
        this.materials.base.bottom
    );

    baseBottom.position.set(
        0,
        -(this.postBottomPosition + base.top.height / 2 + base.bottom.height / 2),
        0
    );

    this.add(baseTop);
    this.add(baseBottom);
  }
}

export default Lantern;
