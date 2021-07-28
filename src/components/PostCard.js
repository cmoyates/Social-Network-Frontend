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

    return (
        <Card style={{margin: 20,}}>
            <CardContent>
                <div className={classes.cardHeader}>
                    <Avatar src={props.img_url}/>
                    <h3 className={classes.nameText}>{props.user}</h3>
                </div>
                <Divider/>
                <p>{props.content}</p>
            </CardContent>
            <Divider/>
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
                    <Divider orientation="vertical" flexItem />
                    <Button size={"small"} startIcon={<CommentIcon />} onClick={() => {
                        console.log("Comment");
                    }}>Comment</Button>
                    <Divider orientation="vertical" flexItem />
                    <Button size={"small"} startIcon={<ShareIcon />} onClick={() => {
                        console.log("Share");
                    }}>Share</Button>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default PostCard