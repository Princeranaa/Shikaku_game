// function generateShikakuBoard(size) {
//     let board = Array(size).fill(null).map(() => Array(size).fill(0));
//     let numbers = generateNumbers(size);
//     let placedNumbers = 0;
//     let maxAttempts = 100;

//     function generateNumbers(size) {
//         let numbers = [];
//         for (let i = 0; i < size; i++) {
//             numbers.push(Math.floor(Math.random() * (size - 1)) + 2); // Ensure numbers are at least 2
//         }
//         return numbers;
//     }

//     function canPlaceRectangle(row, col, w, h) {
//         if (row + h > size || col + w > size) return false;
//         for (let r = row; r < row + h; r++) {
//             for (let c = col; c < col + w; c++) {
//                 if (board[r][c] !== 0) return false;
//             }
//         }
//         return true;
//     }

//     function placeRectangle(row, col, w, h, value) {
//         board[row][col] = value;
//         for (let r = row; r < row + h; r++) {
//             for (let c = col; c < col + w; c++) { // Corrected this line
//                 if (r !== row || c !== col) {
//                     board[r][c] = -1;
//                 }
//             }
//         }
//     }

//     while (placedNumbers < numbers.length && maxAttempts > 0) {
//         let row = Math.floor(Math.random() * size);
//         let col = Math.floor(Math.random() * size);
//         let area = numbers[placedNumbers];
//         let possiblePlacements = [];

//         for (let w = 1; w <= area; w++) {
//             if (area % w === 0) {
//                 let h = area / w;
//                 if (canPlaceRectangle(row, col, w, h)) {
//                     possiblePlacements.push({ row, col, w, h });
//                 }
//             }
//         }

//         if (possiblePlacements.length > 0) {
//             let { row, col, w, h } = possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];
//             placeRectangle(row, col, w, h, area);
//             placedNumbers++;
//         }
//         maxAttempts--;
//     }

//     if (placedNumbers < numbers.length && maxAttempts <= 0) {
//         return null; // Return null if unable to place all numbers within maxAttempts
//     }

//     for (let i = 0; i < size; i++) {
//         for (let j = 0; j < size; j++) {
//             if (board[i][j] === -1) board[i][j] = 0;
//         }
//     }

//     return board;
// }

// module.exports = { generateShikakuBoard };




function generateShikakuBoard(size) {
    const board = Array(size).fill(null).map(() => Array(size).fill(0));

    // Define how many numbered cells (rectangles) based on grid size
    const numberCounts = {
        5: 8,
        6: 10,
        7: 12,
        8: 14,
        10: 18
    };

    let numbersCount = numberCounts[size] || 8; // Default 8 if size not matched
    let placedNumbers = 0;
    let maxAttempts = 500; // To prevent infinite loops

    // Function to generate a number representing area of rectangle
    function generateNumber(size) {
        return Math.floor(Math.random() * (size - 1)) + 2; // Random number min 2
    }

    // Check if we can place rectangle starting from (row, col)
    function canPlaceRectangle(row, col, w, h) {
        if (row + h > size || col + w > size) return false;
        for (let r = row; r < row + h; r++) {
            for (let c = col; c < col + w; c++) {
                if (board[r][c] !== 0) return false;
            }
        }
        return true;
    }

    // Place rectangle on board and assign number
    function placeRectangle(row, col, w, h, value) {
        board[row][col] = value; // Numbered cell
        for (let r = row; r < row + h; r++) {
            for (let c = col; c < col + w; c++) {
                if (r !== row || c !== col) {
                    board[r][c] = -1; // Mark occupied cells
                }
            }
        }
    }

    function generateNumbersForPerfectSolve(size) {
        let totalCells = size * size;
        let numbers = [];
        while (totalCells > 0) {
            let area = Math.min(Math.floor(Math.random() * (size - 1)) + 2, totalCells);
            numbers.push(area);
            totalCells -= area;
        }
        return numbers;
    }

    let numbers = generateNumbersForPerfectSolve(size);

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

    // If not enough rectangles placed, return null to trigger retry
    if (placedNumbers < numbers.length) return null;

    // Clean up temporary markers (-1) to 0 for empty cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === -1) board[i][j] = 0;
        }
    }

    return board;
}

module.exports = { generateShikakuBoard };





// utils/gameLogic.js








// Function to generate a fully solvable Shikaku grid
// function generateShikakuBoard(size) {
//     const grid = Array.from({ length: size }, () => Array(size).fill(0)); // Initialize empty grid
//     const visited = Array.from({ length: size }, () => Array(size).fill(false)); // Track visited cells

//     const minRectangleSize = 2; // Minimum area size of rectangle
//     const maxRectangleSize = Math.max(4, Math.floor((size * size) / (size * 1.5))); // Dynamically adjust max size

//     // Function to check if we can place rectangle at position
//     function canPlaceRectangle(row, col, height, width) {
//         if (row + height > size || col + width > size) return false; // Out of bounds
//         for (let r = 0; r < height; r++) {
//             for (let c = 0; c < width; c++) {
//                 if (visited[row + r][col + c]) return false; // Already visited
//             }
//         }
//         return true;
//     }

//     // Function to place rectangle and mark cells
//     function placeRectangle(row, col, height, width, area) {
//         for (let r = 0; r < height; r++) {
//             for (let c = 0; c < width; c++) {
//                 visited[row + r][col + c] = true;
//             }
//         }
//         // Place area number in one random cell inside rectangle
//         const randRow = row + Math.floor(Math.random() * height);
//         const randCol = col + Math.floor(Math.random() * width);
//         grid[randRow][randCol] = area;
//     }

//     // Function to generate possible rectangles (small/medium ones)
//     function getPossibleRectangles(row, col) {
//         const rectangles = [];
//         for (let h = 1; h <= Math.min(4, size - row); h++) {
//             for (let w = 1; w <= Math.min(4, size - col); w++) {
//                 const area = h * w;
//                 if (area >= minRectangleSize && area <= maxRectangleSize && canPlaceRectangle(row, col, h, w)) {
//                     rectangles.push({ height: h, width: w, area });
//                 }
//             }
//         }
//         return rectangles;
//     }

//     // Loop through each cell and fill using rectangles
//     for (let row = 0; row < size; row++) {
//         for (let col = 0; col < size; col++) {
//             if (!visited[row][col]) {
//                 const possibleRects = getPossibleRectangles(row, col);
//                 if (possibleRects.length > 0) {
//                     const selectedRect = possibleRects[Math.floor(Math.random() * possibleRects.length)];
//                     placeRectangle(row, col, selectedRect.height, selectedRect.width, selectedRect.area);
//                 } else {
//                     // If no rectangle fits, just mark it as 1x1
//                     placeRectangle(row, col, 1, 1, 1);
//                 }
//             }
//         }
//     }

//     return grid;
// }

// module.exports = { generateShikakuBoard };