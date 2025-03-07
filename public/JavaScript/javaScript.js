let selectedCells = [];
let boardData;

const socket = io();

socket.on("updateBoard", (board) => {
    boardData = board;
    renderBoard(board);
});

socket.emit("newGame");

document.getElementById("newGame").addEventListener("click", () => {
    socket.emit("newGame");
    clearSelection(); 
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
    let cellElement = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
    
    // If clicking an already selected area, clear the selection
    if (cellElement.classList.contains("selected")) {
        clearSelection();
        return; 
    }
    
    if (cell > 0) {
        selectedCells = [{ row, col, value: cell }];
        cellElement.classList.add("selected");
    } else if (selectedCells.length > 0) {
        selectedCells.push({ row, col });
        cellElement.classList.add("selected");
        validateSelection();
    }
}

function validateSelection() {
    if (selectedCells.length > 0) {
        let numberCell = selectedCells[0];
        let expectedArea = numberCell.value;
        if (selectedCells.length === expectedArea) {
            let minRow = Math.min(...selectedCells.map(c => c.row));
            let maxRow = Math.max(...selectedCells.map(c => c.row));
            let minCol = Math.min(...selectedCells.map(c => c.col));
            let maxCol = Math.max(...selectedCells.map(c => c.col));
            
            selectedCells.forEach(({ row, col }) => {
                let cellElement = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
                cellElement.classList.add("bordered"); 

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
    document.querySelectorAll(".selected, .bordered").forEach(cell => {
        cell.classList.remove("selected", "bordered");
    });
    selectedCells = [];
}

function checkWinCondition() {
    let totalNeededCells = boardData.flat().reduce((sum, cell) => sum + (cell > 0 ? cell : 0), 0);
    let filledCellsCount = document.querySelectorAll(".bordered").length;
    
    if (filledCellsCount === totalNeededCells) {
        alert("Congratulations! You have completed the Shikaku puzzle.");
    }
}
