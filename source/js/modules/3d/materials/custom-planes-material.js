import * as THREE from "three";
import Shaders from "../shaders/index";

export default class CustomPlanesMaterial extends THREE.RawShaderMaterial {
  constructor(texture) {
    super({
      uniforms: {
        map: {
          value: texture,
        },
        hueShift: {
          value: 0,
        },
        blobs: {
          value: [
            {
              radius: 0,
              position: [0, 0],
              glowOffset: 0,
              glowLength: 0,
            },
            {
              radius: 0,
              position: [0, 0],
              glowOffset: 0,
              glowLength: 0,
            },
            {
              radius: 0,
              position: [0, 0],
              glowOffset: 0,
              glowLength: 0,
            }
          ],
        },
      },
      defines: {
        BLOBS_COUNT: 3.0,
        BLOB_BORDER_WIDTH: 2.0,
        BLOB_BORDER_COLOR: [1.0, 1.0, 1.0, 0.15],
        BLOB_RESOLUTION: [window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio],
      },
      fragmentShader: Shaders.planes.frag,
      vertexShader: Shaders.planes.vert,
    });
  }
}
