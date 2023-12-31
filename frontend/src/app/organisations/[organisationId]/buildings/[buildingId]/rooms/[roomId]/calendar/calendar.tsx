import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateEditEventDialog } from "./create-edit-event-dialog";
import { Room } from "../page";
import { Stack } from "@mui/system";
import { Box, Button, Container, Typography } from "@mui/material";
import { useFetch } from "@/hooks/use-fetch";

type Appointment = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  editable: boolean;
  extendedProps: {
    temperature: number;
    ventilation: boolean;
  };
};

export function Calendar(params: { selectedRoom: Room }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelect() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const { data, error, isLoading } = useFetch<Appointment[]>(
    `http://localhost:8000/api/appointments?room_id=${params.selectedRoom.id}`
  );
  const appointments = Array.isArray(data)
    ? data.map((element: any) => ({
        ...element,
        start: element.start_time,
        end: element.end_time,
      }))
    : [];

  return (
    <div>
      <Typography variant="h5" sx={{ pb: 5 }}>
        Raumbelegung
      </Typography>
      <CreateEditEventDialog
        isModalOpen={isModalOpen}
        selectedRoom={params.selectedRoom}
        onClose={handleModalClose}
      />

      <Stack direction="column">
        <FullCalendar
          selectable
          events={appointments}
          select={handleSelect}
          headerToolbar={{
            start: "today prev next",
            center: "title",
            end: "",
          }}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView={"timeGridWeek"}
          locale={"de"}
          nowIndicator={true}
          allDaySlot={false}
          slotDuration={"01:00:00"}
          height={"auto"}
          firstDay={1}
        />
        <Container
          maxWidth={false}
          sx={{
            margin: 2,
            display: "flex",
            justifyContent: "end",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Button variant="contained" onClick={handleSelect}>
            Termin erstellen
          </Button>
        </Container>
      </Stack>
    </div>
  );
}
