
// вспомогательный модуль-класс для 2D-сцены, от которого наследуются модули конкретных сцен
export default class Scene2D {
  constructor(options) {
    // параметры холста
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext(`2d`);
    // размер окна, относительно которого вычисляются размеры и координаты в сцене
    // равен ширине или высоте окна (минимальному значению)
    this.size = 100;
    // картинки
    this.images = {};
    // объекты и настройки
    this.objects = {};
    this.objectsSettings = options.objects;
    // локальные объекты сцены
    this.locals = options.locals;
    // флаг загрузки картинок
    this.isLoaded = false;
    // флаг ожидания картинок
    this.isWaitingForImages = false;
    // флаг начала
    this.isStarted = false;
    // массив анимаций
    this.animations = [];
    // коллбэк после получения настроек
    this.afterInit = () => {};
    // настройкы объектов
    this.initObjects();
    // добавление обработчиков
    this.initEventListeners();
    // обновление размера
    this.updateSize();
    // загрузка картинок, передаем урлы из options
    this.loadImages(options.imagesUrls);
  }
  // метод добавления обработчиков
  initEventListeners() {
    // обновляем размеры по ресайзу окна
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }
  // метод настройки объектов
  initObjects() {
    // перебираем объект с настройками
    for (const name in this.objectsSettings) {
      // если в объекте есть такой ключ (не наследуемый)
      if (Object.prototype.hasOwnProperty.call(this.objectsSettings, name)) {
        // обращаемся к значению ключа, которое также является объектом
        const o = this.objectsSettings[name];
        // создаем элемент сцены с аналогичным именем
        // заполняем его параметрами
        this.objects[name] = {};
        // айди картинки
        this.objects[name].imageId = o.imageId;
        // функции до и после
        this.objects[name].before = o.before;
        this.objects[name].after = o.after;
        // координаты
        this.objects[name].x = o.x;
        this.objects[name].y = o.y;
        // размер
        this.objects[name].size = o.size;
        // непрозрачность
        this.objects[name].opacity = o.opacity;
        // трансформации
        this.objects[name].transforms = {};
        // поворот
        this.objects[name].transforms.rotate = o.transforms.rotate;
        // положение
        this.objects[name].transforms.translateX = o.transforms.translateX;
        this.objects[name].transforms.translateY = o.transforms.translateY;
        // масштаб
        this.objects[name].transforms.scaleX = o.transforms.scaleX;
        this.objects[name].transforms.scaleY = o.transforms.scaleY;
      }
    }
    // вызываем коллбэк после настроек если он есть
    if (this.afterInit && typeof this.afterInit === `function`) {
      this.afterInit();
    }
  }
  // метод настройки локальных объектов сцены - определяется в классе, который наследует
  // в нашем случае не нужно ничего определять дополнительно, поскольку передаём locals сразу в constructor в options
  initLocals() {}

  // метод создания анимаций - определяется в классе, который наследует
  initAnimations() {}

  // метод загрузки картинок
  loadImages(imagesUrls) {
    // счетчик загрузок
    let loadingCounter = 0;
    // перебираем объект с урлами
    for (const name in imagesUrls) {
      // если в объекте есть такой ключ (не наследуемый)
      if (Object.prototype.hasOwnProperty.call(imagesUrls, name)) {
        // создаем объект изображения
        const image = new Image();
        // по завершению загрузки увеличиваем счетчик
        image.addEventListener(`load`, () => {
          loadingCounter++;
          // если значение счетчика равно кол-ву ключей в объекте
          if (loadingCounter === Object.keys(imagesUrls).length) {
            // завершаем загрузку
            this.isLoaded = true;
            // если еще ожидаются картинки (в том случае, когда до этого вызывали start, а изображения не были загружены)
            if (this.isWaitingForImages) {
              // запускаем анимацию
              this.start();
            } else {
              // если не ожидаются (метод start не вызывался), отрисовываем сцену
              this.drawScene();
            }
          }
        });
        // добавляем в объект с картинками по нужному ключу изображение
        this.images[name] = image;
        // добавляем урл изображению
        image.src = imagesUrls[name];
      }
    }
  }
  // метод запуска анимации
  start() {
    // если картинки еще не загружены
    if (!this.isLoaded) {
      // устанавливаем флаг ожидания
      this.isWaitingForImages = true;
      // прерываем метод
      return;
    }
    // если анимация уже запущена
    if (this.isStarted) {
      // останавливаем
      this.stop();
      // заново настраиваем объекты
      this.initObjects();
    }
    // если нет анимаций
    if (this.animations.length === 0) {
      // настраиваем анимации
      this.initAnimations();
    }
    // перебираем все анимации и стартуем каждую
    this.animations.forEach((animation) => {
      animation.start();
    });
    // устанавливаем флаг старта
    this.isStarted = true;
  }

  // метод остановки анимаций
  stop() {
    // перебираем все анимации и останавливаем каждую
    this.animations.forEach((animation) => {
      animation.stop();
    });
  }

