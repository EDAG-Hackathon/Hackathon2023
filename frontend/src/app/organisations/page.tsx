"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Map from "@/components/map";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mocked api response
  const organisations = [
    {
      id: "43459e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Hochschule Fulda",
      address: "Leipziger Str. 124",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Testschule",
      address: "Bonifatiusstraße 1",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Bonifatiusschulej",
      address: "Bonifatiusstraße 8",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Heinrich-von-Bibra-Schule",
      address: "Heinrich-von-Bibra-Platz 1",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Schule am Rosenbad",
      address: "Rosenbadstraße 1",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Bonifatiusschulej",
      address: "Bonifatiusstraße 8",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Heinrich-von-Bibra-Schule",
      address: "Heinrich-von-Bibra-Platz 1",
    },
    {
      id: "53659e1e-7d12-4e70-9d8d-5bf7eee890bd",
      name: "Schule am Rosenbad",
      address: "Rosenbadstraße 1",
    },
  ];

  const filteredOrganisations = organisations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Box sx={{ height: "50vh", width: "100%" }}>
        <Map />
      </Box>
      <Box
        sx={{
          height: "50vh",
          maxHeight: "50vh",
          width: "100%",
          color: "primary.main",
          overflow: "scroll",
        }}
      >
        <Typography variant="h4">Organisationen</Typography>
        <TextField
          id="input-with-sx"
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <List>
          {filteredOrganisations.map((organisation) => (
            <Link
              key={organisation.id}
              href={`organisations/${organisation.id}/buildings`}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={organisation.name}
                  secondary={organisation.address}
                />
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
      </Box>
    </main>
  );
}
