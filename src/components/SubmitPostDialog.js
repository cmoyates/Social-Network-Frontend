import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import {useState} from 'react';

function SubmitPostDialog(props) {

    const [content, setContent] = useState("");

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.userName}
                    </DialogContentText>
                    <TextField
                        value={content} onChange={(e) => {setContent(e.target.value)}}
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Content"
                        fullWidth
                        multiline
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={async () => {
                    await props.handleSubmit({
                        user_name: props.userName,
                        content: content,
                        likes: 0
                    });
                }} color="primary">
                    Submit
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SubmitPostDialog;