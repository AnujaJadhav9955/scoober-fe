import React from "react";
import Main from "./components/main/Main";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer, { initialState } from "./store/reducer";
import "./App.css";

export const store = createStore(reducer, initialState, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
