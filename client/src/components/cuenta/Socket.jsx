import { io } from "socket.io-client";
const BASE_HOST = process.env.REACT_APP_BASE_HOST;

export const socket = io(BASE_HOST, {
  transports: ["websocket"],
});
