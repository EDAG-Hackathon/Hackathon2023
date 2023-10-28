"use client";
import Box from "@mui/material/Box";
import { Calendar } from "./calendar";
import { useEffect, useState } from "react";

export type Room = {
  id: string
  name: string
};

export default function Page({ params }: { params: { roomId: string } }) {
  const [selectedRoom, setSelectedRoom] = useState<Room>({id: params.roomId, name: "Demoroom"});

  useEffect(() => {
    fetch("https://mocki.io/v1/05aefa64-da1a-4103-974c-904b8038b37b")
      .then((res) => res.json())
      .then((data) => {
        setSelectedRoom(data)
      })
  }, [])

  return (
      <Box sx={{ height: "100%", width: "100%" }}>
      Informationen über Raum {selectedRoom.name}
      <Box>Stundenplan...</Box>
      <Calendar selectedRoom={selectedRoom} />
      </Box>
  );
}
