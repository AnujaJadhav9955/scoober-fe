import React, { useState } from "react";
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

  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  function enterInGame(room: string, index: number) {
    if (!loggedIn) {
      alert("PLEASE LOGIN");
      setSelectedIndex(null);
    } else {
      socket.emit("joinRoom", {
        username: username,
        room: room,
        roomType: room.includes("CPU") ? "cpu" : "human",
      });
      setSelectedIndex(index);
    }
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
            <ListItem key={text} sx={{ height: "80px" }}>
              <ListItemButton
                onClick={() => enterInGame(text, index)}
                selected={selectedIndex == index}
              >
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

export default React.memo(Sidebar);
