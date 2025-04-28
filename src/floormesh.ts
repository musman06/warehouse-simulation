import * as THREE from "three";
import { warehouseGroup, warehouseModel } from "./gltfloader";
import SpriteText from "three-spritetext";

// floor mesh variables
export let rows: number;
export let columns: number;
export const cellSizeX: number = 1.8;
export const cellSizeZ: number = 2.2;
export let startX: number;
export let startZ: number;

// for storing cells
interface CellInfo {
  cell: THREE.Mesh;
  isOccupied: boolean;
  changeCellColor(): void;
}

export const gridCells: CellInfo[][] = [];
const gridGroup = new THREE.Group();
warehouseGroup.add(gridGroup);

// Calculating Rows & Columns Based On Warehouse Floor
const sizeFloor = new THREE.Vector3();
warehouseModel?.boundingBox.getSize(sizeFloor);
rows = Math.floor(sizeFloor.x / cellSizeX);
columns = Math.floor(sizeFloor.z / cellSizeZ);

// Assume bottom-left corner as origin (could also use boundingBox.min if needed)
startX = warehouseModel?.boundingBox.min.x ?? 0;
startZ = warehouseModel?.boundingBox.min.z ?? 0;

for (let i = 0; i < rows; i++) {
  gridCells[i] = [];
  for (let j = 0; j < columns; j++) {
    const geometry = new THREE.PlaneGeometry(cellSizeX, cellSizeZ);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00, // green for free
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });

    const cell = new THREE.Mesh(geometry, material);
    cell.rotation.x = -Math.PI / 2; // make it horizontal (on floor)

    // Positioning center of the cell
    cell.position.x = startX + cellSizeX / 2 + i * cellSizeX;
    cell.position.z = startZ + cellSizeZ / 2 + j * cellSizeZ;
    cell.position.y = 0.1; // slightly above ground to avoid z-fighting

    const cellInfo: CellInfo = {
      cell: cell,
      isOccupied: false,
      changeCellColor: function () {
        const material = this.cell.material as THREE.MeshBasicMaterial;
        if (this.isOccupied) {
          material.color.set("red");
        } else {
          material.color.set("green");
        }
      },
    };

    // Debug label
    const label = new SpriteText(`${i},${j}`);
    label.color = "white";
    label.textHeight = 0.7;
    label.position.set(cell.position.x, 1.5, cell.position.z); // above the cell
    label.rotateX(Math.PI / 2);
    gridGroup.add(label);

    gridGroup.add(cell);
    gridCells[i][j] = cellInfo;
  }
}
// Row 1
// // rack 1
gridCells[2][2].isOccupied = true;
gridCells[2][2].changeCellColor();
gridCells[2][3].isOccupied = true;
gridCells[2][3].changeCellColor();

// // rack 2
gridCells[5][2].isOccupied = true;
gridCells[5][2].changeCellColor();
gridCells[5][3].isOccupied = true;
gridCells[5][3].changeCellColor();

// // rack 3
gridCells[8][2].isOccupied = true;
gridCells[8][2].changeCellColor();
gridCells[8][3].isOccupied = true;
gridCells[8][3].changeCellColor();

// // rack 4
gridCells[11][2].isOccupied = true;
gridCells[11][2].changeCellColor();
gridCells[11][3].isOccupied = true;
gridCells[11][3].changeCellColor();

// Row 2
// // rack 1
gridCells[2][6].isOccupied = true;
gridCells[2][6].changeCellColor();
gridCells[2][7].isOccupied = true;
gridCells[2][7].changeCellColor();

// // rack 2
gridCells[5][6].isOccupied = true;
gridCells[5][6].changeCellColor();
gridCells[5][7].isOccupied = true;
gridCells[5][7].changeCellColor();

// // rack 3
gridCells[8][6].isOccupied = true;
gridCells[8][6].changeCellColor();
gridCells[8][7].isOccupied = true;
gridCells[8][7].changeCellColor();

// // rack 4
gridCells[11][6].isOccupied = true;
gridCells[11][6].changeCellColor();
gridCells[11][7].isOccupied = true;
gridCells[11][7].changeCellColor();

// Row 3
// // rack 1
gridCells[2][10].isOccupied = true;
gridCells[2][10].changeCellColor();
gridCells[2][11].isOccupied = true;
gridCells[2][11].changeCellColor();

// // rack 2
gridCells[5][10].isOccupied = true;
gridCells[5][10].changeCellColor();
gridCells[5][11].isOccupied = true;
gridCells[5][11].changeCellColor();

// // rack 3
gridCells[8][10].isOccupied = true;
gridCells[8][10].changeCellColor();
gridCells[8][11].isOccupied = true;
gridCells[8][11].changeCellColor();

// // rack 4
gridCells[11][10].isOccupied = true;
gridCells[11][10].changeCellColor();
gridCells[11][11].isOccupied = true;
gridCells[11][11].changeCellColor();
