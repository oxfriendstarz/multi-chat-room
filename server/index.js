const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server, { path: '/rooms' });

const port = process.env.PORT || 9991;

const rooms = { };

function addUserToRoom(room, user, sockerId) {
    if (typeof rooms[room] === 'undefined') {
        rooms[room] = { users: [] };
    }
    rooms[room].users[sockerId] = user;
}

function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) names.push(name);
        return names;
    }, []);
}
  

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('join-room', (room, user, ackJoinRoom) => {
        console.log('user join', user);
        socket.join(room);
        addUserToRoom(room, user, socket.id);
        socket.to(room).broadcast.emit('new-user-connected', {user})
        ackJoinRoom([{id: socket.id, user, room: room}]);
    });

    socket.on('leave-room', (room, socketId) => {
        const user = rooms[room].users[socketId];
        console.log('user leave', user);

        delete rooms[room].users[socketId];
        socket.leave(room);
        socket.to(room).broadcast.emit('user-leave', {user});
    });

    socket.on('outgoing-message', (room, user, message, ackMessage) => {
        console.log('outgoing message');
        socket.to(room).broadcast.emit('incoming-message', {user, message});
        ackMessage({user, message})
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        getUserRooms(socket).forEach((room) => {
            socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
            delete rooms[room].users[socket.id];
        });
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});