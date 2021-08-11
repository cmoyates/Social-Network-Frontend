import React from 'react'
import PostCard from '../components/PostCard'
import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SinglePostPage = () => {

    let { id } = useParams();

    const [post, setPost] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const fetchPost = async () => {
        setPost(null);
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts/' + id);
        const data = await res.json();
        document.title = "Social Network"

        console.log(data);
        setPost(data);
    }
    useEffect( () => {
        fetchPost();
    }, [id])

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
    
        setSnackbarOpen(false);
    };

    return (
        (post) ? 
        <div>
            <Grid container direction="column" alignItems="center" justify="center" style={{minHeight: "100vh"}}>
                <Grid item>
                    <PostCard key={post.post_id} post={post} viewer_ID={-1} setSnackbarOpen={setSnackbarOpen}/>
                </Grid>
            </Grid>
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
        </div> :
        null
    )
}

export default SinglePostPage