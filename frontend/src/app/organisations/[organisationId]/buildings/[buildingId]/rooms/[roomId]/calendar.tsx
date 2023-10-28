import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateEditEventDialog } from "./create-edit-event-dialog";
import { Room } from "./page";

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

  const [events, setEvents] = useState<Appointment[]>([
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
  ]);

  function handleSelect() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <CreateEditEventDialog
        isModalOpen={isModalOpen}
        selectedRoom={params.selectedRoom}
        onClose={handleModalClose}
      />
      <FullCalendar
        selectable
        events={events}
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
      />
      ;
    </div>
  );
}
