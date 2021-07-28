import React from 'react'
import PostCard from "../components/PostCard.js";
import SubmitPostDialog from '../components/SubmitPostDialog';
import { GoogleLogout } from 'react-google-login';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect, useRef} from 'react';


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


const Posts = (props) => {

    const [posts, setPosts] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleSubmit = async (post) => {
        setDialogOpen(false);
        console.log(post)
        const newPost = await fetch("https://fast-coast-04774.herokuapp.com/posts", {
        method: "POST",
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(post)
        });
        console.log(newPost);
        await fetchPosts();
    };

    const fetchPosts = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts');
        const data = await res.json();
        document.title = "Social Network"

        console.log(data);
        setPosts(data);
    }
    useEffect(() => {
        if (props.isAuth) {
            fetchPosts();
        }
    }, [props.isAuth])

    const classes = useStyles();
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setMenuOpen(false);
    };
    

    const logout = () => {
        console.log("Logout Successful");
        props.setProfile([]);
        props.setIsAuth(false);
    }
    
    return (
        <div>
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
            <br />
            <Button variant="contained" color="primary" size={"medium"} onClick={() => {setDialogOpen(true);}}><b>Post</b></Button>
            <Container maxWidth="sm">
                {posts.map((item) => (<PostCard key={item.post_id} user={item.user_name} content={item.content} likeCount={item.likes} img_url={item.user_img}/>))}
            </Container>
            <SubmitPostDialog open={dialogOpen} handleClose={() => {setDialogOpen(false);}} handleSubmit={handleSubmit} profile={props.profile}/>
            <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={menuOpen} id="menu-list-grow">
                            <GoogleLogout
                                clientId="399415598384-sgkom02f57l549gtnn877013fg004ke5.apps.googleusercontent.com"
                                render={renderProps => (
                                    <MenuItem onClick={renderProps.onClick}  disabled={renderProps.disabled}>
                                        Logout
                                    </MenuItem>
                                )}
                                buttonText="Logout"
                                onLogoutSuccess={logout}
                            >
                            </GoogleLogout>
                            
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default Posts
