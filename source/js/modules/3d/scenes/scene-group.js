import * as THREE from "three";
import Pyramid from "../objects/pyramid";
import Lantern from "../objects/lantern";
import Snowman from "../objects/snowman";
import Carpet from "../objects/carpet";
import Road from "../objects/road";
import Saturn from "../objects/saturn";

class SceneGroup extends THREE.Group {
  constructor(options, materialsFactory) {
    super();
    this.options = options;
    this.materialsFactory = materialsFactory;
    this.constructChildren();
  }

  constructChildren() {
    const {pyramid, lantern, snowman, carpetRoom1, carpetRoom2, road, saturnRoom1, saturnRoom4} = this.options;

    if (pyramid) {
      this.addPyramid(pyramid);
    }
    if (lantern) {
      this.addLantern(lantern);
    }
    if (lantern) {
      this.addSnowman(snowman);
    }
    if (carpetRoom1) {
      this.addCarpet(carpetRoom1);
    }
    if (carpetRoom2) {
      this.addCarpet(carpetRoom2);
    }
    if (road) {
      this.addRoad(road);
    }
    if (saturnRoom1) {
      this.addSaturnLantern(saturnRoom1);
    }
    if (saturnRoom4) {
      this.addSaturnLantern(saturnRoom4);
    }
  }

  addPyramid(object) {
    const material = this.materialsFactory.get(object.material);
    const pyramid = new Pyramid(material, object);
    pyramid.position.set(...object.position);
    this.add(pyramid);
  }

  addLantern(object) {
    const {lamp, post, base} = object;
    const materials = {
      lamp: {
        top: this.materialsFactory.get(lamp.top.material),
        plafon: this.materialsFactory.get(lamp.plafon.material),
        base: this.materialsFactory.get(lamp.base.material),
      },
      post: this.materialsFactory.get(post.material),
      base: {
        top: this.materialsFactory.get(base.top.material),
        bottom: this.materialsFactory.get(base.bottom.material),
      }
    };
    const lantern = new Lantern(materials, object);
    lantern.position.set(...object.position);
    this.add(lantern);
  }

  addSnowman(object) {
    const {top, bottom, carrot} = object;
    const materials = {
      top: this.materialsFactory.get(top.material),
      bottom: this.materialsFactory.get(bottom.material),
      carrot: this.materialsFactory.get(carrot.material),
    };
    const snowman = new Snowman(materials, object);
    snowman.position.set(...object.position);
    this.add(snowman);
  }

  addCarpet(object) {
    const material = this.materialsFactory.get(object.material);
    const carpet = new Carpet(material, object);
    carpet.position.set(...object.position);
    this.add(carpet);
  }

  addRoad(object) {
    const material = this.materialsFactory.get(object.material);
    const road = new Road(material, object);
    road.position.set(...object.position);
    this.add(road);
  }

  addSaturnLantern(object) {
    const {planet, rings, ball, cable} = object;
    const materials = {
      planet: this.materialsFactory.get(planet.material),
      rings: this.materialsFactory.get(rings.material),
      ball: ball ? this.materialsFactory.get(ball.material) : null,
      cable: cable ? this.materialsFactory.get(cable.material) : null,
    };
    const saturn = new Saturn(materials, object);
    saturn.position.set(...object.position);

    if (object.scale) {
      saturn.scale.set(...object.scale);
    }

    if (object.rotation) {
      saturn.rotation.set(...object.rotation);
    }

    this.add(saturn);
  }
}

export default SceneGroup;
