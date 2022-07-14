import {getRandomDecimal} from "../common/utils.js";

export default class AccentTypographyBuild {
  constructor(elementSelector, duration, minDelay, maxDelay) {
    this.elementSelector = elementSelector;
    this.element = document.querySelector(this.elementSelector);
    this.duration = duration;
    this.minDelay = minDelay;
    this.maxDelay = maxDelay;
    this.classForActivate = `accent-typography--active`;
    this.prepareText();
  }

  createLetterElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.animationDelay = this.getLetterAnimationDelay();
    span.style.animationDuration = this.duration;
    return span;
  }

  getLetterAnimationDelay() {
    return `${getRandomDecimal(this.minDelay, this.maxDelay)}s`;
  }

  prepareText() {
    if (!this.element) {
      return;
    }

    const text = this.element.textContent.trim().split(/[\s]+/);
    const {length} = text;

    const content = text.reduce((fragmentParent, word, index) => {
      const wordElement = Array.from(word).reduce((fragment, letter) => {
        fragment.appendChild(this.createLetterElement(letter));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`slogan__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      if (index < length - 1) {
        fragmentParent.appendChild(document.createTextNode(` `));
      }

      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }

  runAnimation() {
    if (!this.element) {
      return;
    }

    this.element.classList.add(this.classForActivate);
  }

  destroyAnimation() {
    this.element.classList.remove(this.classForActivate);
  }
}
