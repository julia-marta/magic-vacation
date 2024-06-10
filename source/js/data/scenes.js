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
import {
  Directional1,
  Directional2,
  Directional3,
  Directional4,
  Directional5,
  Directional6,
  Directional7,
  Point1,
  Point2,
  Ambient1,
} from './lights';

const Scenes = {
  planes: {
    name: `planes`,
    objects: [Planes]
  },
  sphere: {
    name: `sphere`,
    objects: [Sphere],
    lights: [Directional1, Point1, Point2],
  },
  cube: {
    name: `cube`,
    objects: [Cube],
    lights: [Directional1, Point1, Point2],
  },
  parametric: {
    name: `parametric`,
    objects: [ParametricGroup],
    lights: [Directional2, Point1, Point2],
  },
  extrude: {
    name: `extrude`,
    objects: [ExtrudeGroup],
    lights: [Directional2, Point1, Point2],
  },
  lathe: {
    name: `lathe`,
    objects: [LatheGroup],
    lights: [Directional3, Point1, Point2],
  },
  materials: {
    name: `materials`,
    objects: [ExtrudeMaterialsGroup, MaterialsGroup],
    lights: [Directional4, Point1, Point2],
  },
  shader: {
    name: `shader`,
    objects: [ShaderMaterialGroup],
    lights: [Directional5, Point1, Point2],
  },
  keyhole: {
    name: `keyhole`,
    objects: [KeyholeGroup, ExtrudeKeyholeGroup, KeyholeBack, Airplane, Suitcase, Watermelon],
    lights: [Directional6, Point1, Point2],
  },
  room1: {
    name: `room1`,
    objects: [WallCornerUnitRoom1, FloorRoom1, Room1Group, SuitcaseRoom1, StaticGroupRoom1, ExtrudeRoom1Group],
    lights: [Directional7, Point1, Point2, Ambient1],
  },
  room2: {
    name: `room2`,
    objects: [WallCornerUnitRoom2, FloorRoom2, Room2Group, SuitcaseRoom1, StaticGroupRoom2, ExtrudeRoom2Group],
    lights: [Directional7, Point1, Point2, Ambient1],
  },
  room3: {
    name: `room3`,
    objects: [WallCornerUnitRoom3, FloorRoom3, Room3Group, StaticGroupRoom3],
    lights: [Directional7, Point1, Point2, Ambient1],
  },
  room4: {
    name: `room4`,
    objects: [WallCornerUnitRoom4, FloorRoom4, Room4Group, SuitcaseRoom1, StaticGroupRoom4, ExtrudeRoom4Group],
    lights: [Directional7, Point1, Point2, Ambient1],
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
