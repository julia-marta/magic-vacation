import SceneGroup from './scene-group.js';
import Carpet from "../objects/carpet";
import Saturn from "../objects/saturn";

class Room4 extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position, scale, rotation} = child;
      if (Room4.Objects[name]) {
        const objectsGroup = new Room4.Objects[name](this.materialsFactory, child);
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

Room4.Objects = {
  carpet: Carpet,
  saturn: Saturn,
};

export default Room4;
