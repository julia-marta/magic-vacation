import SceneGroup from './scene-group.js';
import Carpet from "../objects/carpet";
import Road from "../objects/road";
import Saturn from "../objects/saturn";

class LatheGroup extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position, scale, rotation} = child;
      if (LatheGroup.Objects[name]) {
        const objectsGroup = new LatheGroup.Objects[name](this.materialsFactory, child);
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

LatheGroup.Objects = {
  carpet: Carpet,
  road: Road,
  saturn: Saturn,
};

export default LatheGroup;
