import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateEditEventDialog } from "./create-edit-event-dialog";

export function Calendar(params: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [events, setEvents] = useState([
    { title: "event 1", date: "2023-10-30" },
    { title: "event 2", date: "2023-10-29" },
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
        id={params.id}
        onClose={handleModalClose}
      />
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        // views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
      ;
    </div>
  );
}
