function generateShikakuBoard(size) {
    let board = Array(size).fill(null).map(() => Array(size).fill(0));
    let numbers = [2, 2, 4, 4, 4, 3, 3, 3]; // Ensure 8 numbers are placed
    let placedNumbers = 0;
    let maxAttempts = 100; 

    function canPlaceRectangle(row, col, w, h) {
        if (row + h > size || col + w > size) return false; 
        for (let r = row; r < row + h; r++) {
            for (let c = col; c < col + w; c++) {
                if (board[r][c] !== 0) return false; 
            }
        }
        return true;
    }

    function placeRectangle(row, col, w, h, value) {
        board[row][col] = value; 
        for (let r = row; r < row + h; r++) {
            for (let c = col; c < col + w; c++) {
                if (r !== row || c !== col) {
                    board[r][c] = -1; 
                }
            }
        }
    }

    while (placedNumbers < numbers.length && maxAttempts > 0) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        let area = numbers[placedNumbers];
        let possiblePlacements = [];

        for (let w = 1; w <= area; w++) {
            if (area % w === 0) {
                let h = area / w;
                if (canPlaceRectangle(row, col, w, h)) {
                    possiblePlacements.push({ row, col, w, h });
                }
            }
        }

        if (possiblePlacements.length > 0) {
            let { row, col, w, h } = possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];
            placeRectangle(row, col, w, h, area);
            placedNumbers++;
        }
        maxAttempts--;
    }

    if (placedNumbers < 8) {
        return generateShikakuBoard(size);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === -1) board[i][j] = 0;
        }
    }

    return board;
}

module.exports = { generateShikakuBoard };
