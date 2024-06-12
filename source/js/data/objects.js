// planes
export const Planes = {
  type: `planes`,
  planes: [
    {
      name: `top`,
      url: `img/scenes-textures/scene-0.png`,
      effects: {},
    },
    {
      name: `story1`,
      url: `img/scenes-textures/scene-1.png`,
      effects: {},
    },
    {
      name: `story2`,
      url: `img/scenes-textures/scene-2.png`,
      effects: {
        hue: {
          shift: -0.025,
          duration: 2000,
        },
        blobs: {
          params: [
            {
              radius: 90,
              position: {
                x: 0.22,
                y: 0.7,
              },
              glowOffset: 20,
              glowClippingPosition: 20,
            },
            {
              radius: 125,
              position: {
                x: 0.37,
                y: 1.85,
              },
              glowOffset: 20,
              glowClippingPosition: 30,
            },
            {
              radius: 50,
              position: {
                x: 0.48,
                y: 0.1,
              },
              glowOffset: 15,
              glowClippingPosition: 1,
            },
          ],
          duration: 2500,
          frequency: 13,
        },
      },
    },
    {
      name: `story3`,
      url: `img/scenes-textures/scene-3.png`,
      effects: {},
    },
    {
      name: `story4`,
      url: `img/scenes-textures/scene-4.png`,
      effects: {},
    },
  ],
};

// plane
export const KeyholeBack = {
  type: `plane`,
  width: 2000,
  height: 1995,
  position: [0, 0, 0],
  material: {
    type: `StandardBasic`,
    color: `Purple`,
    doubleSide: true,
  }
};

// sphere
export const Sphere = {
  type: `sphere`,
  radius: 100,
  widthSegments: 32,
  heightSegments: 32,
  position: [0, 0, 0],
  material: {
    type: `StandardBasic`,
    color: `Blue`,
  }
};

// cube
export const Cube = {
  type: `cube`,
  width: 100,
  height: 100,
  depth: 100,
  position: [0, 0, 0],
  rotation: [4, 4, 7],
  material: {
    type: `StandardBasic`,
    color: `Green`,
  }
};

// circle
export const FloorRoom1 = {
  type: `circle`,
  radius: 1350,
  segments: 32,
  thetaStart: 0,
  thetaLength: Math.PI / 2,
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
  material: {
    type: `StandardSoft`,
    color: `DarkPurple`,
    doubleSide: true,
  }
};

export const FloorRoom2 = {
  type: `circle`,
  radius: 1350,
  segments: 32,
  thetaStart: 0,
  thetaLength: Math.PI / 2,
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
  material: {
    type: `StandardSoft`,
    color: `BrightBlue`,
    doubleSide: true,
  }
};

export const FloorRoom3 = {
  type: `circle`,
  radius: 1350,
  segments: 32,
  thetaStart: 0,
  thetaLength: Math.PI / 2,
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
  material: {
    type: `StandardSoft`,
    color: `MountainBlue`,
    doubleSide: true,
  }
};

export const FloorRoom4 = {
  type: `circle`,
  radius: 1350,
  segments: 32,
  thetaStart: 0,
  thetaLength: Math.PI / 2,
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
  material: {
    type: `StandardSoft`,
    color: `ShadowedDarkPurple`,
    doubleSide: true,
  }
};

// groupChild
export const Pyramid = {
  type: `groupChild`,
  name: `pyramid`,
  position: [0, 140, 0],
  base: 250,
  height: 280,
  radialSegments: 4,
  material: {
    type: `StandardSoft`,
    color: `Blue`,
  }
};

export const PyramidMaterial = {
  type: `groupChild`,
  name: `pyramid`,
  position: [0, 0, 0],
  base: 250,
  height: 280,
  radialSegments: 4,
  material: {
    type: `StandardSoft`,
    color: `Blue`,
  }
};

