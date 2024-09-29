import * as THREE from "three";

class Fence extends THREE.Group {
  constructor(materialsFactory, config) {
    super();
    this.materialsFactory = materialsFactory;
    this.options = config.options;
    this.constructChildren();
  }

  constructChildren() {
    this.addFence();
  }

  addFence() {
    const {radius, startAngle, columnsBeetweenAngle, columnsCount, column} = this.options;
    const radianStartAngle = startAngle * Math.PI / 180;
    const radianСolumnsBeetweenAngle = columnsBeetweenAngle * Math.PI / 180;
    new Array(columnsCount)
    .fill(``)
    .forEach((_item, index) => {
      const angle = radianStartAngle + radianСolumnsBeetweenAngle * index;
      const x = radius * Math.sin(angle);
      const y = column.height / 2;
      const z = radius * Math.cos(angle);
      this.addColumn({...column, position: [x, y, z]});
    });
  }

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
