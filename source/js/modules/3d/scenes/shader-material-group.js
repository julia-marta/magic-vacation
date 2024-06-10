import SceneGroup from './scene-group.js';
import Carpet from "../objects/carpet";
import Road from "../objects/road";

class ShaderMaterialGroup extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position, scale, rotation} = child;
      if (ShaderMaterialGroup.Objects[name]) {
        const objectsGroup = new ShaderMaterialGroup.Objects[name](this.materialsFactory, child);
        if (position) {
          objectsGroup.position.set(...position);
        }
        if (scale) {
          objectsGroup.scale.set(...scale);
        }

        if (rotation) {
          objectsGroup.rotation.set(...rotation);
        }
        this.add(objectsGroup);
      }
    });
  }
}

ShaderMaterialGroup.Objects = {
  carpet: Carpet,
  road: Road,
};

export default ShaderMaterialGroup;
