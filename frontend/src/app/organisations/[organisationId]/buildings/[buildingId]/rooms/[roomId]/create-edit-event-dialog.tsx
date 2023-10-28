import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker";
import { useEffect, useState } from "react";
import { Room } from "./page";

export function CreateEditEventDialog(params: {
  selectedRoom: Room;
  isModalOpen: boolean;
  onClose: () => void;
}) {
  const { selectedRoom, isModalOpen = false, onClose } = params;

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSave = () => {
    // fetch(`http://localhost:8000/api/rooms/${selectedRoom.id}/occupancy`)
    onClose();
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
            />
            <Select
              id="event-room"
              label="Raum"
              value={selectedRoom.id}
              fullWidth
              variant="outlined"
              disabled
              sx={{ mt: 1, mb: 1 }}
            >
              <MenuItem value={selectedRoom.id}>{selectedRoom.name}</MenuItem>
            </Select>
            <DateTimePicker label="Beginn" sx={{ mt: 1, mb: 1 }} />
            <DateTimePicker label="Ende" sx={{ mt: 1 }} />
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
