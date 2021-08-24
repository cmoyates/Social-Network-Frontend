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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useState} from 'react';

const NewProfilePopup = (props) => {

    const [loading, setLoading] = useState(false);
    
    const followProfile = async (id) => {
        if (props.profile.profiles_following.includes(parseInt(id))) {
            props.profile.profiles_following = props.profile.profiles_following.filter(item => item !== parseInt(id));
        }
        else {
            props.profile.profiles_following.push(parseInt(id));
        }
        setLoading(true);
        await fetch("https://fast-coast-04774.herokuapp.com/profiles/" + props.profile.profile_id, {
            method: "PUT",
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify(props.profile)
        });
        await props.fetchFollowingProfiles;
        setLoading(false);
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Congrats on the new account!</DialogTitle>
            <DialogContent>
            <Typography align="center">Here are some people to follow</Typography>
                <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                    <List>
                        {props.profiles.map((item)=>{return (item.profile_id === props.profile.profile_id) ? null : 
                            <ListItem style={{minWidth: "300px"}}>
                                <ListItemAvatar>
                                    <Avatar src={item.img_url}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.user_name} />
                                <ListItemSecondaryAction>
                                    <Button variant="outlined" onClick={()=>{followProfile(item.profile_id);}}>{(props.profile.profiles_following.includes(item.profile_id)) ? "Following" : "Follow"}</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        })}
                    </List>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{props.handleClose();}} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewProfilePopup
