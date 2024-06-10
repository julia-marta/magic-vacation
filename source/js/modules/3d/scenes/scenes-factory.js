import SceneGroup from "./scene-group";
import Planes from "./planes";
import ParametricGroup from "./parametric-group";
import LatheGroup from "./lathe-group";
import MaterialsGroup from "./materials-group";
import ShaderMaterialGroup from "./shader-material-group";
import Keyhole from "./keyhole";
import Room1 from "./room1";
import Room2 from "./room2";
import Room3 from "./room3";
import Room4 from "./room4";

class ScenesFactory {
  constructor() {
    this.scenes = {};
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
  }

  // создаёт сцену
  create(scene) {
    const {name, objects} = scene;
    if (ScenesFactory.Scenes[name]) {
      this.scenes[name] = new ScenesFactory.Scenes[name](objects);
    } else {
      this.scenes[name] = new ScenesFactory.Scenes[`default`](objects);
    }
  }

  // возвращает сцену по названию
  get(name) {
    return this.scenes[name];
  }
}

ScenesFactory.Scenes = {
  planes: Planes,
  parametric: ParametricGroup,
  lathe: LatheGroup,
  materials: MaterialsGroup,
  shader: ShaderMaterialGroup,
  keyhole: Keyhole,
  room1: Room1,
  room2: Room2,
  room3: Room3,
  room4: Room4,
  default: SceneGroup,
};

export default ScenesFactory;
