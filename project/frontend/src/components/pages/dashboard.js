import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import  MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect } from "react";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "left",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

// var baseUrl = "http://127.0.0.1:8000"
var baseUrl = "https://edusphere.vercel.app"

export default function Dashboard(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState(0);
  const [showProfile, setShowProfile] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   window.location.href = '/';
  // };
  
  
  const handleLogout = async() =>  {

    const response = await fetch(baseUrl + '/logout/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: localStorage.getItem("userId"),
        }),
      });

      const data = await response.json();
      if (data.Status  == "Success") {
        // Handle successful logout
          localStorage.clear();
          window.location.href = '/';
        }
        else{
          console.log('Logout Failed');
        }
    };

  var userFullName = localStorage.getItem("userFullName"); 
  var name = userFullName || "John Doe" ;

  const navigate = useNavigate();
  const location = useLocation();

  const access_ele = {"Dashboard":'/',"Home":'/',"My Courses":'/mycourses', "Browse Courses":'/coursebrowse', "Profile":'/profile', "Chat" :'/chat'}
  useEffect(() => {
    // This function will run every time the location changes
  }, [location.pathname]);

  // const history = useHistory();
  const handleselection = (text) => {
    const basePath = location.pathname.split('/')[0];
    navigate(basePath+'/dashboard' + access_ele[text]);
  }
  // "#113224 !important",
  return (
    <Box sx={{ display: "flex", justifyContent:'left' ,p:0 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor:  "#1C4E80 !important",
          color: "#ffffff !important" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: "flex",p:0 }}
            style={{  cursor: "pointer"}}
            onClick={() => handleselection('Dashboard')}
          >
            Dashboard
          </Typography>
          <div sx={{ marginRight: "0" ,p:0}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ marginRight: -2 }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
                <MenuItem
                onClick={()=>handleselection('Profile')}
                //   setActiveMenu(3);
                //   setShowProfile(true);
                //   handleClose();
                // }
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: deepOrange[100],
              color: deepPurple[600],
              marginRight: 1
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <ListItemText primary={name} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "My Courses", "Browse Courses", "Chat"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block" ,p:0}}
                onClick={()=>handleselection(text)}
                // selected={activeMenu === index}
                // button
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center"
                    }}
                  >
                    {index === 0 ? (
                      <HomeIcon />
                    ) : index === 1 ? (
                      <AutoStoriesIcon />
                    ) : index === 2 ?  (
                      <AddBoxOutlinedIcon />
                    ) : (
                      <ChatIcon/>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box width="100%" sx={{display:'flexwrap', justifyContent:'flex-start',flexGrow:1, paddingTop:8,width:"90vw" }}>
          {props.children}
    </Box>
    </Box>
      
  );
}