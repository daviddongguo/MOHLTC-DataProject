import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle,
  Paper,
  TextField
} from "@material-ui/core";
import React, {useMemo, useState} from "react";
import Draggable from "react-draggable";
import Dropdown from "../../Package/components/Dropdown";

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function AddDialog(props) {
  const {open, onClose, onAdd, title, onChange, values, users} = props;
  const availableManagers = useMemo(() => {
    const managers = [];
    for (const user of users) {
      if (values.users.includes(user[0])) {
        managers.push(user);
      }
    }
    return managers;
  }, [values.users, users]);
  return (
    <Dialog open={open} aria-labelledby={title} PaperComponent={PaperComponent} fullWidth>
      <DialogTitle style={{cursor: 'move'}}>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Organization Name
        </DialogContentText>
        <TextField
          type="text" value={values.name} onChange={onChange('name')} fullWidth
          InputLabelProps={{shrink: true}} autoFocus/>
        <Dropdown
          title="Users"
          options={users}
          defaultValues={values.users}
          onChange={onChange('users')}
        />
        <Dropdown
          title="Managers"
          options={availableManagers}
          defaultValues={values.managers}
          onChange={onChange('managers')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
