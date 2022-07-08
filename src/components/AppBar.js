import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerCom from "./Drawer";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppContext } from "../context/ContextProvider";


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};



export default function AppBarComponent(props) {
  const [open, setOpen] = React.useState(false);

  

  const {setDarkMode,darkMode} = React.useContext(AppContext)

  const NaviArr = [
    {
      id: 1,
      ren: <HomeIcon sx={{ color: "text.primary" }} />,
      href: "/",
    },
  
    {
      id: 2,
      ren: <AddIcon sx={{ color: "text.primary" }} />,
      href: "/create",
    },
    // {
    //   id: 3,
    //   ren: darkMode ?  <DarkModeIcon sx={{ color: "text.primary" }} /> :  <LightModeIcon sx={{ color: "text.primary" }} />,
    //   href: "/profile",
    // },
    {
      id: 4,
      ren: <AccountCircleIcon sx={{ color: "text.primary" }} />,
      href: "/profile",
    },
  ];


  const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="inherit" sx={{ height: "7vh" }}>
          <DrawerCom open={open} handleClose={() => setOpen(false)} />
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ width: "50px", height: "50px" }}
                src={logo}
                alt="logo"
              />
              <Typography sx={{ ml: 2 }} variant="h6" component="div">
                Blogs MM
              </Typography>
            </Box>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {NaviArr.map((item) => (
                <IconButton
                  key={item.id}
                  onClick={() => navigate(item.href)}
                  sx={{ mr: 2 }}
                >
                  {item.ren}{" "}
                </IconButton>
              ))}
              <IconButton
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{ mr: 2 }}
                >
                  {darkMode ?  <DarkModeIcon sx={{ color: "text.primary" }} /> :  <LightModeIcon sx={{ color: "text.primary" }} />}
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: "block", md: "none", mr: 2 } }}>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon sx={{ color: "text.primary" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <Box sx={{}}>{props.children}</Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
