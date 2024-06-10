import SceneGroup from './scene-group.js';
import Saturn from "../objects/saturn";

class Keyhole extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position, scale, rotation} = child;
      if (Keyhole.Objects[name]) {
        const objectsGroup = new Keyhole.Objects[name](this.materialsFactory, child);
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

Keyhole.Objects = {
  saturn: Saturn,
};

export default Keyhole;
