import * as THREE from "three";

function drawStartPointCircle(
  radius: number,
  segments: number,
  color: string,
  x: number,
  y: number,
  z: number
) {
  const circleGeometry = new THREE.CircleGeometry(radius, segments);
  const circleMaterial = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
  });

  const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
  circleMesh.rotateX(-Math.PI / 2);
  circleMesh.position.set(x, y, z);

  return circleMesh;
}

export default drawStartPointCircle;
