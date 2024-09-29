export default class PrizesAnimation {
  constructor(prizes) {
    this.prizes = prizes;
    this.timeline = [];
    this.fps = 12;
    this.fpsInterval = 1000 / this.fps;
    this.SMILelements = [...document.querySelectorAll(`.prizes__svg`)];
    this.CSSanimations = [];
    this.frameAnimation = null;
    this.frameAnimationElement = null;
    this.frameAnimationDuration = null;
    this.frameAnimationStartTime = null;
    this.frameAnimationCurrentTime = null;
    this.frameAnimationElapsedTime = null;
    this.frameAnimationStartValue = null;
    this.frameAnimationEndValue = null;
    this.frameAnimationCurrentValue = null;
    this.frameAnimationStep = null;
  }

  init() {
    this._resetSMILAnimations(this.SMILelements);
    this.prizes.forEach((prize) => {
      const {name, animations, startDelay} = prize;
      const id = setTimeout(() => {
        this._startPrizeAnimations(name, animations);
      }, startDelay);
      this.timeline.push(id);
    });
  }

  _runSMILAnimation(element, animation) {
    element.setCurrentTime(0);
    element.unpauseAnimations();
    animation.beginElement();
  }

  _resetSMILAnimations(elements) {
    elements.forEach((element) => {
      element.setCurrentTime(0);
      element.pauseAnimations();
    });
  }

  _runCSSAnimation(element, keyframes, options) {
    const CSSanimation = element.animate(keyframes, options);
    this.CSSanimations.push(CSSanimation);
  }

  _stopCSSAnimations(animations) {
    animations.forEach((animation) => {
      animation.cancel();
    });
    this.CSSanimations = [];
  }

  _runFrameAnimation(element, startValue, endValue, duration) {
    this.frameAnimationStartTime = Date.now();
    this.frameAnimationElement = element;
    this.frameAnimationDuration = duration;
    this.frameAnimationStartValue = startValue;
    this.frameAnimationEndValue = endValue;
    this.frameAnimationCurrentValue = this.frameAnimationStartValue;
    this.frameAnimationStep = this._getFrameAnimationStep();
    this._runCounter();
  }

  _stopFrameAnimation() {
    window.cancelAnimationFrame(this.frameAnimation);
    this.frameAnimation = null;
    this.frameAnimationElement = null;
    this.frameAnimationDuration = null;
    this.frameAnimationStartTime = null;
    this.frameAnimationCurrentTime = null;
    this.frameAnimationElapsedTime = null;
    this.frameAnimationStartValue = null;
    this.frameAnimationEndValue = null;
    this.frameAnimationCurrentValue = null;
    this.frameAnimationStep = null;
  }

  _getFrameAnimationStep() {
    const numericalSeries =
      this.frameAnimationEndValue - this.frameAnimationStartValue + 1;
    return Math.ceil(
        numericalSeries / (this.frameAnimationDuration / this.fpsInterval)
    );
  }

  _runCounter() {
    this.frameAnimation = window.requestAnimationFrame(
        this._runCounter.bind(this)
    );

    this.frameAnimationCurrentTime = Date.now();
    this.frameAnimationElapsedTime =
      this.frameAnimationCurrentTime - this.frameAnimationStartTime;

    if (this.frameAnimationElapsedTime > this.fpsInterval) {
      this.frameAnimationStartTime =
        this.frameAnimationCurrentTime -
        (this.frameAnimationElapsedTime % this.fpsInterval);
      this._setCounterValue();
    }
  }

  _setCounterValue() {
    if (!this.frameAnimationElement) {
      return;
    }
    if (this.frameAnimationCurrentValue <= this.frameAnimationEndValue) {
      this.frameAnimationElement.textContent = this.frameAnimationCurrentValue;
      this.frameAnimationCurrentValue += this.frameAnimationStep;
    } else {
      this.frameAnimationElement.textContent = this.frameAnimationEndValue;
      this._stopFrameAnimation();
    }
  }

  _startPrizeAnimations(prizeName, animations) {
    const {SMIL, CSS, frame} = animations;
    const SMILanimation = document.getElementById(SMIL);
    const SMILelement = this.SMILelements.filter((element) =>
      element.classList.contains(`prizes__svg--${prizeName}`)
    )[0];
    const prizeBlock = document.querySelector(`.prizes__item--${prizeName}`);
    const prizeCount = prizeBlock.querySelector(`.prizes__desc > b`);
    const prizeDesc = prizeBlock.querySelector(`.prizes__desc > span`);

    const elements = {
      block: prizeBlock,
      count: prizeCount,
      desc: prizeDesc,
    };

    this._runSMILAnimation(SMILelement, SMILanimation);

    CSS.forEach((animation) => {
      const {element, keyframes, options} = animation;
      this._runCSSAnimation(elements[element], keyframes, options);
    });

    if (frame) {
      const {startValue, endValue, duration, delay} = frame;
      setTimeout(() => {
        this._runFrameAnimation(prizeCount, startValue, endValue, duration);
      }, delay);
    }
  }

  destroy() {
    this.timeline.forEach((id) => {
      clearTimeout(id);
    });
    this.timeline = [];
    this._stopCSSAnimations(this.CSSanimations);
    this._resetSMILAnimations(this.SMILelements);
  }
}
