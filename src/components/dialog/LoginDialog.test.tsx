import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../App";
import LoginDialog from "../dialog/LoginDialog";

let mockEmitter = jest.fn();

describe("Main", () => {
  beforeEach(() => {
    jest.mock("socket.io-client", () => {
      return jest.fn(() => ({
        emit: mockEmitter,
        on: jest.fn(),
      }));
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("show Login Dialog", async () => {
    render(
      <Provider store={store}>
        <LoginDialog openDialog={true} />
      </Provider>
    );

    expect(screen.getByTestId("login")).toBeInTheDocument();
  });
});
