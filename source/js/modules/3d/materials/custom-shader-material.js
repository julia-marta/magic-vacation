import * as THREE from "three";
import Shaders from "../shaders/index";


export default class CustomShaderMaterial extends THREE.ShaderMaterial {
  constructor(materialName, shadersName, uniforms) {
    let defaultOptions = THREE.ShaderLib[materialName];

    super({
      lights: true,
      fragmentShader: Shaders[shadersName].frag,
      vertexShader: Shaders[shadersName].vert,
      uniforms: {...THREE.UniformsUtils.clone(defaultOptions.uniforms),
        ...uniforms
      },

      extensions: {
        derivatives: true,
      },
    });
  }
}
