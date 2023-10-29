"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {
  Card,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import Map from "@/components/map";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";

import OrganisationMarker from "@/components/markers/organisation-marker";

export type Organisation = {
  id: string;
  name: string;
  address: string;
  image?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useFetch<Organisation[]>(
    "http://localhost:8000/api/organisations"
  );
  const organisations = data || [];

  const filteredOrganisations = organisations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Box height="100vh" width="100%">
        <Map
          markers={filteredOrganisations.map((org) => (
            <OrganisationMarker organisation={org} />
          ))}
        />
        <Card
          sx={{
            padding: "1rem",
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            right: 0,
            height: "45vh",
            maxHeight: "50vh",
            width: "400px",
            color: "primary.main",
            overflow: "scroll",
            marginBottom: "1rem",
          }}
        >
          <Box sx={{ position: "sticky", top: 0, zIndex: 1, bgcolor: "white" }}>
            <Box sx={{ marginBottom: "1rem", textAlign: "center" }}>
              <Typography variant="h4">Organisationen</Typography>
            </Box>
            <TextField
              id="input-with-sx"
              label="Search"
              variant="outlined"
              sx={{
                marginLeft: "1rem",
                marginRight: "1rem",
                width: "calc(100% - 2rem)",
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <List>
            {filteredOrganisations.map((organisation) => (
              <Link
                key={organisation.id}
                href={`organisations/${organisation.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={organisation.image}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={organisation.name}
                    secondary={organisation.address}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Card>
      </Box>
    </div>
  );
}
