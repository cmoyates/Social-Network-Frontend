import React from 'react'
import PostCard from "../components/PostCard.js";
import SubmitPostDialog from '../components/SubmitPostDialog';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import {useState, useEffect} from 'react';

const Feed = (props) => {
    // Set the title of the page
    document.title = "Feed";

    // A bunch of state stuff
    const [posts, setPosts] = useState([]);
    const [commentingPost, setCommentingPost] = useState(null);
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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
        await fetchPosts();
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

    // Get all of the posts from profiles the user is following
    const fetchPosts = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts/following/' + props.profile.profile_id);
        const data = await res.json();
        console.log("Posts");
        console.log(data);
        // Store the posts in the state
        setPosts(data);
    }
    
    // Close the snackbar
    const handleSnackbarClose = (event, reason) => {
        // If the reason is not clicking away
        if (reason !== 'clickaway') {
            setSnackbarOpen(false);
        }
    };

    // Get the posts when the page loads
    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div>
            <br />
            <Button variant="contained" color="primary" size={"medium"} onClick={() => {setPostDialogOpen(true);}}><b>Post</b></Button>
            <Container maxWidth="sm">
                {
                    // Map the objects into PostCard components and display them
                    posts.map((item) => (<PostCard key={item.post_id} post={item} viewer_ID={props.profile.profile_id} setSnackbarOpen={setSnackbarOpen} commentCallback={() => {
                        // When they click the comment button remember which post they're commenting on
                        setCommentingPost(item);
                        // And open the comment dialog
                        setCommentDialogOpen(true);
                    }}/>))
                }
            </Container>
            <SubmitPostDialog comment={false} open={postDialogOpen} handleClose={() => {setPostDialogOpen(false);}} handleSubmit={handleSubmitPost} profile={props.profile}/>
            <SubmitPostDialog comment={true} open={commentDialogOpen} handleClose={() => {setCommentDialogOpen(false);}} handleSubmit={handleSubmitComment} profile={props.profile} post={commentingPost}/>
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

export default Feed