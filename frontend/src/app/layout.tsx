"use client";
import { Inter } from "next/font/google";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HouseIcon from "@mui/icons-material/House";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";

import "mapbox-gl/dist/mapbox-gl.css";
import { useFetch } from "@/hooks/use-fetch";
import { Organisation } from "./organisations/page";
import { useState } from "react";
import { Avatar, Collapse, ListItemAvatar } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });

const drawerWidth = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error, isLoading } = useFetch<Organisation[]>(
    "http://localhost:8000/api/organisations"
  );
  const organisations = data || [];

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <html lang="de">
        <body className={inter.className} style={{ margin: 0 }}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6" noWrap component="div">
                  ZEUS Dashboard
                </Typography>
                <AccountCircleIcon fontSize="large" />
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                  {organisations.map((organisation) => (
                    <>
                      <ListItemButton onClick={handleClick}>
                        <ListItemAvatar>
                          <Avatar src={organisation.image}></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={organisation.name} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <HouseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gebäude 1" />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <HouseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gebäude 2" />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <HouseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gebäude 3" />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    </>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Toolbar />
              {children}
            </Box>
          </Box>
        </body>
      </html>
    </LocalizationProvider>
  );
}
