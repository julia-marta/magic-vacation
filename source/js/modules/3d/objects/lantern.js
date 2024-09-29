import * as THREE from "three";

class Lantern extends THREE.Group {
  constructor(materialsFactory, config) {
    super();
    this.materialsFactory = materialsFactory;
    this.options = config.options;
    this.materials = config.options.materials;
    this.lampBottomPosition = null;
    this.postBottomPosition = null;
    this.constructChildren();
  }

  constructChildren() {
    this.addLamp();
    this.addPost();
    this.addBase();
  }

  addLamp() {
    const {lamp} = this.options;
    const radiusLampTop = (lamp.top.widthTop * Math.sqrt(2)) / 2;
    const radiusLampBottom = (lamp.top.widthBottom * Math.sqrt(2)) / 2;
    const materialLampTop = this.materialsFactory.get(this.materials.lamp.top);

    let top = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radiusLampTop,
            radiusLampBottom,
            lamp.top.height,
            lamp.top.radialSegments
        ),
        materialLampTop
    );

    top.position.set(0, -lamp.top.height / 2, 0);
    top.rotation.y = Math.PI / 4;

    const radiusPlafonTop = (lamp.plafon.widthTop * Math.sqrt(2)) / 2;
    const radiusPlafonBottom = (lamp.plafon.widthBottom * Math.sqrt(2)) / 2;
    const materialLampPlafon = this.materialsFactory.get(this.materials.lamp.plafon);

    let plafon = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radiusPlafonTop,
            radiusPlafonBottom,
            lamp.plafon.height,
            lamp.plafon.radialSegments
        ),
        materialLampPlafon
    );

    plafon.position.set(0, -(lamp.top.height / 2 + lamp.plafon.height / 2), 0);
    plafon.rotation.y = Math.PI / 4;

    const materialLampBase = this.materialsFactory.get(this.materials.lamp.base);

    let base = new THREE.Mesh(
        new THREE.BoxGeometry(
            lamp.base.widthTop,
            lamp.base.height,
            lamp.base.widthTop
        ),
        materialLampBase
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

  addPost() {
    const {post} = this.options;
    const materialPost = this.materialsFactory.get(this.materials.post);

    let postMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(post.radius, post.radius, post.height),
        materialPost
    );

    postMesh.position.set(0, -(this.lampBottomPosition + post.height / 2), 0);
    this.postBottomPosition = this.lampBottomPosition + post.height;
    this.add(postMesh);
  }

  addBase() {
    const {base} = this.options;
    const materialBaseTop = this.materialsFactory.get(this.materials.base.top);
    const materialBaseBottom = this.materialsFactory.get(this.materials.base.bottom);

    let baseTop = new THREE.Mesh(
        new THREE.SphereGeometry(base.top.radius),
        materialBaseTop
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
        materialBaseBottom
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
