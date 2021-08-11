import React from 'react'
import PostCard from "../components/PostCard.js";
import SubmitPostDialog from '../components/SubmitPostDialog';
import SubmitCommentDialog from '../components/SubmitCommentDilog.js';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
//import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';

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
    const [profiles, setProfiles] = useState([]);
    const [commentingPost, setCommentingPost] = useState(null);
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmitPost = async (post) => {
        setPostDialogOpen(false);
        //console.log(post)
        const newPost = await fetch("https://fast-coast-04774.herokuapp.com/posts", {
        method: "POST",
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(post)
        });
        await fetchPosts();
    };

    const handleSubmitComment = async (comment) => {
        setCommentDialogOpen(false);
        commentingPost.comments.commentList.push(comment);
        const newPost = await fetch("https://fast-coast-04774.herokuapp.com/posts/" + commentingPost.post_id, {
        method: "PUT",
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(commentingPost)
        });
    }

    const fetchPosts = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts');
        const data = await res.json();
        console.log("Posts");
        console.log(data);
        setPosts(data);
    }
    const fetchProfiles = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/profiles');
        const data = await res.json();
        //console.log(data);
        setProfiles(data);
    }
    useEffect(() => {
        document.title = "Social Network"
            console.log("Test")
            fetchPosts();
            fetchProfiles();
    }, [props.profile.primary_color])

    const classes = useStyles();
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setSnackbarOpen(false);
    };

    return (
        <div>
            <br />
            <Button variant="contained" color="primary" size={"medium"} onClick={() => {setPostDialogOpen(true);}}><b>Post</b></Button>
            <Container maxWidth="sm">
                {posts.map((item) => (<PostCard key={item.post_id} post={item} viewer_ID={props.profile.profile_id} setSnackbarOpen={setSnackbarOpen} commentCallback={() => {
                    setCommentingPost(item);
                    setCommentDialogOpen(true);
                }}/>))}
            </Container>
            <SubmitPostDialog open={postDialogOpen} handleClose={() => {setPostDialogOpen(false);}} handleSubmit={handleSubmitPost} profile={props.profile}/>
            <SubmitCommentDialog open={commentDialogOpen} handleClose={() => {setCommentDialogOpen(false);}} handleSubmit={handleSubmitComment} profile={props.profile} post={commentingPost}/>
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

export default Posts