import WebSocket, { Server } from 'ws';

const port = 6060;
const webSocketServer: Server = new Server({ port });

webSocketServer.on('connection', (socket: WebSocket) => {
  
  socket.on('message', (message: string) => {
    socket.send(`Echo: ${message}`);
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });

  socket.send('Welcome to the Node.js WebSocket server!');
});

console.log(`WebSocket server running on ws://localhost:${port}`);