"use client";
import {Box, Card, Divider, Link} from "@mui/material";
import Map from "@/components/map";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { usePathname } from "next/navigation";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import OrganisationMarker from "@/components/markers/organisation-marker";

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

export default function Page({
  params,
}: {
  params: { organisationId: string };
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const organisation_id = pathname.split("/")[2];
  const { data, error, isLoading } = useFetch<Building[]>(
    `http://localhost:8000/api/buildings?organisation_id=${organisation_id}`
  );
  const buildings = data || [];
  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Box height="100vh" width="100%">
        <Map
        />
        <Card
          sx={{
            padding: "1rem",
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "45vh",
            maxHeight: "50vh",
            width: "400px",
            overflow: "scroll",
            marginBottom: "1rem",
          }}
        >
          <Box sx={{position: "sticky", top: 0, zIndex: 1}}>
            <Box sx={{marginBottom: "1rem", textAlign: "center", color: "primary.main"}}>
              <Typography variant="h5">Gebäude</Typography>
            </Box>
            <TextField
              id="input-with-sx"
              label="Search"
              variant="outlined"
              focused={true}
              sx={{
                marginLeft: "1rem",
                marginRight: "1rem",
                width: "calc(100% - 2rem)",
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <List>
            {filteredBuildings.map((building) => (
              <Link
                key={building.id}
                href={`${pathname}/buildings/${building.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem>
                  <ListItemText
                    primary={building.name}
                    secondary={building.address}
                  />
                </ListItem>
                <Divider />
              </Link>
            ))}
          </List>
        </Card>
      </Box>
    </div>
  );
}
