import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Grid from "@material-ui/core/Grid"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useState, useEffect } from 'react';
import Comments from './Comments';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center"
    },
    nameText: {
        paddingLeft: "10px",
    }
}));

const PostCard = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const [post, setPost] = useState([]);

    useEffect(() => {
        setPost(props.post);
    }, [])

    const goToPosterProfile = () => {
        if (!isSinglePostPage) {
            history.push('/profile/' + post.user_id);
        }
    }

    const likeAPost = async () => {
        //console.log(props.viewer_ID);
        //console.log("Like");
        if (props.post.likes.includes(props.viewer_ID)) {
            //console.log("Yes");
            props.post.likes = props.post.likes.filter(item => item !== props.viewer_ID)
        }
        else {
            //console.log("No");
            props.post.likes.push(props.viewer_ID);
        }

        const newPost = await fetch("https://fast-coast-04774.herokuapp.com/posts/" + props.post.post_id, {
        method: "PUT",
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(props.post)
        });
        //console.log(newPost);
        setPost(newPost);
    }

    const isSinglePostPage = props.viewer_ID === -1;

    return (
        <Card style={{margin: 20,}}>
            <CardContent>
                <div className={classes.cardHeader}>
                    <Avatar src={props.post.user_img} onClick={goToPosterProfile}/>
                    <h3 className={classes.nameText} onClick={goToPosterProfile}>{props.post.user_name}</h3>
                </div>
                <Divider/>
                <p>{props.post.content}</p>
            </CardContent>
            <Divider/>
            <CardActions>
                <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                >
                    <Button size={"small"} color={(props.post.likes.includes(props.viewer_ID)) ? "primary" : "default"} disabled={isSinglePostPage} startIcon={<ThumbUpIcon />} onClick={() => {
                        likeAPost();
                    }}>Like ({props.post.likes.length})</Button>
                    <Divider orientation="vertical" flexItem />
                    <Button size={"small"} disabled={isSinglePostPage} startIcon={<CommentIcon />} onClick={() => {
                        //console.log("Comment");
                        props.commentCallback();
                    }}>Comment</Button>
                    <Divider orientation="vertical" flexItem />
                    <Button size={"small"} startIcon={<ShareIcon />} onClick={() => {
                        //console.log("Share");
                        props.setSnackbarOpen(true);
                        navigator.clipboard.writeText("https://cmoyates.github.io/Social-Network-Frontend/#/post/" + props.post.post_id);
                    }}>Share</Button>
                </Grid>
            </CardActions>
            <Comments commentList={props.post.comments.commentList} isSinglePostPage={isSinglePostPage}/>
        </Card>
    )
}

export default PostCard