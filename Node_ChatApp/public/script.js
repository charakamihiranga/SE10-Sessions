const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        // Emit the chat message as an outgoing message
        socket.emit('chatMessage', { msg: input.value, type: 'outgoing' });
        input.value = '';
    }
});

// Listen for chat messages
socket.on('chatMessage', function(data) {
    const item = document.createElement('li');
    item.textContent = data.msg;
    item.className = data.type; // Assign class based on type
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom
});
