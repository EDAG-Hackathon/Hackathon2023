"use client";
import Box from "@mui/material/Box";
import { Calendar } from "./calendar/calendar";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { EventLogRoom } from "@/components/event-log/event-log-room";
import { Room } from "../page";

export default function Page({ params }: { params: { roomId: string } }) {
  const [selectedRoom, setSelectedRoom] = useState<Room>({
    id: params.roomId,
    building_id: "",
    name: "Demoroom",
    number: "123",
    room_temp_occupied: 0,
    room_temp_unoccupied: 0,
    room_humidity: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/rooms/${selectedRoom.id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedRoom(data);
      });
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginRight: "5rem",
        marginLeft: "1rem",
        color: "primary.main",
        p: 5,
      }}
    >
      <Typography variant="h4">{selectedRoom.name}</Typography>
      <Grid container spacing={10} pt={3}>
        <Grid item xs={8}>
          <Calendar selectedRoom={selectedRoom} />
        </Grid>
        <Grid item xs={4}>
          <EventLogRoom />
        </Grid>
      </Grid>
    </Box>
  );
}
