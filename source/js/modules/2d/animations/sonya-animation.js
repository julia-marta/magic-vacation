export default class SonyaAnimation {
  constructor(animations) {
    this.animations = animations;
    this.sonya = document.getElementById(`sonya`);
    this.sonyaAnimation = null;
    this.start = this.start.bind(this);
    this.finish = this.finish.bind(this);
  }

  start() {
    const {transform, bounce} = this.animations;
    this.createSonyaAnimation(transform);

    this.sonyaAnimation.onfinish = () => {
      this.createSonyaAnimation(bounce);

      this.sonyaAnimation.onfinish = () => {
        this.sonyaAnimation.reverse();
      };
    };
  }

  finish() {
    if (!this.sonyaAnimation) {
      return;
    }
    const {transform} = this.animations;

    this.sonyaAnimation.onfinish = () => {};
    this.sonyaAnimation.cancel();
    this.createSonyaAnimation(transform);
    this.sonyaAnimation.reverse();

    this.sonyaAnimation.onfinish = () => {
      this.sonyaAnimation = null;
    };
  }

  createSonyaAnimation(data) {
    const {keyframes, options} = data;
    this.sonyaAnimation = this.sonya.animate(keyframes, options);
  }
}
