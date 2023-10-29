"use client";
import { Box, Card, Divider, Link } from "@mui/material";
import Map from "@/components/map";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { usePathname } from "next/navigation";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import OrganisationMarker from "@/components/markers/organisation-marker";
import BuildingMarker from "@/components/markers/building-marker";

export type Building = {
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
          markers={filteredBuildings.map((building) => (
            <BuildingMarker
              building={building}
              basePath={`/organisations/${organisation_id}`}
            />
          ))}
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
            color: "primary.main",
          }}
        >
          <Box sx={{ position: "sticky", top: 0, zIndex: 1, bgcolor: "white" }}>
            <Box sx={{ marginBottom: "1rem", textAlign: "center" }}>
              <Typography variant="h4">Gebäude</Typography>
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
