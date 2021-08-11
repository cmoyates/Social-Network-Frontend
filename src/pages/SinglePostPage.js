import React from 'react'
import PostCard from '../components/PostCard'
import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';

const SinglePostPage = () => {

    let { id } = useParams();

    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        const res = await fetch('https://fast-coast-04774.herokuapp.com/posts/' + id);
        const data = await res.json();
        document.title = "Social Network"

        console.log(data);
        setPost(data);
    }
    useEffect( () => {
        fetchPost();
    }, [])

    return (
        (post) ? 
        <div>
            <Grid container direction="column" alignItems="center" justify="center" style={{minHeight: "100vh"}}>
                <Grid item>
                    <PostCard key={post.post_id} post={post} viewer_ID={-1}/>
                </Grid>
            </Grid>
        </div> :
        null
    )
}

export default SinglePostPage