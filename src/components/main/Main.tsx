import React, { useEffect, useState } from "react";
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
  const [list, setList] = useState<any>([]);
  const [loginMessage, setLoginMessage] = useState("");

  const [receivedValue, setReceivedValue] = useState<any>();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    socket.on("message", (response: any) => {
      setLoginMessage(response.message);
    });

    socket.once("onReady", async () => {
      setGameOver(false);
      socket.emit("letsPlay");
    });

    socket.on("randomNumber", async (response: any) => {
      setList([...list, response.number]);
      setReceivedValue(response.number);
    });

    socket.on("activateYourTurn", () => {
      console.log("Activatre");
    });

    socket.once("gameOver", async () => {
      setGameOver(true);
    });

    return () => {
      socket.off("gameOver");
      socket.off("activateYourTurn");
      socket.emit("disconnect");
      socket.off("onReady");
      socket.off("leaveRoom");
    };
  }, [list, receivedValue]);
  function buttonClick(event: any) {
    socket.emit("sendNumber", {
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
          aria-label="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Typography paragraph data-testid="message">
            {loginMessage}
          </Typography>
          {list.length === 0 && (
            <Typography paragraph>{receivedValue}</Typography>
          )}
          {list.map((value: string, index: number) => {
            return index % 2 === 0 ? (
              <Typography
                width="200px"
                ml={"300px"}
                bgcolor={"#F8F5F2"}
                key={value + index}
              >
                {value}
              </Typography>
            ) : (
              <Typography
                ml="auto"
                mr="100px"
                width="200px"
                bgcolor={"#F8F5F2"}
                key={value + index}
              >
                {value}
              </Typography>
            );
          })}

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

export default React.memo(Main);
