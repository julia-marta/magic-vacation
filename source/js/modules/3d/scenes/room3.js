import SceneGroup from './scene-group.js';
import Road from "../objects/road.js";
import Fence from '../objects/fence.js';
import Snowman from "../objects/snowman";

class Room3 extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position, scale, rotation} = child;
      if (Room3.Objects[name]) {
        const objectsGroup = new Room3.Objects[name](this.materialsFactory, child);
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

Room3.Objects = {
  road: Road,
  fence: Fence,
  snowman: Snowman,
};

export default Room3;
