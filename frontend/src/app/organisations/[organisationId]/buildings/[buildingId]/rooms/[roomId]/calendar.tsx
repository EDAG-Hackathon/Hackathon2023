import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export function Calendar() {
  return (
    <div>
      <FullCalendar
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        events={[{ title: "Belegt", date: "2023-10-28" }]}
        // headerToolbar={{
        //   start: "today prev next",
        //   end: "dayGridMonth dayGridWeek dayGridDay",
        // }}
        plugins={[dayGridPlugin, interactionPlugin]}
        // views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
    </div>
  );
}
