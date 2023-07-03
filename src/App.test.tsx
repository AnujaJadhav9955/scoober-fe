import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./App";
import Main from "./components/main/Main";

test("renders Play Your Game", () => {
  render(<App />);
  const linkElement = screen.getByText("Play Your Game");
  expect(linkElement).toBeInTheDocument();
});
test("renders Just Eat Takeaway", () => {
  render(<App />);
  const linkElement = screen.getByText("Just Eat Takeaway");
  expect(linkElement).toBeInTheDocument();
});

test("renders App with main component", () => {
  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  const linkElement = screen.getByText("Sabrican");
  expect(linkElement).toBeInTheDocument();
});