  // метод отрисовки изображения И ТРАНСФОРМАЦИЙ
  // принимает картинку и элемент сцены
  // этот метод вызывается внутри drawScene, который запускается как бесконечная анимация, так происходит перерисовка сцены
  drawImage(image, object) {
    // координаты элемента
    let x = object.x;
    let y = object.y;
    // размер элемента
    let size = object.size;
    // непрозрачность элемента
    let opacity = object.opacity;
    // трансформации элемента
    let transforms = object.transforms;
    // если непрозрачность равна нулю (объект невидим), прерываем отрисовку
    if (opacity === 0) {
      return;
    }
    // если масштаб равен нулю (объект невидим), прерываем отрисовку
    if (transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
      return;
    }
    // деление на 100 - это по всей видимости перевод в ремы, далее проверить-уточнить
    // ширина равна размеру окна умноженному на одну сотую размера элемента
    let width = this.size * (size / 100);
    // высота равна размеру окна умноженному на одну сотую размера элемента и на высоту картинки деленному на ширину картинки
    let height = (this.size * (size / 100) * image.height) / image.width;
    // координата х равна размеру окна умноженному на одну сотую координаты х минус половина ширины
    // координата у равна размеру окна умноженному на одну сотую координаты у минус половина высоты
    x = this.size * (x / 100) - width / 2;
    y = this.size * (y / 100) - height / 2;
    // флаг трансофрмации
    const isContextTransforming =
      opacity ||
      (transforms &&
        (transforms.rotate || transforms.scaleX || transforms.scaleY));
    // если трансформация есть, сохраняем контекст
    if (isContextTransforming) {
      this.ctx.save();
    }
    // если есть трансформации:
    if (transforms) {
      // положения по горизонтали
      if (transforms.translateX) {
        // к координате х добавляем сдвиг по горизонтали деленный на 100 и умноженный на размер окна
        x += this.size * (transforms.translateX / 100);
      }
      // положения по вертикали
      if (transforms.translateY) {
        // к координате у добавляем сдвиг по вертикали деленный на 100 и умноженный на размер окна
        y += this.size * (transforms.translateY / 100);
      }
      // поворота
      if (transforms.rotate) {
        // перемещаем холст в нулевую точку элемента
        this.ctx.translate(x + width / 2, y + height / 2);
        // поворачиваем холст на заданный угол в радианах
        this.ctx.rotate((transforms.rotate * Math.PI) / 180);
      }
      // масштаба по горизонтали
      if (transforms.scaleX) {
        // умножаем ширину элемента на масштаб
        width *= transforms.scaleX;
        // если масштаб отрицательный
        if (transforms.scaleX < 0) {
          // отражаем холст по горизонтали
          this.ctx.scale(-1, 1);
          // переносим координату
          x = -x;
        }
      }
      // масштаба по вертикали
      if (transforms.scaleY) {
        // умножаем высоту элемента на масштаб
        height *= transforms.scaleY;
        // если масштаб отрицательный
        if (transforms.scaleY < 0) {
          // отражаем холст по вертикали
          this.ctx.scale(1, -1);
          // переносим координату
          y = -y;
        }
      }
      // перемещаем холст обратно, если ранее был поворот (там перемещали его в нулевую точку)
      if (transforms.rotate) {
        this.ctx.translate(-x - width / 2, -y - height / 2);
      }
    }
    // если есть непрозрачность
    if (opacity) {
      // задаем непрозрачность
      this.ctx.globalAlpha = opacity;
    }
    // отрисовываем картинку
    this.ctx.drawImage(image, x, y, width, height);
    // если трансформация есть, восстанавливаем контекст после трансформаций
    if (isContextTransforming) {
      this.ctx.restore();
    }
  }
  // метод очистки сцены
  clearScene() {
    // очищаем холст
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  // метод отрисовки сцены
  drawScene() {
    // очищаем сцену
    this.clearScene();
    // перебираем объект с элементами сцены
    for (const name in this.objects) {
      // если в объекте есть такой ключ (не наследуемый)
      if (Object.prototype.hasOwnProperty.call(this.objects, name)) {
        // обращаемся к значению ключа, которое также является объектом
        const object = this.objects[name];
        // запускаем функцию до отрисовки, если такая есть
        if (object.before && typeof object.before === `function`) {
          object.before();
        }
        // отрисовываем картинку, соответствующую данному элементу сцены
        // передаем изображение и сам элемент
        this.drawImage(this.images[object.imageId], object);
        // запускаем функцию после отрисовки, если такая есть
        if (object.after && typeof object.after === `function`) {
          object.after();
        }
      }
    }
  }
  // метод обновления размера
  updateSize() {
    // берем ширину или высоту окна (минимальное значение из них)
    this.size = Math.min(window.innerWidth, window.innerHeight);
    // присваиваем данное значение в качестве ширины и высоты холста
    this.canvas.height = this.size;
    this.canvas.width = this.size;
  }
}
