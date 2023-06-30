import React from "react";
import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../store/types";
import { openDialog } from "../../store/action";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import socket from "../../socket";

const drawerWidth = 280;
const Sidebar = () => {
  const dispatch = useDispatch();
  const [loggedIn, username] = useSelector((state: UserState) => [
    state?.loggedIn,
    state?.username,
  ]);

  console.log(loggedIn, username);
  function enterInGame(room: string) {
    console.log("ROMM", room);
    if (!loggedIn) {
      dispatch(openDialog(true));
    }
    socket.emit("joinRoom", {
      username: username,
      room: room,
      roomType: room.includes("CPU") ? "cpu" : "human",
    });
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Berlin CPU", "Amsterdam CPU", "Sabrican"].map((text, index) => (
            <ListItem key={text}>
              <ListItemButton onClick={() => enterInGame(text)}>
                <ListItemText primary={text} />
                <ListItemIcon>
                  <ArrowForwardIosIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
