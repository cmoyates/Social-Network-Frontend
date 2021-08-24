import React from 'react'
import PostCard from "../components/PostCard.js";
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import {useState, useEffect} from 'react';

const Feed = (props) => {
    // Set the title of the page
    document.title = "Feed";

    // A bunch of state stuff
    const [posts, setPosts] = useState([]);

    // Get all of the posts from profiles the user is following
    const fetchPosts = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts/following/' + props.profile.profile_id);
        const data = await res.json();
        console.log("Posts");
        console.log(data);
        // Store the posts in the state
        setPosts(data);
    }

    // Get the posts when the page loads
    useEffect(() => {
        fetchPosts();
    }, [props.loading])

    return (
        <div>
            <h1>Feed</h1>
            <Button variant="contained" color="primary" size={"medium"} onClick={() => {props.setPostDialogOpen(true);}}><b>Post</b></Button>
            <Container maxWidth="sm">
                {
                    // Map the objects into PostCard components and display them
                    posts.map((item) => (<PostCard key={item.post_id} post={item} viewer_ID={props.profile.profile_id} setSnackbarOpen={props.setSnackbarOpen} deleteCallback={()=>{
                        props.setDeletingPost(item);
                        props.setDeleteDialogOpen(true);
                    }} commentCallback={() => {
                        // When they click the comment button remember which post they're commenting on
                        props.setCommentingPost(item);
                        // And open the comment dialog
                        props.setCommentDialogOpen(true);
                    }}/>))
                }
            <br />
            </Container>
        </div>
    )
}

export default Feed