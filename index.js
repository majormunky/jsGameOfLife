let canvas;
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

const drawCells = (cellSize, grid, canvas) => {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 1) {
                let cellX = x * cellSize;
                let cellY = y * cellSize;
                canvas.add(new fabric.Rect({
                    left: cellX,
                    top: cellY,
                    width: cellSize,
                    height: cellSize,
                    fill: "red"
                }));
            }
        }
    }
}

const renderGrid = (cellSize, grid, canvas) => {
    canvas.clear();
    
    const width = cellSize * grid[0].length;
    const height = cellSize * grid.length;
    drawGrid(cellSize, width, height, canvas);
    drawCells(cellSize, grid, canvas);
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

const getNeighborCount = (x, y, grid) => {
    const gridWidth = grid[0].length;
    const gridHeight = grid.length;
    let neighborCount = 0;

    for (let gridY = y - 1; gridY < y + 2; gridY++) {
        for (let gridX = x - 1; gridX < x + 2; gridX++) {
            if ((gridX > gridWidth) || (gridY > gridHeight)) {
                continue;
            }
            if ((gridX == x) && (gridY == y)) {
                continue;
            }
            if (grid[gridY][gridX] === 1) {
                neighborCount++;
            }
        }
    }

    return neighborCount;
}

const step = (grid) => {

}

document.addEventListener("DOMContentLoaded", () => {
    canvas = new fabric.Canvas("canvas");
    canvas.setWidth(cellSize * cellsWide + 1);
    canvas.setHeight(cellSize * cellsHigh + 1);

    canvas.on("mouse:down", (options) => {
        const mx = options.pointer.x;
        const my = options.pointer.y;

        const cellX = parseInt(mx / cellSize);
        const cellY = parseInt(my / cellSize);

        if (grid[cellY][cellX] === 0) {
            grid[cellY][cellX] = 1;
        } else {
            grid[cellY][cellX] = 0;
        }

        renderGrid(cellSize, grid, canvas);
    });

    grid = generateGrid(cellsWide, cellsHigh);
    grid[5][5] = 1;
    grid[5][6] = 1;

    renderGrid(cellSize, grid, canvas);
});

document.getElementById("step").addEventListener("click", (event) => {
    console.log("Step");

    console.log(getNeighborCount(5, 5, grid));
});
