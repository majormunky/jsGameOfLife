let canvas;
const cellSize = 20;
const cellsWide = 20;
const cellsHigh = 20;
const gridHeight = cellSize * cellsHigh;
const gridWidth = cellSize * cellsWide;
let grid;


const drawGrid = () => {
    // This function draws the grid lines
    for (let y = 0; y <= gridHeight; y += cellSize) {
        let newLine = new fabric.Line([0, y, gridWidth, y], {
            stroke: "black"
        });
        canvas.add(newLine);
    }

    for (let x = 0; x <= gridWidth; x += cellSize) {
        let newLine = new fabric.Line([x, 0, x, gridHeight], {
            stroke: "black"
        });
        canvas.add(newLine);
    }    
};


const drawCells = () => {
    // This will draw the cells that are alive onto the grid
    // Loop over each row
    for (let y = 0; y < grid.length; y++) {
        // Loop over each cell int he row
        for (let x = 0; x < grid[0].length; x++) {
            // We just want to draw the live cells
            if (grid[y][x] === 1) {
                // get our cell position
                let cellX = x * cellSize;
                let cellY = y * cellSize;

                // and then add the cell to the canvas
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


const renderGrid = () => {
    // This function is called whenever we update the grid
    // and need to re-draw it.
    // It seems like re-drawing everything would be slow
    // but computers are fast, so you don't really notice

    // First, clear the canvas
    canvas.clear();

    // Draw the grid
    drawGrid();

    // And then draw our current cells
    drawCells();
}


const generateGrid = () => {
    // Given a size, we generate our 2d array of cells
    // and return it
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
    // Given a coordinate in our grid
    // count how many neighbors this cell has

    // This is where we will store our total neighbor count
    let neighborCount = 0;

    for (let gridY = y - 1; gridY < y + 2; gridY++) {
        for (let gridX = x - 1; gridX < x + 2; gridX++) {
            // Check to be sure we aren't checking outside the grid
            if ((gridX >= cellsWide) || (gridY >= cellsHigh)) {
                continue;
            }

            // Same check but for the left and top sides
            if ((gridX < 0) || (gridY < 0)) {
                continue;
            }

            // We also don't want to count our cell we're checking
            if ((gridX == x) && (gridY == y)) {
                continue;
            }

            // If we got here, we should be safe to check the grid
            if (grid[gridY][gridX] === 1) {
                neighborCount++;
            }
        }
    }

    return neighborCount;
}


document.addEventListener("DOMContentLoaded", () => {
    canvas = new fabric.Canvas("canvas");
    canvas.setWidth(gridWidth + 1);
    canvas.setHeight(gridHeight + 1);

    // Setup event handler to allow clicking 
    // on grid to turn on and off cells
    canvas.on("mouse:down", (options) => {
        // Get the mouse position
        const mx = options.pointer.x;
        const my = options.pointer.y;

        // Figure out what cell we're clicking on
        const cellX = parseInt(mx / cellSize);
        const cellY = parseInt(my / cellSize);

        // Toggle the cell
        if (grid[cellY][cellX] === 0) {
            grid[cellY][cellX] = 1;
        } else {
            grid[cellY][cellX] = 0;
        }

        // Re-render the grid
        renderGrid();
    });

    // Setup the grid
    grid = generateGrid();

    // Render the initial grid
    renderGrid();
});


document.getElementById("step").addEventListener("click", (event) => {
    // This takes the current grid and updates it for one step
    
    // First we have to make a copy of the grid
    // We don't want to update the grid we're checking as it will
    // interfere with checking how many neighbors each cell has
    let newGrid = structuredClone(grid);

    // loop through each row of the grid
    for (let y = 0; y < grid.length; y++) {
        // loop through each cell of each row
        for (let x = 0; x < grid[0].length; x++) {
            // figure out how many neighbors this cell has
            let neighborCount = getNeighborCount(x, y, grid);

            // get the status of this cell
            let cellStatus = grid[y][x];

            // if this cell is dead, there's only one rule to check
            if (cellStatus === 0) {
                // Does this dead cell have exactly 3 neighbors?
                if (neighborCount === 3) {
                    // if so, this cell is now alive
                    newGrid[y][x] = 1;
                }
            } else {
                // otherwise, this is a live cell
                // does this live cell have less than 2 neighbors
                // or more than 3 neighbors?
                if ((neighborCount < 2) || (neighborCount > 3)) {
                    // if so, this cell dies
                    newGrid[y][x] = 0;
                }
                // Any other situation leaves this cell alive
            }
        }
    }

    // set our main grid to the new grid we just generated
    grid = newGrid;

    // and then render it
    renderGrid();
});


document.getElementById("load-shape-button").addEventListener("click", () => {
    const shapeSelect = document.getElementById("load-shape");
    const selectedShape = shapeSelect.value;

    // If we tried to load the shape on the empty selection, we can just return
    if (selectedShape == "none") {
        return;
    }

    // Reset the grid
    grid = generateGrid()

    if (selectedShape == "glider") {
        grid[5][5] = 1;
        grid[5][6] = 1;
        grid[6][4] = 1;
        grid[6][6] = 1;
        grid[7][6] = 1;

        shapeSelect.value = "none";
    } else if (selectedShape == "cross-hair") {
        grid[5][5] = 1;
        grid[6][5] = 1;
        grid[7][5] = 1;

        grid[9][3] = 1;
        grid[9][2] = 1;
        grid[9][1] = 1;

        grid[9][7] = 1;
        grid[9][8] = 1;
        grid[9][9] = 1;

        grid[11][5] = 1;
        grid[12][5] = 1;
        grid[13][5] = 1;

        shapeSelect.value = "none";
    }

    renderGrid();
});


document.getElementById("load-random").addEventListener("click", () => {
    grid = generateGrid()
    
    // loop through each row of the grid
    for (let y = 0; y < grid.length; y++) {
        // loop through each cell of each row
        for (let x = 0; x < grid[0].length; x++) {
            let randNum = Math.random();
            if (randNum > 0.5) {
                grid[y][x] = 1;
            }
        }
    }

    renderGrid();
});

