import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker";
import { useState } from "react";

type CreateEditEventDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateEditEventDialog(props: CreateEditEventDialogProps) {
  const { open, onClose } = props;

  const handleSave = () => {
    console.log("save");
  };

  const [selectedRoom, changeRoom] = useState("Demoroom");
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Event erstellen</DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField
              id="event-title"
              label="Titel"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Select
              id="event-room"
              label="Raum"
              value={selectedRoom}
              fullWidth
              variant="outlined"
              disabled
              sx={{ mb: 2 }}
            >
              <MenuItem value={selectedRoom}>{selectedRoom}</MenuItem>
            </Select>
            <DateTimePicker label="Beginn" sx={{ mb: 2 }} />
            <DateTimePicker label="Ende" />
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
