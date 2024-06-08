import * as THREE from "three";

class Fence extends THREE.Group {
  constructor(materialsFactory, options) {
    super();
    this.materialsFactory = materialsFactory;
    this.options = options;
    this.constructChildren();
  }

  constructChildren() {
    this.addFence();
  }

  // добавляет ограду из столбиков по заданным опциям (радиус ограды, стартовый угол, угол между столбиками, кол-во столбиков)
  addFence() {
    const {radius, startAngle, columnsBeetweenAngle, columnsCount, column} = this.options;

    // переводим углы в радианы
    const radianStartAngle = startAngle * Math.PI / 180;
    const radianСolumnsBeetweenAngle = columnsBeetweenAngle * Math.PI / 180;
    new Array(columnsCount)
    .fill(``)
    .forEach((_item, index) => {
      // находим угол следующей точки (между осью X и отрезком из точки до центра окружности)
      const angle = radianStartAngle + radianСolumnsBeetweenAngle * index;
      // находим координаты точки по формулам
      const x = radius * Math.sin(angle);
      const y = column.height / 2;
      const z = radius * Math.cos(angle);
      this.addColumn({...column, position: [x, y, z]});
    });
  }

  // добавляет столбик ограды
  addColumn(data) {
    const {radiusTop, radiusBottom, height, radialSegments, material, position, rotation} = data;
    const columnGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const columnMaterial = this.materialsFactory.get(material);
    const column = new THREE.Mesh(columnGeometry, columnMaterial);

    if (position) {
      column.position.set(...position);
    }

    if (rotation) {
      column.rotation.set(...rotation);
    }

    this.add(column);
  }
}

export default Fence;
