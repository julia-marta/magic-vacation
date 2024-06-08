import SceneGroup from './scene-group.js';
import Pyramid from "../objects/pyramid";
import Lantern from "../objects/lantern";

class Room2 extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position, scale, rotation} = child;
      if (Room2.Objects[name]) {
        const objectsGroup = new Room2.Objects[name](this.materialsFactory, child);
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

Room2.Objects = {
  pyramid: Pyramid,
  lantern: Lantern,
};

export default Room2;
