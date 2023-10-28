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
import {useState} from "react";

import {useFetch} from "@/hooks/use-fetch";

type Organisation = {
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

  const {data, error, isLoading} = useFetch<Organisation[]>(
    "http://localhost:8000/api/organisations"
  );
  const organisations = data || [];

  const filteredOrganisations = organisations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Box sx={{height: "50vh", width: "100%"}}>
        <Map/>
      </Box>
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
            <Typography variant="h4">Organisationen</Typography>
          </Box>
          <TextField
            id="input-with-sx"
            label="Search"
            variant="outlined"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <List>
          {filteredOrganisations.map((organisation) => (
            <Link
              key={organisation.id}
              href={`organisations/${organisation.id}/buildings`}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={organisation.name}
                  secondary={organisation.address}
                />
              </ListItem>
              <Divider/>
            </Link>
          ))}
        </List>
      </Box>
    </main>
  );
}
