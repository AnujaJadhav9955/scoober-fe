import React from "react";
import { Avatar, Toolbar, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#0A3847",
        color: "#FFFFFF",
        height: "72px",
        left: 0,
        right: 0,
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
          Just Eat Takeaway
        </Typography>
      </Toolbar>
    </Box>
  );
};

export default Footer;
