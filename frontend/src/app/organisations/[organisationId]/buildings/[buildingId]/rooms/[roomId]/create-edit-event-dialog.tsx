import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
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

    const [selectedDate, handleDateChange] = React.useState(new Date());

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Event erstellen
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Event erstellen</DialogTitle>
                <DialogContent>
                    <TextField
                        id="event-title"
                        label="Titel"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <DateTimePicker 
                        label="Beginn"
                        value={selectedDate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleSave}>Speichern</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}