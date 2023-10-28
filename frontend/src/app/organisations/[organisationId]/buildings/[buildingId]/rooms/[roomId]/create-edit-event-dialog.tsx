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
import { useState } from "react";

type CreateEditEventDialogProps = {
  id: string
  isModalOpen: boolean;
  onClose: () => void;
};

export function CreateEditEventDialog(props: CreateEditEventDialogProps) {
  const { id, isModalOpen = false, onClose } = props;

  const handleSave = () => {
    //API CALL
    console.log("save");
    onClose();
  };

  const [selectedRoom, changeRoom] = useState("Demoroom");
  const [selectedDate, handleDateChange] = useState(new Date());

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
              value={selectedRoom}
              fullWidth
              variant="outlined"
              disabled
              sx={{ mt: 1, mb: 1 }}
            >
              <MenuItem value={selectedRoom}>{selectedRoom}</MenuItem>
            </Select>
            <DateTimePicker 
              label="Beginn"
              sx={{ mt: 1, mb: 1 }} 
            />
            <DateTimePicker 
              label="Ende" 
              sx={{ mt: 1 }}
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
