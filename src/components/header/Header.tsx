import React from "react";
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../store/action";
import { UserState } from "../../store/types";

const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: UserState) => state?.loggedIn);
  function login() {
    if (!loggedIn) {
      dispatch(openDialog(true));
    } else {
      console.log("Already Logged IN");
    }
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#f27919",
      }}
    >
      <Toolbar>
        <Avatar src="/images/logo.jpg" />
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ height: "50px", margin: "20px 0 0 10px" }}
        >
          Play Your Game
        </Typography>
        <AccountCircleSharpIcon
          fontSize="large"
          data-testid="login"
          sx={{ marginLeft: "auto" }}
          onClick={() => login()}
        />
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
