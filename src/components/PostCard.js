import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { useState, useEffect } from 'react';
import Comments from './Comments';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
    },
    nameText: {
        paddingLeft: "10px",
        cursor:'pointer',
    },
    postCard: {
        margin: 20,
        //background: "#1E1E1E"
    },
    postDivider: {
        //background: "#2d2d2d"
    },
    deleteButton: {
        //left: '95%',
        top: '10%',
    },
    grow: {
        flexGrow: 1,
    }
});

const PostCard = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const [post, setPost] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useEffect(() => {
        // Set the post from the props to the state
        setPost(props.post);
    }, [])

    // Go to the profile page for the profile that made the post
    const goToPosterProfile = () => {
        if (!isSinglePostPage) {
            history.push('/profile/' + post.user_id);
        }
    }

    // Like a post
    const likeAPost = async () => {
        // If the user already likes the post, remove them from the list of profiles that like it
        if (props.post.likes.includes(props.viewer_ID)) {
            props.post.likes = props.post.likes.filter(item => item !== props.viewer_ID)
        }
        // Otherwise add them to it
        else {
            props.post.likes.push(props.viewer_ID);
        }

        // Update the post on the database
        const newPost = await fetch("https://fast-coast-04774.herokuapp.com/posts/" + props.post.post_id, {
            method: "PUT",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(props.post)
        });
        // Set the updated post in the state
        setPost(newPost);
    }

    // If the viewer ID is -1 the post is on a single post page
    const isSinglePostPage = props.viewer_ID === -1;

    return (
        <div>
            <Card className={classes.postCard} onMouseOver={()=>{if (!showDeleteButton && props.viewer_ID === props.post.user_id) {
                setShowDeleteButton(true);
            }}} onMouseLeave={()=>{if (showDeleteButton && props.viewer_ID === props.post.user_id) {
                setShowDeleteButton(false);
            }}}>
                <CardContent>
                    <div className={classes.cardHeader}>
                        <Avatar style={{cursor:'pointer'}} src={props.post.user_img} onClick={goToPosterProfile}/>
                        <h3 className={classes.nameText} onClick={goToPosterProfile}>{props.post.user_name}</h3>
                        <div className={classes.grow} />
                        {(!showDeleteButton) ? null : 
                            <IconButton className={classes.deleteButton} onClick={()=>{props.deleteCallback();}}>
                                <CloseIcon />
                            </IconButton>
                        }
                    </div>
                    
                    <Divider className={classes.postDivider}/>
                    <p>{props.post.content}</p>
                </CardContent>
                <Divider className={classes.postDivider}/>
                <CardActions>
                    <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    >
                        <Button size={"small"} color={(props.post.likes.includes(props.viewer_ID)) ? "primary" : "default"} disabled={isSinglePostPage} startIcon={<ThumbUpIcon />} onClick={() => {
                            // Like the post
                            likeAPost();
                        }}>Like ({props.post.likes.length})</Button>
                        <Divider orientation="vertical" flexItem className={classes.postDivider}/>
                        <Button size={"small"} disabled={isSinglePostPage} startIcon={<CommentIcon />} onClick={() => {
                            // Comment on the post
                            props.commentCallback();
                        }}>Comment</Button>
                        <Divider orientation="vertical" flexItem className={classes.postDivider}/>
                        <Button size={"small"} startIcon={<ShareIcon />} onClick={() => {
                            // Share the post
                            props.setSnackbarOpen(true);
                            navigator.clipboard.writeText("https://cmoyates.github.io/Social-Network-Frontend/#/post/" + props.post.post_id);
                        }}>Share</Button>
                    </Grid>
                    
                </CardActions>
                <Comments commentList={props.post.comments.commentList} isSinglePostPage={isSinglePostPage}/>
            </Card>
        </div>
    )
}

export default PostCard