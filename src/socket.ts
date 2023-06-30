const io = require("socket.io-client");
const socket = io("http://localhost:8082");
export default socket;