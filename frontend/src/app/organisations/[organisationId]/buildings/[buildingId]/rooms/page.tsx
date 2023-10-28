"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";

export default function Page() {
  // Mocked api response
  const rooms = [
    {
      id: "73459e1e-7d12-4e70-9d8d-5bf7eee890ba",
      name: "Raum 1",
    },
    {
      id: "83659e1e-7d12-4e70-9d8d-5bf7eee890bb",
      name: "Raum 2",
    },
  ];

  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{height: "100%", width: "100%", marginLeft: "1rem", color: "primary.main"}}>
        <Box sx={{position: "sticky", top: 0, zIndex: 1, bgcolor: "white"}}>
          <Box sx={{marginBottom: "1rem"}}>
            <Typography variant="h4">Raumliste</Typography>
          </Box>
          <TextField
            id="input-with-sx"
            label="Search"
            variant="outlined"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <List>
          {filteredRooms.map((room) => (
            <Link key={room.id} href={`${pathname}/${room.id}`}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={room.name}
                  secondary={"bla bla"}
                />
              </ListItem>
              <Divider/>
            </Link>
          ))}
        </List>
      </Box>
    </>
  );
}
