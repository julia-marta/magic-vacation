const Scenes = {
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
    objects: [
      {
        type: `group`,
        options: {
          children: [
            {
              name: `saturn`,
              rotation: [0.3, -0.3, 0.2],
              options: {
                ball: null,
                cable: null,
              }
            },
          ],
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
                  x: 300,
                  y: -100,
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
      {
        type: `extrude`,
        options: {
          shapes: [
            {
              type: `shape`,
              name: `flamingo`,
              options: {
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
                        x: 1.35,
                        y: 1.35,
                        z: 1.35,
                      },
                      position: {
                        x: -345,
                        y: 250,
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
                        x: -310,
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
                      positon: {
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
                      positon: {
                        x: 70,
                        y: -230,
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
                        x: 440,
                        y: 220,
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
          position: [0, 0, 0],
          material: {
            type: `StandardBasic`,
            color: `Purple`,
            doubleSide: true,
          }
        },
      },
      {
        type: `OBJ`,
        options: {
          name: `airplane`,
          scale: [0, 0, 0],
          position: [0, 0, 0],
          rotation: [0.8, 2.5, 0],
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
                  x: 190,
                  y: 75,
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
        }
      },
      {
        type: `glTF`,
        options: {
          name: `suitcase`,
          scale: [0, 0, 0],
          position: [0, 0, 0],
          rotation: [0.5, 3.8, 0.3],
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
                  x: 0.4,
                  y: 0.4,
                  z: 0.4,
                },
                position: {
                  x: -50,
                  y: -130,
                  z: 150,
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
                  x: -450,
                  y: -190,
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
    lights: true,
  },
  rooms: {
    type: `scenesGroup`,
    scenes: [
      {
        type: `scene`,
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
                },
                {
                  name: `saturn`,
                  position: [100, 600, 900],
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
            }
          },
        ],
      },
      {
        type: `scene`,
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
                },
                {
                  name: `lantern`,
                  rotation: [0, Math.PI / 8, 0],
                  position: [390, 435, 540],
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
                    scale: [2.5, 2.5, 2.5],
                    rotation: [3.15, -Math.PI / 4, 0.2],
                    position: [-229, 320, 337],
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
                    scale: [1.5, 1.5, 1.5],
                    rotation: [3.15, -Math.PI / 4, -0.5],
                    position: [-300, 110, 405],
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
      },
      {
        type: `scene`,
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
                },
                {
                  name: `fence`,
                  position: [0, 0, 0],
                },
                {
                  name: `snowman`,
                  rotation: [0, Math.PI / 4, 0],
                  position: [-150, 60, 400],
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
            }
          }
        ],
      },
      {
        type: `scene`,
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
              position: [120, 80, 330],
            }
          }
        ],
      },
      {
        type: `scene`,
        objects: [
          {
            type: `glTF`,
            options: {
              name: `suitcase`,
              rotation: [0, -0.4, 0],
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
                      y: 200,
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
            }
          },
        ],
      },
    ],
    lights: true,
  },
};

export const ScreensScenes = {
  all: Scenes.planes,
  top: Scenes.rooms,
};
