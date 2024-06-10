import SceneGroup from './scene-group.js';
import Pyramid from "../objects/pyramid";
import Lantern from "../objects/lantern";
import Snowman from "../objects/snowman";
import Saturn from "../objects/saturn";

class MaterialsGroup extends SceneGroup {
  constructor(sceneObjects) {
    super(sceneObjects);
  }

  addObjectsGroup(group) {
    const {children} = group;
    children.forEach((child) => {
      const {name, position, scale, rotation} = child;
      if (MaterialsGroup.Objects[name]) {
        const objectsGroup = new MaterialsGroup.Objects[name](this.materialsFactory, child);
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

MaterialsGroup.Objects = {
  pyramid: Pyramid,
  lantern: Lantern,
  snowman: Snowman,
  saturn: Saturn,
};

export default MaterialsGroup;
