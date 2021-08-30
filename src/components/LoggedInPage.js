import React, { cloneElement } from 'react'
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
import SubmitPostDialog from './SubmitPostDialog';
import DeletePostDialog from './DeletePostDialog';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import FollowingDialog from './FollowingDialog';

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
    const [followingProfiles, setFollowingProfiles] = useState([]);
    const [commentingPost, setCommentingPost] = useState(null);
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [deletingPost, setDeletingPost] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [followingDialogOpen, setFollowingDialogOpen] = useState(false);
    const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);

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
        //console.log(data);
    }

    const fetchFollowingProfiles = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/profiles/following/' + props.profile.profile_id);
        const data = await res.json();
        // And save it to the state
        setFollowingProfiles(data);
    }

    // Close the menu
    const handleMenuClose = (event) => {
        if (!(anchorRef.current && anchorRef.current.contains(event.target))) {
            setMenuOpen(false);
        }
    };

    // Submit a post
    const handleSubmitPost = async (post) => {
        // Close the post dialog
        setPostDialogOpen(false);
        // Add the post to the database
        await fetch("https://fast-coast-04774.herokuapp.com/posts", {
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(post)
        });
        // Get all of the posts (including the new one)
        //await fetchPosts();
        setLoading(!loading);
    };

    // Submit a comment
    const handleSubmitComment = async (comment) => {
        // Close the comment dialog
        setCommentDialogOpen(false);
        // Add the comment object to the list of comments for the post you're commenting on
        commentingPost.comments.commentList.push(comment);
        // Update that post on the database
        await fetch("https://fast-coast-04774.herokuapp.com/posts/" + commentingPost.post_id, {
            method: "PUT",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(commentingPost)
        });
    }

    const handleDeleteAPost = async () => {
        
        await fetch("https://fast-coast-04774.herokuapp.com/posts/" + deletingPost.post_id, {
            method: "DELETE",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        setLoading(!loading);
        //await fetchPosts();
    }

    // Close the snackbar
    const handleSnackbarClose = (event, reason) => {
        // If the reason is not clicking away
        if (reason !== 'clickaway') {
            setSnackbarOpen(false);
        }
    };

    const showFollowingPopup = () => {
        setMenuOpen(false);
        setFollowingDialogOpen(true);
    }

    const startChat = async (otherProfile) => {

        const participants = [otherProfile, props.profile].sort((a, b)=>(a.profile_id-b.profile_id));
        
        const chat = {
            room_name: `${participants[0].profile_id}-${participants[1].profile_id}`,
            participants: participants,
        }

        const res = await fetch("https://fast-coast-04774.herokuapp.com/chats/room/" + chat.room_name, {
            method: "GET",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        let data;
        try {
            data = await res.json();
            console.log("You already have a chat with this person");
        } catch (error) {
            const res = await fetch("https://fast-coast-04774.herokuapp.com/chats", {
                method: "POST",
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(chat)
            });
            data = await res.json();
            await fetchChats();
        }
        setCurrentChat(data);
        console.log("done")
    }

    const fetchChats = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/chats/profile/' + props.profile.profile_id);
        const data = await res.json();
        // Store the posts in the state
        setChats(data);

        if (data.length !== 0) {
            setCurrentChat(data[0]);
        }
        else {
            console.log("No rooms");
        }

        return data;
    }

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
        fetchFollowingProfiles();
        setNppOpen(false);
    }, [])

    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <div>
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
            {cloneElement(props.page, {setDeletingPost: setDeletingPost, setDeleteDialogOpen: setDeleteDialogOpen, setCommentingPost: setCommentingPost, setCommentDialogOpen: setCommentDialogOpen, setPostDialogOpen: setPostDialogOpen, setSnackbarOpen: setSnackbarOpen, setNewChatDialogOpen: setNewChatDialogOpen, currentChat: currentChat, setCurrentChat: setCurrentChat, chats: chats, fetchChats: fetchChats, loading: loading, setLoading: setLoading, fetchFollowingProfiles: fetchFollowingProfiles})}
            <SettingsMenu open={menuOpen} anchorEl={anchorRef.current} handleClose={handleMenuClose} /*darkModeClick={() => {toggleDarkMode(); setMenuOpen(false);}} darkMode={props.darkMode}*/ followingClick={showFollowingPopup} feedClick={()=>{history.push('/feed/');}} messagesClick={()=>{history.push('/messages/');}} logout={logout}/>
            <NewProfilePopup open={nppOpen} handleClose={()=>{setNppOpen(false);}} profiles={profiles} profile={props.profile} fetchFollowingProfiles={fetchFollowingProfiles}/>
            <SubmitPostDialog comment={false} open={postDialogOpen} handleClose={() => {setPostDialogOpen(false);}} handleSubmit={handleSubmitPost} profile={props.profile}/>
            <SubmitPostDialog comment={true} open={commentDialogOpen} handleClose={() => {setCommentDialogOpen(false);}} handleSubmit={handleSubmitComment} profile={props.profile} post={commentingPost}/>
            <DeletePostDialog post={deletingPost} open={deleteDialogOpen} handleClose={()=>{setDeleteDialogOpen(false);}} handleDelete={handleDeleteAPost}/>
            <FollowingDialog title="These are the people you follow:" profile={props.profile} open={followingDialogOpen} handleClose={()=>{setFollowingDialogOpen(false);}} profiles={followingProfiles} clickCallback={(item)=>{history.push('/profile/' + item.profile_id);}}/>
            <FollowingDialog title="Pick someone to chat with:" profile={props.profile} open={newChatDialogOpen} handleClose={()=>{setNewChatDialogOpen(false);}} profiles={followingProfiles} clickCallback={(item)=>{startChat(item);}}/>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Link copied to clipboard"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    )
}

export default LoggedInPage