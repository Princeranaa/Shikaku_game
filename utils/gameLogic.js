// function generateShikakuBoard(size) {
//   const board = Array(size)
//     .fill(null)
//     .map(() => Array(size).fill(0));
//   const numberCounts = { 5: 8, 6: 10, 7: 12, 8: 14, 10: 18 };
//   const totalCells = size * size;
//   let targetNumbersCount = numberCounts[size];
//   let placedNumbers = 0;
//   let maxAttempts = 1000;

//   function generateFixedCountAreas(size, count, totalCells) {
//     let areas = [];
//     let remainingCells = totalCells;
//     while (areas.length < count && remainingCells > 0) {
//       let maxArea = Math.min(
//         size,
//         remainingCells,
//         Math.floor(totalCells / count) + 2
//       );
//       let area = Math.floor(Math.random() * (maxArea - 1)) + 2;
//       areas.push(area);
//       remainingCells -= area;
//     }
//     if (remainingCells > 0) areas[areas.length - 1] += remainingCells;
//     return areas;
//   }

//   function canPlaceRectangle(row, col, w, h) {
//     if (row + h > size || col + w > size) return false;
//     for (let r = row; r < row + h; r++) {
//       for (let c = col; c < col + w; c++) if (board[r][c] !== 0) return false;
//     }
//     return true;
//   }

//   function placeRectangle(row, col, w, h, value) {
//     board[row][col] = value;
//     for (let r = row; r < row + h; r++) {
//       for (let c = col; c < col + w; c++)
//         if (r !== row || c !== col) board[r][c] = -1;
//     }
//   }

//   let areas = generateFixedCountAreas(size, targetNumbersCount, totalCells);

//   while (placedNumbers < areas.length && maxAttempts > 0) {
//     let row = Math.floor(Math.random() * size);
//     let col = Math.floor(Math.random() * size);
//     let area = areas[placedNumbers];
//     let possiblePlacements = [];

//     for (let w = 1; w <= area; w++) {
//       if (area % w === 0) {
//         let h = area / w;
//         if (canPlaceRectangle(row, col, w, h)) {
//           possiblePlacements.push({ row, col, w, h });
//         }
//       }
//     }

//     if (possiblePlacements.length > 0) {
//       let { row, col, w, h } =
//         possiblePlacements[
//           Math.floor(Math.random() * possiblePlacements.length)
//         ];
//       placeRectangle(row, col, w, h, area);
//       placedNumbers++;
//     }

//     maxAttempts--;
//   }

//   if (placedNumbers < areas.length) return generateShikakuBoard(size);

//   for (let i = 0; i < size; i++)
//     for (let j = 0; j < size; j++) if (board[i][j] === -1) board[i][j] = 0;

//   return board;
// }

// module.exports = { generateShikakuBoard };


// function generateShikakuBoard(size) {
//     const numberCounts = { 5: 8, 6: 10, 7: 12, 8: 14, 10: 18 };
//     const totalCells = size * size;
//     const targetNumbersCount = numberCounts[size];
//     const maxGenerationAttempts = 100; // Limit overall board generation attempts
  
//     let generationAttempts = 0;
  
//     while (generationAttempts < maxGenerationAttempts) {
//       const board = Array(size)
//         .fill(null)
//         .map(() => Array(size).fill(0));
//       let placedNumbers = 0;
//       let maxAttempts = 1000;
  
//       function generateFixedCountAreas(size, count, totalCells) {
//         let areas = [];
//         let remainingCells = totalCells;
//         while (areas.length < count && remainingCells > 0) {
//           let maxArea = Math.min(size, remainingCells, Math.floor(totalCells / count) + 2);
//           let area = Math.floor(Math.random() * (maxArea - 1)) + 2;
//           areas.push(area);
//           remainingCells -= area;
//         }
//         if (remainingCells > 0) areas[areas.length - 1] += remainingCells;
//         return areas;
//       }
  
//       function canPlaceRectangle(row, col, w, h) {
//         if (row + h > size || col + w > size) return false;
//         for (let r = row; r < row + h; r++) {
//           for (let c = col; c < col + w; c++) {
//             if (board[r][c] !== 0) return false;
//           }
//         }
//         return true;
//       }
  
