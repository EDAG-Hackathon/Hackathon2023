import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React from "react";

export function CreateEditEventDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleSave = () => {


        setOpen(false);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [selectedRoom, changeRoom] = React.useState("Demoroom")
    const [selectedDate, handleDateChange] = React.useState(new Date());

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Event erstellen
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Event erstellen</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <TextField
                            id="event-title"
                            label="Titel"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <Select
                            id="event-room"
                            label="Raum"
                            value={selectedRoom}
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem value={selectedRoom}>{selectedRoom}</MenuItem>
                        </Select>
                        <DateTimePicker 
                            label="Beginn"
                        />
                        <DateTimePicker 
                            label="Ende"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleSave}>Speichern</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}