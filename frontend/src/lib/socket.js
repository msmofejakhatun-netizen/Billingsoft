import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', { autoConnect: false });

export const joinRestaurantRoom = ({ restaurantId, branchId }) => {
  if (!socket.connected) socket.connect();
  socket.emit('restaurant:join', { restaurantId, branchId });
};
