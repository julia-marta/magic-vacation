import _ from "../common/easings.js";

// вспомогательный модуль для работы с любой покадровой анимацией
export default class Animation {
  constructor(options) {
    // параметры анимации
    this.options = options;

    // установка дефолтных значений для параметров

    // временная функция по умолчанию
    if (!this.options.easing) {
      this.options.easing = _.easeLinear;
    }
    // длительность
    if (!this.options.duration) {
      this.options.duration = 1000;
    }
    // задержка
    if (!this.options.delay) {
      this.options.delay = 0;
    }
    // частота
    if (!this.options.fps) {
      this.options.fps = 60;
    }
    // айди таймера
    this.timeoutId = null;
    // айди запущенной анимации
    this.requestId = null;
  }

  // метод запуска анимации
  start(options) {
    // останавливаем уже запущенную анимацию
    this.stop();
    // устанавливаем таймер с анимацией
    this.timeoutId = setTimeout(() => {
      // время начала анимации
      this.startTime = performance.now();
      // интервал обновления
      this.interval = 1000 / this.options.fps;
      // время последнего обновления
      this.lastFrameTime = this.startTime;
      // флаг статуса анимации - не завершена
      this.isFinished = false;
      // функция анимации
      let animateFrame;

      // если анимация бесконечная
      if (this.options.duration === `infinite`) {
        // функция принимает момент времени, когда requestAnimationFrame начинает выполнение данной функции
        animateFrame = (currentTime) => {
          // записываем айди запущенной анимации
          this.requestId = requestAnimationFrame(animateFrame);
          // прошедшее время с момента обновления
          const delta = currentTime - this.lastFrameTime;
          // если прошедшее время больше, чем интервал обновления
          if (delta > this.interval) {
            // запускаем функцию изменения параметров (передается в this.options)
          // в функцию передаём прогресс равный 1 и опционально другие параметры
            this.options.func(1, {
              startTime: this.startTime,
              currentTime,
              isFinished: false,
              options
            });
            // меняем время последнего обновления
            this.lastFrameTime = currentTime - delta % this.interval;
          }
        };

        // если длительность анимации ограничена
      } else {
        // функция принимает момент времени, когда requestAnimationFrame начинает выполнение данной функции
        animateFrame = (currentTime) => {
          // записываем айди запущенной анимации
          this.requestId = requestAnimationFrame(animateFrame);
          // прошедшее время с момента обновления
          const delta = currentTime - this.lastFrameTime;
          // если прошедшее время больше, чем интервал обновления
          if (delta > this.interval) {
            // прогресс анимации (отношение прошедшего времени с начала анимации к ее общей длительности)
            let timeFraction = (currentTime - this.startTime) / this.options.duration;
            // если прошло времени больше чем длительность
            if (timeFraction > 1) {
              // записываем в прогресс 1 и завершаем анимацию
              timeFraction = 1;
              this.isFinished = true;
            }
            // если прогресс меньше длительности
            if (timeFraction <= 1) {
              // получаем изинг с помощью функции easing из options
              const progress = this.options.easing(timeFraction);
              // запускаем функцию изменения параметров (передается в this.options)
              // в функцию передаём временной изинг-прогресс и опционально другие параметры
              this.options.func(progress, {
                startTime: this.startTime,
                currentTime,
                isFinished: this.isFinished,
                options
              });
              // меняем время последнего обновления
              this.lastFrameTime = currentTime - delta % this.interval;
            }
            // если анимация закончена
            if (this.isFinished) {
              // останавливаем анимацию
              this.stop();
              // вызываем коллбэк, если такой присутствует в параметрах
              if (typeof this.options.callback === `function`) {
                this.options.callback();
              }
            }
          }
        };
      }

      this.requestId = requestAnimationFrame(animateFrame);
    // передаем в таймер задержку
    }, this.options.delay);
  }

  // метод перезапуска анимации
  restart() {
    // запуск анимации
    this.start();
  }

  // метод остановки анимации
  stop() {
    // очищение таймера
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    // остановка запущенной анимации
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}
