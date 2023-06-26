import React from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  function connect() {
    socket.emit("login");
    //TODO
  }

  return (
    <div className="App">
      <input type="text" placeholder="username" />
      <button type="submit" onClick={() => connect()}>
        Login
      </button>
    </div>
  );
}

export default App;
