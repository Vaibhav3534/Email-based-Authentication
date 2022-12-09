import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';

export default function FormDialog(value) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Forgot Password
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <FormControl
                        
                        sx={{
                            display: "flex", flexDirection: "column", mt: '2', minWidth: 300, minHeight: 200
                        }}>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"

                            // fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="New password"
                            type="password"

                            // fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Confirm password"
                            type="password"

                            // fullWidth
                            variant="standard"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ display: "flex", "flexDirection": "row", "alignContent": "space-between", "margin": "auto", "paddingBottom": "30px" }}>
                    <Button variant='outlined' onClick={handleClose}>Send OTP</Button>
                    <Button variant='outlined' onClick={handleClose}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}