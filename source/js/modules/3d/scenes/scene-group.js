import * as THREE from "three";
import Pyramid from "../objects/pyramid";
import Lantern from "../objects/lantern";
import Snowman from "../objects/snowman";
import Carpet from "../objects/carpet";
import Road from "../objects/road";
import Saturn from "../objects/saturn";

class SceneGroup extends THREE.Group {
  constructor(options) {
    super();
    this.options = options;
    this.constructChildren();
  }

  constructChildren() {
    const {pyramid, lantern, snowman, carpet, road, saturn} = this.options;

    if (pyramid) {
      this.addPyramid(pyramid);
    }
    if (lantern) {
      this.addLantern(lantern);
    }
    if (lantern) {
      this.addSnowman(snowman);
    }
    if (carpet) {
      this.addCarpet(carpet);
    }
    if (road) {
      this.addRoad(road);
    }
    if (saturn) {
      this.addSaturnLantern(saturn);
    }
  }

  getStandardMaterial(options) {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(options.color),
      metalness: options.metalness,
      emissive: options.emissive,
      roughness: options.roughness,
    });
  }

  getBasicMaterial(options) {
    return new THREE.MeshBasicMaterial({color: options.color});
  }

  addPyramid(options) {
    const material = this.getStandardMaterial(options);
    const pyramid = new Pyramid(material, options);
    pyramid.position.set(options.x, options.y, options.z);
    this.add(pyramid);
  }

  addLantern(options) {
    const {lamp, post, base} = options;
    const materials = {
      lamp: {
        top: this.getStandardMaterial(lamp.top),
        plafon: this.getStandardMaterial(lamp.plafon),
        base: this.getStandardMaterial(lamp.base),
      },
      post: this.getStandardMaterial(post),
      base: {
        top: this.getStandardMaterial(base.top),
        bottom: this.getStandardMaterial(base.bottom),
      }
    };
    const lantern = new Lantern(materials, options);
    lantern.position.set(options.x, options.y, options.z);
    this.add(lantern);
  }

  addSnowman(options) {
    const {top, bottom, carrot} = options;
    const materials = {
      top: this.getStandardMaterial(top),
      bottom: this.getStandardMaterial(bottom),
      carrot: this.getStandardMaterial(carrot),
    };
    const snowman = new Snowman(materials, options);
    snowman.position.set(options.x, options.y, options.z);
    this.add(snowman);
  }

  addCarpet(options) {
    const material = this.getBasicMaterial(options);
    const carpet = new Carpet(material, options);
    carpet.position.set(options.x, options.y, options.z);
    this.add(carpet);
  }

  addRoad(options) {
    const material = this.getBasicMaterial(options);
    const road = new Road(material, options);
    road.position.set(options.x, options.y, options.z);
    this.add(road);
  }

  addSaturnLantern(options) {
    const {planet, rings, ball, cable} = options;
    const materials = {
      planet: this.getStandardMaterial(planet),
      rings: this.getStandardMaterial(rings),
      ball: this.getStandardMaterial(ball),
      cable: this.getStandardMaterial(cable),
    };
    const saturn = new Saturn(materials, options);
    saturn.position.set(options.x, options.y, options.z);
    this.add(saturn);
  }
}

export default SceneGroup;
