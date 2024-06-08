import SceneGroup from './scene-group.js';
import Pyramid from "../objects/pyramid";
import Lantern from "../objects/lantern";
import Snowman from "../objects/snowman";

class ParametricGroup extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position} = child;
      if (ParametricGroup.Objects[name]) {
        const objectsGroup = new ParametricGroup.Objects[name](this.materialsFactory, child);
        if (position) {
          objectsGroup.position.set(...position);
        }
        this.add(objectsGroup);
      }
    });
  }
}

ParametricGroup.Objects = {
  pyramid: Pyramid,
  lantern: Lantern,
  snowman: Snowman,
};

export default ParametricGroup;
