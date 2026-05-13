import { Server } from 'socket.io';
import { env } from '../config/env.js';

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: { origin: env.corsOrigin.split(','), credentials: true }
  });

  io.on('connection', (socket) => {
    socket.on('restaurant:join', ({ restaurantId, branchId }) => {
      if (restaurantId) socket.join(`restaurant:${restaurantId}`);
      if (branchId) socket.join(`branch:${branchId}`);
    });

    socket.on('disconnect', () => undefined);
  });

  return io;
};

export const emitRestaurantEvent = (restaurantId, event, payload) => io?.to(`restaurant:${restaurantId}`).emit(event, payload);
export const emitBranchEvent = (branchId, event, payload) => io?.to(`branch:${branchId}`).emit(event, payload);
