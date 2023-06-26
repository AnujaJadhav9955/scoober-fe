import { io } from 'socket.io-client';
const URL: string =  'ws://localhost:8082';

export const socket = io(URL);