import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const FollowingDialog = (props) => {
    let history = useHistory();

    const notFollowingAnyone = props.profiles.length === 1;

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{(notFollowingAnyone) ? "You're not following anyone!" : "These are the people you follow:"}</DialogTitle>
            <DialogContent>
                {(notFollowingAnyone) ? <div>
                    <Typography align="center">Try typing some names into the searchbar!</Typography>
                    <Typography align="center"></Typography>
                </div> : 
                (<Paper style={{maxHeight: 300, overflow: 'auto'}}>
                    <List>
                        {props.profiles.map((item)=>{return (item.profile_id === props.profile.profile_id) ? null : 
                            <ListItem button onClick={()=>{props.handleClose(); history.push('/profile/' + item.profile_id);}}>
                                <ListItemAvatar>
                                    <Avatar src={item.img_url}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.user_name} />
                            </ListItem>
                        })}
                    </List>
                </Paper>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{props.handleClose();}} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FollowingDialog
