"use client";
import Box from "@mui/material/Box";
import { CreateEditEventDialog } from "./create-edit-event-dialog";
import { Calendar } from "./calendar";


export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      Informationen über Raum {params.roomId}
      <Box>Stundenplan...</Box>
      <Calendar/>
    </Box>
  );
}
