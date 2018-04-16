var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = "Nothing in particular";
var testString = "";
console.log("websockets server started");

ws.on("connection", function (socket) {
  console.log("client connection established");

  console.log("TESTING W.E. SOCKET MEANS: " + socket);

  ws.clients.forEach(function (clientSocket) {
    clientSocket.send("*** Topic is: '" + topic +"'");
  });

  messages.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on("message", function (data) {
    console.log("message received: " + data);
    messages.push(data);

    testString = data.slice(0,7);

    if (testString.trim() == "/topic"){
      topic = data.slice(7);
      ws.clients.forEach(function (clientSocket) {
        clientSocket.send("*** Topic has changed to '" + topic + "'");
      });
    }

    ws.clients.forEach(function (clientSocket) {
      clientSocket.send(data);
    });
  });
});
