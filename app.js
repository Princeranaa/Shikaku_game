
// app.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { generateShikakuBoard } = require("./utils/gameLogic");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.set("view engine", "ejs");

const gameRouter = require('./router/ShikakuRouter')
app.use('/', gameRouter)




let boardSize = 5; 
let boardData = generateShikakuBoard(boardSize);

// io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);
//     socket.emit("updateBoard", boardData);

//     socket.on("newGame", (size) => {
//         let newBoardData = generateShikakuBoard(parseInt(size));
//         while (!newBoardData) {
//             newBoardData = generateShikakuBoard(parseInt(size));
//         }
//         boardData = newBoardData;
//         io.emit("updateBoard", boardData);
//     });

//     socket.on("requestBoard", () => {
//         socket.emit("updateBoard", boardData);
//     });
// });




io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.emit("updateBoard", { board: boardData, size: boardSize });

    socket.on("newGame", (size) => {
        let newBoardData = generateShikakuBoard(parseInt(size));
        while (!newBoardData) {
            newBoardData = generateShikakuBoard(parseInt(size));
        }
        boardData = newBoardData;
        boardSize = parseInt(size); // ✅ Update size too
        io.emit("updateBoard", { board: boardData, size: boardSize });
    });

    socket.on("requestBoard", () => {
        socket.emit("updateBoard", { board: boardData, size: boardSize });
    });
});



server.listen(3000, () => console.log("Running on http://localhost:3000"));


