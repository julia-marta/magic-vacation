import carpetVert from "../shaders/carpet/vert.glsl";
import carpetFrag from "../shaders/carpet/frag.glsl";
import roadVert from "../shaders/road/vert.glsl";
import roadFrag from "../shaders/road/frag.glsl";

export default {
  carpet: {
    vert: carpetVert,
    frag: carpetFrag,
  },
  road: {
    vert: roadVert,
    frag: roadFrag,
  },
};
