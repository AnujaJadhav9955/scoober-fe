import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { OpenDialog } from "../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, logInSocket } from "../../store/action";
import socket from "../../socket";
import { UserState } from "../../store/types";

const LoginDialog = (props: OpenDialog) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const loggedIn = useSelector((state: UserState) => state?.loggedIn);

  const login = () => {
    if (loggedIn) {
      dispatch(openDialog(false));
      return;
    }

    if (username !== "") {
      socket.emit("login", { username: username });
      dispatch(openDialog(false));
      dispatch<any>(logInSocket(true, username, socket));
    }
  };
  return (
    <Dialog
      fullWidth
      open={props.openDialog}
      data-testid="login-dialog"
      onClose={() => dispatch(openDialog(false))}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>Please login to play</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          fullWidth
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(openDialog(false))}>Cancel</Button>
        <Button data-testid="login" onClick={() => login()}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(LoginDialog);
