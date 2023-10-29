"use client";
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {RoomsList} from "./rooms-list";
import BuildingStats from "./building-stats";
import {EventLog} from "@/components/event-log/event-log";
import {useFetch} from "@/hooks/use-fetch";
import {Building} from "../../page";

export default function Page({params}: { params: { buildingId: string } }) {
  const {data, error, isLoading} = useFetch<Building>(
    `http://localhost:8000/api/buildings/${params.buildingId}`
  );
  const building = data;

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
      <Typography variant="h4" sx={{pb: 5}}>
        {building ? building.name : ""}
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <Box sx={{height: "100vh", overflow: "scroll"}}>
            <RoomsList/>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{height: "100vh", overflow: "scroll"}}>
            <BuildingStats/>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{height: "100vh", overflow: "scroll"}}>
            <EventLog/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
