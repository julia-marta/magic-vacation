import {
  Planes,
  Sphere,
  Cube,
  ParametricGroup,
  ExtrudeGroup,
  LatheGroup,
  ExtrudeMaterialsGroup,
  MaterialsGroup,
  ShaderMaterialGroup,
  KeyholeGroup,
  ExtrudeKeyholeGroup,
  KeyholeBack,
  Airplane,
  Suitcase,
  Watermelon,
  WallCornerUnitRoom1,
  WallCornerUnitRoom2,
  WallCornerUnitRoom3,
  WallCornerUnitRoom4,
  FloorRoom1,
  FloorRoom2,
  FloorRoom3,
  FloorRoom4,
  Room1Group,
  Room2Group,
  Room3Group,
  Room4Group,
  SuitcaseRoom1,
  StaticGroupRoom1,
  StaticGroupRoom2,
  StaticGroupRoom3,
  StaticGroupRoom4,
  ExtrudeRoom1Group,
  ExtrudeRoom2Group,
  ExtrudeRoom4Group,
} from './objects';

const Scenes = {
  planes: {
    name: `planes`,
    objects: [Planes]
  },
  sphere: {
    name: `sphere`,
    objects: [Sphere],
    lights: true,
  },
  cube: {
    name: `cube`,
    objects: [Cube],
    lights: true,
  },
  parametric: {
    name: `parametric`,
    objects: [ParametricGroup],
    lights: true,
  },
  extrude: {
    name: `extrude`,
    objects: [ExtrudeGroup],
    lights: true,
  },
  lathe: {
    name: `lathe`,
    objects: [LatheGroup],
    lights: true,
  },
  materials: {
    name: `materials`,
    objects: [ExtrudeMaterialsGroup, MaterialsGroup],
    lights: true,
  },
  shader: {
    name: `shader`,
    objects: [ShaderMaterialGroup],
    lights: true,
  },
  keyhole: {
    name: `keyhole`,
    objects: [KeyholeGroup, ExtrudeKeyholeGroup, KeyholeBack, Airplane, Suitcase, Watermelon],
    lights: true,
  },
  room1: {
    name: `room1`,
    objects: [WallCornerUnitRoom1, FloorRoom1, Room1Group, SuitcaseRoom1, StaticGroupRoom1, ExtrudeRoom1Group],
    lights: true,
  },
  room2: {
    name: `room2`,
    objects: [WallCornerUnitRoom2, FloorRoom2, Room2Group, SuitcaseRoom1, StaticGroupRoom2, ExtrudeRoom2Group],
    lights: true,
  },
  room3: {
    name: `room3`,
    objects: [WallCornerUnitRoom3, FloorRoom3, Room3Group, StaticGroupRoom3],
    lights: true,
  },
  room4: {
    name: `room4`,
    objects: [WallCornerUnitRoom4, FloorRoom4, Room4Group, SuitcaseRoom1, StaticGroupRoom4, ExtrudeRoom4Group],
    lights: true,
  },
  get rooms() {
    return [
      this.room1,
      {...this.room2, rotation: [0, Math.PI / 2, 0]},
      {...this.room3, rotation: [0, Math.PI, 0]},
      {...this.room4, rotation: [0, Math.PI + Math.PI / 2, 0]},
    ];
  }
};

export const ScreensScenes = {
  all: Scenes.planes,
  top: Scenes.rooms,
};
