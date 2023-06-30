import React, { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import LoginDialog from "../dialog/LoginDialog";
import { Box, Toolbar, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { UserState } from "../../store/types";
import socket from "../../socket";

const Main = () => {
  const open = useSelector((state: UserState) => state?.openDialog);
  const [loginMessage, setLoginMessage] = useState("");

  const [receivedValue, setReceivedValue] = useState<any>();
  const [gameOver, setGameOver] = useState(false);

  socket.on("message", (response: any) => {
    setLoginMessage(response.message);
  });

  socket.on("onReady", async () => {
    console.log("READY");
    setGameOver(false);
    await socket.emit("letsPlay");
  });

  socket.on("randomNumber", (response: any) => {
    setReceivedValue(response.number);
  });

  socket.on("activateYourTurn", () => {
    console.log("Activatre");
  });

  socket.on("gameOver", () => {
    setGameOver(true);
  });
  async function buttonClick(event: any) {
    await socket.emit("sendNumber", {
      number: Number(receivedValue),
      selectedNumber: Number(event.target.value),
    });
  }
  return (
    <Box>
      <Header />
      <Sidebar />
      {open && <LoginDialog openDialog={open} />}
      {loginMessage && (
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Typography paragraph>{loginMessage}</Typography>
          <Typography paragraph>{receivedValue}</Typography>

          {gameOver && <Typography>Game Is Over! Well Played!!</Typography>}
          <Button value={-1} onClick={(e) => buttonClick(e)}>
            -1
          </Button>
          <Button value={0} onClick={(e) => buttonClick(e)}>
            0
          </Button>
          <Button value={1} onClick={(e) => buttonClick(e)}>
            +1
          </Button>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default Main;
