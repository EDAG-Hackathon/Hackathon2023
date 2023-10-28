import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateEditEventDialog } from "./create-edit-event-dialog";

export function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSelect() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <CreateEditEventDialog open={isModalOpen} onClose={handleModalClose} />
      <FullCalendar
        editable
        selectable
        // events={events}
        select={handleSelect}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        // eventContent={(info) => <EventItem info={info} />}
        plugins={[dayGridPlugin, interactionPlugin]}
        // views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
      ;
    </div>
  );
}
