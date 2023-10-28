"use client";
import Box from "@mui/material/Box";
import { Calendar } from "./calendar";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

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
    <Box sx={{ height: "100%", width: "100%", p: "7px" }}>
      <Typography variant="h4" pb={"5px"}>
        Informationen über Raum: {selectedRoom.name}
      </Typography>
      <Calendar selectedRoom={selectedRoom} />
    </Box>
  );
}
