import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateEditEventDialog } from "./create-edit-event-dialog";
import { Room } from "./page";
import { Stack } from "@mui/system";
import { Button, Container } from "@mui/material";
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
    `http://localhost:8000/api/appointments?roomId=${params.selectedRoom.id}`
  );
  const appointments = data || [
    {
      id: "1",
      title: "Test",
      start: new Date("2023-10-27T10:00:00"),
      end: new Date("2023-10-27T12:00:00"),
      editable: false,
      extendedProps: { temperature: 20, ventilation: true },
    },
    {
      id: "2",
      title: "Test2",
      start: new Date("2023-10-28T14:00:00"),
      end: new Date("2023-10-28T15:00:00"),
      editable: false,
      extendedProps: { temperature: 18, ventilation: false },
    },
    {
      id: "3",
      title: "Test3",
      start: new Date("2023-10-29T16:00:00"),
      end: new Date("2023-10-29T18:00:00"),
      editable: false,
      extendedProps: { temperature: 20, ventilation: true },
    },
    {
      id: "4",
      title: "Test4",
      start: new Date("2023-10-30T09:00:00"),
      end: new Date("2023-10-30T10:00:00"),
      editable: false,
      extendedProps: { temperature: 20, ventilation: false },
    },
  ];

  return (
    <div>
      <CreateEditEventDialog
        isModalOpen={isModalOpen}
        selectedRoom={params.selectedRoom}
        onClose={handleModalClose}
      />
      <Stack direction="column">
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
      </Stack>
    </div>
  );
}
