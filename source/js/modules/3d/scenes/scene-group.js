import * as THREE from "three";
import Pyramid from "../objects/pyramid";
import Lantern from "../objects/lantern";
import Snowman from "../objects/snowman";

class SceneGroup extends THREE.Group {
  constructor(options) {
    super();
    this.options = options;
    this.constructChildren();
  }

  constructChildren() {
    const {pyramid, lantern, snowman} = this.options;
    this.addPyramid(pyramid);
    this.addLantern(lantern);
    this.addSnowman(snowman);
  }

  getMaterial(options) {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(options.color),
      metalness: options.metalness,
      emissive: options.emissive,
      roughness: options.roughness,
    });
  }

  addPyramid(options) {
    const material = this.getMaterial(options);
    const pyramid = new Pyramid(material, options);
    pyramid.position.set(options.x, options.y, options.z);
    this.add(pyramid);
  }

  addLantern(options) {
    const {lamp, post, base} = options;
    const materials = {
      lamp: {
        top: this.getMaterial(lamp.top),
        plafon: this.getMaterial(lamp.plafon),
        base: this.getMaterial(lamp.base),
      },
      post: this.getMaterial(post),
      base: {
        top: this.getMaterial(base.top),
        bottom: this.getMaterial(base.bottom),
      }
    };
    const lantern = new Lantern(materials, options);
    lantern.position.set(options.x, options.y, options.z);
    this.add(lantern);
  }

  addSnowman(options) {
    const {top, bottom, carrot} = options;
    const materials = {
      top: this.getMaterial(top),
      bottom: this.getMaterial(bottom),
      carrot: this.getMaterial(carrot),
    };
    const snowman = new Snowman(materials, options);
    snowman.position.set(options.x, options.y, options.z);
    this.add(snowman);
  }
}

export default SceneGroup;