//       function placeRectangle(row, col, w, h, value) {
//         board[row][col] = value;
//         for (let r = row; r < row + h; r++) {
//           for (let c = col; c < col + w; c++) {
//             if (r !== row || c !== col) board[r][c] = -1;
//           }
//         }
//       }
  
//       let areas = generateFixedCountAreas(size, targetNumbersCount, totalCells);
  
//       while (placedNumbers < areas.length && maxAttempts > 0) {
//         let row = Math.floor(Math.random() * size);
//         let col = Math.floor(Math.random() * size);
//         let area = areas[placedNumbers];
//         let possiblePlacements = [];
  
//         for (let w = 1; w <= area; w++) {
//           if (area % w === 0) {
//             let h = area / w;
//             if (canPlaceRectangle(row, col, w, h)) {
//               possiblePlacements.push({ row, col, w, h });
//             }
//           }
//         }
  
//         if (possiblePlacements.length > 0) {
//           let { row, col, w, h } = possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];
//           placeRectangle(row, col, w, h, area);
//           placedNumbers++;
//         }
  
//         maxAttempts--;
//       }
  
//       if (placedNumbers === areas.length) {
//         // Clean up -1 marks and return board if success
//         for (let i = 0; i < size; i++) {
//           for (let j = 0; j < size; j++) {
//             if (board[i][j] === -1) board[i][j] = 0;
//           }
//         }
//         return board;
//       }
  
//       // Retry if failed to place all rectangles
//       generationAttempts++;
//     }
  
//     console.error(`Failed to generate a valid board after ${maxGenerationAttempts} attempts for size ${size}.`);
//     return null; // Return null if unable to generate board
//   }
  
//   module.exports = { generateShikakuBoard };
  



function generateShikakuBoard(size) {
  const numberCounts = { 5: 8, 6: 10, 7: 12, 8: 14, 10: 18 };
  const totalCells = size * size;
  const targetNumbersCount = numberCounts[size];
  const maxGenerationAttempts = 100; // Keep same limit

  let generationAttempts = 0;

  while (generationAttempts < maxGenerationAttempts) {
      const board = Array(size).fill(null).map(() => Array(size).fill(0));
      let placedNumbers = 0;
      let maxAttempts = size * size * 5; // Dynamically adjust based on grid size

      // Improved area generation
      function generateFixedCountAreas(size, count, totalCells) {
          let areas = [];
          let avgArea = Math.floor(totalCells / count);
          let remainingCells = totalCells;

          for (let i = 0; i < count; i++) {
              let maxArea = Math.min(avgArea + 3, remainingCells - (count - i - 1) * 2);
              let minArea = 2;
              let area = Math.floor(Math.random() * (maxArea - minArea + 1)) + minArea;
              areas.push(area);
              remainingCells -= area;
          }

          // Adjust the last area to fit exactly
          if (remainingCells !== 0) areas[areas.length - 1] += remainingCells;

          return areas;
      }

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
                  if (r !== row || c !== col) board[r][c] = -1;
              }
          }
      }

      let areas = generateFixedCountAreas(size, targetNumbersCount, totalCells);
      areas.sort((a, b) => b - a); // Place larger areas first for better fit

      while (placedNumbers < areas.length && maxAttempts > 0) {
          let area = areas[placedNumbers];
          let possiblePlacements = [];

          for (let row = 0; row < size; row++) {
              for (let col = 0; col < size; col++) {
                  for (let w = 1; w <= area; w++) {
                      if (area % w === 0) {
                          let h = area / w;
                          if (canPlaceRectangle(row, col, w, h)) {
                              possiblePlacements.push({ row, col, w, h });
                          }
                      }
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

      if (placedNumbers === areas.length) {
          // Clean up -1 marks and return board if success
          for (let i = 0; i < size; i++) {
              for (let j = 0; j < size; j++) {
                  if (board[i][j] === -1) board[i][j] = 0;
              }
          }
          return board;
      }

      generationAttempts++;
  }

  console.error(`Failed to generate a valid board after ${maxGenerationAttempts} attempts for size ${size}.`);
  return null; // Return null if unable to generate board
}

module.exports = { generateShikakuBoard };
