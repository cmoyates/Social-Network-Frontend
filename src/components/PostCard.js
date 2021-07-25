import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Grid from "@material-ui/core/Grid"
  
const PostCard = (props) => {
    return (
        <Card style={{margin: 20,}}>
            <CardContent>
                <h1>{props.user}</h1>
                <p>{props.content}</p>
            </CardContent>
            <CardActions>
                <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                >
                    <Button size={"small"} startIcon={<ThumbUpIcon />} onClick={() => {
                        console.log("Like");
                    }}>Like ({props.likeCount})</Button>
                    <Button size={"small"} startIcon={<CommentIcon />} onClick={() => {
                        console.log("Comment");
                    }}>Comment</Button>
                    <Button size={"small"} startIcon={<ShareIcon />} onClick={() => {
                        console.log("Share");
                    }}>Share</Button>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default PostCard