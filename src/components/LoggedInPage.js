import React from 'react'
//import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {useState, useEffect, useRef} from 'react';
import SettingsMenu from './SettingsMenu';
import ColorPicker from './ColorPicker';
import ProfileSearchBar from '../components/ProfileSearchBar.js';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const LoggedInPage = (props) => {
    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const [colorDialogOpen, setColorDialogOpen] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#3f50b5');
    //const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);
    const anchorRef = useRef(null);

    const logout = () => {
        console.log("Logout Successful");
        props.setProfile([]);
        props.setIsAuth(false);
    }

    const handleSubmitColor = async (color) => {
        setColorDialogOpen(false);
        setPrimaryColor(color);
        //console.log(color);
    }

    const handleMenuClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setMenuOpen(false);
    };

    var theme = createTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: primaryColor,
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    //<ProfileSearchBar style={{flexGrow: 1}} profiles={profiles}/>

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5">
                        Social Network
                    </Typography>
                    <div className={classes.title}/>
                    <Typography>
                        {props.profile.user_name}
                    </Typography>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {setMenuOpen(!menuOpen)}} ref={anchorRef} 
                        aria-controls={menuOpen ? 'menu-list-grow' : undefined} aria-haspopup="true">
                        <Avatar src={props.profile.img_url}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            {props.page}
            <SettingsMenu open={menuOpen} anchorEl={anchorRef.current} handleClose={handleMenuClose} accColorClick={() => {setMenuOpen(false); setColorDialogOpen(true);}} logout={logout}/>
            <ColorPicker open={colorDialogOpen} handleClose={() => {setColorDialogOpen(false);}} handleSubmit={handleSubmitColor}/>
        </ThemeProvider>
    )
}

export default LoggedInPage