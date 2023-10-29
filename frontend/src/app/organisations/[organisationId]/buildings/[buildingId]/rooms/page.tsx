"use client";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import { RoomsList } from "./rooms-list";
import BuildingStats from "./building-stats";
import { EventLog } from "@/components/event-log/event-log";

export type Room = {
  id: string;
  building_id: string;
  name: string;
  number: string;
  room_temp_occupied: number;
  room_temp_unoccupied: number;
  room_humidity: number;
};

export default function Page({ params }: { params: { buildingId: string } }) {
  return (
    <>
      <Box sx={{ height: "100%", width: "100%", p: 5, color: "primary.main" }}>
        <Typography variant="h4" sx={{ pb: 5 }}>
          Gebäude {params.buildingId}
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={4}>
            <RoomsList />
          </Grid>
          <Grid item xs={4}>
            <BuildingStats />
          </Grid>
          <Grid item xs={4}>
            <EventLog />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
