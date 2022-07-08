import {
    Drawer,
    Box,
    ListItemIcon,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
  } from "@mui/material";
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import React from "react";
  import CloseIcon from "@mui/icons-material/Close";
  import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppContext } from "../context/ContextProvider";

  export default function DrawerCom({ open, handleClose }) {
    const listAry = [
      {
        id: 1,
        navi: "/",
        icon: <HomeIcon />,
        text: "Home",
      },
      {
        id: 2,
        navi: "/create",
        icon: <AddIcon />,
        text: "Create Blog",
      },
      
      {
        id: 4,
        navi: "/profile",
        icon: <AccountCircleIcon />,
        text: "Profile",
      }
    ];

    const {setDarkMode,darkMode} = React.useContext(AppContext)
  
    const navigate = useNavigate();
  
    const handleClick = (navi) => {
    navigate(navi);
      handleClose();
    };
  
    return (
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton onClick={handleClose} sx={{ p: 2, m: 2 }}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <List>
            {listAry.map((item) => (
              <ListItem key={item.id} onClick={() => handleClick(item.navi)}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem onClick={() => setDarkMode(!darkMode)}>
                <ListItemButton>
                  <ListItemIcon>
                    {darkMode ?  <DarkModeIcon sx={{ color: "text.primary" }} /> :  <LightModeIcon sx={{ color: "text.primary" }} />}
                  </ListItemIcon>
                  <ListItemText primary={darkMode ? "DarkMode" : "LightMode"} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
    );
  }