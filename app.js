// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const { generateShikakuBoard } = require("./utils/gameLogic");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static("public"));
// app.set("view engine", "ejs");

// let boardData = generateShikakuBoard(5);

// io.on("connection", (socket) => {
//     console.log("user connected", socket.id);

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

// app.get("/", (req, res) => {
//     res.render("index");
// });

// server.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });




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

let boardData = generateShikakuBoard(5);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.emit("updateBoard", boardData);

    socket.on("newGame", (size) => {
        let newBoardData = generateShikakuBoard(parseInt(size));
        while (!newBoardData) {
            newBoardData = generateShikakuBoard(parseInt(size));
        }
        boardData = newBoardData;
        io.emit("updateBoard", boardData);
    });

    socket.on("requestBoard", () => {
        socket.emit("updateBoard", boardData);
    });
});

app.get("/", (req, res) => res.render("index"));

server.listen(3000, () => console.log("Running on http://localhost:3000"));
