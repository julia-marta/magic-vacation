import {ChatResults} from "../common/enums.js";
export default class Chat {
  constructor(resultsSwitcher) {
    this.resultsSwitcher = resultsSwitcher;
    this.messageForm = document.getElementById(`message-form`);
    this.messageField = document.getElementById(`message-field`);
    this.messageList = document.getElementById(`messages`);
    this.chatBlock = document.querySelector(`.js-chat`);

    this._initChatListeners();
  }

  _initChatListeners() {
    this.messageForm.addEventListener(`submit`, (e) => {
      e.preventDefault();
      this._postQuestion();
    });
  }

  _scrollToBottom() {
    if (this.messageList.scrollHeight > this.chatBlock.offsetHeight) {
      this.chatBlock.scrollTop = this.messageList.scrollHeight;
    }
  }

  _getAnswer() {
    setTimeout(() => {
      let answerEl = document.createElement(`li`);
      let placeholder = document.createElement(`div`);
      let textEl = document.createElement(`p`);
      placeholder.classList.add(`chat__placeholder`);
      for (let i = 0; i < 3; i++) {
        let dot = document.createElement(`span`);
        placeholder.appendChild(dot);
      }
      answerEl.appendChild(placeholder);
      answerEl.classList.add(`chat__message`);
      answerEl.classList.add(`chat__message--incoming`);
      answerEl.classList.add(`chat__message--last`);
      let answer = Math.floor(Math.random() * 2);
      let answerText;

      if (answer) {
        answerText = `Да`;
      } else {
        answerText = `Нет`;
      }

      textEl.innerText = answerText;
      textEl.classList.add(`hidden`);
      answerEl.appendChild(textEl);
      this.messageList.appendChild(answerEl);
      this._scrollToBottom();

      setTimeout(() => {
        let lastMessage = document.querySelector(`.chat__message--last`);
        if (lastMessage) {
          let lastMessagePlaceholder = lastMessage.querySelector(`.chat__placeholder`);
          let lastMessageText = lastMessage.querySelector(`p`);
          lastMessagePlaceholder.classList.add(`chat__placeholder--hidden`);
          setTimeout(function () {
            lastMessagePlaceholder.remove();
          }, 400);
          lastMessageText.classList.remove(`hidden`);
          lastMessage.classList.remove(`chat__message--last`);
        }
      }, 700);
    }, 700);
  }

  _postQuestion() {
    if (this.messageField.value) {
      let isResult;
      let messageEl = document.createElement(`li`);
      messageEl.classList.add(`chat__message`);
      let messageText = this.messageField.value;
      let text = document.createElement(`p`);
      text.innerText = messageText;
      messageEl.appendChild(text);
      messageEl.classList.add(`chat__message--outcoming`);
      this.messageList.appendChild(messageEl);
      this.messageField.value = ``;
      this.messageField.setAttribute(`disabled`, `true`);
      this._scrollToBottom();

      Object.entries(ChatResults).forEach(([key, value]) => {
        if (value === messageText) {
          isResult = true;
          setTimeout(() => {
            this.resultsSwitcher.showResultScreen(key);
            this.clearChat();
          }, 700);
        }
      });

      if (!isResult) {
        this._getAnswer();
        this.messageField.removeAttribute(`disabled`);
        this.messageField.focus();
      }
    }
  }

  clearChat() {
    this.messageList.innerHTML = ``;
    this.messageField.focus();
  }
}

