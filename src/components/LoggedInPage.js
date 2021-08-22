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
import ColorPicker from './ColorPicker';
import ProfileSearchBar from '../components/ProfileSearchBar.js';
import { useHistory } from 'react-router-dom';

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
        //document.body.style.backgroundColor = "green";
    }, [])

    return (
        <ThemeProvider theme={theme}>
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
            <SettingsMenu open={menuOpen} anchorEl={anchorRef.current} handleClose={handleMenuClose} accColorClick={() => {setMenuOpen(false); setColorDialogOpen(true);}} logout={logout}/>
            <ColorPicker open={colorDialogOpen} handleClose={() => {setColorDialogOpen(false);}} handleSubmit={handleSubmitColor}/>
        </ThemeProvider>
    )
}

export default LoggedInPage