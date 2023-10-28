import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

type CreateEditEventDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateEditEventDialog(props: CreateEditEventDialogProps) {
  const { open, onClose } = props;

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Event erstellen</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField id="event-name" type="text" fullWidth variant="outlined" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
