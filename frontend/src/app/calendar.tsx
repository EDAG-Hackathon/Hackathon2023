import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export function Calendar() {
  return (
    <div>
      <h1>Mein Kalender</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={
          [
            // Hier können Sie Ihre Ereignisse definieren
            // Beispiel: { title: 'Event 1', date: '2023-10-28' },
          ]
        }
      />
    </div>
  );
}
