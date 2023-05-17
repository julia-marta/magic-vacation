import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import _ from "../common/easings.js";

// модуль для анимации 2D-сцены с моржом
export default class Scene2DSeaCalf extends Scene2D {
  constructor(options) {
    const canvas = document.getElementById(options.canvas);

    super({
      canvas,
      objects: options.objects,
      locals: options.locals,
      imagesUrls: options.imagesUrls,
    });

    // определяем коллбэк, вызываемый после получения настроек
    // он будет вызван в методе initObjects после определения всех настроек
    this.afterInit = () => {
    // в нашем случае это отрисовка пузыря
    // записываем к объекту самолета под ключом before функцию отрисовки пузыря
    // она вызовется в методе drawScene перед отрисовкой элемента сцены
      this.objects.plane.before = this.drawBlob.bind(this);
    };

    this.initEventListeners();
    this.initObjects();
    this.start();
  }

  // метод создания анимаций
  initAnimations() {
    // создаем анимацию, передаем в неё метод перерисовки сцены как бесконечную анимацию
    // добавляем в массив анимаций
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initPlaneAnimations();
    this.initBlobAnimations();
    this.initTreesAnimations();
    this.initSeaCalfAnimations();
    this.initSnowflakesAnimations();
  }

  // метод создания анимаций самолета
  initPlaneAnimations() {
    // создаем анимацию, передаем в неё метод изменения параметров самолёта
    this.animations.push(new Animation({
      // на вход получаем прогресс из модуля Animation
      func: (progress) => {
        // оставшийся прогресс
        const progressReversed = 1 - progress;
        // смещаем самолёт по горизонтали вправо (отриц значение увеличивается согласно оставшемуся прогрессу, начиная с исходной точки -40)
        this.objects.plane.transforms.translateX = -40 * progressReversed;
        // смещаем самолёт по вертикали по синусоиде (берём синус угла от ПИ до 0 - положительный)
        // множитель растягивает траекторию, а слагаемое смещает
        // примечание: синусоида выглядит зеркально, пч ось Y направлена вниз, а не вверх (обратная система координат)
        this.objects.plane.transforms.translateY =
          5 * Math.sin(Math.PI * progressReversed) - 15 * progressReversed;
        // поворачаиваем самолёт по вертикали по синусоиде (берём синус угла от ПИ до 0 - положительный)
        // слагаемое 45 скорее всего из-за того, что изначально самолёт повёрнут на 45 градусов
        // синус от ПИ до 0 сначала увеличивается, потом уменьшается, соответственно угол поворота тоже
        // с увеличением угла идет наклон вправо (нос самолета вниз), а с увеличением смещения по вертикали движение тоже идет вниз
        // поэтому тут получается что наклон как бы следует за траекторией
        this.objects.plane.transforms.rotate =
          45 * Math.sin(Math.PI * progressReversed) + 45 * progressReversed;
        // непрозрачность равна прогрессу (появляется постепенно)
        this.objects.plane.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: _.easeInQuad
    }));
  }

  // метод создания анимаций пузыря (самолетного следа)
  initBlobAnimations() {
    // создаем анимацию, передаем в неё метод изменения параметров пузыря
    this.animations.push(new Animation({
      // на вход получаем прогресс из модуля Animation
      func: (progress) => {
        // оставшийся прогресс
        const progressReversed = 1 - progress;
        // изначальный радиус умножаем на прогресс, таким образом он увеличивается от 0 до 15 (так растёт "арка")
        this.locals.blob.radius = 15 * progress;
        // поднимаем центр пузыря вверх на 15 пикс и постепенно опускаем в исходную точку
        this.locals.blob.centerY = 55 - 15 * progressReversed;
        // смещаем кончик пузыря на 35 влево и постепенно двигаем в исходную точку (за самолетом)
        this.locals.blob.endX = 87 - 35 * progressReversed;
        // смещаем кончик пузыря на 12 вверх и постепенно двигаем в исходную точку (за самолетом)
        this.locals.blob.endY = 53 - 12 * progressReversed;
        // угол изгиба увеличиваем на 120 и постепенно уменьшаем до исходного
        // таким образом изгиб меняем направление
        this.locals.blob.angle = 40 + 120 * progressReversed;
        // расстояние до контрольной точки изогнутой кривой умножаем на прогресс
        // таким образом происходит плавный изгиб пузыря
        this.locals.blob.deltasLength = 10 * progress;
        // непрозрачность равна прогрессу (появляется постепенно)
        this.locals.blob.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: _.easeInQuad
    }));
  }

  // метод создания анимаций деревьев
  initTreesAnimations() {
    // создаем анимацию, передаем в неё метод изменения параметров первого дерева
    this.animations.push(new Animation({
      // на вход получаем прогресс из модуля Animation
      func: (progress) => {
        // оставшийся прогресс
        const progressReversed = 1 - progress;
        // двигаем дерево вверх от 30 до 0
        this.objects.tree.transforms.translateY = 30 * progressReversed;
        // непрозрачность равна прогрессу (появляется постепенно)
        this.objects.tree.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: _.easeInQuad
    }));
    // создаем анимацию, передаем в неё метод изменения параметров второго дерева
    this.animations.push(new Animation({
      // на вход получаем прогресс из модуля Animation
      func: (progress) => {
        // оставшийся прогресс
        const progressReversed = 1 - progress;
        // двигаем дерево вверх от 30 до 0
        this.objects.tree2.transforms.translateY = 30 * progressReversed;
        // непрозрачность равна прогрессу (появляется постепенно)
        this.objects.tree2.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: _.easeInQuad
    }));
  }

  // метод создания анимации тюленя на льдине
  initSeaCalfAnimations() {
    // анимация движения и поворота
    // создаем анимацию, передаем в неё метод изменения параметров тюленя и льдины
    this.animations.push(new Animation({
      // на вход получаем прогресс из модуля Animation
      func: (progress) => {
        // оставшийся прогресс
        const progressReversed = 1 - progress;
        // двигаем тюленя вверх от 30 до 0
        // движение с отскоком за счет изинга Elastic
        this.objects.seaCalf.transforms.translateY = 30 * progressReversed;
        // вращение тюленя по синусоиде, берём в качестве параметра оставшийся прогресс от 1 до 0
        // множитель параметра увеличивает резкость поворота, так как синусоида сжимается по оси X
        // множитель всей функции увеличивает сам угол наклона, отрицательное значение - противоположное синусоиде направление
        this.objects.seaCalf.transforms.rotate = -30 * Math.sin(progressReversed * 2);
        // двигаем и поворачиваем льдину
        // все параметры аналогичны тюленю
        this.objects.ice.transforms.translateY = 30 * progressReversed;
        this.objects.ice.transforms.rotate = -30 * Math.sin(progressReversed * 2);
      },
      duration: 2000,
      delay: 1000,
      easing: _.easeOutElastic
    }));

    // анимация появления тюленя и льдины
    this.animations.push(new Animation({
      func: (progress) => {
        // получаем прогресс из модуля Animation и задаем его значение непрозрачности
        this.objects.seaCalf.opacity = progress;
        this.objects.ice.opacity = progress;
      },
      duration: 100,
      delay: 1000,
      easing: _.easeInQuad
    }));
  }


  // метод создания анимаций снежинок
  initSnowflakesAnimations() {
    // создаем анимацию, передаем в неё метод изменения параметров первой снежинки
    // фоновая бесконечная анимация движения
    this.animations.push(new Animation({
      // на вход получаем прогресс из модуля Animation и опциональные параметры
      func: (progress, details) => {
        // колебания по вертикали задаются с помощью синусоиды
        // в качестве параметра используется разница между временем начала выполнения функции и начала анимации в секундах
        // получается значение от 0 до бесконечности, которое каждую секунду увелчивается на 1
        // множитель параметра увеличивает резкость движения, так как синусоида сжимается по оси X
        // множитель всей функции увеличивает амплитуду (значение translateY получается больше)
        // откда взяты множители - не очень понятно, видимо "на глаз"
        this.objects.snowflake.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`
    }));

    // создаем анимацию, передаем в неё метод изменения параметров второй снежинки
    // фоновая бесконечная анимация движения
    // всё аналогично анимации первой, в тч множители-коэффициенты, только анимация начинается с задержкой на 800
    this.animations.push(new Animation({
      func: (progress, details) => {
        this.objects.snowflake2.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`,
      delay: 800
    }));

    // создаем анимацию, передаем в неё метод изменения параметров первой снежинки
    // единоразовая анимация появления
    this.animations.push(new Animation({
      func: (progress) => {
        // получаем прогресс и задаем его значение непрозрачности
        this.objects.snowflake.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: _.easeInQuad
    }));

    // создаем анимацию, передаем в неё метод изменения параметров второй снежинки
    // единоразовая анимация появления
    this.animations.push(new Animation({
      func: (progress) => {
        // получаем прогресс и задаем его значение непрозрачности
        this.objects.snowflake2.opacity = progress;
      },
      duration: 500,
      delay: 1900,
      easing: _.easeInQuad
    }));
  }

  // метод отрисовки пузыря (самолетного следа)
  drawBlob() {
    // объект с параметрами в константу
    const b = this.locals.blob;
    // переводим угол в радианы
    const angle = b.angle * Math.PI / 180;
    // если элемент невидим, прерываем отрисовку
    if (b.opacity === 0) {
      return;
    }
    // размер окна в ремах
    const s = this.size / 100;
    // сохраняем контекст
    this.ctx.save();
    // непрозрачность и заливка холста
    this.ctx.globalAlpha = b.opacity;
    this.ctx.fillStyle = `#acc3ff`;
    // начало отрисовки контура
    this.ctx.beginPath();
    // рисуем дугу с помощью метода arc
    // принимает координты центра дуги, радиус, угол начала дуги и угол завершения дуги
    // координаты и радиус берём из объекта, углы от 90 до 270 градусов
    this.ctx.arc(
        b.centerX * s,
        b.centerY * s,
        b.radius * s,
        Math.PI / 2,
        Math.PI * 3 / 2
    );

    // рисуем верхнюю кривую
    // первая точка: верхний правый край арки со смещением на 10 вправо
    // вторая точка: координаты вычисляются как катеты треугольника с гипотенузой deltasLength и углом angle
    // УТОЧНИТЬ откуда изначально берутся эти данные
    // конечная точка: острый край пузыря
    this.ctx.bezierCurveTo(
        (b.centerX + 10) * s,
        (b.centerY - b.radius) * s,
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        b.endX * s,
        b.endY * s
    );

    // рисуем нижнюю кривую
    // первая точка: совпадает со второй контрольной точкой верхей кривой
    // вторая точка: нижний правый край арки со смещением на 10 вправо
    // конечная точка: нижний правый край арки
    this.ctx.bezierCurveTo(
        (b.endX - b.deltasLength * Math.sin(angle)) * s,
        (b.endY + b.deltasLength * Math.cos(angle)) * s,
        (b.centerX + 10) * s,
        (b.centerY + b.radius) * s,
        b.centerX * s,
        (b.centerY + b.radius) * s
    );

    this.ctx.fill();
    this.ctx.restore();

    // ПОЗЖЕ УДАЛИТЬ: треугольник с гипотенузой deltasLength и углом angle для кривых пузыря
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = `red`;
    // this.ctx.moveTo(b.endX * s,
    //     b.endY * s);
    // this.ctx.lineTo((b.endX - b.deltasLength * Math.sin(angle)) * s,
    //     (b.endY + b.deltasLength * Math.cos(angle)) * s);
    // this.ctx.lineTo((b.endX - b.deltasLength * Math.sin(angle)) * s,
    //     b.endY * s);
    // this.ctx.lineTo(b.endX * s,
    //     b.endY * s);
    // this.ctx.stroke();
  }
}
