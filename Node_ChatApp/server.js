const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5055;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the index.html file on the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
