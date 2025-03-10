// let selectedCells = [];
// let boardData;

// const socket = io();

// socket.on("updateBoard", (board) => {
//     boardData = board;
//     renderBoard(board);
// });

// document.getElementById("newGame").addEventListener("click", () => {
//     let gridSize = document.getElementById("gridSize").value;
//     socket.emit("newGame", gridSize);
//     clearSelection();
// });

// function renderBoard(board) {
//     let grid = document.getElementById("game-board");
//     grid.style.setProperty('--grid-size', board.length);
//     grid.innerHTML = "";

//     board.forEach((row, i) => {
//         row.forEach((cell, j) => {
//             let div = document.createElement("div");
//             div.classList.add("cell");
//             div.dataset.row = i;
//             div.dataset.col = j;

//             if (cell !== 0) {
//                 div.textContent = cell;
//                 div.classList.add("number-cell");
//             }

//             div.addEventListener("click", () => selectCell(i, j));
//             grid.appendChild(div);
//         });
//     });
// }

// function selectCell(row, col) {
//     let cell = boardData[row][col];
//     let cellElement = document.querySelector(`[data-row='${row}'][data-col='${col}']`);

//     if (cellElement.classList.contains("selected")) {
//         clearSelection();
//         return;
//     }

//     if (cell > 0) {
//         selectedCells = [{ row, col, value: cell }];
//         cellElement.classList.add("selected");
//     } else if (selectedCells.length > 0) {
//         selectedCells.push({ row, col });
//         cellElement.classList.add("selected");
//         validateSelection();
//     }
// }

// function validateSelection() {
//     if (selectedCells.length > 0) {
//         let numberCell = selectedCells[0];
//         let expectedArea = numberCell.value;
//         if (selectedCells.length === expectedArea) {
//             let minRow = Math.min(...selectedCells.map(c => c.row));
//             let maxRow = Math.max(...selectedCells.map(c => c.row));
//             let minCol = Math.min(...selectedCells.map(c => c.col));
//             let maxCol = Math.max(...selectedCells.map(c => c.col));

//             if ((maxRow - minRow + 1) * (maxCol - minCol + 1) === expectedArea) {
//                 selectedCells.forEach(({ row, col }) => {
//                     let cellElement = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
//                     cellElement.classList.add("bordered");
//                 });
//                 selectedCells = [];
//                 checkWinCondition();
//             } else {
//                 alert("Invalid selection! Ensure the area matches the number.");
//                 clearSelection();
//             }
//         } else if (selectedCells.length > expectedArea) {
//             alert("Invalid selection! Ensure the area matches the number.");
//             clearSelection();
//         }
//     }
// }

// function clearSelection() {
//     document.querySelectorAll(".selected, .bordered").forEach(cell => {
//         cell.classList.remove("selected", "bordered");
//     });
//     selectedCells = [];
// }

// function checkWinCondition() {
//     let totalNeededCells = boardData.flat().reduce((sum, cell) => sum + (cell > 0 ? cell : 0), 0);
//     let filledCellsCount = document.querySelectorAll(".bordered").length;

//     if (filledCellsCount === totalNeededCells) {
//         alert("Congratulations! You have completed the Shikaku puzzle.");
//     }
// }






const socket = io();
let selectedCells = [];
let boardData;

socket.on("updateBoard", (board) => {
    boardData = board;
    renderBoard(board);
});

document.getElementById("newGame").addEventListener("click", () => {
    let size = document.getElementById("gridSize").value;
    socket.emit("newGame", size);
    clearSelection();
});

function renderBoard(board) {
    const grid = document.getElementById("game-board");
    grid.style.setProperty('--grid-size', board.length);
    grid.innerHTML = "";
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

    if (cellEl.classList.contains("selected")) return;

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
        let area = (Math.max(...rows) - Math.min(...rows) + 1) * (Math.max(...cols) - Math.min(...cols) + 1);
        if (area === value) {
            selectedCells.forEach(({ row, col }) => {
                document.querySelector(`[data-row='${row}'][data-col='${col}']`).classList.add("bordered");
            });
            checkWinCondition();
        } else {
            alert("Invalid rectangle!");
        }
        clearSelection();
    } else if (selectedCells.length > value) {
        alert("Exceeded number of cells!");
        clearSelection();
    }
}

function checkWinCondition() {
    const totalNumbers = boardData.flat().filter(x => x > 0).reduce((sum, n) => sum + n, 0);
    const filledCells = document.querySelectorAll(".bordered").length;
    if (filledCells === totalNumbers) {
        alert("Congratulations! You completed the puzzle.");
    }
}

function clearSelection() {
    document.querySelectorAll(".selected").forEach(cell => cell.classList.remove("selected"));
    selectedCells = [];
}