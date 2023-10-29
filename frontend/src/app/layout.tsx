"use client";
import { Inter } from "next/font/google";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import "mapbox-gl/dist/mapbox-gl.css";
import { Avatar, IconButton } from "@mui/material";
import {
  ElectricBolt,
  Info,
  Settings,
  SignalCellularAlt,
} from "@mui/icons-material";
import { bgcolor } from "@mui/system";
import { theme } from "../../utils/theme";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const drawerWidth = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const icons = [
    <SignalCellularAlt />,
    <ElectricBolt />,
    <Settings />,
    <Info />,
  ];
  return (
    <ThemeProvider theme={theme}>
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
                  <EnergySavingsLeafIcon sx={{ mr: 2 }} />
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link
                      href={"/"}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      ZEUS Dashboard
                    </Link>
                  </Typography>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={"https://mui.com/static/images/avatar/2.jpg"}
                    />
                  </IconButton>
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
                    {["Overview", "Management", "Settings", "Info"].map(
                      (text, index) => (
                        <ListItem key={text} disablePadding>
                          <ListItemButton selected={index === 0}>
                            <ListItemIcon>{icons[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                          </ListItemButton>
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
                <Box sx={{ bottom: 0, position: "absolute", padding: "1rem" }}>
                  <Typography variant="body1" align="center">
                    Disclaimer
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    This website is a demo and is for illustrative and
                    informational purposes only. The content may not be
                    accurate, complete, or up-to-date.
                    <br />© 2023 Hackrid
                  </Typography>
                </Box>
              </Drawer>
              <Box component="main" sx={{ flexGrow: 1, marginLeft: "240px" }}>
                <Toolbar />
                {children}
              </Box>
            </Box>
          </body>
        </html>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
