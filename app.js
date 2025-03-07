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
    console.log("userconnected", socket.id);
    
    socket.emit("updateBoard", boardData);
    
    socket.on("newGame", () => {
        boardData = generateShikakuBoard(5);
        io.emit("updateBoard", boardData);
    });

    socket.on("requestBoard", () => {
        socket.emit("updateBoard", boardData);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
