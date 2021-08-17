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
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

// Some styles
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
    let history = useHistory();

    // A bunch of state stuff
    const [menuOpen, setMenuOpen] = useState(false);
    const [colorDialogOpen, setColorDialogOpen] = useState(false);
    const [primaryColor, setPrimaryColor] = useState('#3f50b5');
    const [profiles, setProfiles] = useState([]);

    const anchorRef = useRef(null);

    // Log the user out
    const logout = () => {
        console.log("Logout Successful");
        // Forget the profile
        props.setProfile([]);
        // Revoke their authorisation
        props.setIsAuth(false);
    }

    // Get all of the profiles (for use in the searchbar)
    const fetchProfiles = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/profiles');
        const data = await res.json();
        // And save it to the state
        setProfiles(data);
    }

    const handleSubmitColor = async (color) => {
        setColorDialogOpen(false);
        setPrimaryColor(color);
    }

    // Close the menu
    const handleMenuClose = (event) => {
        if (!(anchorRef.current && anchorRef.current.contains(event.target))) {
            setMenuOpen(false);
        }
    };

    // Theme colors
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

    // Get all of the profiles when the page loads
    useEffect(() => {
        fetchProfiles();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container direction="row" alignItems="center" justifyContent="space-between">
                        <Grid item>
                        <Typography variant="h5" style={{cursor:'pointer'}} onClick={()=>{history.push('/feed');}}>
                            Social Network
                        </Typography>
                        </Grid>
                        <Grid item>
                        <div className={classes.title}>
                            <ProfileSearchBar style={{flexGrow: 1}} profiles={profiles}/>
                        </div>
                        </Grid>
                        <Grid item>
                        <Typography style={{cursor:'pointer'}} onClick={()=>{history.push('/profile/' + props.profile.profile_id);}}>
                            {props.profile.user_name}
                        </Typography>
                        </Grid>
                    </Grid>
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