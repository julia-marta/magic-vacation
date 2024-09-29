import Scene2D from "./scene-2d.js";
import Animation from "../animation.js";
import _ from "../../common/easings.js";

export default class Scene2DCrocodile extends Scene2D {
  constructor(options) {
    const canvas = document.getElementById(options.canvas);
    super({
      canvas,
      objects: options.objects,
      locals: options.locals,
      imagesUrls: options.imagesUrls,
    });

    this.afterInit = () => {
      this.objects.crocodile.before = this.clipKeyArea.bind(this);
      this.objects.crocodile.after = this.drawDrop.bind(this);
    };

    this.initEventListeners();
    this.initObjects();
    this.start();
  }

  updateSize() {
    super.updateSize();
    this.canvas.width = this.size + 130;
  }

  initAnimations() {
    this.animations.push(
        new Animation({
          func: () => {
            this.drawScene();
          },
          duration: `infinite`,
          fps: 60,
        })
    );
    this.initKeyHoleAnimations();
    this.initCrocodileAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
    this.initDropAnimations();


  }

  initKeyHoleAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.transforms.scaleX = 0.8 + 0.2 * progress;
        this.objects.key.transforms.scaleY = 0.8 + 0.2 * progress;
        this.objects.key.opacity = progress;
      },
      duration: 183,
      easing: _.bezierEasing(0.33, 0, 0.67, 1)
    }));
  }

  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.crocodile.transforms.translateY = -15 * progressReversed;
        this.objects.crocodile.transforms.translateX = 45 * progressReversed;
        this.objects.crocodile.transforms.rotate = 15 * progressReversed;
      },
      duration: 600,
      delay: 700,
      easing: _.bezierEasing(0.15, 0, 0.82, 1)
    }));
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.flamingo.transforms.scaleX = 1 * progress;
        this.objects.flamingo.transforms.scaleY = 1 * progress;
        this.objects.flamingo.transforms.translateY = 6 * progressReversed;
        this.objects.flamingo.transforms.translateX = 23 * progressReversed;
        this.objects.flamingo.transforms.rotate = 60 * progressReversed;
      },
      duration: 617,
      easing: _.bezierEasing(0.11, 0, 0, 1),
      delay: 100,
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = 70 * progress;
      },
      duration: 583,
      easing: _.bezierEasing(0.87, 0, 0.83, 0.83),
      delay: 717,
    }));
  }

  initWatermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.watermelon.transforms.scaleX = 1 * progress;
        this.objects.watermelon.transforms.scaleY = 1 * progress;
        this.objects.watermelon.transforms.translateY = -14 * progressReversed;
        this.objects.watermelon.transforms.translateX = 50 * progressReversed;
        this.objects.watermelon.transforms.rotate = 60 * progressReversed;
      },
      duration: 533,
      easing: _.bezierEasing(0.11, 0, 0, 1),
      delay: 100,
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 50 * progress;
      },
      duration: 583,
      easing: _.bezierEasing(0.87, 0, 0.83, 0.83),
      delay: 633,
    }));
  }

  initLeafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.leaf.transforms.scaleX = 1 * progress;
        this.objects.leaf.transforms.scaleY = 1 * progress;
        this.objects.leaf.transforms.translateY = 14 * progressReversed;
        this.objects.leaf.transforms.translateX = -35 * progressReversed;
        this.objects.leaf.transforms.rotate = -40 * progressReversed;
      },
      duration: 533,
      easing: _.bezierEasing(0.11, 0, 0, 1),
      delay: 100,
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = 80 * progress;
      },
      duration: 583,
      easing: _.bezierEasing(0.87, 0, 0.83, 0.83),
      delay: 633,
    }));
  }

  initSnowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.snowflake.transforms.scaleX = 1 * progress;
        this.objects.snowflake.transforms.scaleY = 1 * progress;
        this.objects.snowflake.transforms.translateY = -5 * progressReversed;
        this.objects.snowflake.transforms.translateX = -20 * progressReversed;
        this.objects.snowflake.transforms.rotate = -60 * progressReversed;
      },
      duration: 683,
      easing: _.bezierEasing(0.11, 0, 0, 1),
      delay: 100,
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = 70 * progress;
      },
      duration: 583,
      easing: _.bezierEasing(0.87, 0, 0.83, 0.83),
      delay: 783,
    }));
  }

  initSaturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.saturn.transforms.scaleX = 1 * progress;
        this.objects.saturn.transforms.scaleY = 1 * progress;
        this.objects.saturn.transforms.translateY = -23 * progressReversed;
        this.objects.saturn.transforms.translateX = -43 * progressReversed;
        this.objects.saturn.transforms.rotate = 50 * progressReversed;
      },
      duration: 617,
      easing: _.bezierEasing(0.11, 0, 0, 1),
      delay: 100,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = 50 * progress;
      },
      duration: 583,
      easing: _.bezierEasing(0.87, 0, 0.83, 0.83),
      delay: 717,
    }));

  }

  initDropAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.locals.drop.centerY = 65 + (2 * progress);
        this.locals.drop.radius = 1.3 * progress;
        this.locals.drop.deltasLength = 1.5 * progress;
        this.locals.drop.opacity = 1;
      },
      duration: 330,
      easing: _.bezierEasing(0.33, 0, 0.67, 1),
      delay: 1300,
      callback: () => this.dropAnimation2(),
    }));
  }

  dropAnimation1() {
    const animation = new Animation({
      func: (progress) => {
        this.locals.drop.endY = 65;
        this.locals.drop.centerY = 65 + (2 * progress);
        this.locals.drop.radius = 1.3 * progress;
        this.locals.drop.deltasLength = 1.5 * progress;
        this.locals.drop.opacity = 1;
      },
      duration: 330,
      easing: _.bezierEasing(0.33, 0, 0.67, 1),
      delay: 567,
      callback: () => this.dropAnimation2(),
    });
    animation.start();
  }

  dropAnimation2() {
    const animation = new Animation({
      func: (progress) => {
        this.locals.drop.angle = 55 - (10 * progress);
        this.locals.drop.centerY = 67 + (2.7 * progress);
        this.locals.drop.radius = 1.3 + (1.3 * progress);
        this.locals.drop.deltasLength = 1.5 + (1.5 * progress);
      },
      duration: 253,
      easing: _.bezierEasing(0.33, 0, 0.67, 1),
      callback: () => this.dropAnimation3(),
    });
    animation.start();
  }

  dropAnimation3() {
    const animation1 = new Animation({
      func: (progress) => {
        this.locals.drop.centerY = 69.7 + 10 * progress;
        this.locals.drop.endY = 65 + 10 * progress;
      },
      duration: 507,
      delay: 127,
      easing: _.bezierEasing(0.33, 0, 0.67, 1),
    });
    animation1.start();

    const animation2 = new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.locals.drop.centerY = this.locals.drop.centerY - (2.7 * progress);
        this.locals.drop.radius = 2.6 - (1.3 * progress);
        this.locals.drop.deltasLength = 3 - (1.5 * progress);
        this.locals.drop.opacity = 1 * progressReversed;
      },
      duration: 203,
      delay: 434,
      easing: _.bezierEasing(0.33, 0, 0.67, 1),
      callback: () => this.dropAnimation1(),
    });
    animation2.start();
  }

  drawDrop() {
    this.ctx.restore();
    const drop = this.locals.drop;
    const angle = drop.angle * Math.PI / 180;
    if (drop.opacity === 0) {
      return;
    }
    const s = this.size / 100;
    this.ctx.save();
    this.ctx.globalAlpha = drop.opacity;
    this.ctx.fillStyle = `#acc3ff`;
    this.ctx.beginPath();

    this.ctx.arc(
        drop.centerX * s,
        drop.centerY * s,
        drop.radius * s,
        0,
        Math.PI,
    );

    this.ctx.bezierCurveTo(
        (drop.centerX - drop.radius) * s,
        drop.centerY * s,
        (drop.endX - drop.deltasLength * Math.sin(angle)) * s,
        (drop.endY + drop.deltasLength * Math.cos(angle)) * s,
        drop.endX * s,
        drop.endY * s
    );

    this.ctx.bezierCurveTo(
        drop.endX * s,
        drop.endY * s,
        (drop.endX + drop.deltasLength * Math.sin(angle)) * s,
        (drop.endY + drop.deltasLength * Math.cos(angle)) * s,
        (drop.centerX + drop.radius) * s,
        drop.centerY * s,
    );
    this.ctx.fill();
    this.ctx.restore();
  }

  clipKeyArea() {
    const {x, y, size, imageId} = this.objects.key;
    const image = this.images[imageId];

    const width = this.size * (size / 100);
    const height = (this.size * (size / 100) * image.height) / image.width;
    const keyX = this.size * (x / 100) - width / 2;
    const keyY = this.size * (y / 100) - height / 2;
    const keyRadius = width / 2;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(0, keyY);
    this.ctx.lineTo(keyX + width / 2, keyY);
    this.ctx.arc(
        keyX + keyRadius,
        keyY + keyRadius,
        keyRadius,
        Math.PI * 1.5,
        Math.PI * 0.27
    );

    this.ctx.lineTo(keyX + width, keyY + height);
    this.ctx.lineTo(keyX + width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.closePath();
    this.ctx.clip();
  }
}
