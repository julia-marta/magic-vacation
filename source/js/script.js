// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import pageLoad from './modules/page-load.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import PlaneView from "./modules/3d/scene-3d-plane.js";

const plane3DView = new PlaneView();
plane3DView.init();

// init modules
mobileHeight();
pageLoad();
slider(plane3DView);
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll(plane3DView);
fullPageScroll.init();
