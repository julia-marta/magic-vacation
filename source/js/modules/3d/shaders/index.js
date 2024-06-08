import planesVert from "../shaders/planes/vert.glsl";
import planesFrag from "../shaders/planes/frag.glsl";
import carpetVert from "../shaders/carpet/vert.glsl";
import carpetFrag from "../shaders/carpet/frag.glsl";
import roadVert from "../shaders/road/vert.glsl";
import roadFrag from "../shaders/road/frag.glsl";

export default {
  planes: {
    vert: planesVert,
    frag: planesFrag,
  },
  carpet: {
    vert: carpetVert,
    frag: carpetFrag,
  },
  road: {
    vert: roadVert,
    frag: roadFrag,
  },
};
