"use client";
import Box from "@mui/material/Box";
import { Calendar } from "./calendar";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { EventLog } from "../../../../../../../components/event-log/event-log";

export type Room = {
  id: string;
  name: string;
};

export default function Page({ params }: { params: { roomId: string } }) {
  const [selectedRoom, setSelectedRoom] = useState<Room>({
    id: params.roomId,
    name: "Demoroom",
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/rooms/${selectedRoom.id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedRoom(data);
      });
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%", p: 5 }}>
      <Typography variant="h4" sx={{ pb: 5 }}>
        Informationen über Raum: {selectedRoom.name}
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={8}>
          <Calendar selectedRoom={selectedRoom} />
        </Grid>
        <Grid item xs={4}>
          <EventLog />
        </Grid>
      </Grid>
    </Box>
  );
}
