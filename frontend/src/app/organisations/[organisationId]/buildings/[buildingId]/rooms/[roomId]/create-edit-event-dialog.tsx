import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Room } from "./page";
import { v4 as uuidv4 } from "uuid";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type Appointment = {
  id: string;
  room_id: string;
  title: string;
  start_time: string;
  end_time: string;
  recurring: boolean;
  editable: boolean;
};

export function CreateEditEventDialog(params: {
  selectedRoom: Room;
  isModalOpen: boolean;
  onClose: () => void;
}) {
  const { selectedRoom, isModalOpen = false, onClose } = params;

  const [title, setTitle] = useState("Belegung");
  const [date, setDate] = useState(dayjs(new Date()));
  const [start, setStart] = useState(dayjs(new Date()));
  const [end, setEnd] = useState(dayjs(new Date()));
  const [recurring, setRecurring] = useState(true);

  const handleSave = () => {
    const start_time = date
      .add(start.hour(), "hour")
      .add(start.minute(), "minute")
      .toISOString();
    const end_time = date
      .add(end.hour(), "hour")
      .add(end.minute(), "minute")
      .toISOString();

    const appointment: Appointment = {
      id: uuidv4(),
      room_id: selectedRoom.id,
      title: title,
      start_time: start_time,
      end_time: end_time,
      recurring: recurring,
      editable: true,
    };
    console.log(appointment);

    // fetch(`http://localhost:8000/api/rooms/${selectedRoom.id}/occupancy`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(appointment),
    // });
    // onClose();
  };

  return (
    <div>
      <Dialog open={isModalOpen} onClose={onClose}>
        <DialogTitle>Event erstellen</DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField
              id="event-title"
              label="Titel"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <DatePicker
              label="Datum"
              sx={{ mt: 1, mb: 1 }}
              value={dayjs(date)}
              onChange={(newValue) =>
                setDate((newValue as Dayjs).startOf("date"))
              }
            />
            <TimePicker
              label="Beginn"
              sx={{ mt: 1, mb: 1 }}
              value={dayjs(start)}
              onChange={(newValue) => setStart(newValue as Dayjs)}
            />
            <TimePicker
              label="Ende"
              sx={{ mt: 1 }}
              value={dayjs(end)}
              onChange={(newValue) => setEnd(newValue as Dayjs)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={recurring}
                  onChange={(event) => setRecurring(event.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Wiederholen"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSave} sx={{ m: 2 }}>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
