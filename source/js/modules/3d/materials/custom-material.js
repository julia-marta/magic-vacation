import * as THREE from "three";
import vertexShader from "../shaders/vertex-shader";
import fragmentShader from "../shaders/fragment-shader";

export default class CustomMaterial extends THREE.RawShaderMaterial {
  constructor(texture) {
    super({
      uniforms: {
        map: {
          value: texture,
        },
      },
      vertexShader,
      fragmentShader,
    });
  }
}
