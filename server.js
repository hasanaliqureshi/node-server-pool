const express = require("express");
const config = require("./server/config/config");
const bodyParser = require("body-parser");
const diffRoutes = require("./server/routes/diff");
const createHash = require("./server/socket_controllers/createHash");
const updateHash = require("./server/socket_controllers/updateHash");
const http = require('http');
const cronjob = require('./server/cronjob');
const diffcalc = require('./server/controllers/diff.js');
require("./server/dbConnection");


const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(diffRoutes);

cronjob.start();

io.origins('*:*');
// SocketIO handler
io.on('connect',()=> {
    console.log("CLIENT WS CONNECTED");
    io.emit("connect_confirm", {"message" : "connection confirmed"});
});

io.sockets.on('connection', (socket) => {
    socket.on('saveHash', async (message, fn)=>{
        let td = diffcalc.calcDiff(message.views, message.comments, message.likes, message.shares, message.subscribers)
        let payload = {
            'ip' : '127.0.0.1',
            'source' : message.source,
            'difficulty' : td,
            'hash' : {
                'totalHash' : 0,
                'hashRate' : 0
            }
        }
        let response = JSON.parse(await createHash(payload));
        fn(response.message._id);
    });

    socket.on('updateHash', async (message) => {
        let updateLoad = {
            '_id' : message.id,
            'hash' : message.hash,
            'last_updated' : Date.now() 
        }
        let response = await updateHash(updateLoad);
    });
});


server.listen(config.port, () => {
    console.log("👄  Server started ....");
});