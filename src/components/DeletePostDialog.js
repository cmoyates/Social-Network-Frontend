import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeletePostDialog = (props) => {

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Are you sure you want to delete this post?</DialogTitle>
            <DialogContent>
                "{(props.post) ? props.post.content : null}"
            </DialogContent>
            <DialogActions>
                <Button onClick={async () => {
                    props.handleClose();
                    await props.handleDelete();
                }} color="primary">
                    Yes
                </Button>
                <Button onClick={()=>{
                    props.handleClose();
                }} color="primary">
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeletePostDialog
