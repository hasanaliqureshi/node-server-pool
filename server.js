const express = require("express");
const config = require("./server/config/config");
const bodyParser = require("body-parser");
const diffRoutes = require("./server/routes/diff");
const hashRoutes = require("./server/routes/hash");
const http = require('http');

require("./server/dbConnection");

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(diffRoutes);
app.use(hashRoutes);

// SocketIO handler
io.on('connect',()=> {
    console.log("CLIENT WS CONNECTED");
});

io.on("saveHash", () => {
    console.log("saving hash");
});

io.on("updateHash", () => {
    console.log("updaing hash");
});

server.listen(config.port, () => {
    console.log("👄  Server started ....");
});