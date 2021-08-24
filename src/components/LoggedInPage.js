import React from 'react'
//import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { createTheme, makeStyles, ThemeProvider, alpha } from '@material-ui/core/styles';
import {useState, useEffect, useRef} from 'react';
import SettingsMenu from './SettingsMenu';
import ProfileSearchBar from '../components/ProfileSearchBar.js';
import { useHistory } from 'react-router-dom';
import NewProfilePopup from './NewProfilePopup';

// Some styles
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
}));

const LoggedInPage = (props) => {
    const classes = useStyles();
    let history = useHistory();

    // A bunch of state stuff
    const [menuOpen, setMenuOpen] = useState(false);
    const [nppOpen, setNppOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
        console.log(data);
    }

    // Close the menu
    const handleMenuClose = (event) => {
        if (!(anchorRef.current && anchorRef.current.contains(event.target))) {
            setMenuOpen(false);
        }
    };

    /*const toggleDarkMode = async () => {
        props.profile.dark_mode = !props.profile.dark_mode;
        setLoading(true);
        await fetch("https://fast-coast-04774.herokuapp.com/profiles/" + props.profile.profile_id, {
            method: "PUT",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(props.profile)
        });
        setLoading(false);
        props.setDarkMode(props.profile.dark_mode);
        console.log(props.profile.dark_mode)
    }*/

    // Get all of the profiles when the page loads
    useEffect(() => {
        fetchProfiles();
        setNppOpen(true);
    }, [])

    return (
        <div>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography className={classes.title} variant="h5" noWrap style={{cursor:'pointer'}} onClick={()=>{history.push('/feed');}}>
                        Social Network
                    </Typography>
                    <ProfileSearchBar profiles={profiles}/>
                    <div className={classes.grow} />
                    <Typography style={{cursor:'pointer'}} onClick={()=>{history.push('/profile/' + props.profile.profile_id);}}>
                        {props.profile.user_name}
                    </Typography>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {setMenuOpen(!menuOpen)}} ref={anchorRef} 
                        aria-controls={false ? 'menu-list-grow' : undefined} aria-haspopup="true">
                        <Avatar src={props.profile.img_url}/>
                    </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
            {props.page}
            <SettingsMenu open={menuOpen} anchorEl={anchorRef.current} handleClose={handleMenuClose} /*darkModeClick={() => {toggleDarkMode(); setMenuOpen(false);}} darkMode={props.darkMode}*/ logout={logout}/>
            <NewProfilePopup open={nppOpen} handleClose={()=>{setNppOpen(false);}} profiles={profiles} profile={props.profile}/>
        </div>
    )
}

export default LoggedInPage