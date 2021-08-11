import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
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

const Comments = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const goToCommenterProfile = (item) => {
        if (!props.isSinglePostPage) {
            history.push('/profile/' + item.user_id);
        }
    }

    return ((props.commentList.length > 0) ?
        <div>
            {props.commentList.map((item, index) => (
                <div key={index}>
                    <Divider/>
                    <CardContent>
                        <div className={classes.cardHeader}>
                            <Avatar src={item.user_img} onClick={()=>{goToCommenterProfile(item)}}/>
                            <h4 className={classes.nameText} onClick={()=>{goToCommenterProfile(item)}}>{item.user_name}</h4>
                        </div>
                        <Divider/>
                        <p>{item.content}</p>
                    </CardContent>
                </div>
            ))}
        </div> : null
    )
}

export default Comments
