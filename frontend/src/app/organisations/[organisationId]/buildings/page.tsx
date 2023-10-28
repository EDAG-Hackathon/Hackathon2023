"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {usePathname} from "next/navigation";

import Map from "@/components/map";
import {useState} from "react";
import {useFetch} from "@/hooks/use-fetch";
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

type Building = {
  id: string;
  organisation_id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  room_temp_occupied: number;
  room_temp_unoccupied: number;
  room_humidity: number;
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const organisation_id = pathname.split("/")[2];
  const {data,error, isLoading} = useFetch<Building[]>(
    `http://localhost:8000/api/buildings?organisation_id=${organisation_id}`
  );
  const buildings = data || [];
  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{height: "50vh", width: "100%"}}>
        <Map/>
      </Box>
      <Box sx={{height: "50vh", width: "100%"}}>
        <Box
          sx={{
            height: "50vh",
            maxHeight: "50vh",
            width: "100%",
            color: "primary.main",
            overflow: "scroll",
            marginLeft: "1rem",
          }}
        >
          <Box sx={{position: "sticky", top: 0, zIndex: 1, bgcolor: "white"}}>
            <Box sx={{marginBottom: "1rem"}}>
              <Typography variant="h4">Gebäude</Typography>
            </Box>
            <TextField
              id="input-with-sx"
              label="Search"
              variant="outlined"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <List>
            {filteredBuildings.map((building) => (
              <Link key={building.id} href={`${pathname}/${building.id}/rooms`}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={building.name}
                    secondary={building.address}
                  />
                </ListItem>
                <Divider/>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
}
