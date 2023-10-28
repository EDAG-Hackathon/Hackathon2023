import { Button, Dialog, DialogTitle } from "@mui/material";
import React from "react";

export function CreateEditEventDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Event erstellen
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Event erstellen</DialogTitle>
            </Dialog>
        </div>
    );
}
