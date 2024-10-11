import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem
          key="vbesort"
          disablePadding
          onClick={() => (window.location.href = "https://www.vbesort.lt")}
        >
          <ListItemButton>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Surūšiuotos egzaminų užduotys" />
            <OpenInNewIcon />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="bankas"
          disablePadding
          onClick={() => (window.location.href = "https://bankas.skafis.lt")}
        >
          <ListItemButton>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Užduočių bankas" />
            <OpenInNewIcon />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="testai"
          disablePadding
          onClick={() => (window.location.href = "https://testai.skafis.lt")}
        >
          <ListItemButton>
            <ListItemIcon>
              <LaptopChromebookIcon />
            </ListItemIcon>
            <ListItemText primary="Testavimo platforma" />
            <OpenInNewIcon />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {isLoggedIn ? (
          <ListItem
            key="logout"
            disablePadding
            onClick={() =>
              (window.location.href =
                "https://bankas.skafis.lt/logout?redirect=https://www.skafis.lt")
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Atsijungti" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem
            key="login"
            disablePadding
            onClick={() =>
              (window.location.href =
                "https://bankas.skafis.lt/login?redirect=https://www.skafis.lt")
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Prisijungti" />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem
          key="about"
          disablePadding
          onClick={() => (window.location.href = "/about")}
        >
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Apie" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div id="mobile-header">
      <AppBar position="static">
        <Toolbar>
          <img alt="Skafis logo" src="/favicon-32x32.png" />
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Skafis
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
