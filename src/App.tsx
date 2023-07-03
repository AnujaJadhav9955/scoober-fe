import React, { useEffect } from "react";
import Main from "./components/main/Main";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer, { initialState } from "./store/reducer";
import "./App.css";
import socket from "./socket";

export const store = createStore(reducer, initialState, applyMiddleware(thunk));

function App() {
  useEffect(() => {
    socket.on("connect", () => console.log("connected")); // only 1 connection established
    return () => socket.off("disconnect");
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
