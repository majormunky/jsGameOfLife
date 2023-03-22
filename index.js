const canvas = new fabric.Canvas("canvas");
const cellSize = 20;
const cellsWide = 20;
const cellsHigh = 20;

const drawGrid = (cellSize, cellsWide, cellsHigh, canvas) => {
    const width = cellSize * cellsWide;
    const height = cellSize * cellsHigh;

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

const drawCells = (cellSize, cells, canvas) => {
    cells.forEach((cell) => {
        const x = cell[0] * cellSize;
        const y = cell[1] * cellSize;

        canvas.add(new fabric.Rect({
            left: x,
            top: y,
            width: cellSize,
            height: cellSize,
            fill: "red"
        }));
    })
};

canvas.setWidth(cellSize * cellsWide + 1);
canvas.setHeight(cellSize * cellsHigh + 1);

drawGrid(cellSize, cellsWide, cellsHigh, canvas);
