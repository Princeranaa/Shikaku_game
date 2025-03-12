// const socket = io();
// let selectedCells = [];
// let boardData;

// const messageEl = document.getElementById("gameMessage"); 

// socket.on("updateBoard", (board) => {
//     boardData = board;
//     renderBoard(board);
//     setMessage("Game started! Select rectangles.", "blue");
// });

// document.getElementById("newGame").addEventListener("click", () => {
//     let size = document.getElementById("gridSize").value;
//     socket.emit("newGame", size);
//     clearSelection();
//     setMessage("New game created! Select rectangles.", "blue");
// });

// function renderBoard(board) {
//     const grid = document.getElementById("game-board");
//     grid.innerHTML = "";
//     const size = board.length;
//     let cellSize = size >= 8 ? "35px" : "50px"; 

//     grid.style.setProperty('--grid-size', size);
//     grid.style.setProperty('grid-template-columns', `repeat(${size}, ${cellSize})`);
//     grid.style.setProperty('--cell-size', cellSize);

//     board.forEach((row, i) => {
//         row.forEach((cell, j) => {
//             const div = document.createElement("div");
//             div.classList.add("cell");
//             div.dataset.row = i;
//             div.dataset.col = j;
//             if (cell !== 0) div.textContent = cell;
//             div.addEventListener("click", () => selectCell(i, j));
//             grid.appendChild(div);
//         });
//     });
// }

// function selectCell(row, col) {
//     let cell = boardData[row][col];
//     let cellEl = document.querySelector(`[data-row='${row}'][data-col='${col}']`);

//     // If already selected, unselect it
//     const index = selectedCells.findIndex(c => c.row === row && c.col === col);
//     if (index !== -1) {
//         selectedCells.splice(index, 1);
//         cellEl.classList.remove("selected");
//         return;
//     }

//     // First cell must be a number cell
//     if (selectedCells.length === 0 && cell > 0) {
//         selectedCells.push({ row, col, value: cell });
//         cellEl.classList.add("selected");
//     } 
//     // After first cell, allow selection
//     else if (selectedCells.length > 0) {
//         selectedCells.push({ row, col });
//         cellEl.classList.add("selected");
//         validateSelection();
//     }
// }

// function validateSelection() {
//     if (selectedCells.length === 0) return;
//     const { value } = selectedCells[0];
//     if (selectedCells.length === value) {
//         let rows = selectedCells.map(c => c.row);
//         let cols = selectedCells.map(c => c.col);

//         let minRow = Math.min(...rows);
//         let maxRow = Math.max(...rows);
//         let minCol = Math.min(...cols);
//         let maxCol = Math.max(...cols);

//         let area = (maxRow - minRow + 1) * (maxCol - minCol + 1);

//         if (area === value) {
//             selectedCells.forEach(({ row, col }) => {
//                 const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);

//                 // Add general "bordered" class for completed rectangles
//                 cell.classList.add("bordered");

//                 // Clear previous borders
//                 cell.classList.remove("border-top", "border-bottom", "border-left", "border-right");

//                 // Apply outer border for rectangle
//                 if (row === minRow) cell.classList.add("border-top");
//                 if (row === maxRow) cell.classList.add("border-bottom");
//                 if (col === minCol) cell.classList.add("border-left");
//                 if (col === maxCol) cell.classList.add("border-right");
//             });

//             setMessage("Perfect rectangle created!", "green");
//             checkWinCondition();
//         } else {
//             setMessage("Invalid rectangle! Please try again.", "red");
//         }
//         clearSelection();
//     } else if (selectedCells.length > value) {
//         setMessage("You have exceeded the number of cells!", "red");
//         clearSelection();
//     }
// }

// function checkWinCondition() {
//     const totalNumbers = boardData.flat().filter(x => x > 0).reduce((sum, n) => sum + n, 0);
//     const filledCells = document.querySelectorAll(".bordered").length;
//     console.log(`Filled Cells: ${filledCells}, Total Needed: ${totalNumbers}`);
//     if (filledCells === totalNumbers) {
//         setMessage("🎉 Congratulations! You completed the puzzle.", "green");
//     }
// }

