import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { GoogleLogout } from 'react-google-login';
//import Brightness7Icon from '@material-ui/icons/Brightness7';
//import Brightness4Icon from '@material-ui/icons/Brightness4';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublicIcon from '@material-ui/icons/Public';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';


/*{minWidth: "1px", paddingLeft: "13px"} */

const useStyles = makeStyles((theme) => ({
    listIcon: {
        minWidth: "1px",
        paddingLeft: "13px",
        //color: "#ffffff"
    },
    popupPaper: {
        //background: "#2D2D2D"
    }
}))

const SettingsMenu = (props) => {
    const classes = useStyles();

    return (
        <Popper open={props.open} anchorEl={props.anchorEl} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper className={classes.popupPaper}>
                    <ClickAwayListener onClickAway={props.handleClose}>
                    <MenuList autoFocusItem={props.open} id="menu-list-grow">
                        <MenuItem onClick={()=>{props.feedClick();}}>
                            <ListItemText>
                                Feed
                            </ListItemText>
                            <ListItemIcon className={classes.listIcon}>
                                <PublicIcon/>
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem onClick={()=>{props.messagesClick();}}>
                            <ListItemText>
                                Messages
                            </ListItemText>
                            <ListItemIcon className={classes.listIcon}>
                                <ChatIcon/>
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem onClick={()=>{props.followingClick();}}>
                            <ListItemText>
                                Following
                            </ListItemText>
                            <ListItemIcon className={classes.listIcon}>
                                <PeopleIcon/>
                            </ListItemIcon>
                        </MenuItem>
                        <GoogleLogout
                            clientId="399415598384-sgkom02f57l549gtnn877013fg004ke5.apps.googleusercontent.com"
                            render={renderProps => (
                                <MenuItem onClick={renderProps.onClick}  disabled={renderProps.disabled}>
                                    <ListItemText>
                                        Logout
                                    </ListItemText>
                                    <ListItemIcon className={classes.listIcon}>
                                        <ExitToAppIcon/>
                                    </ListItemIcon>
                                </MenuItem>
                            )}
                            buttonText="Logout"
                            onLogoutSuccess={props.logout}
                        >
                        </GoogleLogout>
                        {/*
                            <MenuItem onClick={props.darkModeClick}>
                            <ListItemText>
                                Toggle Dark Mode
                            </ListItemText>
                            <ListItemIcon className={classes.listIcon}>
                            {(props.darkMode) ? <Brightness7Icon/> : <Brightness4Icon/>}
                            </ListItemIcon>
                            </MenuItem>
                        */}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
        </Popper>
    )
}

export default SettingsMenu
