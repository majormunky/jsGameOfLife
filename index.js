const canvas = new fabric.Canvas("canvas");
const cellSize = 20;
const cellsWide = 20;
const cellsHigh = 20;
let grid;

const drawGrid = (cellSize, width, height, canvas) => {
    for (let y = 0; y <= height; y += cellSize) {
        let newLine = new fabric.Line([0, y, width, y], {
            stroke: "black"
        });
        canvas.add(newLine);
    }

    for (let x = 0; x <= width; x += cellSize) {
        let newLine = new fabric.Line([x, 0, x, height], {
            stroke: "black"
        });
        canvas.add(newLine);
    }    
};

const renderGrid = (cellSize, grid, canvas) => {
    const width = cellSize * grid[0].length;
    const height = cellSize * grid.length;
    drawGrid(cellSize, width, height, canvas);
}

const generateGrid = (cellsWide, cellsHigh) => {
    let grid = [];

    for (let y = 0; y < cellsHigh; y++) {
        let row = [];
        for (let x = 0; x < cellsWide; x++) {
            row.push(0)
        }
        grid.push(row);
    }
    return grid;
}

document.addEventListener("DOMContentLoaded", () => {
    canvas.setWidth(cellSize * cellsWide + 1);
    canvas.setHeight(cellSize * cellsHigh + 1);

    grid = generateGrid(cellsWide, cellsHigh);

    renderGrid(cellSize, grid, canvas);
});

