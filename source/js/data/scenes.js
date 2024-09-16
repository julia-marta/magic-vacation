export const Scenes = {
  planes: {
    type: `planes`,
    objects: [
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
  },
  sphere: {
    type: `scene`,
    objects: [{
      type: `sphere`,
      position: [0, 0, 0],
      options: {
        material: {
          type: `StandardBasic`,
          color: `Blue`,
        }
      }
    }],
    lights: true,
  },
  cube: {
    type: `scene`,
    objects: [{
      type: `cube`,
      position: [0, 0, 0],
      rotation: [4, 4, 7],
      options: {
        material: {
          type: `StandardBasic`,
          color: `Green`,
        }
      },
    }],
    lights: true,
  },
  parametric: {
    type: `scene`,
    objects: [{
      type: `group`,
      options: {
        children: [
          {
            name: `pyramid`,
            position: [0, 140, 0],
          },
          {
            name: `lantern`,
            position: [400, 435, 0],
          },
          {
            name: `snowman`,
            position: [-400, 0, 0],
          }
        ],
      }
    }],
    lights: true,
  },
  extrude: {
    type: `scene`,
    objects: [{
      type: `extrude`,
      options: {
        shapes: [{
          type: `shape`,
          name: `flamingo`,
          options: {
            scale: [3, 3, 3],
            rotation: [Math.PI, Math.PI, 0.3],
            position: [-450, 350, 0],
          },
        },
        {
          type: `shape`,
          name: `snowflake`,
          options: {
            scale: [2, 2, 2],
            rotation: [-0.4, 0.6, 0],
            position: [-350, -50, 0],
          },
        },
        {
          type: `shape`,
          name: `question`,
          options: {
            scale: [1.5, 1.5, 1.5],
            rotation: [-0.7, Math.PI, 2.8],
            position: [100, -300, 0],
          },
        },
        {
          type: `shape`,
          name: `leaf`,
          options: {
            scale: [1.5, 1.5, 1.5],
            rotation: [Math.PI, 0.6, 1.2],
            position: [400, 350, 0],
          },
        },
        {
          type: `shape`,
          name: `keyhole`,
          extrude: {
            depth: 20,
          },
          options: {
            scale: [1, 1, 1],
            rotation: [Math.PI, Math.PI, 0],
            position: [1000, 1000, -200],
          },
        },
        {
          type: `shape`,
          name: `flower`,
          extrude: {
            depth: 4,
          },
          options: {
            scale: [1, 1, 1],
            rotation: [Math.PI, Math.PI, 0],
            position: [900, -100, 0],
          },
        },
        ]
      },
    }
    ],
    lights: true,
  },
  lathe: {
    type: `scene`,
    objects: [{
      type: `group`,
      options: {
        children: [
          {
            name: `carpet`,
            position: [0, 0, 0],
            options: {
              material: {
                type: `StandardSoft`,
                color: `LightPurple`,
              }
            }
          },
          {
            name: `road`,
            position: [0, 200, 0],
            options: {
              material: {
                type: `StandardSoft`,
                color: `Grey`,
              }
            }
          },
          {
            name: `saturn`,
            position: [0, 300, 0],
          },
        ],
      }
    }],
    lights: true,
  },
  materials: {
    type: `scene`,
    objects: [{
      type: `extrude`,
      options: {
        shapes: [
          {
            type: `shape`,
            name: `flamingo`,
            options: {
              scale: [3, 3, 3],
              rotation: [Math.PI, Math.PI, 0.3],
              position: [-450, 350, -300],
            },
          },
          {
            type: `shape`,
            name: `snowflake`,
            options: {
              scale: [2, 2, 2],
              rotation: [-0.4, 0.6, 0],
              position: [-350, -50, -250],
            },
          },
          {
            type: `shape`,
            name: `question`,
            options: {
              scale: [1.5, 1.5, 1.5],
              rotation: [-0.7, Math.PI, 2.8],
              position: [100, -300, -300],
            },
          },
          {
            type: `shape`,
            name: `leaf`,
            options: {
              scale: [1.5, 1.5, 1.5],
              rotation: [Math.PI, 0.6, 1.2],
              position: [400, 350, -250],
            },
          },
          {
            type: `shape`,
            name: `flower`,
            extrude: {
              depth: 4,
            },
            options: {
              scale: [1, 1, 1],
              rotation: [Math.PI, Math.PI, 0],
              position: [700, -100, -300],
            },
          },
        ]
      },
    },
    {
      type: `group`,
      options: {
        children: [
          {
            name: `pyramid`,
            position: [0, 0, 0],
          },
          {
            name: `lantern`,
            position: [450, 435, 0],
          },
          {
            name: `snowman`,
            position: [-450, -300, 0],
          },
          {
            name: `saturn`,
            position: [0, 300, 0],
          },
          {
            name: `saturn`,
            position: [-250, 350, 0],
            options: {
              materials: {
                planet: {
                  type: `StandardSoft`,
                  color: `ShadowedDominantRed`,
                },
                rings: {
                  type: `StandardSoft`,
                  color: `ShadowedBrightPurple`,
                },
                ball: {
                  type: `StandardSoft`,
                  color: `ShadowedBrightPurple`,
                },
                cable: {
                  type: `StandardSoft`,
                  color: `MetalGrey`,
                }
              }
            }
          },
        ],
      }
    },
    ],
    lights: true,
  },
  shader: {
    type: `scene`,
    objects: [{
      type: `group`,
      options: {
        children: [
          {
            name: `carpet`,
            position: [0, 0, 0],
          },
          {
            name: `carpet`,
            position: [0, -100, 0],
            options: {
              material: {
                type: `CustomSoftCarpet`,
                color: {
                  mainColor: `ShadowedLightPurple`,
                  stripesColor: `ShadowedAdditionalPurple`,
                },
              }
            }
          },
          {
            name: `road`,
            position: [0, 200, 0],
          },
        ],
      }
    }],
    lights: true,
  },
  keyhole: {
    type: `scene`,
    name: `keyholeScene`,
    objects: [
      {
        type: `group`,
        options: {
          children: [
            {
              name: `saturn`,
              rotation: [0.3, -0.3, 0.2],
              scale: [0, 0, 0],
              options: {
                name: `saturn`,
                ball: null,
                cable: null,
                animations: [
                  {
                    type: `transform`,
                    from: {
                      scale: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                    },
                    to: {
                      scale: {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5,
                      },
                      position: {
                        x: 400,
                        y: -150,
                        z: 185,
                      },
                    },
                    fps: 60,
                    delay: 500,
                    duration: 1500,
                    easing: `easeOutCubic`,
                  },
                  {
                    type: `bounce`,
                    fps: 60,
                    delay: 1500,
                    duration: `infinite`,
                    easing: `easeOutCubic`,
                  }
                ],
              }
            },
          ],
        }
      },
      {
        type: `extrude`,
        options: {
          shapes: [
            {
              type: `shape`,
              name: `flamingo`,
              options: {
                name: `flamingo`,
                scale: [0, 0, 0],
                position: [0, 0, 0],
                rotation: [6.1, 0.2, 3.5],
                animations: [
                  {
                    type: `transform`,
                    from: {
                      scale: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                    },
                    to: {
                      scale: {
                        x: 1.5,
                        y: 1.5,
                        z: 1.5,
                      },
                      position: {
                        x: -445,
                        y: 270,
                        z: 100,
                      },
                    },
                    fps: 60,
                    delay: 500,
                    duration: 1500,
                    easing: `easeOutCubic`,
                  },
                  {
                    type: `bounce`,
                    fps: 60,
                    delay: 1500,
                    duration: `infinite`,
                    easing: `easeOutCubic`,
                  }
                ],
              },
            },
            {
              type: `shape`,
              name: `snowflake`,
              options: {
                name: `snowflake`,
                scale: [0, 0, 0],
                position: [0, 0, 0],
                rotation: [6.1, 0.8, 0.25],
                animations: [
                  {
                    type: `transform`,
                    from: {
                      scale: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                    },
                    to: {
                      scale: {
                        x: 1,
                        y: 1,
                        z: 1,
                      },
                      position: {
                        x: -370,
                        y: -20,
                        z: 170,
                      },
                    },
                    fps: 60,
                    delay: 500,
                    duration: 1500,
                    easing: `easeOutCubic`,
                  },
                  {
                    type: `bounce`,
                    fps: 60,
                    delay: 1500,
                    duration: `infinite`,
                    easing: `easeOutCubic`,
                  }
                ],
              },
            },
            {
              type: `shape`,
              name: `question`,
              options: {
                name: `question`,
                scale: [0, 0, 0],
                position: [0, 0, 0],
                rotation: [5.4, 3.1, 2.8],
                animations: [
                  {
                    type: `transform`,
                    from: {
                      scale: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                    },
                    to: {
                      scale: {
                        x: 1,
                        y: 1,
                        z: 1,
                      },
                      position: {
                        x: 80,
                        y: -300,
                        z: 125,
                      },
                    },
                    fps: 60,
                    delay: 500,
                    duration: 1500,
                    easing: `easeOutCubic`,
                  },
                  {
                    type: `bounce`,
                    fps: 60,
                    delay: 1500,
                    duration: `infinite`,
                    easing: `easeOutCubic`,
                  }
                ],
              },
            },
            {
              type: `shape`,
              name: `leaf`,
              options: {
                name: `leaf`,
                scale: [0, 0, 0],
                position: [0, 0, 0],
                rotation: [6.1, 2.5, 4.4],
                animations: [
                  {
                    type: `transform`,
                    from: {
                      scale: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                    },
                    to: {
                      scale: {
                        x: 1,
                        y: 1,
                        z: 1,
                      },
                      position: {
                        x: 550,
                        y: 250,
                        z: 170,
                      },
                    },
                    fps: 60,
                    delay: 500,
                    duration: 1500,
                    easing: `easeOutCubic`,
                  },
                  {
                    type: `bounce`,
                    fps: 60,
                    delay: 1500,
                    duration: `infinite`,
                    easing: `easeOutCubic`,
                  }
                ],
              },
            },
            {
              type: `shape`,
              name: `keyhole`,
              extrude: {
                depth: 20,
              },
              options: {
                name: `keyhole`,
                scale: [1, 1, 1],
                rotation: [Math.PI, Math.PI, 0],
                position: [1000, 1000, 0],
              },
            },
          ]
        },
      },
      {
        type: `plane`,
        options: {
          name: `backPlane`,
          position: [0, 0, -200],
          material: {
            type: `StandardBasic`,
            color: `Purple`,
            doubleSide: true,
            transparent: true,
          }
        },
      },
      {
        type: `rig`,
        options: {
          name: `airplane`,
          object: {
            type: `OBJ`,
            options: {
              name: `airplane`,
              scale: [1, 1, 1],
              rotation: [0, Math.PI / 2, 0],
            }
          },
          options: {
            name: `airplane`,
            position: [135, 0, 0],
            animations: [
              {
                type: `custom`,
                func: `Airplane`,
                fps: 60,
                duration: 2000,
                delay: 2000,
                easing: `easeOutExpo`,
              },
              {
                type: `bounce`,
                fps: 60,
                delay: 4000,
                duration: `infinite`,
                easing: `easeOutCubic`,
              }
            ],
          },
        }
      },
      {
        type: `glTF`,
        options: {
          name: `suitcase`,
          scale: [0, 0, 0],
          position: [0, 0, 0],
          animations: [
            {
              type: `transform`,
              from: {
                scale: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
              },
              to: {
                scale: {
                  x: 0.4,
                  y: 0.4,
                  z: 0.4,
                },
              },
              fps: 60,
              delay: 500,
              duration: 600,
              easing: `easeInOutSine`,
            },
          ],
          outer: {
            name: `suitcaseOuter`,
            intermediate: {
              rotation: [0.2, -1.5, 1.3, `YZX`],
              animations: [
                {
                  type: `horizontalrotate`,
                  rotation: {
                    x: 0.2,
                    y: -1.5,
                    z: 1.3,
                  },
                  order: `YZX`,
                  coeff: 0.6,
                  duration: 500,
                  delay: 500,
                  easing: `easeInOutSine`,
                },
                {
                  type: `verticalrotate`,
                  rotation: {
                    x: -0.4,
                    y: -1.5,
                    z: 1.3,
                  },
                  order: `YZX`,
                  fps: 60,
                  duration: 500,
                  delay: 1000,
                  easing: `easeInOutSine`,
                },
              ],
            },
            animations: [
              {
                type: `transform`,
                from: {
                  position: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                },
                to: {
                  position: {
                    x: 0,
                    y: 70,
                    z: 60,
                  },
                },
                fps: 60,
                delay: 500,
                duration: 500,
                easing: `easeInOutSine`,
              },
              {
                type: `transform`,
                from: {
                  position: {
                    x: 0,
                    y: 70,
                    z: 60,
                  },
                },
                to: {
                  position: {
                    x: -60,
                    y: -220,
                    z: 120,
                  },
                },
                fps: 60,
                delay: 1000,
                duration: 600,
                easing: `easeInOutSine`,
              },
              {
                type: `bounce`,
                fps: 60,
                delay: 1600,
                duration: `infinite`,
                easing: `easeOutCubic`,
              }
            ],
          },
        }
      },
      {
        type: `glTF`,
        options: {
          name: `watermelon`,
          scale: [0, 0, 0],
          position: [0, 0, 0],
          rotation: [0.2, 3.1, 0.7],
          animations: [
            {
              type: `transform`,
              from: {
                scale: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
              },
              to: {
                scale: {
                  x: 1.5,
                  y: 1.5,
                  z: 1.5,
                },
                position: {
                  x: -650,
                  y: -240,
                  z: 200,
                },
              },
              fps: 60,
              delay: 500,
              duration: 1500,
              easing: `easeOutCubic`,
            },
            {
              type: `bounce`,
              fps: 60,
              delay: 1500,
              duration: `infinite`,
              easing: `easeOutCubic`,
            }
          ],
        }
      },
    ],
    cameraState: {
      index: 0,
      depth: -4750,
      yawAngle: 0,
      horizonAngle: 0,
      relatedAnimation: {
        scene: `keyholeScene`,
        object: `backPlane`,
        breakpoints: {
          from: -3000,
          to: -3700,
        }
      }
    },
  },
  room1: {
    type: `scene`,
    name: `room1`,
    position: [0, -700, -3270],
    objects: [
      {
        type: `OBJ`,
        options: {
          name: `wallCornerUnit`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
          material: {
            type: `StandardSoft`,
            color: `Purple`,
            doubleSide: true,
          }
        }
      },
      {
        type: `circle`,
        options: {
          name: `circle`,
          position: [0, 0, 0],
          rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
          material: {
            type: `StandardSoft`,
            color: `DarkPurple`,
            doubleSide: true,
          }
        },
      },
      {
        type: `group`,
        options: {
          children: [
            {
              name: `carpet`,
              position: [0, 0, 0],
              rotation: [0, -Math.PI / 4, 0],
              options: {
                name: `carpet`,
              },
            },
            {
              name: `saturn`,
              position: [0, -1000, 0],
              rotation: [0, -Math.PI, 0],
              options: {
                name: `saturn`,
                animations: [
                  {
                    type: `traverse`,
                    name: `Rings`,
                    func: `Jiggle`,
                    rotationAngles: {
                      x: -5,
                      y: 10,
                      z: -13,
                    },
                    periodCoeff: 500,
                    fps: 60,
                    duration: `infinite`,
                    easing: `easeOutCubic`,
                  },
                ],
              },
              outer: {
                name: `saturnOuter`,
                position: [0, 1500, 280],
                animations: [
                  {
                    type: `jiggle`,
                    rotationAngles: {
                      x: 0.5,
                      y: 0,
                      z: 1,
                    },
                    periodCoeff: 500,
                    fps: 60,
                    duration: `infinite`,
                    easing: `easeOutCubic`,
                  },
                ],
              },
            },
          ],
        }
      },
      {
        type: `extrude`,
        options: {
          shapes: [
            {
              type: `shape`,
              name: `flower`,
              extrude: {
                depth: 4,
              },
              options: {
                name: `flower`,
                scale: [1, 1, 1],
                rotation: [Math.PI, -0.8, 0],
                position: [-260, 400, 360],
                material: {
                  type: `StandardSoft`,
                  color: `AdditionalPurple`,
                  doubleSide: true,
                }
              },
            },
          ]
        },
      },
      {
        type: `glTF`,
        options: {
          name: `staticGroupRoom1`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
        }
      },
      {
        type: `glTF`,
        options: {
          name: `dog`,
          rotation: [0, 0.4, 0],
          position: [50, 0, 630],
          animations: [
            {
              type: `traverse`,
              name: `Tail`,
              func: `Tail`,
              rotationAngle: 30,
              fps: 60,
              duration: `infinite`,
              easing: `easeLinear`,
            },
          ],
        }
      },
    ],
    cameraState: {
      index: 1,
      depth: -2150,
      yawAngle: 0,
      horizonAngle: -(15 * Math.PI / 180),
      relatedAnimation: {
        scene: `keyholeScene`,
        object: `backPlane`,
        breakpoints: {
          from: -3000,
          to: -3700,
        }
      }
    },
    currentAnimation: {
      scene: `suitcaseScene`,
      object: `suitcase`,
      animations: [
        {
          type: `transform`,
          from: {
            scale: {
              x: 1,
              y: 1,
              z: 1,
            },
            position: {
              x: -350,
              y: 500,
              z: 750,
            },
          },
          to: {
            scale: {
              x: 0.95,
              y: 1.1,
              z: 0.95
            },
            position: {
              x: -350,
              y: 0,
              z: 750,
            },
          },
          fps: 60,
          delay: 500,
          duration: 300,
          easing: `easeInCubic`,
        },
        {
          type: `transform`,
          from: {
            scale: {
              x: 0.95,
              y: 1.1,
              z: 0.95
            },
            position: {
              x: -350,
              y: 0,
              z: 750,
            },
          },
          to: {
            scale: {
              x: 1.05,
              y: 0.95,
              z: 1.05
            },
            position: {
              x: -350,
              y: 2,
              z: 750,
            },
          },
          fps: 60,
          delay: 800,
          duration: 200,
          easing: `easeOutCubic`,
        },
        {
          type: `transform`,
          from: {
            scale: {
              x: 1.05,
              y: 0.95,
              z: 1.05
            },
            position: {
              x: -350,
              y: 2,
              z: 750,
            },
          },
          to: {
            scale: {
              x: 0.98,
              y: 1.04,
              z: 0.98
            },
            position: {
              x: -350,
              y: 1,
              z: 750,
            },
          },
          fps: 60,
          delay: 1000,
          duration: 200,
          easing: `easeInOutSine`,
        },

        {
          type: `transform`,
          from: {
            scale: {
              x: 0.98,
              y: 1.04,
              z: 0.98
            },
            position: {
              x: -350,
              y: 1,
              z: 750,
            },
          },
          to: {
            scale: {
              x: 1,
              y: 1,
              z: 1,
            },
            position: {
              x: -350,
              y: 0,
              z: 750,
            },
          },
          fps: 60,
          delay: 1200,
          duration: 200,
          easing: `easeInCubic`,
        },
      ],
      isPlayOnce: true,
    },
  },
  room2: {
    type: `scene`,
    name: `room2`,
    position: [0, -700, -3270],
    rotation: [0, Math.PI / 2, 0],
    objects: [
      {
        type: `OBJ`,
        options: {
          name: `wallCornerUnit`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
          material: {
            type: `StandardBasic`,
            color: `Blue`,
            doubleSide: true,
          }
        }
      },
      {
        type: `circle`,
        options: {
          name: `circle`,
          position: [0, 0, 0],
          rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
          material: {
            type: `StandardSoft`,
            color: `BrightBlue`,
            doubleSide: true,
          }
        },
      },
      {
        type: `group`,
        options: {
          children: [
            {
              name: `pyramid`,
              position: [-25, 140, 325],
              options: {
                name: `pyramid`,
              },
            },
            {
              name: `lantern`,
              rotation: [0, Math.PI / 8, 0],
              position: [390, 435, 540],
              options: {
                name: `lantern`,
              },
            },
          ],
        }
      },
      {
        type: `extrude`,
        options: {
          shapes: [
            {
              type: `shape`,
              name: `leaf`,
              extrude: {
                depth: 2,
                bevelThickness: 1,
                bevelSize: 1,
              },
              options: {
                name: `leaf1`,
                scale: [2.5, 2.5, 2.5],
                rotation: [2.9, -Math.PI / 2, 0],
                position: [0, 320, 80],
                outer: {
                  name: `leaf1Outer`,
                  intermediate: {
                    position: [80, 20, 330],
                    animations: [
                      {
                        type: `custom`,
                        func: `Leaf`,
                        amplitude: 0.4,
                        coeff: 200,
                        fps: 60,
                        duration: `infinite`,
                        easing: `easeInOutSine`,
                      },
                    ],
                  },
                  position: [0, 0, 0],
                  rotation: [0, -Math.PI / 4, 0],
                },
              },
            },
            {
              type: `shape`,
              name: `leaf`,
              extrude: {
                depth: 2,
                bevelThickness: 1,
                bevelSize: 1,
              },
              options: {
                name: `leaf2`,
                scale: [1.5, 1.5, 1.5],
                rotation: [-2.6, -Math.PI / 2, 0],
                position: [0, 85, 170],
                outer: {
                  name: `leaf2Outer`,
                  intermediate: {
                    position: [80, 20, 330],
                    animations: [
                      {
                        type: `custom`,
                        func: `Leaf`,
                        amplitude: 0.2,
                        coeff: 200,
                        fps: 60,
                        delayCoeff: 1.3,
                        duration: `infinite`,
                        easing: `easeInOutSine`,
                      },
                    ],
                  },
                  position: [0, 0, 0],
                  rotation: [0, -Math.PI / 4, 0],
                },
              },
            },
          ]
        },
      },
      {
        type: `glTF`,
        options: {
          name: `staticGroupRoom2`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
        }
      },
    ],
    cameraState: {
      index: 2,
      depth: -2150,
      yawAngle: Math.PI / 2,
      horizonAngle: -(15 * Math.PI / 180),
    },
  },
  room3:
  {
    type: `scene`,
    name: `room3`,
    position: [0, -700, -3270],
    rotation: [0, Math.PI, 0],
    objects: [
      {
        type: `OBJ`,
        options: {
          name: `wallCornerUnit`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
          material: {
            type: `StandardSoft`,
            color: `SkyLightBlue`,
            doubleSide: true,
          }
        }
      },
      {
        type: `circle`,
        options: {
          name: `circle`,
          position: [0, 0, 0],
          rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
          material: {
            type: `StandardSoft`,
            color: `MountainBlue`,
            doubleSide: true,
          }
        },
      },
      {
        type: `group`,
        options: {
          children: [
            {
              name: `road`,
              rotation: [0, -Math.PI / 4, 0],
              position: [0, 0, 0],
              options: {
                name: `road`,
              },
            },
            {
              name: `fence`,
              position: [0, 0, 0],
              options: {
                name: `fence`,
              },
            },
            {
              name: `snowman`,
              rotation: [0, Math.PI / 4, 0],
              position: [-150, 60, 400],
              options: {
                name: `snowman`,
              },
            }
          ],
        }
      },
      {
        type: `glTF`,
        options: {
          name: `staticGroupRoom3`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
        }
      },
      {
        type: `glTF`,
        options: {
          name: `compass`,
          rotation: [0, -0.8, 0],
          position: [20, 0, -25],
          animations: [
            {
              type: `traverse`,
              name: `Arrows`,
              func: `Jiggle`,
              rotationAngles: {
                x: 0,
                y: 0,
                z: 10,
              },
              periodCoeff: 400,
              fps: 60,
              duration: `infinite`,
              easing: `easeInQuad`,
            },
          ],
        }
      }
    ],
    cameraState: {
      index: 3,
      depth: -2150,
      yawAngle: Math.PI,
      horizonAngle: -(15 * Math.PI / 180),
    },
  },
  room4: {
    type: `scene`,
    name: `room4`,
    position: [0, -700, -3270],
    rotation: [0, Math.PI + Math.PI / 2, 0],
    objects: [
      {
        type: `OBJ`,
        options: {
          name: `wallCornerUnit`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
          material: {
            type: `StandardBasic`,
            color: `ShadowedPurple`,
            doubleSide: true,
          }
        }
      },
      {
        type: `circle`,
        options: {
          name: `circle`,
          position: [0, 0, 0],
          rotation: [-Math.PI / 2, 0, Math.PI + Math.PI / 4],
          material: {
            type: `StandardSoft`,
            color: `ShadowedDarkPurple`,
            doubleSide: true,
          }
        },
      },
      {
        type: `group`,
        options: {
          children: [
            {
              name: `carpet`,
              rotation: [0, -Math.PI / 4, 0],
              position: [0, 0, 0],
              options: {
                name: `carpet`,
                material: {
                  type: `CustomSoftCarpet`,
                  color: {
                    mainColor: `ShadowedLightPurple`,
                    stripesColor: `ShadowedAdditionalPurple`,
                  },
                }
              }
            },
            {
              name: `saturn`,
              position: [100, 600, 900],
              options: {
                name: `saturn`,
                materials: {
                  planet: {
                    type: `StandardSoft`,
                    color: `ShadowedDominantRed`,
                  },
                  rings: {
                    type: `StandardSoft`,
                    color: `ShadowedBrightPurple`,
                  },
                  ball: {
                    type: `StandardSoft`,
                    color: `ShadowedBrightPurple`,
                  },
                  cable: {
                    type: `StandardSoft`,
                    color: `MetalGrey`,
                  }
                },
              }
            },
          ],
        }
      },
      {
        type: `extrude`,
        options: {
          shapes: [
            {
              type: `shape`,
              name: `flower`,
              extrude: {
                depth: 4,
              },
              options: {
                name: `flower`,
                scale: [1, 1, 1],
                rotation: [Math.PI, -0.8, 0],
                position: [-260, 400, 360],
                material: {
                  type: `StandardSoft`,
                  color: `ShadowedAdditionalPurple`,
                  doubleSide: true,
                }
              },
            },
          ]
        },
      },
      {
        type: `glTF`,
        options: {
          name: `staticGroupRoom4`,
          scale: [1, 1, 1],
          rotation: [0, -Math.PI / 4, 0],
          position: [0, 0, 0],
        }
      },
      {
        type: `glTF`,
        options: {
          name: `sonya`,
          rotation: [0, -0.6, 0],
          position: [120, 120, 330],
          animations: [
            {
              type: `bounce`,
              fps: 60,
              amplitude: 1,
              period: 400,
              duration: `infinite`,
              easing: `easeInOutSine`,
            },
            {
              type: `traverse`,
              name: `RightHand`,
              func: `Swing`,
              startRotationAngle: -55,
              rotationAngle: 5,
              period: 400,
              coeff: 1.5,
              fps: 60,
              duration: `infinite`,
              easing: `easeInQuad`,
            },
            {
              type: `traverse`,
              name: `LeftHand`,
              func: `Swing`,
              startRotationAngle: 55,
              rotationAngle: 5,
              period: 400,
              coeff: -1.5,
              fps: 60,
              duration: `infinite`,
              easing: `easeInQuad`,
            },
          ],
        }
      }
    ],
    cameraState: {
      index: 4,
      depth: -2150,
      yawAngle: Math.PI + Math.PI / 2,
      horizonAngle: -(15 * Math.PI / 180),
    },
  },
  suitcase: {
    type: `scene`,
    name: `suitcaseScene`,
    position: [0, -700, 0],
    objects: [
      {
        type: `glTF`,
        options: {
          name: `suitcase`,
          position: [-350, 500, 750],
          rotation: [0, -0.4, 0],
          isCurrentAnimation: true,
        },
      },
    ],
    isMountedOnCameraRig: true,
  },
};

export const ScreensScenes = {
  top: {
    name: `main`,
    type: `scenesGroup`,
    scenes: [Scenes.keyhole, Scenes.room1, Scenes.room2, Scenes.room3, Scenes.room4, Scenes.suitcase],
    lights: true,
  },
  story: {
    name: `main`,
    type: `scenesGroup`,
    scenes: [Scenes.keyhole, Scenes.room1, Scenes.room2, Scenes.room3, Scenes.room4, Scenes.suitcase],
    lights: true,
  },
};
