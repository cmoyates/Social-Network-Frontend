import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { GoogleLogout } from 'react-google-login';

const SettingsMenu = (props) => {
    return (
        <Popper open={props.open} anchorEl={props.anchorEl} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={props.handleClose}>
                    <MenuList autoFocusItem={props.open} id="menu-list-grow">
                        <GoogleLogout
                            clientId="399415598384-sgkom02f57l549gtnn877013fg004ke5.apps.googleusercontent.com"
                            render={renderProps => (
                                <MenuItem onClick={renderProps.onClick}  disabled={renderProps.disabled}>
                                    Logout
                                </MenuItem>
                            )}
                            buttonText="Logout"
                            onLogoutSuccess={props.logout}
                        >
                        </GoogleLogout>
                        <MenuItem onClick={props.accColorClick}>
                            Select Accent Color
                        </MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
        </Popper>
    )
}

export default SettingsMenu