// function clearSelection() {
//     document.querySelectorAll(".selected").forEach(cell => cell.classList.remove("selected"));
//     selectedCells = [];
// }

// function setMessage(message, color = "black") {
//     messageEl.innerText = message;
//     messageEl.style.color = color;
// }





const socket = io();
let selectedCells = [];
let boardData;

const messageEl = document.getElementById("gameMessage");

socket.on("updateBoard", ({ board, size }) => {
    boardData = board;
    renderBoard(board);
    setMessage("Game started! Select rectangles.", "blue");

    // ✅ Dynamically set dropdown value to match board size
    document.getElementById("gridSize").value = size;
});



// Prevent form submission and emit event instead
document.getElementById("gridSize").addEventListener("change", () => {
    let size = document.getElementById("gridSize").value;
    socket.emit("newGame", size);
    clearSelection();
    setMessage("New game created! Select rectangles.", "blue");
});

// Button to generate a new game
document.getElementById("newGame").addEventListener("click", () => {
    let size = document.getElementById("gridSize").value;
    socket.emit("newGame", size);
    clearSelection();
    setMessage("New game created! Select rectangles.", "blue");
});

function renderBoard(board) {
    const grid = document.getElementById("game-board");
    grid.innerHTML = "";
    const size = board.length;
    let cellSize = size >= 8 ? "50px" : "50px";

    grid.style.setProperty('--grid-size', size);
    grid.style.setProperty('grid-template-columns', `repeat(${size}, ${cellSize})`);
    grid.style.setProperty('--cell-size', cellSize);

    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.row = i;
            div.dataset.col = j;
            if (cell !== 0) div.textContent = cell;
            div.addEventListener("click", () => selectCell(i, j));
            grid.appendChild(div);
        });
    });
}

function selectCell(row, col) {
    let cell = boardData[row][col];
    let cellEl = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
    const index = selectedCells.findIndex(c => c.row === row && c.col === col);

    if (index !== -1) {
        selectedCells.splice(index, 1);
        cellEl.classList.remove("selected");
        return;
    }

    if (selectedCells.length === 0 && cell > 0) {
        selectedCells.push({ row, col, value: cell });
        cellEl.classList.add("selected");
    } else if (selectedCells.length > 0) {
        selectedCells.push({ row, col });
        cellEl.classList.add("selected");
        validateSelection();
    }
}

function validateSelection() {
    if (selectedCells.length === 0) return;
    const { value } = selectedCells[0];
    if (selectedCells.length === value) {
        let rows = selectedCells.map(c => c.row);
        let cols = selectedCells.map(c => c.col);
        let minRow = Math.min(...rows), maxRow = Math.max(...rows);
        let minCol = Math.min(...cols), maxCol = Math.max(...cols);
        let area = (maxRow - minRow + 1) * (maxCol - minCol + 1);

        if (area === value) {
            selectedCells.forEach(({ row, col }) => {
                const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                cell.classList.add("bordered");
                // cell.classList.remove("border-top", "border-bottom", "border-left", "border-right");
                if (row === minRow) cell.classList.add("border-top");
                if (row === maxRow) cell.classList.add("border-bottom");
                if (col === minCol) cell.classList.add("border-left");
                if (col === maxCol) cell.classList.add("border-right");
            });
            setMessage("Perfect rectangle created!", "green");
            checkWinCondition();
        } else {
            setMessage("Invalid rectangle! Please try again.", "red");
        }
        clearSelection();
    } else if (selectedCells.length > value) {
        setMessage("You have exceeded the number of cells!", "red");
        clearSelection();
    }
}

function checkWinCondition() {
    const totalNumbers = boardData.flat().filter(x => x > 0).reduce((sum, n) => sum + n, 0);
    const filledCells = document.querySelectorAll(".bordered").length;
    if (filledCells === totalNumbers) {
        setMessage("🎉 Congratulations! You completed the puzzle.", "green");
    }
}

function clearSelection() {
    document.querySelectorAll(".selected").forEach(cell => cell.classList.remove("selected"));
    selectedCells = [];
}

function setMessage(message, color = "black") {
    messageEl.innerText = message;
    messageEl.style.color = color;
}
