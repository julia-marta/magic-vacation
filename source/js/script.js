// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import Scene3D from "./modules/3d/scene-3d.js";
import {Scene3DSettings} from "./common/const.js";

const scene3D = new Scene3D(Scene3DSettings);
scene3D.init();

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

window.addEventListener(`load`, () => {
  const fullPageScroll = new FullPageScroll(scene3D);
  fullPageScroll.init();
}, {once: true});
