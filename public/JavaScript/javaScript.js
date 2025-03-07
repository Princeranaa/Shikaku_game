// Generate a 5x5 Shikaku board with exactly 8 numbers placed correctly, ensuring valid rectangles


// UI logic for selecting and validating rectangles
let selectedCells = [];
let boardData;

const socket = io();

socket.on("updateBoard", (board) => {
    boardData = board;
    renderBoard(board);
});

// Request a new game board from the server
socket.emit("newGame");

document.getElementById("newGame").addEventListener("click", () => {
    socket.emit("newGame");
});

function renderBoard(board) {
    let grid = document.getElementById("game-board");
    grid.innerHTML = "";
    
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            let div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.row = i;
            div.dataset.col = j;
            
            if (cell !== 0) {
                div.textContent = cell;
                div.classList.add("number-cell");
            }
            
            div.addEventListener("click", () => selectCell(i, j));
            grid.appendChild(div);
        });
    });
}

function selectCell(row, col) {
    let cell = boardData[row][col];
    if (cell > 0) {
        selectedCells = [{ row, col, value: cell }];
        document.querySelector(`[data-row='${row}'][data-col='${col}']`).classList.add("selected");
    } else if (selectedCells.length > 0) {
        selectedCells.push({ row, col });
        document.querySelector(`[data-row='${row}'][data-col='${col}']`).classList.add("selected");
        validateSelection();
    }
}

function validateSelection() {
    if (selectedCells.length > 0) {
        let numberCell = selectedCells[0];
        let expectedArea = numberCell.value;
        if (selectedCells.length === expectedArea) {
            selectedCells.forEach(({ row, col }) => {
                document.querySelector(`[data-row='${row}'][data-col='${col}']`).classList.add("filled");
            });
            selectedCells = [];
            checkWinCondition();
        } else if (selectedCells.length > expectedArea) {
            alert("Invalid selection! Ensure the area matches the number.");
            clearSelection();
        }
    }
}

function clearSelection() {
    selectedCells.forEach(({ row, col }) => {
        document.querySelector(`[data-row='${row}'][data-col='${col}']`).classList.remove("selected");
    });
    selectedCells = [];
}

function checkWinCondition() {
    let totalNeededCells = boardData.flat().reduce((sum, cell) => sum + (cell > 0 ? cell : 0), 0);
    let filledCellsCount = document.querySelectorAll(".filled").length;
    
    if (filledCellsCount === totalNeededCells) {
        alert("Congratulations! You have completed the Shikaku puzzle.");
    }
}
