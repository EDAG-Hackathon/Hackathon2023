"use client";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { RoomsList } from "./rooms-list";
import BuildingStats from "./building-stats";

export type Room = {
  id: string;
  building_id: string;
  name: string;
  number: string;
  room_temp_occupied: number;
  room_temp_unoccupied: number;
  room_humidity: number;
};

export default function Page() {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          marginRight: "5rem",
          marginLeft: "1rem",
          color: "primary.main",
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <RoomsList />
          </Grid>
          <Grid item xs={6}>
            <BuildingStats />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
