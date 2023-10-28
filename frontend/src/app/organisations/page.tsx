"use client";
import Box from "@mui/material/Box";
import Link from "next/link";
import {
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { AccountCircle, SearchOutlined } from "@mui/icons-material";

import Map from "@/components/map";

type Organisation = {
  id: string;
  name: string;
  image?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
};

export default async function Page() {
  const response = await fetch("http://localhost:8000/organizations");
  const organisations = (await response.json()) as Organisation[];

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Box sx={{ height: "50vh", width: "100%" }}>
        <Map />
      </Box>
      <Box sx={{ height: "50vh", width: "100%", color: "primary.main" }}>
        <Typography variant="h4">Organisationen</Typography>
        <TextField id="input-with-sx" label="Search" variant="outlined" />
        <FixedSizeList
          height={400} // Set the fixed height of the list
          width="100%" // Set the fixed width of the list
          itemSize={60} // Set the fixed height of each item
          itemCount={organisations.length} // Total number of items
        >
          {({ index, style }) => (
            <Link href={`/organisations/${organisations[index].id}/buildings`}>
              <ListItem style={style}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={organisations[index].name}
                  secondary={organisations[index].address}
                />
              </ListItem>
              <Divider />
            </Link>
          )}
        </FixedSizeList>
      </Box>
    </main>
  );
}