export const PyramidRoom2 = {
  type: `groupChild`,
  name: `pyramid`,
  position: [-25, 140, 325],
  base: 250,
  height: 280,
  radialSegments: 4,
  material: {
    type: `StandardSoft`,
    color: `Blue`,
  }
};

export const Lantern = {
  type: `groupChild`,
  name: `lantern`,
  position: [400, 435, 0],
  lamp: {
    top: {
      widthTop: 45,
      widthBottom: 57,
      height: 6,
      radialSegments: 4,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
    plafon: {
      widthTop: 42,
      widthBottom: 34,
      height: 70,
      radialSegments: 4,
      material: {
        type: `StandardSoft`,
        color: `LightBlue`,
      }
    },
    base: {
      widthTop: 37,
      widthBottom: 37,
      height: 4,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    }
  },
  post: {
    radius: 7,
    height: 230,
    material: {
      type: `StandardSoft`,
      color: `Blue`,
    }
  },
  base: {
    top: {
      radius: 16,
      height: 16,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
    bottom: {
      radius: 16,
      height: 120,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
  }
};

export const LanternMaterial = {
  type: `groupChild`,
  name: `lantern`,
  position: [450, 435, 0],
  lamp: {
    top: {
      widthTop: 45,
      widthBottom: 57,
      height: 6,
      radialSegments: 4,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
    plafon: {
      widthTop: 42,
      widthBottom: 34,
      height: 70,
      radialSegments: 4,
      material: {
        type: `StandardSoft`,
        color: `LightBlue`,
      }
    },
    base: {
      widthTop: 37,
      widthBottom: 37,
      height: 4,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    }
  },
  post: {
    radius: 7,
    height: 230,
    material: {
      type: `StandardSoft`,
      color: `Blue`,
    }
  },
  base: {
    top: {
      radius: 16,
      height: 16,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
    bottom: {
      radius: 16,
      height: 120,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
  }
};

export const LanternRoom2 = {
  type: `groupChild`,
  name: `lantern`,
  rotation: [0, Math.PI / 8, 0],
  position: [390, 435, 540],
  lamp: {
    top: {
      widthTop: 45,
      widthBottom: 57,
      height: 6,
      radialSegments: 4,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
    plafon: {
      widthTop: 42,
      widthBottom: 34,
      height: 70,
      radialSegments: 4,
      material: {
        type: `StandardSoft`,
        color: `LightBlue`,
      }
    },
    base: {
      widthTop: 37,
      widthBottom: 37,
      height: 4,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    }
  },
  post: {
    radius: 7,
    height: 230,
    material: {
      type: `StandardSoft`,
      color: `Blue`,
    }
  },
  base: {
    top: {
      radius: 16,
      height: 16,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
    bottom: {
      radius: 16,
      height: 120,
      material: {
        type: `StandardSoft`,
        color: `Blue`,
      }
    },
  }
};

export const Snowman = {
  type: `groupChild`,
  name: `snowman`,
  position: [-400, 0, 0],
  top: {
    radius: 44,
    height: 44,
    y: 173,
    material: {
      type: `PhongStrong`,
      color: `SnowColor`,
    }
  },
  bottom: {
    radius: 75,
    height: 75,
    y: 65,
    material: {
      type: `PhongStrong`,
      color: `SnowColor`,
    }
  },
  carrot: {
    radius: 18,
    height: 75,
    y: 173,
    z: 32,
    material: {
      type: `StandardSoft`,
      color: `Orange`,
    }
  }
};

export const SnowmanMaterial = {
  type: `groupChild`,
  name: `snowman`,
  position: [-450, -300, 0],
  top: {
    radius: 44,
    height: 44,
    y: 173,
    material: {
      type: `PhongStrong`,
      color: `SnowColor`,
    }
  },
  bottom: {
    radius: 75,
    height: 75,
    y: 65,
    material: {
      type: `PhongStrong`,
      color: `SnowColor`,
    }
  },
  carrot: {
    radius: 18,
    height: 75,
    y: 173,
    z: 32,
    material: {
      type: `StandardSoft`,
      color: `Orange`,
    }
  }
};

export const SnowmanRoom3 = {
  type: `groupChild`,
  name: `snowman`,
  rotation: [0, Math.PI / 4, 0],
  position: [-150, 60, 400],
  top: {
    radius: 44,
    height: 44,
    y: 173,
    material: {
      type: `PhongStrong`,
      color: `SnowColor`,
    }
  },
  bottom: {
    radius: 75,
    height: 75,
    y: 65,
    material: {
      type: `PhongStrong`,
      color: `SnowColor`,
    }
  },
  carrot: {
    radius: 18,
    height: 75,
    y: 173,
    z: 32,
    material: {
      type: `StandardSoft`,
      color: `Orange`,
    }
  }
};

export const Carpet = {
  type: `groupChild`,
  name: `carpet`,
  position: [0, 0, 0],
  width: 180,
  height: 3,
  radius: 763,
  startAngle: 16,
  endAngle: 74,
  segments: 30,
  material: {
    type: `StandardSoft`,
    color: `LightPurple`,
  }
};

export const CarpetRoom1 = {
  type: `groupChild`,
  name: `carpet`,
  rotation: [0, -Math.PI / 4, 0],
  position: [0, 0, 0],
  width: 180,
  height: 3,
  radius: 763,
  startAngle: 16,
  endAngle: 74,
  segments: 30,
  material: {
    type: `CustomSoftCarpet`,
    color: {
      mainColor: `LightPurple`,
      stripesColor: `AdditionalPurple`,
    },
  }
};

export const CarpetRoom4 = {
  type: `groupChild`,
  name: `carpet`,
  rotation: [0, -Math.PI / 4, 0],
  position: [0, 0, 0],
  width: 180,
  height: 3,
  radius: 763,
  startAngle: 16,
  endAngle: 74,
  segments: 30,
  material: {
    type: `CustomSoftCarpet`,
    color: {
      mainColor: `ShadowedLightPurple`,
      stripesColor: `ShadowedAdditionalPurple`,
    },
  }
};

export const Road = {
  type: `groupChild`,
  name: `road`,
  position: [0, 200, 0],
  width: 160,
  height: 3,
  radius: 732,
  startAngle: 0,
  endAngle: 90,
  segments: 30,
  material: {
    type: `StandardSoft`,
    color: `Grey`,
  }
};

export const RoadRoom3 = {
  type: `groupChild`,
  name: `road`,
  rotation: [0, -Math.PI / 4, 0],
  position: [0, 0, 0],
  width: 160,
  height: 3,
  radius: 732,
  startAngle: 0,
  endAngle: 90,
  segments: 30,
  material: {
    type: `CustomSoftRoad`,
    color: {
      mainColor: `Grey`,
      stripesColor: `White`,
    },
  }
};

export const Saturn = {
  type: `groupChild`,
  name: `saturn`,
  position: [0, 300, 0],
  planet: {
    radius: 60,
    height: 60,
    widthSegments: 32,
    heightSegments: 32,
    material: {
      type: `StandardSoft`,
      color: `DominantRed`,
    }
  },
  rings: {
    height: 2,
    radiusInner: 80,
    radiusOut: 120,
    angle: 18,
    segments: 30,
    material: {
      type: `StandardSoft`,
      color: `BrightPurple`,
    }
  },
  ball: {
    radius: 10,
    height: 10,
    widthSegments: 16,
    heightSegments: 16,
    y: 120,
    material: {
      type: `StandardSoft`,
      color: `BrightPurple`,
    }
  },
  cable: {
    radiusTop: 1,
    radiusBottom: 1,
    height: 1000,
    radialSegments: 30,
    y: 500,
    material: {
      type: `StandardSoft`,
      color: `MetalGrey`,
    }
  },
};

export const SaturnRoom1 = {
  type: `groupChild`,
  name: `saturn`,
  position: [100, 600, 900],
  planet: {
    radius: 60,
    height: 60,
    widthSegments: 32,
    heightSegments: 32,
    material: {
      type: `StandardSoft`,
      color: `DominantRed`,
    }
  },
  rings: {
    height: 2,
    radiusInner: 80,
    radiusOut: 120,
    angle: 18,
    segments: 30,
    material: {
      type: `StandardSoft`,
      color: `BrightPurple`,
    }
  },
  ball: {
    radius: 10,
    height: 10,
    widthSegments: 16,
    heightSegments: 16,
    y: 120,
    material: {
      type: `StandardSoft`,
      color: `BrightPurple`,
    }
  },
  cable: {
    radiusTop: 1,
    radiusBottom: 1,
    height: 1000,
    radialSegments: 30,
    y: 500,
    material: {
      type: `StandardSoft`,
      color: `MetalGrey`,
    }
  },
};

export const SaturnRoom4 = {
  type: `groupChild`,
  name: `saturn`,
  position: [100, 600, 900],
  planet: {
    radius: 60,
    height: 60,
    widthSegments: 32,
    heightSegments: 32,
    material: {
      type: `StandardSoft`,
      color: `ShadowedDominantRed`,
    }
  },
  rings: {
    height: 2,
    radiusInner: 80,
    radiusOut: 120,
    angle: 18,
    segments: 30,
    material: {
      type: `StandardSoft`,
      color: `ShadowedBrightPurple`,
    }
  },
  ball: {
    radius: 10,
    height: 10,
    widthSegments: 16,
    heightSegments: 16,
    y: 120,
    material: {
      type: `StandardSoft`,
      color: `ShadowedBrightPurple`,
    }
  },
  cable: {
    radiusTop: 1,
    radiusBottom: 1,
    height: 1000,
    radialSegments: 30,
    y: 500,
    material: {
      type: `StandardSoft`,
      color: `MetalGrey`,
    }
  },
};

export const SaturnKeyhole = {
  type: `groupChild`,
  name: `saturn`,
  scale: [0.5, 0.5, 0.5],
  position: [300, -100, 185],
  rotation: [0.3, -0.3, 0.2],
  planet: {
    radius: 60,
    height: 60,
    widthSegments: 32,
    heightSegments: 32,
    material: {
      type: `StandardSoft`,
      color: `DominantRed`,
    }
  },
  rings: {
    height: 2,
    radiusInner: 80,
    radiusOut: 120,
    angle: 18,
    segments: 30,
    material: {
      type: `StandardSoft`,
      color: `BrightPurple`,
    }
  },
};

export const Fence = {
  type: `groupChild`,
  name: `fence`,
  position: [0, 0, 0],
  radius: 700,
  startAngle: -30,
  columnsBeetweenAngle: 15,
  columnsCount: 5,
  column: {
    radiusTop: 12,
    radiusBottom: 12,
    height: 80,
    radialSegments: 32,
    material: {
      type: `StandardSoft`,
      color: `Grey`,
    }
  },
};

// SVG shape
export const Flamingo = {
  type: `SVGshape`,
  name: `flamingo`,
  url: `img/svg-forms/flamingo.svg`,
  options: {
    extrude: {},
    scale: [3, 3, 3],
    rotation: [Math.PI, Math.PI, 0.3],
    position: [-450, 350, 0],
    material: {
      type: `StandardSoft`,
      color: `LightDominantRed`,
      doubleSide: true,
    }
  },
};

export const FlamingoMaterial = {
  type: `SVGshape`,
  name: `flamingo`,
  url: `img/svg-forms/flamingo.svg`,
  options: {
    extrude: {},
    scale: [3, 3, 3],
    rotation: [Math.PI, Math.PI, 0.3],
    position: [-450, 350, -300],
    material: {
      type: `StandardSoft`,
      color: `LightDominantRed`,
      doubleSide: true,
    }
  },
};

export const FlamingoKeyhole = {
  type: `SVGshape`,
  name: `flamingo`,
  url: `img/svg-forms/flamingo.svg`,
  options: {
    extrude: {},
    scale: [1.35, 1.35, 1.35],
    rotation: [6.1, 0.2, 3.5],
    position: [-345, 250, 50],
    material: {
      type: `StandardSoft`,
      color: `LightDominantRed`,
      doubleSide: true,
    }
  },
};

export const Snowflake = {
  type: `SVGshape`,
  name: `snowflake`,
  url: `img/svg-forms/snowflake.svg`,
  options: {
    extrude: {},
    scale: [2, 2, 2],
    rotation: [-0.4, 0.6, 0],
    position: [-350, -50, 0],
    material: {
      type: `StandardBasic`,
      color: `Blue`,
      doubleSide: true,
    }
  },
};

export const SnowflakeMaterial = {
  type: `SVGshape`,
  name: `snowflake`,
  url: `img/svg-forms/snowflake.svg`,
  options: {
    extrude: {},
    scale: [2, 2, 2],
    rotation: [-0.4, 0.6, 0],
    position: [-350, -50, -250],
    material: {
      type: `StandardBasic`,
      color: `Blue`,
      doubleSide: true,
    }
  },
};

export const SnowflakeKeyhole = {
  type: `SVGshape`,
  name: `snowflake`,
  url: `img/svg-forms/snowflake.svg`,
  options: {
    extrude: {},
    scale: [1, 1, 1],
    rotation: [6.1, 0.8, 0.25],
    position: [-310, -20, 70],
    material: {
      type: `StandardBasic`,
      color: `Blue`,
      doubleSide: true,
    }
  },
};

export const Question = {
  type: `SVGshape`,
  name: `question`,
  url: `img/svg-forms/question.svg`,
  options: {
    extrude: {},
    scale: [1.5, 1.5, 1.5],
    rotation: [-0.7, Math.PI, 2.8],
    position: [100, -300, 0],
    material: {
      type: `StandardBasic`,
      color: `Blue`,
      doubleSide: true,
    }
  },
};

export const QuestionMaterial = {
  type: `SVGshape`,
  name: `question`,
  url: `img/svg-forms/question.svg`,
  options: {
    extrude: {},
    scale: [1.5, 1.5, 1.5],
    rotation: [-0.7, Math.PI, 2.8],
    position: [100, -300, -300],
    material: {
      type: `StandardBasic`,
      color: `Blue`,
      doubleSide: true,
    }
  },
};

export const QuestionKeyhole = {
  type: `SVGshape`,
  name: `question`,
  url: `img/svg-forms/question.svg`,
  options: {
    extrude: {},
    scale: [1, 1, 1],
    rotation: [5.4, 3.1, 2.8],
    position: [70, -230, 125],
    material: {
      type: `StandardBasic`,
      color: `Blue`,
      doubleSide: true,
    }
  },
};

export const Leaf = {
  type: `SVGshape`,
  name: `leaf`,
  url: `img/svg-forms/leaf.svg`,
  options: {
    extrude: {},
    scale: [1.5, 1.5, 1.5],
    rotation: [Math.PI, 0.6, 1.2],
    position: [400, 350, 0],
    material: {
      type: `StandardBasic`,
      color: `Green`,
      doubleSide: true,
    }
  },
};

export const LeafMaterial = {
  type: `SVGshape`,
  name: `leaf`,
  url: `img/svg-forms/leaf.svg`,
  options: {
    extrude: {},
    scale: [1.5, 1.5, 1.5],
    rotation: [Math.PI, 0.6, 1.2],
    position: [400, 350, -250],
    material: {
      type: `StandardBasic`,
      color: `Green`,
      doubleSide: true,
    }
  },
};

export const LeafKeyhole = {
  type: `SVGshape`,
  name: `leaf`,
  url: `img/svg-forms/leaf.svg`,
  options: {
    extrude: {},
    scale: [1, 1, 1],
    rotation: [6.1, 2.5, 4.4],
    position: [440, 220, 170],
    material: {
      type: `StandardBasic`,
      color: `Green`,
      doubleSide: true,
    }
  },
};

export const LeafLargeRoom2 = {
  type: `SVGshape`,
  name: `leaf`,
  url: `img/svg-forms/leaf.svg`,
  options: {
    extrude: {
      depth: 2,
      bevelThickness: 1,
      bevelSize: 1,
    },
    scale: [2.5, 2.5, 2.5],
    rotation: [3.15, -Math.PI / 4, 0.2],
    position: [-229, 320, 337],
    material: {
      type: `StandardBasic`,
      color: `Green`,
      doubleSide: true,
    }
  },
};

export const LeafSmallRoom2 = {
  type: `SVGshape`,
  name: `leaf`,
  url: `img/svg-forms/leaf.svg`,
  options: {
    extrude: {
      depth: 2,
      bevelThickness: 1,
      bevelSize: 1,
    },
    scale: [1.5, 1.5, 1.5],
    rotation: [3.15, -Math.PI / 4, -0.5],
    position: [-300, 110, 405],
    material: {
      type: `StandardBasic`,
      color: `Green`,
      doubleSide: true,
    }
  },
};

export const Keyhole = {
  type: `SVGshape`,
  name: `keyhole`,
  url: `img/svg-forms/keyhole.svg`,
  options: {
    extrude: {
      depth: 20,
    },
    scale: [1, 1, 1],
    rotation: [Math.PI, Math.PI, 0],
    position: [1000, 1000, 0],
    material: {
      type: `StandardSoft`,
      color: `DarkPurple`,
      doubleSide: true,
    }
  },
};

export const Flower = {
  type: `SVGshape`,
  name: `flower`,
  url: `img/svg-forms/flower.svg`,
  options: {
    extrude: {
      depth: 4,
    },
    scale: [1, 1, 1],
    rotation: [Math.PI, Math.PI, 0],
    position: [900, -100, 0],
    material: {
      type: `StandardBasic`,
      color: `Green`,
      doubleSide: true,
    }
  },
};

export const FlowerMaterial = {
  type: `SVGshape`,
  name: `flower`,
  url: `img/svg-forms/flower.svg`,
  options: {
    extrude: {
      depth: 4,
    },
    scale: [1, 1, 1],
    rotation: [Math.PI, Math.PI, 0],
    position: [700, -100, -300],
    material: {
      type: `StandardBasic`,
      color: `Green`,
      doubleSide: true,
    }
  },
};

export const FlowerRoom1 = {
  type: `SVGshape`,
  name: `flower`,
  url: `img/svg-forms/flower.svg`,
  options: {
    extrude: {
      depth: 4,
    },
    scale: [1, 1, 1],
    rotation: [Math.PI, -0.8, 0],
    position: [-260, 400, 360],
    material: {
      type: `StandardSoft`,
      color: `AdditionalPurple`,
      doubleSide: true,
    }
  },
};

export const FlowerRoom4 = {
  type: `SVGshape`,
  name: `flower`,
  url: `img/svg-forms/flower.svg`,
  options: {
    extrude: {
      depth: 4,
    },
    scale: [1, 1, 1],
    rotation: [Math.PI, -0.8, 0],
    position: [-260, 400, 360],
    material: {
      type: `StandardSoft`,
      color: `ShadowedAdditionalPurple`,
      doubleSide: true,
    }
  },
};

// extrude
export const ExtrudeGroup = {
  type: `extrude`,
  options: {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10
  },
  shapes: [Flamingo, Snowflake, Question, Leaf, Keyhole, Flower],
};

export const ExtrudeMaterialsGroup = {
  type: `extrude`,
  options: {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10
  },
  shapes: [FlamingoMaterial, SnowflakeMaterial, QuestionMaterial, LeafMaterial, Keyhole, FlowerMaterial],
};

export const ExtrudeKeyholeGroup = {
  type: `extrude`,
  options: {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10
  },
  shapes: [FlamingoKeyhole, SnowflakeKeyhole, QuestionKeyhole, LeafKeyhole, Keyhole]
};

export const ExtrudeRoom1Group = {
  type: `extrude`,
  options: {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10
  },
  shapes: [FlowerRoom1],
};

export const ExtrudeRoom2Group = {
  type: `extrude`,
  options: {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10
  },
  shapes: [LeafLargeRoom2, LeafSmallRoom2],
};

export const ExtrudeRoom4Group = {
  type: `extrude`,
  options: {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10
  },
  shapes: [FlowerRoom4],
};


// group
export const ParametricGroup = {
  type: `group`,
  children: [Pyramid, Lantern, Snowman]
};

export const LatheGroup = {
  type: `group`,
  children: [Carpet, Road, Saturn]
};

export const MaterialsGroup = {
  type: `group`,
  children: [PyramidMaterial, LanternMaterial, SnowmanMaterial, SaturnRoom1, SaturnRoom4]
};

export const ShaderMaterialGroup = {
  type: `group`,
  children: [CarpetRoom1, CarpetRoom4, RoadRoom3]
};

export const KeyholeGroup = {
  type: `group`,
  children: [SaturnKeyhole]
};

export const Room1Group = {
  type: `group`,
  children: [CarpetRoom1, SaturnRoom1]
};

export const Room2Group = {
  type: `group`,
  children: [PyramidRoom2, LanternRoom2]
};

export const Room3Group = {
  type: `group`,
  children: [RoadRoom3, Fence, SnowmanRoom3]
};

export const Room4Group = {
  type: `group`,
  children: [CarpetRoom4, SaturnRoom4]
};

// OBJ
export const Airplane = {
  type: `OBJ`,
  url: `./3d/module-6/scene-0-objects/airplane.obj`,
  options: {
    scale: [1, 1, 1],
    rotation: [0.8, 2.5, 0],
    position: [190, 75, 100],
    material: {
      type: `StandardBasic`,
      color: `White`,
      doubleSide: true,
    }
  }
};

export const WallCornerUnitRoom1 = {
  type: `OBJ`,
  url: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
    material: {
      type: `StandardSoft`,
      color: `Purple`,
      doubleSide: true,
    }
  }
};

export const WallCornerUnitRoom2 = {
  type: `OBJ`,
  url: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
    material: {
      type: `StandardBasic`,
      color: `Blue`,
      doubleSide: true,
    }
  }
};

export const WallCornerUnitRoom3 = {
  type: `OBJ`,
  url: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
    material: {
      type: `StandardSoft`,
      color: `SkyLightBlue`,
      doubleSide: true,
    }
  }
};

export const WallCornerUnitRoom4 = {
  type: `OBJ`,
  url: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
    material: {
      type: `StandardBasic`,
      color: `ShadowedPurple`,
      doubleSide: true,
    }
  }
};

// glTF
export const Suitcase = {
  type: `glTF`,
  url: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  options: {
    scale: [0.4, 0.4, 0.4],
    rotation: [0.5, 3.8, 0.3],
    position: [-50, -130, 150],
  }
};

export const SuitcaseRoom1 = {
  type: `glTF`,
  url: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -0.4, 0],
    position: [-350, 0, 800],
  }
};

export const Watermelon = {
  type: `glTF`,
  url: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  options: {
    scale: [1.5, 1.5, 1.5],
    rotation: [0.2, 3.1, 0.7],
    position: [-450, -190, 200],
  }
};

export const StaticGroupRoom1 = {
  type: `glTF`,
  url: `./3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
  }
};

export const StaticGroupRoom2 = {
  type: `glTF`,
  url: `./3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
  }
};

export const StaticGroupRoom3 = {
  type: `glTF`,
  url: `./3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
  }
};

export const StaticGroupRoom4 = {
  type: `glTF`,
  url: `./3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
  options: {
    scale: [1, 1, 1],
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
  }
};
