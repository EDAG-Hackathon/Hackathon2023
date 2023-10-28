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
import axios from 'axios';


type CreateEditEventDialogProps = {
  id: string
  isModalOpen: boolean;
  onClose: () => void;
};


export function CreateEditEventDialog(props: CreateEditEventDialogProps) {
  const { id, isModalOpen = false, onClose } = props;

  const [selectedRoom, setSelectedRoom] = useState("Demoroom");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() => {
    axios.get("localhost:8000/api/rooms/" + id)
      .then(response => {
        setSelectedRoom(response.data)
      })
      .catch(error => {
        console.error('Failed to fetch', error);
      });
  }, [])

  const handleSave = () => {
    //API CALL
    console.log("save");
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
              value={selectedRoom.name}
              fullWidth
              variant="outlined"
              disabled
              sx={{ mt: 1, mb: 1 }}
            >
              <MenuItem value={selectedRoom.name}>{selectedRoom.name}</MenuItem>
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
