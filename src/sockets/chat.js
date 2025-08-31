const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message.js');

let io;

exports.init = (server) => {
  io = new Server(server, { cors: { origin: process.env.CORS_ORIGIN || '*' } });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('No token'));
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      next();
    } catch (e) { next(new Error('Auth error')); }
  });

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    socket.join(userId);

    socket.on('chat:send', async ({ to, text, orderId }) => {
      const msg = await Message.create({ from: userId, to, text, orderId });
      io.to(to).emit('chat:receive', { ...msg.toObject() });
      io.to(userId).emit('chat:sent', { ...msg.toObject() });
    });

    socket.on('chat:seen', async (messageId) => {
      await Message.findByIdAndUpdate(messageId, { seen: true });
    });
  });

  return io;
};

exports.getIO = () => io;
