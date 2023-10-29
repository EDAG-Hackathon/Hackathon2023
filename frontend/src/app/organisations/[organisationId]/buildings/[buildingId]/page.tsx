"use client";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { RoomsList } from "./rooms-list";
import BuildingStats from "./building-stats";
import { EventLog } from "@/components/event-log/event-log";

export default function Page({ params }: { params: { buildingId: string } }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: 5,
        marginRight: "5rem",
        marginLeft: "1rem",
        color: "primary.main",
      }}
    >
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
  );
}
