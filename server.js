const { execSync } = require('child_process');
const next = require('next');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname: '0.0.0.0', port });

const handle = app.getRequestHandler();
const usersByRoom = new Map();
const userSockets = new Map();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join-room', ({ roomId, userId }) => {
      socket.join(roomId);
      userSockets.set(userId, socket.id);

      const roomUsers = usersByRoom.get(roomId) || [];
      if (!roomUsers.includes(userId)) roomUsers.push(userId);
      usersByRoom.set(roomId, roomUsers);

      socket.to(roomId).emit('peer-joined', { userId });
      io.to(roomId).emit('room-state', { users: roomUsers });
    });

    socket.on('signal', ({ roomId, from, to, signal }) => {
      const socketId = userSockets.get(to);
      if (socketId) {
        io.to(socketId).emit('signal', { roomId, from, signal });
      }
    });

    socket.on('leave-room', ({ roomId, userId }) => {
      socket.leave(roomId);
      const roomUsers = usersByRoom.get(roomId) || [];
      const nextUsers = roomUsers.filter((id) => id !== userId);
      usersByRoom.set(roomId, nextUsers);
      io.to(roomId).emit('room-state', { users: nextUsers });
      io.to(roomId).emit('user-left', { userId });
    });

    socket.on('disconnect', () => {
      for (const [roomId, users] of usersByRoom.entries()) {
        const nextUsers = users.filter((userId) => userSockets.get(userId) !== socket.id);
        if (nextUsers.length !== users.length) {
          usersByRoom.set(roomId, nextUsers);
          io.to(roomId).emit('room-state', { users: nextUsers });
        }
      }

      for (const [userId, id] of userSockets.entries()) {
        if (id === socket.id) {
          userSockets.delete(userId);
        }
      }
    });
  });

  expressApp.use((req, res, next) => {
    req.io = io;
    next();
  });

  expressApp.all('*', (req, res) => handle(req, res));

  server.listen(port, '0.0.0.0', () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
